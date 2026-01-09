"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";


const RegisterSuccess = () => {
const router = useRouter()
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Akun Berhasil Dibuat!
        </h2>
        <p className="mb-6 text-gray-600">
          Silakan cek email kamu untuk melakukan aktivasi akun. Pastikan juga
          untuk memeriksa folder spam jika tidak menemukan email aktivasi.
        </p>
        <button
        className="inline-block rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
        onClick={() => router.push("/")}
      >
        Back To Home
      </button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
