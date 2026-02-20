"use client";
import React, { useState } from "react";
import { Input, Button, Spinner } from "@heroui/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import useUpdatePassword from "./useUpdatPassword";
import { Controller } from "react-hook-form";

const UpdatePassword = () => {
  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,
    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  } = useUpdatePassword();

  // 👇 state berbeda untuk tiap input
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-black/20 px-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <div className="p-3 bg-primary/10 rounded-full mb-3">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Ubah Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
          Pastikan password baru kamu kuat dan mudah diingat.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
        className="w-full max-w-sm flex flex-col gap-5"
      >
        {/* Password Lama */}
        <Controller
          name="oldPassword"
          control={controlUpdatePassword}
          render={({ field }) => (
            <Input
              {...field}
              label="Password Lama"
              type={showOld ? "text" : "password"}
              placeholder="Masukkan password lama"
              radius="sm"
              variant="bordered"
              labelPlacement="outside"
              isInvalid={!!errorsUpdatePassword.oldPassword}
              errorMessage={errorsUpdatePassword.oldPassword?.message}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="focus:outline-none"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          )}
        />

        {/* Password Baru */}
        <Controller
          name="password"
          control={controlUpdatePassword}
          render={({ field }) => (
            <Input
              {...field}
              label="Password Baru"
              type={showNew ? "text" : "password"}
              placeholder="Masukkan password baru"
              radius="sm"
              variant="bordered"
              labelPlacement="outside"
              isInvalid={!!errorsUpdatePassword.password}
              errorMessage={errorsUpdatePassword.password?.message}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="focus:outline-none"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          )}
        />

        {/* Konfirmasi Password */}
        <Controller
          name="confirmPassword"
          control={controlUpdatePassword}
          render={({ field }) => (
            <Input
              {...field}
              label="Konfirmasi Password Baru"
              type={showConfirm ? "text" : "password"}
              placeholder="Ulangi password baru"
              labelPlacement="outside"
              radius="sm"
              variant="bordered"
              isInvalid={!!errorsUpdatePassword.confirmPassword}
              errorMessage={errorsUpdatePassword.confirmPassword?.message}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="focus:outline-none"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          )}
        />

        <Button
          type="submit"
          color="primary"
          className="mt-4 w-full"
          disabled={isPendingMutateUpdatePassword}
        >
          {isPendingMutateUpdatePassword ? (
            <Spinner size="sm" color="white" />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
