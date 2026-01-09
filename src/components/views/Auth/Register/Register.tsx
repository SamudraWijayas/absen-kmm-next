"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, CircleCheck, CircleX } from "lucide-react";
import { motion } from "framer-motion";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import * as React from "react";
import { Spinner } from "@heroui/react";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    hasLowerAndUpperCase,
    hasNumericCharacter,
    meetsMinimumLength,
    isSpecialCharacterValid,
    strengthScore,
    control,
    handleRegister,
    handleSubmit,
    isPendingRegister,
    errors,
  } = useRegister(password);
  const progressColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-emerald-600",
  ];
  const textprogressColor = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-emerald-600",
  ];
  const strengthLabel = ["Sangat Lemah", "Lemah", "Kuat", "Sangat Kuat"];

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-md">
        {/* Left Side */}
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src="/images/bg.jpg"
            alt="Timnas"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-col justify-center p-6 sm:p-10 md:w-1/2 md:p-12">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-red-700">TIKET ID</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Silakan isi data Anda di bawah ini untuk mendaftar.
                </p>
              </div>
              <div className="flex items-center gap-1 rounded border px-2 py-1 text-sm text-gray-600">
                🇮🇩 <span>Indonesia</span>
              </div>
            </div>
          </div>
          {errors.root && <div className="mb-4">{errors?.root?.message}</div>}
          <form className="space-y-3" onSubmit={handleSubmit(handleRegister)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 w-full">
                    <input
                      {...field}
                      type="text"
                      placeholder="Fullname"
                      className={`w-full rounded-lg border px-4 py-2 pr-10 text-sm focus:ring-1 focus:outline-none ${
                        errors.fullName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username<span className="text-red-500">*</span>
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 w-full">
                    <input
                      {...field}
                      type="text"
                      placeholder="Username"
                      className={`w-full rounded-lg border px-4 py-2 pr-10 text-sm focus:ring-1 focus:outline-none ${
                        errors.username
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 w-full">
                    <input
                      {...field}
                      type="text"
                      placeholder="Email"
                      className={`w-full rounded-lg border px-4 py-2 pr-10 text-sm focus:ring-1 focus:outline-none ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            {/* Password Input */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kata sandi<span className="text-red-500">*</span>
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 w-full">
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className={`mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                          errors.password
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                        value={password}
                        onChange={(e) => {
                          field.onChange(e); // <-- update react-hook-form
                          setPassword(e.target.value); // <-- update local state
                        }}
                        placeholder="Kata sandi"
                      />
                      <button
                        type="button"
                        className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Strength Bar */}
              <div className="mt-2 h-2 w-full overflow-hidden rounded bg-gray-200">
                <motion.div
                  className={`h-full ${progressColor[strengthScore - 1] || "bg-gray-300"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(strengthScore / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Strength Label */}
              <p
                className={`mt-1 text-xs font-medium ${
                  strengthScore === 0
                    ? "text-gray-400"
                    : textprogressColor[strengthScore - 1]
                }`}
              >
                {strengthLabel[strengthScore - 1] || "Sangat Lemah"}
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Konfirmasi kata sandi<span className="text-red-500">*</span>
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 w-full">
                    <div className="relative">
                      <input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => {
                          field.onChange(e); // <-- update react-hook-form
                          setConfirmPassword(e.target.value); // <-- update local state
                        }}
                        placeholder="Konfirmasi kata sandi"
                      />
                      <button
                        type="button"
                        className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Validation Rules */}
            <ul className="mt-2 space-y-1 text-xs">
              <li
                className={
                  hasLowerAndUpperCase ? "text-green-600" : "text-red-500"
                }
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {hasLowerAndUpperCase ? (
                  <CircleCheck size={16} />
                ) : (
                  <CircleX size={16} />
                )}
                1 huruf kecil & huruf kapital
              </li>
              <li
                className={
                  hasNumericCharacter ? "text-green-600" : "text-red-500"
                }
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {hasNumericCharacter ? (
                  <CircleCheck size={16} />
                ) : (
                  <CircleX size={16} />
                )}
                1 angka (0–9)
              </li>
              <li
                className={
                  isSpecialCharacterValid ? "text-green-600" : "text-red-500"
                }
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {isSpecialCharacterValid ? (
                  <CircleCheck size={16} />
                ) : (
                  <CircleX size={16} />
                )}
                Karakter khusus (yang tidak diizinkan: / \ &quot; &apos; )
              </li>
              <li
                className={
                  meetsMinimumLength ? "text-green-600" : "text-red-500"
                }
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {meetsMinimumLength ? (
                  <CircleCheck size={16} />
                ) : (
                  <CircleX size={16} />
                )}
                Minimal 8 karakter
              </li>
            </ul>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded bg-red-600 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isPendingRegister ? (
                <Spinner
                  classNames={{ label: "text-foreground mt-4" }}
                  label="simple"
                  variant="simple"
                />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
