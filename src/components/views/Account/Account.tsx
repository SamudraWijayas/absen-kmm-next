import React from "react";
import { ThemeSwitcher } from "../../ThemeSwitcher/ThemeSwitcher";
import Image from "next/image";
import { User, Lock, Info } from "lucide-react";
import Link from "next/link";

const Account = () => {
  return (
    <div className="px-4 pt-[70px] min-h-screen bg-white dark:bg-black/10">
      <div className="flex items-center gap-2">
        <Image
          src="/profil.jpg"
          width={200}
          height={200}
          alt="profile"
          className="w-16 h-16 object-cover rounded-full"
        />
        <div className="flex flex-col gap-0 ">
          <h1 className="text-lg font-bold">Samudra Wijaya Samdoria</h1>
          <span className="text-sm text-gray-600">Tanjung Karang 2</span>
        </div>
      </div>
      <ThemeSwitcher />
      <div className="pt-4 flex flex-col gap-3">
        <span className="text-gray-600 dark:text-gray-500 font-medium">Lainnya</span>
        <div className="flex flex-col gap-5">
          <Link href="/profile" className="flex gap-2 items-center">
            <User size={20} />
            <span className="text-sm">Kelola Profile</span>
          </Link>
          <Link href="/update-password" className="flex gap-2 items-center">
            <Lock size={20} />
            <span className="text-sm">Ubah Password</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <Info size={20} />
            <span className="text-sm">Pusat Bantuan</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
