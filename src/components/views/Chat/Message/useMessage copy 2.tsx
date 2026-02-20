import { useEffect, useMemo, useState } from "react";
import chatService from "@/service/chat.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMessage, ISendMessage } from "@/types/Chat";
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

  const { socket } = useSocket();

  // ================= STATE LOKAL UNTUK MESSAGE =================
  const [messages, setMessages] = useState<IMessage[]>([]);

  // ================= GET MESSAGES SEKALI SAAT MOUNT =================
  useEffect(() => {
    if (!id) return;
    chatService.getMessage(id).then(res => {
      setMessages(res.data);
    });
  }, [id]);

  // ================= GET CONVERSATION =================
  const getConversation = async () => {
    const res = await chatService.getConversation(id);
    return res.data.data;
  };

  const { data: dataConversation, isLoading: isLoadingConversation } = useQuery({
    queryKey: ["Conversations", id],
    queryFn: getConversation,
    enabled: !!id,
  });

  // ================= REACT HOOK FORM =================
  const { control, handleSubmit: handleSubmitForm, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { content: "" },
  });

  // ================= MUTATE SEND MESSAGE =================
  const sendMessage = async (payload: ISendMessage) => {
    const res = await chatService.sendMessage(payload);
    return res;
  };

  const { mutate: mutateSendMessage } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (res, variables) => {
      // Append pesan baru ke state lokal
      setMessages(prev => [...prev, res.data]);
      reset();

      // Kirim via socket
      if (socket) {
        socket.emit("send_message", { ...variables, conversationId: id });
      }
    },
  });

  const handleSendMessage = (data: ISendMessage) => {
    const payload = { ...data, conversationId: id };
    mutateSendMessage(payload);
  };

  // ================= MARK AS READ =================
  const markAsRead = async () => {
    if (!id || !currentUserId) return;

    try {
      await chatService.markAsRead(id);
      if (socket) {
        socket.emit("mark_read", { conversationId: id, userId: currentUserId });
      }
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  // ================= SOCKET LISTENER =================
  useEffect(() => {
    if (!socket || !id) return;

    socket.emit("join_room", id);

    const handler = (msg: IMessage) => {
      setMessages(prev => [...prev, msg]); // append pesan baru langsung
    };

    socket.on("receive_message", handler);

    return () => {
      socket.off("receive_message", handler);
      socket.emit("leave_room", id);
    };
  }, [socket, id]);

  return {
    dataMessage: messages, // pake state lokal
    isLoadingMessage: false, // gak perlu loading karena sudah fetch sekali
    dataConversation,
    isLoadingConversation,
    control,
    handleSubmitForm,
    handleSendMessage,
    markAsRead,
  };
};

export default useMessage;
