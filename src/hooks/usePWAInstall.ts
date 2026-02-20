"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Extend Navigator type for iOS standalone
interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as NavigatorStandalone).standalone === true;

      setIsInstalled(isStandalone);
    };

    checkInstalled();

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return {
    isInstallable,
    isInstalled,
    installApp,
  };
}

// "use client";

// import { useState, useEffect } from "react";

// interface BeforeInstallPromptEvent extends Event {
//   prompt: () => Promise<void>;
//   userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
// }

// export function usePWAInstall() {
//   const [deferredPrompt, setDeferredPrompt] =
//     useState<BeforeInstallPromptEvent | null>(null);
//   const [isInstalled, setIsInstalled] = useState(false);
//   const [isInstallable, setIsInstallable] = useState(false);

//   useEffect(() => {
//     // Check if the app is already installed
//     const checkInstalled = () => {
//       if (window.matchMedia("(display-mode: standalone)").matches) {
//         setIsInstalled(true);
//       }
//     };

//     checkInstalled();

//     // Listen for beforeinstallprompt event
//     const handleBeforeInstallPrompt = (e: Event) => {
//       e.preventDefault();
//       setDeferredPrompt(e as BeforeInstallPromptEvent);
//       setIsInstallable(true);
//     };

//     // Listen for appinstalled event
//     const handleAppInstalled = () => {
//       setIsInstalled(true);
//       setIsInstallable(false);
//       setDeferredPrompt(null);
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     window.addEventListener("appinstalled", handleAppInstalled);

//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt,
//       );
//       window.removeEventListener("appinstalled", handleAppInstalled);
//     };
//   }, []);

//   const installApp = async () => {
//     if (!deferredPrompt) return;

//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;

//     if (outcome === "accepted") {
//       setIsInstalled(true);
//     }

//     setDeferredPrompt(null);
//     setIsInstallable(false);
//   };

//   return {
//     isInstallable,
//     isInstalled,
//     installApp,
//   };
// }
