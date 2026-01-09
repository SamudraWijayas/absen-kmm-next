import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import authServices from "@/services/auth.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IResetPasswordRequest } from "@/types/Auth";

const requestResetPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Email format not valid")
    .required("Email is required"),
});

const useRequestResetPassword = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(requestResetPasswordSchema),
  });
  const requestReset = async (payload: IResetPasswordRequest) => {
    const res = await authServices.requestResetPassword(payload);
    return res;
  };
  const {
    mutate: mutateRequestReset,
    isPending: isPendingMutateRequestReset,
    isSuccess: isSuccessMutateRequestReset,
  } = useMutation({
    mutationFn: requestReset,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Reset password link sent to email",
      });
      reset();
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message || "Failed to request reset password",
      });
    },
  });

  const handleRequestReset = (data: IResetPasswordRequest) => {
    const payload = {
      ...data,
    };
    mutateRequestReset(payload);
  };

  return {
    control,
    handleRequestReset,
    handleSubmit,
    errors,
    isPendingMutateRequestReset,
    isSuccessMutateRequestReset,
  };
};

export default useRequestResetPassword;
