import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import authServices from "@/services/auth.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IResetPassword } from "@/types/Auth";
import { useSearchParams } from "next/navigation";

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const useResetPassword = () => {
  const { setToaster } = useContext(ToasterContext);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const resetPassword = async (payload: IResetPassword) => {
    const res = await authServices.resetPassword(payload);
    return res;
  };

  const {
    mutate: mutateResetPassword,
    isPending: isPendingMutateResetPassword,
    isSuccess: isSuccessMutateResetPassword,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Password successfully updated",
      });
      reset();
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message || "Failed to reset password",
      });
    },
  });

  const handleResetPassword = (data: IResetPassword) => {
    const payload = {
      ...data,
      token: token || "", // dari URL
    };
    mutateResetPassword(payload);
  };

  return {
    control,
    handleResetPassword,
    handleSubmit,
    errors,
    isPendingMutateResetPassword,
    isSuccessMutateResetPassword,
  };
};

export default useResetPassword;
