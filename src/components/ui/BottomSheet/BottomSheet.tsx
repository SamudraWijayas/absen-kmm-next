"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface BottomSheetProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;

  initialHeight?: number;
  snapPoints?: number[];
  title?: string;
  onClose?: () => void;
}

const BottomSheet = ({
  children,
  open,
  onOpenChange,
  initialHeight = 50,
  snapPoints = [25, 50, 75, 100],
  title = "title",
  onClose,
}: BottomSheetProps) => {
  const [height, setHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);

  const isTouching = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(initialHeight);
  const dragSource = useRef<"header" | "content" | null>(null);

  const DRAG_THRESHOLD = 10;

  const contentRef = useRef<HTMLDivElement>(null);

  // ✅ sync open
  useEffect(() => {
    if (open) {
      setHeight(initialHeight);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open, initialHeight]);

  // ✅ CLOSE
  const hideBottomSheet = () => {
    onOpenChange(false);
    document.body.style.overflow = "auto";
    onClose?.();

    if (window.history.state?.bottomSheet) {
      setTimeout(() => {
        window.history.back();
      }, 0);
    }
  };

  // ✅ START DRAG (beda source)
  const dragStart = (e: any, source: "header" | "content") => {
    dragSource.current = source;
    isTouching.current = true;
    startY.current = e.pageY || e.touches?.[0].pageY;
    startHeight.current = height;
  };

  // ✅ cek drag dari content
  const canDragFromContent = (deltaY: number) => {
    const el = contentRef.current;
    if (!el) return true;

    const isAtTop = el.scrollTop <= 0;

    return deltaY < 0 && isAtTop;
  };

  // ✅ DRAG MOVE + SNAP
  useEffect(() => {
    const handleMove = (e: any) => {
      if (!isTouching.current) return;

      const currentY = e.pageY || e.touches?.[0].pageY;
      const delta = startY.current - currentY;

      if (!isDragging) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return;

        // 🔥 logic utama
        if (dragSource.current === "content") {
          if (!canDragFromContent(delta)) return;
        }

        setIsDragging(true);
      }

      const newHeight =
        startHeight.current + (delta / window.innerHeight) * 100;

      setHeight(Math.max(0, Math.min(100, newHeight)));
    };

    const handleUp = () => {
      if (!isTouching.current) return;

      isTouching.current = false;

      if (!isDragging) return;

      setIsDragging(false);

      setHeight((prev) => {
        if (prev < 20) {
          hideBottomSheet();
          return prev;
        }

        const closest = snapPoints.reduce((p, c) =>
          Math.abs(c - prev) < Math.abs(p - prev) ? c : p,
        );

        return closest;
      });
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleUp);

    document.body.style.userSelect = isDragging ? "none" : "auto";

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.body.style.userSelect = "auto";
    };
  }, [isDragging, snapPoints]);

  // ✅ BACK BUTTON
  useEffect(() => {
    if (!open) return;

    window.history.pushState({ bottomSheet: true }, "");

    const handlePopState = () => {
      setTimeout(() => {
        onOpenChange(false);
        document.body.style.overflow = "auto";
        onClose?.();
      }, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* BACKDROP */}
      <div onClick={hideBottomSheet} className="absolute inset-0 bg-black/30" />

      {/* SHEET */}
      <div
        style={{
          height: `${height}vh`,
          transform: open ? "translateY(0%)" : "translateY(100%)",
        }}
        className={`absolute bottom-0 left-0 w-full flex flex-col bg-white rounded-t-2xl shadow-xl transition-all duration-300 ${
          isDragging ? "transition-none" : ""
        } ${height === 100 ? "rounded-none" : ""}`}
      >
        {/* HEADER (always drag) */}
        <div
          onMouseDown={(e) => dragStart(e, "header")}
          onTouchStart={(e) => dragStart(e, "header")}
          className="flex flex-col items-center py-4 px-6 cursor-grab active:cursor-grabbing"
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-3" />

          {title && (
            <h2 className="text-md font-semibold text-center text-gray-700">
              {title}
            </h2>
          )}
        </div>

        {/* CONTENT */}
        <div
          ref={contentRef}
          onMouseDown={(e) => dragStart(e, "content")}
          onTouchStart={(e) => dragStart(e, "content")}
          className="flex-1 overflow-y-auto px-6 pb-10 min-h-0 overscroll-contain"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
