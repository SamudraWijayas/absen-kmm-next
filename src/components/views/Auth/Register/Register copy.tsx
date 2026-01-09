// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Eye, EyeOff, CircleCheck, CircleX } from "lucide-react";
// import { motion } from "framer-motion";
// import useRegister from "./useRegister";
// import { Controller } from "react-hook-form";
// import * as React from "react";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";

// const Register = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     hasLowerAndUpperCase,
//     hasNumericCharacter,
//     hasSpecialCharacter,
//     meetsMinimumLength,
//     isSpecialCharacterValid,
//     strengthScore,
//     control,
//     handleRegister,
//     handleSubmit,
//     isPendingRegister,
//   } = useRegister(password);

//   const progressColor = [
//     "bg-red-500",
//     "bg-orange-500",
//     "bg-yellow-500",
//     "bg-emerald-600",
//   ];
//   const textprogressColor = [
//     "text-red-500",
//     "text-orange-500",
//     "text-yellow-500",
//     "text-emerald-600",
//   ];
//   const strengthLabel = ["Sangat Lemah", "Lemah", "Kuat", "Sangat Kuat"];

//   return (
//     <div
//       className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: "url('/images/bg.jpg')" }}
//     >
//       <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-md">
//         {/* Left Side */}
//         <div className="relative hidden md:block md:w-1/2">
//           <Image
//             src="/images/bg.jpg"
//             alt="Timnas"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Right Side */}
//         <div className="flex w-full flex-col justify-center p-6 sm:p-10 md:w-1/2 md:p-12">
//           <div className="mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-red-700">TIKET ID</h1>
//                 <p className="mt-1 text-sm text-gray-600">
//                   Silakan isi data Anda di bawah ini untuk mendaftar.
//                 </p>
//               </div>
//               <div className="flex items-center gap-1 rounded border px-2 py-1 text-sm text-gray-600">
//                 🇮🇩 <span>Indonesia</span>
//               </div>
//             </div>
//           </div>

//           <form
//             className="space-y-5"
//             onSubmit={(e) => {
//               e.preventDefault();
//               if (
//                 !hasLowerAndUpperCase ||
//                 !hasNumericCharacter ||
//                 !hasSpecialCharacter ||
//                 !isSpecialCharacterValid ||
//                 password !== confirmPassword
//               ) {
//                 alert(
//                   "Pastikan semua aturan kata sandi sudah terpenuhi dan konfirmasi cocok.",
//                 );
//                 return;
//               }

//               console.log("Form valid. Data siap dikirim.");
//               handleSubmit(handleRegister)(e); // ✅ FIXED
//             }}
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email<span className="text-red-500">*</span>
//               </label>
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type="text"
//                     placeholder="Fullname"
//                     className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                     required
//                   />
//                 )}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Username<span className="text-red-500">*</span>
//               </label>
//               <Controller
//                 name="username"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type="text"
//                     placeholder="Username"
//                     className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                     required
//                   />
//                 )}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email<span className="text-red-500">*</span>
//               </label>
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type="email"
//                     placeholder="Email"
//                     className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                     required
//                   />
//                 )}
//               />
//             </div>
//             {/* Password Input */}

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Kata sandi<span className="text-red-500">*</span>
//               </label>
//               <Controller
//                 name="password"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="relative">
//                     <input
//                       {...field}
//                       type={showPassword ? "text" : "password"}
//                       className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Kata sandi"
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 )}
//               />

//               {/* Strength Bar */}
//               <div className="mt-2 h-2 w-full overflow-hidden rounded bg-gray-200">
//                 <motion.div
//                   className={`h-full ${progressColor[strengthScore - 1] || "bg-gray-300"}`}
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(strengthScore / 4) * 100}%` }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </div>

//               {/* Strength Label */}
//               <p
//                 className={`mt-1 text-xs font-medium ${
//                   strengthScore === 0
//                     ? "text-gray-400"
//                     : textprogressColor[strengthScore - 1]
//                 }`}
//               >
//                 {strengthLabel[strengthScore - 1] || "Sangat Lemah"}
//               </p>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Konfirmasi kata sandi<span className="text-red-500">*</span>
//               </label>
//               <Controller
//                 name="confirmPassword"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="relative">
//                     <input
//                       {...field}
//                       type={showConfirmPassword ? "text" : "password"}
//                       className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       placeholder="Konfirmasi kata sandi"
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff size={18} />
//                       ) : (
//                         <Eye size={18} />
//                       )}
//                     </button>
//                   </div>
//                 )}
//               />
//             </div>

//             {/* Validation Rules */}
//             <ul className="mt-2 space-y-1 text-xs">
//               <li
//                 className={
//                   hasLowerAndUpperCase ? "text-green-600" : "text-red-500"
//                 }
//                 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
//               >
//                 {hasLowerAndUpperCase ? (
//                   <CircleCheck size={16} />
//                 ) : (
//                   <CircleX size={16} />
//                 )}
//                 1 huruf kecil & huruf kapital
//               </li>
//               <li
//                 className={
//                   hasNumericCharacter ? "text-green-600" : "text-red-500"
//                 }
//                 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
//               >
//                 {hasNumericCharacter ? (
//                   <CircleCheck size={16} />
//                 ) : (
//                   <CircleX size={16} />
//                 )}
//                 1 angka (0–9)
//               </li>
//               <li
//                 className={
//                   isSpecialCharacterValid ? "text-green-600" : "text-red-500"
//                 }
//                 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
//               >
//                 {isSpecialCharacterValid ? (
//                   <CircleCheck size={16} />
//                 ) : (
//                   <CircleX size={16} />
//                 )}
//                 Karakter khusus (yang tidak diizinkan: / \ &quot; &apos; )
//               </li>
//               <li
//                 className={
//                   meetsMinimumLength ? "text-green-600" : "text-red-500"
//                 }
//                 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
//               >
//                 {meetsMinimumLength ? (
//                   <CircleCheck size={16} />
//                 ) : (
//                   <CircleX size={16} />
//                 )}
//                 Minimal 8 karakter
//               </li>
//             </ul>

//             <button
//               type="submit"
//               disabled={
//                 !hasLowerAndUpperCase ||
//                 !hasNumericCharacter ||
//                 !hasSpecialCharacter ||
//                 !meetsMinimumLength ||
//                 password !== confirmPassword
//               }
//               className="mt-4 w-full rounded bg-red-600 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//             >
//               {isPendingRegister ? (
//                 <Box sx={{ display: "flex" }}>
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 "Register"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
