import chatService from "@/service/chat.service";
import useChangeUrl from "@/hooks/useChangeUrls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useSocket } from "@/contexts/SocketProvider";
import { ToasterContext } from "@/contexts/ToasterContext";

const useChat = () => {
  const { setToaster } = useContext(ToasterContext);
  const { currentSearch } = useChangeUrl();
  const { socket, onlineUsers } = useSocket();
  const getChatList = async () => {
    let params = ``;
    if (currentSearch) {
      params += `search=${currentSearch}`;
    }
    const res = await chatService.getListChat(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataChatList,
    isLoading: isLoadingChatList,
    isRefetching: isRefetchingChatList,
    refetch: refetchChatList,
  } = useQuery({
    queryKey: ["ChatList", currentSearch],
    queryFn: getChatList,
  });

  useEffect(() => {
    if (!socket) return;

    const handleChatUpdate = () => {
      refetchChatList();
    };

    socket.on("chat_list_update", handleChatUpdate);
    return () => {
      socket.off("chat_list_update", handleChatUpdate);
    };
  }, [socket, currentSearch, refetchChatList]);

  // deleete
  const deleteConversation = async (id: string) => {
    const res = await chatService.deleteConversations(id);
    return res;
  };

  const {
    mutate: mutateDeleteConversation,
    isPending: isPendingMutateDeleteConversation,
    isSuccess: isSuccessMutateDeleteConversation,
  } = useMutation({
    mutationFn: deleteConversation,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil Hapus Percakapan",
      });
    },
  });

  return {
    dataChatList,
    isLoadingChatList,
    isRefetchingChatList,
    refetchChatList,
    onlineUsers,

    mutateDeleteConversation,
    isPendingMutateDeleteConversation,
    isSuccessMutateDeleteConversation,
  };
};

export default useChat;
