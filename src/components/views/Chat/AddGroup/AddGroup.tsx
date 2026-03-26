"use client";

import {

  Checkbox,
  Pagination,
  Input,
  Spinner,
} from "@heroui/react";
import useAddGroup from "./useAddGroup";
import { useEffect } from "react";
import { IGenerus } from "@/types/Generus";
import { Controller } from "react-hook-form";
import useFilter from "@/hooks/useFilter";
import { AlertTriangle, Search } from "lucide-react";
import Image from "next/image";

interface PropTypes {
  onClose: () => void;
  refetchChatList: () => void;
}

const AddGroup = ({ onClose, refetchChatList }: PropTypes) => {
  const {
    limit,
    page,
    search,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useFilter();

  const {
    dataGenerus,
    isLoadingGenerus,
    control,
    handleSubmitForm,
    isSuccessMutateAddGroup,
    handleAddGroup,
    selectedIds,
    toggleSelect,
    errors,
  } = useAddGroup({ limit, page, search });

  const mumiList = dataGenerus?.data ?? [];
  const totalPages = dataGenerus?.pagination.totalPages || 0;

  useEffect(() => {
    if (isSuccessMutateAddGroup) {
      onClose();
      refetchChatList();
    }
  }, [isSuccessMutateAddGroup, onClose, refetchChatList]);

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmitForm(handleAddGroup)}
      >
        <div className="sticky top-0 z-10 bg-white dark:bg-black pb-2">
          <button
            type="submit"
            className="rounded-lg border border-gray-300 bg-blue-600 dark:bg-white dark:text-black p-2 text-xs font-medium text-white hover:bg-blue-800 disabled:opacity-50"
          >
            Tambah Grup
          </button>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <input
                {...field}
                placeholder="Nama Grup"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-900 rounded-full focus:outline-none"
              />
              {errors.name && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          )}
        />

        {/* Search */}
        {/* <input
                      type="text"
                      placeholder="Cari Caberawit..."
                      value={searchInput}
                      onChange={(e) => setQuery(e.target.value)}
                      className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
                    /> */}
        <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
          <AlertTriangle size={18} />
          <span>
            Cari Teman yang ingin diinvite <b>Grup</b>.
          </span>
        </div>
        <Input
          isClearable
          className="w-full"
          placeholder="Cari berdasarkan nama"
          startContent={<Search />}
          onClear={handleClearSearch}
          onChange={handleSearch}
        />

        {/* List */}
        {isLoadingGenerus ? (
          <Spinner />
        ) : mumiList.length === 0 ? (
          <p className="text-sm text-gray-500">Tidak ada data</p>
        ) : (
          <div className="flex flex-col gap-3">
            {mumiList.map((mumi: IGenerus) => (
              <label
                key={mumi.id}
                className="flex items-center gap-3 rounded-lg  p-3 transition cursor-pointer"
              >
                <Checkbox
                  isSelected={selectedIds.includes(mumi.id)}
                  onValueChange={() => toggleSelect(mumi.id)}
                  color="primary"
                  radius="sm"
                />
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      mumi.foto
                        ? `${process.env.NEXT_PUBLIC_IMAGE}${mumi.foto}`
                        : "/profil.jpg"
                    }
                    alt="image"
                    width={100}
                    height={100}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{mumi.nama}</span>
                </div>
              </label>
            ))}
          </div>
        )}
        <div>
          {totalPages > 1 && (
            <Pagination
              isCompact
              showControls
              color="primary"
              page={Number(page)}
              total={totalPages}
              onChange={handleChangePage}
              loop
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddGroup;
