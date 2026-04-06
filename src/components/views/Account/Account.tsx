"use client";

import { ThemeSwitcher } from "../../ThemeSwitcher/ThemeSwitcher";
import Image from "next/image";
import { User, Lock, LogOut, Info, Bell } from "lucide-react";
import Link from "next/link";
import useProfile from "@/hooks/useProfile";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@heroui/react";
import PWAInstallButton from "./PWAInstallButton";
import LandingPageFooter from "@/components/layouts/LandingPageLayout/LandingPageFooter";
import AdBanner from "@/components/ui/AdSense/AdBanner";
import { useState } from "react";

const getNotificationPermission = ():
  | NotificationPermission
  | "unsupported" => {
  if (typeof window === "undefined") return "default";
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission;
};

const Account = () => {
  const { dataProfile } = useProfile();
  const session = useSession();
  const isLoadingSession = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";

  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >(getNotificationPermission);

  const isHttps =
    typeof window !== "undefined" &&
    (window.location.protocol === "https:" ||
      window.location.hostname === "localhost");

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) return;

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  if (isLoadingSession) {
    return (
      <div className="px-4 pt-17.5 min-h-screen bg-white dark:bg-black/10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-32 h-4 rounded-lg" />
              <Skeleton className="w-24 h-3 rounded-lg" />
            </div>
          </div>
        </div>

        <LandingPageFooter />
      </div>
    );
  }

  return (
    <div className="px-4 pt-17.5 min-h-screen bg-white dark:bg-black/10 flex flex-col justify-between">
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Image
              src={dataProfile?.foto ? dataProfile.foto : "/profil.jpg"}
              width={200}
              height={200}
              alt="profile"
              className="w-16 h-16 object-cover rounded-full"
            />

            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{dataProfile?.nama}</h1>
              <span className="text-sm text-gray-600">
                {dataProfile?.desa.name}
              </span>
            </div>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Login
          </Link>
        )}

        <ThemeSwitcher />

        <div className="pt-4 flex flex-col gap-3">
          <span className="text-gray-600 dark:text-gray-500 font-medium">
            Lainnya
          </span>

          <div className="flex flex-col gap-5">
            {isAuthenticated && (
              <>
                <Link href="/profile" className="flex gap-2 items-center">
                  <User size={20} />
                  <span className="text-sm">Kelola Profile</span>
                </Link>

                <Link
                  href="/update-password"
                  className="flex gap-2 items-center"
                >
                  <Lock size={20} />
                  <span className="text-sm">Ubah Password</span>
                </Link>
              </>
            )}

            <Link href="/feedback" className="flex gap-2 items-center">
              <Info size={20} />
              <span className="text-sm">Feedback & Support</span>
            </Link>

            {/* 🔔 Notification Section */}
            <div className="flex flex-col gap-2">
              {!isHttps && (
                <span className="text-xs text-red-500">
                  Notifikasi hanya tersedia di HTTPS
                </span>
              )}

              {notificationPermission === "unsupported" && (
                <span className="text-sm text-gray-500">
                  Browser tidak mendukung notifikasi
                </span>
              )}

              {notificationPermission === "default" && isHttps && (
                <button
                  onClick={requestNotificationPermission}
                  className="flex gap-2 items-center text-blue-600 cursor-pointer"
                >
                  <Bell size={20} />
                  <span className="text-sm">Aktifkan Notifikasi</span>
                </button>
              )}

              {notificationPermission === "denied" && (
                <span className="text-sm text-red-500">
                  Notifikasi diblokir. Aktifkan di pengaturan browser.
                </span>
              )}

              {notificationPermission === "granted" && (
                <span className="flex gap-2 items-center text-green-600 text-sm">
                  <Bell size={20} />
                  Notifikasi sudah aktif
                </span>
              )}
            </div>

            <PWAInstallButton />

            {isAuthenticated && (
              <button
                className="flex gap-2 items-center text-red-600 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                <LogOut />
                <span className="text-sm">Keluar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full min-h-25 mt-10">
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="4840458474"
        />
      </div>

      <LandingPageFooter />
    </div>
  );
};

export default Account;
