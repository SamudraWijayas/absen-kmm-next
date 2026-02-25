"use client";

import React, { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Image as ImageIcon, Zap, RefreshCcw, QrCode } from "lucide-react";
import useScanAbsen from "./useScanAbsen";

const ScanAbsen = () => {
  const [result, setResult] = useState<string | null>(null);
  const { handleScan, isScanning } = useScanAbsen();
  

  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );

  const touchStartX = useRef<number | null>(null);

  // swipe gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(diff) > 50) {
      setFacingMode((prev) =>
        prev === "environment" ? "user" : "environment",
      );
    }

    touchStartX.current = null;
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full max-w-md mx-auto bg-white dark:bg-black/10 text-black dark:text-white overflow-hidden">
  
      {/* Area Scanner */}

      <div
        className="relative w-72 h-72  rounded-3xl overflow-hidden shadow-lg bg-black"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        <Scanner
          onScan={(result) => {
            if (!result || result.length === 0 || isScanning) return;
            const text = result[0].rawValue;
            setResult(text);
            handleScan(text);
          }}
          onError={(error) => {
            console.error(error);
          }}
          constraints={{ facingMode }}
          classNames={{
            container: "w-full h-full",
            video: "w-full h-full object-cover",
          }}
        />

        {/* Scan line glow */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-white to-transparent animate-scan" />

        {/* Corner frame */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
        </div> */}

        {/* Swipe Hint */}
        <div className="absolute bottom-2 w-full text-center text-xs text-white/70">
          Swipe untuk ganti kamera
        </div>
      </div>

      {/* Status */}
      <p className="mt-8 text-sm text-gray-500">
        {isScanning
          ? "⏳ Memproses absensi..."
          : result
            ? "✅ QR berhasil terbaca"
            : "Arahkan kamera ke QR kegiatan"}
      </p>

      {/* Tombol bawah */}
      <div className="absolute bottom-10 flex items-center justify-center gap-8 bg-white shadow-lg px-6 py-3 rounded-full border border-gray-200 z-10">
        {/* Switch Camera */}
        <button
          onClick={() =>
            setFacingMode((prev) =>
              prev === "environment" ? "user" : "environment",
            )
          }
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <RefreshCcw size={22} />
        </button>
        {/* 
        <button className="p-3 bg-black text-white rounded-full shadow-md">
          <Camera size={22} />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <ImageIcon size={22} />
        </button> */}
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
          }
          50% {
            top: 95%;
          }
          100% {
            top: 0%;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScanAbsen;
