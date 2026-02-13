import chatService from "@/service/chat.service";
import { useQuery } from "@tanstack/react-query";

const useMessage = (id: string, type: "personal" | "group") => {
  const getMessages = async () => {
    if (type === "personal") {
      const res = await chatService.getPrivatChat(id);
      return res.data;
    } else {
      const res = await chatService.getGroupChat(id);
      return res.data;
    }
  };

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["messages", type, id], // ✅ penting pakai id & type
    queryFn: getMessages,
    enabled: !!id, // ✅ hanya fetch kalau id ada
  });

  return {
    dataMessage: data,
    isLoadingMessage: isLoading,
    isRefetchingMessage: isRefetching,
    refetchMessage: refetch,
  };
};

export default useMessage;
