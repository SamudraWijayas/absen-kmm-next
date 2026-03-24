// "use client";

// import { useRef, useState, useEffect, ReactNode } from "react";

// interface PropTypes {
//   children: ReactNode;
// }

// export default function BottomSheet() {
//   const [show, setShow] = useState(false);
//   const [height, setHeight] = useState(50);
//   const [isDragging, setIsDragging] = useState(false);

//   const startY = useRef(0);
//   const startHeight = useRef(50);

//   const showBottomSheet = () => {
//     setShow(true);
//     document.body.style.overflow = "hidden";
//     setHeight(50);
//   };

//   const hideBottomSheet = () => {
//     setShow(false);
//     document.body.style.overflow = "auto";
//   };

//   const dragStart = (e: any) => {
//     setIsDragging(true);
//     startY.current = e.pageY || e.touches?.[0].pageY;
//     startHeight.current = height;
//   };

//   // 🔥 HANDLE DRAG GLOBAL (FIX UTAMA)
//   useEffect(() => {
//     const handleMove = (e: any) => {
//       if (!isDragging) return;

//       const currentY = e.pageY || e.touches?.[0].pageY;
//       const delta = startY.current - currentY;

//       const newHeight =
//         startHeight.current + (delta / window.innerHeight) * 100;

//       setHeight(Math.max(0, Math.min(100, newHeight)));
//     };

//     const handleUp = () => {
//       if (!isDragging) return;

//       setIsDragging(false);

//       setHeight((prev) => {
//         // kalau terlalu bawah → close
//         if (prev < 20) {
//           hideBottomSheet();
//           return prev;
//         }

//         const snapPoints = [25, 50, 60, 75, 85, 100];

//         // cari snap terdekat
//         const closest = snapPoints.reduce((p, c) =>
//           Math.abs(c - prev) < Math.abs(p - prev) ? c : p,
//         );

//         return closest;
//       });
//     };

//     document.addEventListener("mousemove", handleMove);
//     document.addEventListener("mouseup", handleUp);

//     document.addEventListener("touchmove", handleMove);
//     document.addEventListener("touchend", handleUp);

//     // 🔥 biar gak select text pas drag
//     document.body.style.userSelect = isDragging ? "none" : "auto";

//     return () => {
//       document.removeEventListener("mousemove", handleMove);
//       document.removeEventListener("mouseup", handleUp);

//       document.removeEventListener("touchmove", handleMove);
//       document.removeEventListener("touchend", handleUp);

//       document.body.style.userSelect = "auto";
//     };
//   }, [isDragging]);

//   return (
//     <>
//       {/* BUTTON */}
//       <button
//         onClick={showBottomSheet}
//         className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition"
//       >
//         Show Bottom Sheet
//       </button>

//       {/* OVERLAY */}
//       <div
//         className={`fixed inset-0 z-50 transition ${
//           show
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {/* BACKDROP */}
//         <div
//           onClick={hideBottomSheet}
//           className="absolute inset-0 bg-black/30"
//         />

//         {/* SHEET */}
//         <div
//           style={{
//             height: `${height}vh`,
//             transform: show ? "translateY(0%)" : "translateY(100%)",
//           }}
//           className={`absolute bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-xl transition-all duration-300 ${
//             isDragging ? "transition-none" : ""
//           } ${height === 100 ? "rounded-none" : ""}`}
//         >
//           {/* DRAG HANDLE */}
//           <div
//             onMouseDown={dragStart}
//             onTouchStart={dragStart}
//             className="flex justify-center py-4 cursor-grab active:cursor-grabbing"
//           >
//             <div className="w-10 h-1 bg-gray-300 rounded-full" />
//           </div>

//           {/* CONTENT */}
//           <div className="h-full overflow-y-auto px-6 pb-10">
//             <h2 className="text-2xl font-semibold">Bottom Sheet Modal</h2>

//             <p className="mt-4 text-gray-600">
//               Sekarang drag harus klik dulu baru jalan (fix seperti native app).
//             </p>

//             {[...Array(10)].map((_, i) => (
//               <p key={i} className="mt-4 text-gray-600">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Repellat quae facere, quaerat deleniti.
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
