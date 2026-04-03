// useFcm.ts
import { useEffect } from "react";
import { getFcmToken } from "./getFcmToken";
import apiServices from "@/service/api.service";
import { useSession } from "next-auth/react";

const useFcm = () => {
  const { status } = useSession();

  useEffect(() => {
    const isLoggedIn = status === "authenticated";
    if (!isLoggedIn) return;

    const init = async () => {
      try {
        if (!("serviceWorker" in navigator)) return;

        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
        );

        const token = await getFcmToken(registration);

        if (!token) {
          console.warn("Token FCM tidak didapat");
          return;
        }

        const res = await apiServices.saveFcmToken({ token });

        if (res.status !== 200) {
          console.error("Gagal simpan token:", res.data);
        } else {
          console.log("Token FCM berhasil disimpan:", token);
        }
      } catch (err) {
        console.error("Error saat ambil/simpan token FCM:", err);
      }
    };

    init();
  }, [status]);
};

export default useFcm;
