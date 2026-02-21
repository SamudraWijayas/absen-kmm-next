import { ToasterContext } from "@/contexts/ToasterContext";
import apiServices from "@/service/api.service";
import chatService from "@/service/chat.service";
import { IGroup } from "@/types/Chat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useDebounce from "@/hooks/useDebounce";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});

const useAddGroup = () => {
  const { setToaster } = useContext(ToasterContext);

  // ================= STATE =================
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // untuk input value instan
  const [searchInput, setSearchInput] = useState("");

  // untuk query ke backend (pakai debounce)
  const [searchQuery, setSearchQuery] = useState("");

  const debounce = useDebounce();
  const LIMIT = 10;
  const PAGE = 1;

  // ================= GET DATA =================
  const getGenerus = async () => {
    let params = `limit=${LIMIT}&page=${PAGE}`;
    if (searchQuery) params += `&search=${searchQuery}`;
    const res = await apiServices.getGenerus(params);
    return res.data;
  };

  const { data: dataGenerus, isLoading: isLoadingGenerus } = useQuery({
    queryKey: ["Generus", searchQuery], // refetch otomatis saat searchQuery berubah
    queryFn: getGenerus,
  });

  // ================= SELECT HANDLER =================
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // ================= FORM HANDLER =================
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
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Berhasil Tambah Grup" });
      reset();
      setSelectedIds([]);
    },
  });

  const handleAddGroup = (data: IGroup) => {
    const payload = { ...data, memberIds: selectedIds };
    mutateAddGroup(payload);
  };

  // ================= SEARCH HANDLER =================
  const handleSearch = (value: string) => {
    setSearchInput(value); // langsung update input → huruf muncul instan
    debounce(() => setSearchQuery(value), 300); // update query ke backend dengan delay
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
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

    searchInput,
    handleSearch,
    handleClearSearch,
  };
};

export default useAddGroup;
