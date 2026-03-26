import { Checkbox, Input, Pagination } from "@heroui/react";
import Image from "next/image";
import useAddGroup from "./useAddPrivate";
import { useEffect } from "react";
import { IGenerus } from "@/types/Generus";
import { Controller } from "react-hook-form";
import useFilter from "@/hooks/useFilter";
import { Search } from "lucide-react";

interface PropTypes {
  onClose: () => void;
  refetchChatList: () => void;
}

const AddGroup = (props: PropTypes) => {
  const { onClose, refetchChatList } = props;

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

    selectedId,
    toggleSelect,

    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddPrivate,
    isSuccessMutateAddPrivate,
    handleAddPrivate,
  } = useAddGroup({ limit, page, search });

  const mumiList = dataGenerus?.data ?? [];
  const totalPages = dataGenerus?.pagination.totalPages || 0;

  useEffect(() => {
    if (isSuccessMutateAddPrivate) {
      onClose();
      refetchChatList();
    }
  }, [isSuccessMutateAddPrivate, onClose, refetchChatList]);

  return (
    <div>
      <form
        onSubmit={handleSubmitForm(handleAddPrivate)}
        className="flex flex-col gap-4"
      >
        <div className="sticky top-0 z-10 bg-white dark:bg-black pb-2">
          <button
            type="submit"
            className="rounded-lg border border-gray-300 bg-blue-600 dark:bg-white dark:text-black p-2 text-xs font-medium text-white hover:bg-blue-800 disabled:opacity-50"
          >
            Tambah Teman
          </button>
        </div>
        <Input
          isClearable
          className="w-full"
          placeholder="Cari berdasarkan nama"
          startContent={<Search />}
          onClear={handleClearSearch}
          onChange={handleSearch}
        />
        {isLoadingGenerus ? (
          <p>Loading...</p>
        ) : mumiList.length === 0 ? (
          <p className="text-sm text-gray-500">Tidak ada data Caberawit</p>
        ) : (
          <div className="flex flex-col gap-3">
            {mumiList.map((mumi: IGenerus) => {
              return (
                <label
                  key={mumi.id}
                  className="flex items-center gap-3 rounded-lg p-3 transition cursor-pointer"
                >
                  <Controller
                    name="targetUserId"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        isSelected={selectedId === mumi.id}
                        onValueChange={() => {
                          toggleSelect(mumi.id);
                          field.onChange(mumi.id); // update value form
                        }}
                        color="primary"
                        radius="sm"
                      />
                    )}
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
              );
            })}
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
