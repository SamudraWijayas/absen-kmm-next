"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import useResetPassword from "./useResetPassword";
import { Eye, EyeOff } from "lucide-react";
import { Button, Spinner } from "@heroui/react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleResetPassword,
    handleSubmit,
    errors,
    isPendingMutateResetPassword,
  } = useResetPassword();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your password reset pin and set a new password
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
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
                      placeholder="New password"
                    />
                    <button
                      type="button"
                      className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
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

          <Button
            color="primary"
            type="submit"
            className="w-full font-semibold"
          >
            {isPendingMutateResetPassword ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Verify Us: CPA Firm License #11743{" "}
          <a
            href="http://www.op.nysed.gov/opsearches.htm"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            http://www.op.nysed.gov/opsearches.htm
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
