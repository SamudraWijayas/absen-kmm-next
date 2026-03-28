"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

type ToasterType = "success" | "error" | "info" | "warning";

interface ToasterProps {
  type: ToasterType;
  message: string;
  show: boolean;
  onClose?: () => void;
}

export const ToasterStandalone = ({
  type,
  message,
  show,
  onClose,
}: ToasterProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show) {
      // Hapus timer lama
      if (timerRef.current) clearTimeout(timerRef.current);

      // Set auto-close timer
      timerRef.current = setTimeout(() => {
        onClose?.();
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="text-green-500" size={22} />;
      case "error":
        return <XCircle className="text-red-500" size={22} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={22} />;
      default:
        return <Info className="text-blue-500" size={22} />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="toaster"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-1/2 w-[90%] max-w-sm transform -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white z-9999"
        >
          {getIcon()}
          <p className="font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
