"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Checkbox,
  Pagination,
  Input,
  Spinner,
} from "@heroui/react";
import useAddGroup from "./useAddGroup";
import { useEffect, useMemo, useState } from "react";
import { IGenerus } from "@/types/Generus";
import { Controller } from "react-hook-form";
import useFilter from "@/hooks/useFilter";
import { AlertTriangle, Search } from "lucide-react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchChatList: () => void;
}

const AddGroup = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchChatList,
}: PropTypes) => {
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
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmitForm(handleAddGroup)}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            Tambah Grup
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-4">
            {/* Nama Grup */}
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

            <Input
              isClearable
              className="w-full"
              placeholder="Cari berdasarkan nama"
              startContent={<Search />}
              onClear={handleClearSearch}
              onChange={handleSearch}
            />
            <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
              <AlertTriangle size={18} />
              <span>
                Cari Teman yang ingin diinvite <b>Grup</b>.
              </span>
            </div>

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
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition"
                  >
                    <Checkbox
                      isSelected={selectedIds.includes(mumi.id)}
                      onValueChange={() => toggleSelect(mumi.id)}
                      color="primary"
                      radius="sm"
                    />
                    <div className="flex flex-col">
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
          </DrawerBody>
          <DrawerFooter className="flex justify-end gap-2">
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary">
              Tambah Grup
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default AddGroup;
