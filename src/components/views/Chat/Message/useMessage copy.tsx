import chatService from "@/service/chat.service";
import { ISendMessage } from "@/types/Chat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import * as yup from "yup";

const schema = yup.object().shape({
  content: yup.string().required("Please input name"),
});

const useMessage = () => {
  const params = useParams();
  const id = params?.id as string;

  const getMessages = async () => {
    const res = await chatService.getMessage(id);
    return res.data;
  };

  const {
    data: dataMessage,
    isLoading: isLoadingMessage,
    isRefetching: isRefetchingMessage,
    refetch: refetchMessage,
  } = useQuery({
    queryKey: ["messages", id], // ✅ penting pakai id & type
    queryFn: getMessages,
    enabled: !!id, // ✅ hanya fetch kalau id ada
  });

  const getConversation = async () => {
    const res = await chatService.getConversation(id);
    return res.data.data;
  };

  const { data: dataConversation, isLoading: isLoadingConversation } = useQuery(
    {
      queryKey: ["Conversations", id], // ✅ penting pakai id & type
      queryFn: getConversation,
      enabled: !!id, // ✅ hanya fetch kalau id ada
    },
  );

  // send pesan

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: "",
    },
  });

  const sendMessage = async (payload: ISendMessage) => {
    const res = await chatService.sendMessage(payload);
    return res;
  };

  const {
    mutate: mutateSendMessage,
    isPending: isPendingMutateSendMessage,
    isSuccess: isSuccessMutateSendMessage,
  } = useMutation({
    mutationFn: sendMessage,
  });

  const handleSendMessage = (data: ISendMessage) => {
    const payload = {
      ...data,
      conversationId: id,
    };
    mutateSendMessage(payload);
  };

  return {
    dataMessage,
    isLoadingMessage,
    isRefetchingMessage,
    refetchMessage,

    dataConversation,
    isLoadingConversation,

    control,
    handleSubmitForm,
    errors,
    handleSendMessage,

    isPendingMutateSendMessage,
    isSuccessMutateSendMessage,
  };
};

export default useMessage;
