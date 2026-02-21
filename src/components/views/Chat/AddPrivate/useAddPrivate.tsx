import { ToasterContext } from "@/contexts/ToasterContext";
import apiServices from "@/service/api.service";
import chatService from "@/service/chat.service";
import { IPrivate } from "@/types/Chat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";

const schema = yup.object().shape({
  targetUserId: yup.number().required("Please input name"),
});

interface UseAddGroupProps {
  limit: number;
  page: number;
  search: string;
}

const useAddPrivate = ({ limit, page, search }: UseAddGroupProps) => {
  const { setToaster } = useContext(ToasterContext);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  /* ================= GET DATA ================= */
  const getGenerus = async () => {
    let params = `limit=${limit}&page=${page}`;
    if (search) {
      params += `&search=${search}`;
    }
    const res = await apiServices.getGenerus(params);
    return res.data;
  };

  const { data: dataGenerus, isLoading: isLoadingGenerus } = useQuery({
    queryKey: ["Generus", limit, page, search],
    queryFn: getGenerus,
  });

  const toggleSelect = (id: number) => {
    // kalau id sama dengan selectedId, unselect (jadi null), kalau beda pilih baru
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addPrivate = async (payload: IPrivate) => {
    const res = await chatService.addPrivat(payload);
    return res;
  };

  const {
    mutate: mutateAddPrivate,
    isPending: isPendingMutateAddPrivate,
    isSuccess: isSuccessMutateAddPrivate,
  } = useMutation({
    mutationFn: addPrivate,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil Tambah Grup",
      });
      reset();
    },
  });

  const handleAddPrivate = (payload: IPrivate) => mutateAddPrivate(payload);

  return {
    dataGenerus,
    isLoadingGenerus,

    selectedId,
    toggleSelect,

    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddPrivate,
    isSuccessMutateAddPrivate,
    handleAddPrivate,
  };
};

export default useAddPrivate;
