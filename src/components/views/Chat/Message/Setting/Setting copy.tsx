// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "@heroui/react";
// import { Check, ChevronLeft, Pencil, UserRoundPlus, X } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import useSetting from "./useSetting";
// import { Controller } from "react-hook-form";
// import { IParticipant } from "@/types/Chat";
// import useProfile from "@/hooks/useProfile";

// interface PropTypes {
//   isOpen: boolean;
//   onClose: () => void;
//   onOpenChange: () => void;
//   activeTheme: string;
//   setActiveTheme: (theme: string) => void;
//   chatName: string;
//   photoSrc: string;
//   conversation: boolean | undefined;
//   refetchConversation: () => void;
//   participants?: IParticipant[];
//   createdById?: number;
// }

// // Tema sekarang semua pakai image
// const themes = [
//   {
//     key: "default",
//     label: "Default",
//     image: "/images/bg-chat/tema-default.png",
//   },
//   { key: "wa", label: "Tema WA", image: "/images/bg-chat/tema-wa.png" },
//   {
//     key: "kaktus",
//     label: "Tema Kaktus",
//     image: "/images/bg-chat/tema-kaktus.png",
//   },
//   {
//     key: "lemon",
//     label: "Tema Lemon",
//     image: "/images/bg-chat/tema-lemon.png",
//   },
//   {
//     key: "kaktus2",
//     label: "Tema Kaktus 2",
//     image: "/images/bg-chat/tema-kaktus-2.png",
//   },
//   {
//     key: "kucing",
//     label: "Tema Kucing",
//     image: "/images/bg-chat/tema-kucing.png",
//   },
//   {
//     key: "hokage",
//     label: "Tema Hokage",
//     image: "/images/bg-chat/tema-hokage.png",
//   },
//   {
//     key: "naruto",
//     label: "Tema Naruto",
//     image: "/images/bg-chat/tema-naruto.png",
//   },
//   {
//     key: "totoro",
//     label: "Tema Totoro",
//     image: "/images/bg-chat/tema-totoro.png",
//   },
//   {
//     key: "rilakuma",
//     label: "Tema Rilakuma",
//     image: "/images/bg-chat/tema-rilakuma.png",
//   },
// ];

// const Setting = ({
//   isOpen,
//   onClose,
//   onOpenChange,
//   activeTheme,
//   setActiveTheme,
//   chatName,
//   photoSrc,
//   conversation,
//   refetchConversation,
//   participants,
//   createdById,
// }: PropTypes) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [view, setView] = useState<"main" | "addMember">("main");
//   const {
//     control,
//     handleSubmitForm,
//     setValueUpdateGrup,
//     watch,
//     isPendingMutateUpdateGrup,
//     isSuccessMutateUpdateGrup,
//     handleUpdateGrup,

//     handleDeletePicture,
//     handleUploadPicture,
//     isPendingMutateDeleteFile,
//     isPendingMutateUploadFile,

//     controlUpdatePicture,
//     errorsUpdatePicture,
//     handleSubmitUpdatePicture,
//     resetUpdatePicture,
//     setValueUpdatePicture,

//     preview,
//   } = useSetting();
//   const { dataProfile, refetchProfile } = useProfile();
//   const currentUserId = dataProfile?.id;
//   const isAdmin = currentUserId === createdById;

//   useEffect(() => {
//     if (isSuccessMutateUpdateGrup) {
//       refetchConversation();
//     }
//   }, [isSuccessMutateUpdateGrup, refetchConversation]);

//   useEffect(() => {
//     setValueUpdateGrup("name", chatName);
//   }, [chatName, setValueUpdateGrup]);

//   const inputFileRef = useRef<HTMLInputElement | null>(null);

//   const triggerFileSelect = () => {
//     inputFileRef.current?.click();
//   };

//   const onSelectNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     handleUploadPicture(files, () => {
//       refetchConversation();
//     });
//   };
//   useEffect(() => {
//     if (isSuccessMutateUpdateGrup) {
//       resetUpdatePicture();
//       refetchConversation();
//     }
//   }, [isSuccessMutateUpdateGrup, refetchConversation, resetUpdatePicture]);

