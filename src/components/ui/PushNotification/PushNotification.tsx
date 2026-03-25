// "use client";
// import { subscribePush } from "@/libs/push";
// import { useEffect } from "react";

// export default function PushNotification({
//   userId,
// }: {
//   userId: number | null;
// }) {
//   useEffect(() => {
//     async function init() {
//       if (!userId) return;

//       if ("serviceWorker" in navigator) {
//         await navigator.serviceWorker.register("/sw.js");
//         console.log("Service Worker registered");

//         await subscribePush(); // ✅ panggil tanpa parameter
//       }
//     }
//     init();
//   }, [userId]);

//   return null;
// }
