"use client";

import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="flex flex-col items-center justify-center">
          {/* <Image
                  src="/images/general/logo.svg"
                  alt="logo"
                  width={180}
                  height={180}
                /> */}
          <Image
            src={
              status === "success"
                ? "/images/illustrations/activation-success.jpg"
                : "/images/illustrations/activation-failed.jpg"
            }
            alt="success"
            width={300}
            height={300}
          />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold text-gray-800 capitalize">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h2>

        {/* Subtitle */}
        <p className="mb-6 text-gray-500">
          {status === "success"
            ? "Thank you for register account in Acara"
            : "Confirmation code is invalid"}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            className="bg-primary rounded-lg px-6 py-2 font-medium text-white transition hover:bg-blue-800 w-full"
            onClick={() => router.push("/")}
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activation;
