// "use client";

// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   DrawerFooter,
//   Button,
//   Checkbox,
//   Pagination,
// } from "@heroui/react";
// import useAddGroup from "./useAddGroup";
// import { useEffect, useState } from "react";
// import { IGenerus } from "@/types/Generus";
// import { Controller } from "react-hook-form";

// interface PropTypes {
//   isOpen: boolean;
//   onClose: () => void;
//   onOpenChange: () => void;
//   refetchChatList: () => void;
// }

// const AddGroup = ({
//   isOpen,
//   onClose,
//   onOpenChange,
//   refetchChatList,
// }: PropTypes) => {
//   const {
//     dataGenerus,
//     isLoadingGenerus,
//     control,
//     handleSubmitForm,
//     isSuccessMutateAddGroup,
//     handleAddGroup,
//     selectedIds,
//     toggleSelect,
//     handleSearch,
//     handleClearSearch,
//     searchInput,
//   } = useAddGroup();

//   // ================= PAGINATION STATE =================
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10); // kalau mau ubah limit, bisa juga pakai useState
//   const [query, setQuery] = useState("");

//   // refetch otomatis saat page atau query berubah
//   useEffect(() => {
//     handleSearch(query); // panggil useAddGroup search
//   }, [page, query]);

//   const mumiList = dataGenerus?.data ?? [];
//   const totalPages = dataGenerus?.pagination?.totalPages ?? 1;

//   useEffect(() => {
//     if (isSuccessMutateAddGroup) {
//       onClose();
//       refetchChatList();
//     }
//   }, [isSuccessMutateAddGroup, onClose, refetchChatList]);

//   return (
//     <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
//       <form onSubmit={handleSubmitForm(handleAddGroup)}>
//         <DrawerContent>
//           <DrawerHeader className="flex flex-col gap-1">
//             Tambah Grup
//           </DrawerHeader>
//           <DrawerBody className="flex flex-col gap-4">
//             {/* Nama Grup */}
//             <Controller
//               name="name"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   placeholder="Nama Grup"
//                   className="px-4 py-2 bg-gray-200 dark:bg-gray-900 rounded-full focus:outline-none"
//                 />
//               )}
//             />

//             {/* Search */}
//             <input
//               type="text"
//               placeholder="Cari Caberawit..."
//               value={searchInput}
//               onChange={(e) => setQuery(e.target.value)}
//               className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
//             />

//             {/* List */}
//             {isLoadingGenerus ? (
//               <p>Loading...</p>
//             ) : mumiList.length === 0 ? (
//               <p className="text-sm text-gray-500">Tidak ada data</p>
//             ) : (
//               <div className="flex flex-col gap-3">
//                 {mumiList.map((mumi: IGenerus) => (
//                   <label
//                     key={mumi.id}
//                     className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition"
//                   >
//                     <Checkbox
//                       isSelected={selectedIds.includes(mumi.id)}
//                       onValueChange={() => toggleSelect(mumi.id)}
//                       color="primary"
//                       radius="sm"
//                     />
//                     <div className="flex flex-col">
//                       <span className="font-medium">{mumi.nama}</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <Pagination
//                 isCompact
//                 showControls
//                 color="primary"
//                 page={page}
//                 total={totalPages}
//                 onChange={(p) => setPage(p)}
//                 loop
//               />
//             )}
//           </DrawerBody>
//           <DrawerFooter className="flex justify-end gap-2">
//             <Button color="danger" variant="light" onPress={onClose}>
//               Close
//             </Button>
//             <Button type="submit" color="primary">
//               Action
//             </Button>
//           </DrawerFooter>
//         </DrawerContent>
//       </form>
//     </Drawer>
//   );
// };

// export default AddGroup;
