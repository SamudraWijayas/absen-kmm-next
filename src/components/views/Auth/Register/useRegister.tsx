import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("please input your fullname"),
  username: yup.string().required("please input your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("please input your email"),
  password: yup
    .string()
    .min(8, "Minimal 8 Character")
    .required("please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords not match")
    .required("please input your confirm password"),
});

const useRegister = (password: string) => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Register success",
      });
      router.push("/auth/register/success");
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);
  // Rule checks
  const hasLowerAndUpperCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumericCharacter = /\d/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9\s]/.test(password);
  const meetsMinimumLength = password.length >= 8;

  // Character restriction rules
  const forbiddenCharactersRegex = /[\/\\'"`]/;
  const allowedSpecialCharactersRegex = /[!@#$%^&*()_\-+=\[\]{}|;:,.<>?~]/;

  const isSpecialCharacterValid =
    password.length > 0 &&
    !forbiddenCharactersRegex.test(password) &&
    allowedSpecialCharactersRegex.test(password);

  // Password strength scoring (0–4)
  const calculateStrengthScore = (): number => {
    if (forbiddenCharactersRegex.test(password)) return 1;

    let score = 0;
    if (hasLowerAndUpperCase) score++;
    if (hasNumericCharacter) score++;
    if (hasSpecialCharacter) score++;
    if (meetsMinimumLength) score++;

    return score;
  };

  return {
    hasLowerAndUpperCase,
    hasNumericCharacter,
    hasSpecialCharacter,
    meetsMinimumLength,
    isSpecialCharacterValid,
    control,
    handleRegister,
    handleSubmit,
    isPendingRegister,
    errors,
    strengthScore: calculateStrengthScore(),
  };
};

export default useRegister;
