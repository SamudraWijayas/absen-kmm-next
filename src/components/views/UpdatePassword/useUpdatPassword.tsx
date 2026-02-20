import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/service/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { ErrorResponse } from "@/types/Response";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Please insert your old password"),
  password: yup.string().required("Please insert your new password"),
  confirmPassword: yup
    .string()
    .required("Please insert your confirm new password"),
});

const useUpdatePassword = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data;
  };

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
  } = useMutation({
    mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
    onError: (error: AxiosError<ErrorResponse>) => {
      const response = error?.response?.data;

      if (!response) {
        return setToaster({
          type: "error",
          message: "Terjadi kesalahan",
        });
      }

      // 1️⃣ Kalau ada error detail di data (validation error)
      if (response.data && Object.keys(response.data).length > 0) {
        const firstError = Object.values(response.data)[0];

        return setToaster({
          type: "error",
          message: firstError as string,
        });
      }

      // 2️⃣ Kalau tidak ada data, ambil dari meta.message
      setToaster({
        type: "error",
        message: response.meta?.message || "Gagal set password",
      });
    },
    onSuccess: () => {
      resetUpdatePassword();
      setValueUpdatePassword("oldPassword", "");
      setValueUpdatePassword("password", "");
      setValueUpdatePassword("confirmPassword", "");
      setToaster({
        type: "success",
        message: "Success update password",
      });
    },
  });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  };
};

export default useUpdatePassword;
