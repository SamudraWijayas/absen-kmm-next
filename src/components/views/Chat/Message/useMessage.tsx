import { useCallback, useEffect, useRef } from "react";
import chatService from "@/service/chat.service";
import { useQuery } from "@tanstack/react-query";
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

  const { socket, startTyping, stopTyping, typingUsers, onlineUsers } =
    useSocket();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const {
    data: dataConversation,
    isLoading: isLoadingConversation,
    isRefetching: isRefetchingConversation,
    refetch: refetchConversation,
  } = useQuery({
    queryKey: ["Conversations", id],
    queryFn: getConversation,
    enabled: !!id,
  });

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
    stopTyping(id);
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

  const handleTyping = () => {
    if (!id) return;

    startTyping(id);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(id);
    }, 1500);
  };

  return {
    dataMessage,
    isLoadingMessage,
    dataConversation,
    isLoadingConversation,
    isRefetchingConversation,
    refetchConversation,
    control,
    handleSubmitForm,
    handleSendMessage,
    markAsRead,
    typingUsers,
    handleTyping,
    onlineUsers,
  };
};

export default useMessage;
