import { useCallback, useEffect } from "react";
import chatService from "@/service/chat.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ISendMessage } from "@/types/Chat";
import { useSocket } from "@/contexts/SocketProvider";
import useProfile from "@/hooks/useProfile";

const schema = yup.object().shape({
  content: yup.string().required("Please input message"),
});

const useMessage = () => {
  const params = useParams();
  const id = params?.id as string;
  const { dataProfile } = useProfile();
  const currentUserId = dataProfile?.id;

  const { socket } = useSocket(); // ambil socket

  // ================= GET MESSAGES =================
  const getMessages = async () => {
    const res = await chatService.getMessage(id);
    return res.data;
  };

  const {
    data: dataMessage,
    isLoading: isLoadingMessage,
    refetch: refetchMessage,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: getMessages,
    enabled: !!id,
  });

  // ================= GET CONVERSATION =================
  const getConversation = async () => {
    const res = await chatService.getConversation(id);
    return res.data.data;
  };

  const { data: dataConversation, isLoading: isLoadingConversation } = useQuery(
    {
      queryKey: ["Conversations", id],
      queryFn: getConversation,
      enabled: !!id,
    },
  );

  // ================= REACT HOOK FORM =================
  const {
    control,
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { content: "" },
  });

  // ================= MUTATE SEND MESSAGE VIA API =================
  // const sendMessage = async (payload: ISendMessage) => {
  //   const res = await chatService.sendMessage(payload);
  //   return res;
  // };

  // const { mutate: mutateSendMessage } = useMutation({
  //   mutationFn: sendMessage,
  //   onSuccess: (res, variables) => {
  //     // Kirim via socket juga
  //     if (socket) {
  //       socket.emit("send_message", { ...variables, conversationId: id });
  //     }
  //     reset();
  //   },
  // });

  const handleSendMessage = (data: ISendMessage) => {
    if (!socket) return;

    socket.emit("send_message", {
      ...data,
      conversationId: id,
    });

    reset();
  };

  // ================= MARK AS READ =================
  const markAsRead = useCallback(async () => {
    if (!id || !currentUserId) return;
    try {
      await chatService.markAsRead(id);
      if (socket) {
        socket.emit("mark_read", { conversationId: id, userId: currentUserId });
      }
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  }, [id, currentUserId, socket]);

  // ================= SOCKET LISTENER =================
  useEffect(() => {
    if (!socket || !id) return;

    // Gabung room
    socket.emit("join_room", id);

    const handler = () => {
      refetchMessage(); // fetch terbaru
    };

    socket.on("receive_message", handler);

    return () => {
      socket.off("receive_message", handler);
      socket.emit("leave_room", id);
    };
  }, [socket, id, refetchMessage]);

  return {
    dataMessage,
    isLoadingMessage,
    dataConversation,
    isLoadingConversation,
    control,
    handleSubmitForm,
    handleSendMessage,
    markAsRead,
  };
};

export default useMessage;