//   return (
//     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//       <ModalContent className="max-w-md max-h-[90vh]">
//         <ModalHeader className="text-lg font-semibold flex items-center gap-2">
//           {view === "main" ? (
//             "Settings"
//           ) : (
//             <>
//               <div
//                 onClick={() => setView("main")}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 {/* Bungkus icon */}
//                 <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
//                   <ChevronLeft  />
//                 </div>

//                 {/* Label back */}
//                 <span className="text-sm text-black dark:text-white">
//                   Kembali
//                 </span>
//               </div>
//             </>
//           )}
//         </ModalHeader>

//         <ModalBody className="overflow-y-auto">
//           {view === "main" ? (
//             <>
//               <div className="flex justify-center items-center">
//                 <div className="flex flex-col justify-center items-center">
//                   <div className="relative w-fit group">
//                     {/* Image */}
//                     <Image
//                       src={preview || photoSrc || "/images/profile.jpg"}
//                       alt="avatar"
//                       width={200}
//                       height={200}
//                       className="w-26 h-26 object-cover rounded-full"
//                       onClick={triggerFileSelect}
//                     />

//                     <Controller
//                       name="image"
//                       control={controlUpdatePicture}
//                       render={({ field: { onChange, value, ...field } }) => (
//                         <>
//                           <input
//                             {...field}
//                             ref={inputFileRef}
//                             type="file"
//                             accept="image/*"
//                             className="hidden"
//                             onChange={onSelectNewAvatar}
//                           />
//                           {preview && (
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 handleDeletePicture(() => {
//                                   onChange(undefined);
//                                   resetUpdatePicture();
//                                 });
//                               }}
//                               className="absolute cursor-pointer -bottom-2 -left-2 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-700 transition-all"
//                             >
//                               <X size={14} />
//                             </button>
//                           )}
//                           {preview && (
//                             <button
//                               type="button"
//                               onClick={handleSubmitUpdatePicture(
//                                 handleUpdateGrup,
//                               )}
//                               className="absolute cursor-pointer -bottom-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 transition-all"
//                             >
//                               <Check size={14} />
//                             </button>
//                           )}
//                         </>
//                       )}
//                     />
//                     {!preview && (
//                       <div
//                         className="absolute inset-0 rounded-full flex items-center text-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition"
//                         onClick={triggerFileSelect}
//                       >
//                         <span className="text-white text-sm font-medium p-3">
//                           Change Photo
//                         </span>
//                       </div>
//                     )}

//                     {isPendingMutateUploadFile && (
//                       <div className="absolute bottom-0 right-0 bg-white text-xs px-2 py-1 rounded shadow">
//                         Uploading...
//                       </div>
//                     )}
//                   </div>

//                   <form
//                     onSubmit={handleSubmitForm(handleUpdateGrup)}
//                     className="flex items-center gap-2 mt-2"
//                   >
//                     {conversation && isEditing ? (
//                       <div className="flex flex-col items-center gap-2">
//                         <Controller
//                           name="name"
//                           control={control}
//                           render={({ field }) => (
//                             <input
//                               {...field}
//                               autoFocus
//                               className="text-lg font-semibold border-b border-gray-300 dark:border-gray-800 outline-none text-center"
//                             />
//                           )}
//                         />

//                         <div className="flex gap-2">
//                           <Button
//                             type="submit"
//                             size="sm"
//                             color="primary"
//                             isLoading={isPendingMutateUpdateGrup}
//                           >
//                             Save
//                           </Button>

//                           <Button
//                             size="sm"
//                             variant="light"
//                             onPress={() => {
//                               setIsEditing(false);
//                               setValueUpdateGrup("name", chatName); // reset ke awal
//                             }}
//                           >
//                             Cancel
//                           </Button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <span className="text-lg font-semibold">
//                           {watch("name") || chatName}
//                         </span>

//                         {conversation && (
//                           <Pencil
//                             size={16}
//                             className="cursor-pointer text-gray-500 dark:text-white hover:text-black"
//                             onClick={() => setIsEditing(true)}
//                           />
//                         )}
//                       </>
//                     )}
//                   </form>
//                 </div>
//               </div>
//               <div className="mt-4 flex flex-col gap-5">
//                 <span className="text-gray-600 dark:text-white font-semibold">
//                   Ubah tampilan chat
//                 </span>
//                 <div className="grid grid-cols-4 gap-3 ">
//                   {themes.map((theme) => {
//                     const isActive = activeTheme === theme.key;

//                     return (
//                       <div
//                         key={theme.key}
//                         onClick={() => {
//                           setActiveTheme(theme.key);
//                           onClose();
//                         }}
//                         className={`cursor-pointer w-full h-28 rounded-xl border-2 ${
//                           isActive ? "border-primary" : "border-transparent"
//                         } flex items-center justify-center transition`}
//                         style={{
//                           backgroundImage: `url(${theme.image})`,
//                           backgroundSize: "cover",
//                           backgroundPosition: "center",
//                         }}
//                         title={theme.label}
//                       >
//                         {isActive && (
//                           <span className="text-white font-bold">✓</span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="mt-6 flex flex-col gap-3">
//                 <span className="text-gray-600 dark:text-white font-semibold">
//                   {participants?.length || 0} Member
//                 </span>
//                 {isAdmin && (
//                   <div
//                     onClick={() => setView("addMember")}
//                     className="flex p-2 gap-3 items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                   >
//                     <div className="bg-blue-600 p-2 rounded-full">
//                       <UserRoundPlus />
//                     </div>
//                     <span className="text-sm font-medium text-gray-800 dark:text-white">
//                       Tambah Member
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
//                   {participants?.map((p) => {
//                     const isAdmin = p.mumi?.id === createdById;
//                     const foto = p.mumi?.foto
//                       ? `${process.env.NEXT_PUBLIC_IMAGE}${p.mumi.foto}`
//                       : "/profil.jpg";

//                     return (
//                       <div
//                         key={p.id}
//                         className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                       >
//                         <div className="flex items-center gap-3">
//                           <Image
//                             src={foto}
//                             alt={p.mumi?.nama || "user"}
//                             width={40}
//                             height={40}
//                             className="w-10 h-10 rounded-full object-cover"
//                           />

//                           <span className="text-sm font-medium text-gray-800 dark:text-white">
//                             {p.mumi?.nama}
//                           </span>
//                         </div>

//                         {isAdmin && (
//                           <span className="text-xs bg-blue-200 text-blue-800 font-semibold px-2 py-1 rounded-full">
//                             Admin
//                           </span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* ===== VIEW TAMBAH MEMBER ===== */}
//               <span className="font-semibold">Tambah Member</span>

//               <div className="flex flex-col gap-2">
//                 {/* nanti ganti dengan data user dari API */}
//                 {participants?.map((p) => {
//                   const foto = p.mumi?.foto
//                     ? `${process.env.NEXT_PUBLIC_IMAGE}${p.mumi.foto}`
//                     : "/profil.jpg";

//                   return (
//                     <div
//                       key={p.id}
//                       className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//                     >
//                       <div className="flex items-center gap-3">
//                         <Image
//                           src={foto}
//                           alt={p.mumi?.nama || "user"}
//                           width={40}
//                           height={40}
//                           className="w-10 h-10 rounded-full object-cover"
//                         />

//                         <span className="text-sm font-medium">
//                           {p.mumi?.nama}
//                         </span>
//                       </div>

//                       <Button size="sm" color="primary">
//                         Tambah
//                       </Button>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}
//         </ModalBody>

//         {/* <ModalFooter className="justify-end gap-2">
//           <Button color="danger" variant="light" onPress={onClose}>
//             Close
//           </Button>
//         </ModalFooter> */}
//       </ModalContent>
//     </Modal>
//   );
// };

// export default Setting;
