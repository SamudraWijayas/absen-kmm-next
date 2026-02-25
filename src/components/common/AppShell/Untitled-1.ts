// "use client";

// import { ToastProvider } from "@heroui/toast";
// import { addToast } from "@heroui/react";
// import { defaultToaster, ToasterContext } from "@/contexts/ToasterContext";
// import { ReactNode, useContext, useEffect } from "react";
// import PWAInstallButton from "@/components/ui/PWAInstallButton";

// interface PropTypes {
//   children: ReactNode;
// }

// const AppShell = ({ children }: PropTypes) => {
//   const { toaster, setToaster } = useContext(ToasterContext);

//   useEffect(() => {
//     if (toaster.type !== "" && toaster.message) {
//       console.log("AppShell: Calling addToast with:", toaster);
//       addToast({
//         title:
//           toaster.type === "success"
//             ? "Berhasil"
//             : toaster.type === "error"
//               ? "Gagal"
//               : "Info",
//         description: toaster.message,
//         color:
//           toaster.type === "success"
//             ? "success"
//             : toaster.type === "error"
//               ? "danger"
//               : "primary",
//         variant: "flat",
//       });

//       const timeout = setTimeout(() => {
//         setToaster(defaultToaster);
//       }, 3000);

//       return () => clearTimeout(timeout);
//     }
//   }, [toaster, setToaster]);

//   return (
//     <main>
//       <ToastProvider placement="top-right" />
//       <div className="fixed bottom-4 right-4 z-50">
//         <PWAInstallButton />
//       </div>
//       {children}
//     </main>
//   );
// };

// export default AppShell;
