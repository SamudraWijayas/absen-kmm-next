// "use client";

// import { useRef, useState, useEffect, ReactNode } from "react";

// interface BottomSheetProps {
//   children: ReactNode;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;

//   initialHeight?: number;
//   snapPoints?: number[];
//   title?: string;
//   onClose?: () => void;
// }

// const BottomSheet = ({
//   children,
//   open,
//   onOpenChange,
//   initialHeight = 50,
//   snapPoints = [25, 50, 75, 100],
//   title = "title",
//   onClose,
// }: BottomSheetProps) => {
//   const [height, setHeight] = useState(initialHeight);
//   const [isDragging, setIsDragging] = useState(false);

//   const isTouching = useRef(false);
//   const startY = useRef(0);
//   const startHeight = useRef(initialHeight);
//   const dragSource = useRef<"header" | "content" | null>(null);
//   const frame = useRef<number | null>(null);

//   const DRAG_THRESHOLD = 10;

//   const contentRef = useRef<HTMLDivElement>(null);

//   // ✅ sync open
//   useEffect(() => {
//     if (open) {
//       requestAnimationFrame(() => setHeight(initialHeight));
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [open, initialHeight]);

//   // ✅ CLOSE
//   const hideBottomSheet = () => {
//     onOpenChange(false);
//     document.body.style.overflow = "auto";
//     onClose?.();

//     if (window.history.state?.bottomSheet) {
//       setTimeout(() => window.history.back(), 0);
//     }
//   };

//   // ✅ START DRAG
//   const dragStart = (e: any, source: "header" | "content") => {
//     dragSource.current = source;
//     isTouching.current = true;
//     startY.current = e.pageY || e.touches?.[0].pageY;
//     startHeight.current = height;
//   };

//   // ✅ cek drag dari content
//   const canDragFromContent = (deltaY: number) => {
//     const el = contentRef.current;
//     if (!el) return true;

//     const isAtTop = el.scrollTop <= 0;

//     // hanya boleh drag ke bawah saat scroll di paling atas
//     return deltaY < 0 && isAtTop;
//   };

//   // ✅ DRAG MOVE + SNAP (RAF FIX)
//   useEffect(() => {
//     const handleMove = (e: any) => {
//       if (!isTouching.current) return;

//       const currentY = e.pageY || e.touches?.[0].pageY;
//       const delta = startY.current - currentY;

//       if (!isDragging) {
//         if (Math.abs(delta) < DRAG_THRESHOLD) return;

//         if (dragSource.current === "content") {
//           if (!canDragFromContent(delta)) return;
//         }

//         setIsDragging(true);
//       }

//       const newHeight =
//         startHeight.current + (delta / window.innerHeight) * 100;

//       // 🔥 RAF biar smooth
//       if (frame.current) cancelAnimationFrame(frame.current);

//       frame.current = requestAnimationFrame(() => {
//         setHeight(Math.max(0, Math.min(100, newHeight)));
//       });
//     };

//     const handleUp = () => {
//       if (!isTouching.current) return;

//       isTouching.current = false;

//       if (!isDragging) return;

//       setIsDragging(false);

//       let shouldClose = false;

//       setHeight((prev) => {
//         if (prev < 20) {
//           shouldClose = true;
//           return prev;
//         }

//         const closest = snapPoints.reduce((p, c) =>
//           Math.abs(c - prev) < Math.abs(p - prev) ? c : p,
//         );

//         return closest;
//       });

//       // ✅ pindahin ke luar
//       if (shouldClose) {
//         hideBottomSheet();
//       }
//     };

//     document.addEventListener("mousemove", handleMove);
//     document.addEventListener("mouseup", handleUp);
//     document.addEventListener("touchmove", handleMove);
//     document.addEventListener("touchend", handleUp);

//     document.body.style.userSelect = isDragging ? "none" : "auto";

//     return () => {
//       document.removeEventListener("mousemove", handleMove);
//       document.removeEventListener("mouseup", handleUp);
//       document.removeEventListener("touchmove", handleMove);
//       document.removeEventListener("touchend", handleUp);

//       if (frame.current) cancelAnimationFrame(frame.current);

//       document.body.style.userSelect = "auto";
//     };
//   }, [isDragging, snapPoints]);

//   // ✅ BACK BUTTON
//   useEffect(() => {
//     if (!open) return;

//     window.history.pushState({ bottomSheet: true }, "");

//     const handlePopState = () => {
//       setTimeout(() => {
//         onOpenChange(false);
//         document.body.style.overflow = "auto";
//         onClose?.();
//       }, 0);
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [onClose, onOpenChange, open]);

//   return (
//     <div
//       className={`fixed inset-0 z-50 transition ${
//         open
//           ? "opacity-100 pointer-events-auto"
//           : "opacity-0 pointer-events-none"
//       }`}
//     >
//       {/* BACKDROP */}
//       <div onClick={hideBottomSheet} className="absolute inset-0 bg-black/30" />

//       {/* SHEET */}
//       <div
//         style={{
//           height: `${height}vh`,
//           transform: open ? "translate3d(0,0,0)" : "translate3d(0,100%,0)",
//         }}
//         className={`absolute bottom-0 left-0 w-full flex flex-col bg-white dark:bg-black rounded-t-2xl shadow-xl will-change-transform transition-[height,transform] duration-300 ${
//           isDragging ? "transition-none" : ""
//         } ${height === 100 ? "rounded-none" : ""}`}
//       >
//         {/* HEADER */}
//         <div
//           onMouseDown={(e) => dragStart(e, "header")}
//           onTouchStart={(e) => dragStart(e, "header")}
//           className="relative flex flex-col items-center py-4 px-6 cursor-grab active:cursor-grabbing select-none"
//         >
//           <div className="w-10 h-1 bg-gray-300 rounded-full mb-3" />

//           <div className="flex justify-between w-full">
//             {title && (
//               <h2 className="text-md font-semibold text-center text-black dark:text-white">
//                 {title}
//               </h2>
//             )}
//             {/* 🔥 CLOSE BUTTON */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation(); // biar gak trigger drag
//                 hideBottomSheet();
//               }}
//               className=" text-black dark:text-white font-semibold text-xl cursor-pointer"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//         {/* <div
//           onMouseDown={(e) => dragStart(e, "header")}
//           onTouchStart={(e) => dragStart(e, "header")}
//           className="relative flex flex-col items-center py-4 px-6 cursor-grab active:cursor-grabbing select-none"
//         >
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               hideBottomSheet();
//             }}
//             className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl cursor-pointer"
//           >
//             ✕
//           </button>

//           <div className="w-10 h-1 bg-gray-300 rounded-full mb-3" />

//           {title && (
//             <h2 className="text-md font-semibold text-center text-gray-700">
//               {title}
//             </h2>
//           )}
//         </div> */}

//         {/* CONTENT */}
//         <div
//           ref={contentRef}
//           onMouseDown={(e) => dragStart(e, "content")}
//           onTouchStart={(e) => dragStart(e, "content")}
//           style={{
//             touchAction: isDragging ? "none" : "auto",
//           }}
//           className="flex-1 overflow-y-auto px-6 pb-10 min-h-0 overscroll-contain"
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BottomSheet;
