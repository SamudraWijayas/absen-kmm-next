"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Divider, useDisclosure } from "@heroui/react";
import ProfileDrawer from "./ProfileDrawer";
import useProfile from "./useProfile";
import { Camera, Check, X } from "lucide-react";
import { Controller } from "react-hook-form";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
    refetchProfile,

    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,

    preview,
  } = useProfile();

  const UpdateProfile = useDisclosure();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null); // file preview
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const triggerFileSelect = () => {
    inputFileRef.current?.click();
  };

  const onSelectNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result as string); // tampilkan cropper
    });
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSaveCropped = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([blob], "avatar.png", { type: "image/png" });

      // Convert File to FileList
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      handleUploadPicture(dataTransfer.files, () => {
        setImageSrc(null);
        refetchProfile();
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
  };

  useEffect(() => {
    if (isSuccessMutateUpdateProfile) {
      resetUpdatePicture();
      refetchProfile();
    }
  }, [isSuccessMutateUpdateProfile, refetchProfile, resetUpdatePicture]);
  return (
    <div className="px-4 pt-17.5 min-h-screen bg-white dark:bg-black/10">
      <div className="flex flex-col gap-4 items-center">
        <div className="relative w-fit group">
          {/* Avatar */}
          <Image
            src={
              preview
                ? preview
                : dataProfile?.foto
                  ? `${process.env.NEXT_PUBLIC_IMAGE}${dataProfile.foto}`
                  : "/profil.jpg"
            }
            width={200}
            height={200}
            alt="profile"
            onClick={triggerFileSelect}
            className="w-30 h-30 rounded-full object-cover border-4 border-white shadow-md cursor-pointer transition"
          />

          {/* Icon Kamera (default) */}
          {!preview && (
            <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md pointer-events-none z-10">
              <Camera size={14} />
            </div>
          )}
          <Controller
            name="foto"
            control={controlUpdatePicture}
            render={({ field: { onChange, value, ...field } }) => (
              <>
                <input
                  {...field}
                  ref={inputFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onSelectNewAvatar}
                />

                {/* Delete */}
                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeletePicture(() => {
                        onChange(undefined);
                        resetUpdatePicture();
                      });
                    }}
                    className="absolute -bottom-2 -left-2 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-700 transition-all"
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Save */}
                {preview && (
                  <button
                    type="button"
                    onClick={handleSubmitUpdatePicture(handleUpdateProfile)}
                    className="absolute -bottom-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 transition-all"
                  >
                    <Check size={14} />
                  </button>
                )}
              </>
            )}
          />

          {/* Hover Overlay */}
          {!preview && (
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition"
              onClick={triggerFileSelect}
            >
              <span className="text-white text-xs font-medium">
                Change Photo
              </span>
            </div>
          )}

          {/* Uploading indicator */}
          {isPendingMutateUploadFile && (
            <div className="absolute bottom-0 right-0 bg-white text-xs px-2 py-1 rounded shadow">
              Uploading...
            </div>
          )}

          {imageSrc && (
            <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center p-4">
              <div className="relative w-72 h-72 rounded-full overflow-hidden bg-gray-800">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />

                {/* Buttons positioned below the crop circle */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <button
                    type="button"
                    onClick={handleCancelCrop}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-500 text-white shadow-md hover:bg-gray-700 transition-all"
                  >
                    <X size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCropped}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 transition-all"
                  >
                    <Check size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-0">
          <h1 className="font-bold text-lg"> {dataProfile?.nama}</h1>
          <span className="text-gray-600 dark:text-gray-400">
            {dataProfile?.desa.name}
          </span>
        </div>
      </div>
      <div className="pt-10">
        <div className="flex flex-col gap-0">
          <span className="text-gray-600 dark:text-gray-400">Kelompok</span>
          <span className="dark:text-white text-black">
            {dataProfile?.kelompok.name}
          </span>
        </div>
        <Divider className="h-px my-2 bg-gray-200 dark:bg-gray-600" />
        <div className="flex flex-col gap-0">
          <span className="text-gray-600 dark:text-gray-400">
            Jenis Kelamin
          </span>
          <span className="dark:text-white text-black">
            {" "}
            {dataProfile?.jenis_kelamin}
          </span>
        </div>
        <Divider className="h-px my-2 bg-gray-200 dark:bg-gray-600" />
      </div>
      <Button
        color="primary"
        className="w-full mt-7"
        onPress={UpdateProfile.onOpen}
      >
        Edit Profil
      </Button>
      <ProfileDrawer
        {...UpdateProfile}
        dataProfile={dataProfile}
        onUpdate={handleUpdateProfile}
        isPendingUpdate={isPendingMutateUpdateProfile}
        isSuccessUpdate={isSuccessMutateUpdateProfile}
        refetchProfile={refetchProfile}
      />
    </div>
  );
};

export default Profile;
