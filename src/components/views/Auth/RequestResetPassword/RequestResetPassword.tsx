"use client";

import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import useRequestResetPassword from "./useRequestResetPassword";
import { Controller } from "react-hook-form";
import { Button, Spinner } from "@heroui/react";

const RequestResetPassword = () => {
  const {
    control,
    handleRequestReset,
    handleSubmit,
    errors,
    isPendingMutateRequestReset,
  } = useRequestResetPassword();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-purple-100 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14v7m0 0H7m5 0h5"
              />
            </svg>
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-semibold">Forgot password?</h2>
        <p className="mb-6 text-gray-500">
          No worries, well send you reset instructions.
        </p>

        <form onSubmit={handleSubmit(handleRequestReset)} className="space-y-4">
          <div>
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
          <Button color="primary" type="submit" className="font-semibold">
            {isPendingMutateRequestReset ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Atur Ulang Kata Sandi"
            )}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 flex items-center justify-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back to log in
        </button>
      </div>
    </div>
  );
};

export default RequestResetPassword;
