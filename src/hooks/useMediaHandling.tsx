import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/service/upload.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMediaHandling = () => {
  const { setToaster } = useContext(ToasterContext);

  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
    folder?: string,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) {
      formData.append("folder", folder); // 🔥 INI KUNCI NYA
    }
    const {
      data: {
        data: { url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);
    callback(fileUrl);
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
        folder?: string;
      }) => uploadFile(variables.file, variables.callback, variables.folder),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.deleteFile({ fileUrl });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteFile(variables.fileUrl, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (value: string | FileList | null | undefined) => void,
    callback: (fileUrl?: string) => void,
    folder?: string,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback,
        folder,
      });
    }
  };

  const handleDeleteFile = (
    fileUrl: string | FileList | null | undefined,
    callback: () => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;
