import { ToasterContext } from "@/contexts/ToasterContext";
import apiServices from "@/service/api.service";
import chatService from "@/service/chat.service";
import { IGroup } from "@/types/Chat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});

const useAddGroup = () => {
  const { setToaster } = useContext(ToasterContext);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* ================= GET DATA ================= */
  const getGenerus = async () => {
    const params = `limit=999`;
    const res = await apiServices.getGenerus(params);
    return res.data;
  };

  const { data: dataGenerus, isLoading: isLoadingGenerus } = useQuery({
    queryKey: ["Generus"],
    queryFn: getGenerus,
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "" },
  });

  const addGroup = async (payload: IGroup) => {
    const res = await chatService.addGroup(payload);
    return res;
  };

  const {
    mutate: mutateAddGroup,
    isPending: isPendingMutateAddGroup,
    isSuccess: isSuccessMutateAddGroup,
  } = useMutation({
    mutationFn: addGroup,
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

  const handleAddGroup = (data: IGroup) => {
    const payload = {
      ...data,
      memberIds: selectedIds,
    };

    mutateAddGroup(payload);
  };

  return {
    dataGenerus,
    isLoadingGenerus,

    selectedIds,
    toggleSelect,

    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddGroup,
    isSuccessMutateAddGroup,
    handleAddGroup,
  };
};

export default useAddGroup;
