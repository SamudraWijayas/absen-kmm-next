"use client";

import React from "react";
import Image from "next/image";
import { Button, Divider, useDisclosure } from "@heroui/react";
import ProfileDrawer from "./ProfileDrawer";

const Profile = () => {
  const UpdateProfile = useDisclosure();
  return (
    <div className="px-4 pt-[70px] min-h-screen bg-white dark:bg-black/10">
      <div className="flex flex-col gap-4 items-center">
        <Image
          src="/profil.jpg"
          width={200}
          height={200}
          alt="profile"
          className="w-16 h-16 object-cover rounded-full"
        />
        <div className="flex flex-col items-center gap-0">
          <h1 className="font-bold text-lg">SAMODRA WIJAYA SAMDORIA</h1>
          <span className="text-gray-600 dark:text-gray-400">
            Tanjung Karang 2
          </span>
        </div>
      </div>
      <div className="pt-10">
        <div className="flex flex-col gap-0">
          <span className="text-gray-600 dark:text-gray-400">Kelompok</span>
          <span className="dark:text-white text-black">Labuhan Dalam 2</span>
        </div>
        <Divider className="h-[1px] my-2 bg-gray-200 dark:bg-gray-600" />
        <div className="flex flex-col gap-0">
          <span className="text-gray-600 dark:text-gray-400">
            Jenis Kelamin
          </span>
          <span className="dark:text-white text-black">Laki - laki</span>
        </div>
        <Divider className="h-[1px] my-2 bg-gray-200 dark:bg-gray-600" />
      </div>
      <Button color="primary" className="w-full mt-7" onPress={UpdateProfile.onOpen}>
        Edit Profil
      </Button>
      <ProfileDrawer {...UpdateProfile} />
    </div>
  );
};

export default Profile;
