import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import chatService from "@/service/chat.service";
import { IConvertation } from "@/types/Chat";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});

const schemaUpdatePicture = yup.object().shape({
  image: yup.mixed<FileList | string>().required("Please input picture"),
});

const useSetting = () => {
  const { setToaster } = useContext(ToasterContext);
  const params = useParams();

  const id = params?.id as string;

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue: setValueUpdateGrup,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateGrup = async (payload: IConvertation) => {
    const res = await chatService.updateConversations(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateGrup,
    isPending: isPendingMutateUpdateGrup,
    isSuccess: isSuccessMutateUpdateGrup,
  } = useMutation({
    mutationFn: updateGrup,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update Grup",
      });
    },
  });

  const handleUpdateGrup = (data: IConvertation) => {
    mutateUpdateGrup(data);
  };

  // image grup

  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    reset: resetUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValueUpdatePicture,
  } = useForm({
    resolver: yupResolver(schemaUpdatePicture),
  });

  const preview = useWatch({
    control: controlUpdatePicture,
    name: "image",
  });
  const fileUrl = getValuesUpdatePicture("image");
  const previewUrl =
    typeof preview === "string"
      ? `${
          process.env.NEXT_PUBLIC_IMAGE || process.env.NEXT_PUBLIC_API
        }${preview}`
      : "";


  const handleUploadPicture = (
    files: FileList,
    onChange: (value: string | FileList | null | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdatePicture("image", fileUrl);
      }
    });
  };

  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    control,
    handleSubmitForm,
    errors,
    reset,
    watch,
    setValueUpdateGrup,
    updateGrup,
    isPendingMutateUpdateGrup,
    isSuccessMutateUpdateGrup,
    handleUpdateGrup,

    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,
    setValueUpdatePicture,

    preview: previewUrl,
  };
};

export default useSetting;
