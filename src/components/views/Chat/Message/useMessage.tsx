import { useCallback, useEffect, useRef, useState } from "react";
import chatService from "@/service/chat.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const useMessage = (onJoined?: () => void) => {
  const params = useParams();
  const id = params?.id as string;
  const { dataProfile } = useProfile();
  const currentUserId = dataProfile?.id;
  const queryClient = useQueryClient();

  const {
    socket,
    deleteForMe: socketDeleteForMe,
    deleteForEveryone: socketDeleteForEveryone,
    startTyping,
    stopTyping,
    typingUsers,
    onlineUsers,
  } = useSocket();
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
    if (!socket || !socket.connected || !id) {
      console.log("Socket belum siap");
      return;
    }
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
    if (!socket || !id || !currentUserId) return;

    // Gabung room
    // socket.emit("join_room", id);

    const handleReceiveMessage = (msg: IMessage) => {
      queryClient.setQueryData<{ data: IMessage[] }>(
        ["messages", id],
        (old) => ({
          data: old?.data ? [...old.data, msg] : [msg],
        }),
      );
    };

    const handleDeletedForMe = ({
      messageId,
      userId,
    }: {
      messageId: number;
      userId: number;
    }) => {
      if (userId === currentUserId) {
        queryClient.setQueryData<{ data: IMessage[] }>(
          ["messages", id],
          (old) => ({
            data: old?.data.filter((m) => m.id !== messageId) ?? [],
          }),
        );
      }
    };

    const handleDeletedForEveryone = ({ messageId }: { messageId: number }) => {
      queryClient.setQueryData<{ data: IMessage[] }>(
        ["messages", id],
        (old) => ({
          data:
            old?.data.map((m) =>
              m.id === messageId ? { ...m, isDeleted: true } : m,
            ) ?? [],
        }),
      );
    };
    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_deleted_for_me", handleDeletedForMe);
    socket.on("message_deleted_for_everyone", handleDeletedForEveryone);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_deleted_for_me", handleDeletedForMe);
      socket.off("message_deleted_for_everyone", handleDeletedForEveryone);
      // socket.emit("leave_room", id);
    };
  }, [socket, id, currentUserId]);

  useEffect(() => {
    if (!socket || !id) return;

    const joinRoom = () => {
      console.log("JOIN ROOM:", id);
      socket.emit("join_room", id);

      // 🔥 alert disini
      // alert("Berhasil join room: " + id);
      if (onJoined) {
        onJoined(); // 🔥 trigger dari sini
      }
    };

    if (socket.connected) {
      joinRoom();
    }

    socket.on("connect", joinRoom);

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [socket, id]);

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

  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const toggleDropdown = (messageId: number) => {
    if (activeDropdownId === messageId) setActiveDropdownId(null);
    else setActiveDropdownId(messageId);
  };

  // delete -----------------------------------

  const handleDeleteForMe = (messageId: number) => {
    socketDeleteForMe(messageId);
    setActiveDropdownId(null);
  };

  const handleDeleteForEveryone = (messageId: number) => {
    socketDeleteForEveryone(messageId);
    setActiveDropdownId(null);
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

    toggleDropdown,
    activeDropdownId,
    handleDeleteForMe,
    handleDeleteForEveryone,
  };
};

export default useMessage;
