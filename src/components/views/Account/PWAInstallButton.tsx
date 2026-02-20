"use client";

import { Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function PWAInstallButton() {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();

  // Don't show button if already installed or not installable
  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <button className="flex gap-2 items-center cursor-pointer">
      <Download size={20} />
      Instal App
      <span className="text-sm"></span>
    </button>
  );
}
