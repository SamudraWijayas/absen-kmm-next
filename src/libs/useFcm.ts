"use client";

import { useEffect } from "react";
import { getFcmToken } from "./getFcmToken";
import apiServices from "@/service/api.service";
import { useSession } from "next-auth/react";

const useFcm = () => {
  const { status } = useSession();

  useEffect(() => {
    console.log(`[FCM] Status: ${status}`);

    if (typeof window === "undefined") return;

    const isLoggedIn = status === "authenticated";
    console.log(`[FCM] Logged in: ${isLoggedIn}`);

    if (!isLoggedIn) {
      console.log("[FCM] Skip - not authenticated");
      return;
    }

    const init = async () => {
      try {
        console.log("[FCM] Requesting FCM token...");
        // 1️⃣ Ambil token FCM
        const token = await getFcmToken();

        if (!token) {
          console.warn("[FCM] No token obtained - check permission/SW");
          return;
        }

        console.log(`[FCM] Token obtained: ${token.substring(0, 20)}...`);

        // 2️⃣ Simpan token ke backend
        console.log("[FCM] Saving token to backend...");
        const res = await apiServices.saveFcmToken({ token });

        console.log(`[FCM] API response: ${res.status}`, res.data);

        if (res.status !== 200) {
          console.error(`[FCM] Failed to save: ${res.status}`, res.data);
        } else {
          console.log("✅ [FCM] Token saved successfully!");
        }
      } catch (err) {
        console.error("[FCM] Error:", err);
      }
    };

    init();
  }, [status]);
};

export default useFcm;
