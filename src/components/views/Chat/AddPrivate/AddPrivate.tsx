import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Checkbox,
  Input,
  Pagination,
} from "@heroui/react";
import useAddGroup from "./useAddPrivate";
import { useEffect } from "react";
import { IGenerus } from "@/types/Generus";
import { Controller } from "react-hook-form";
import useFilter from "@/hooks/useFilter";
import { Search } from "lucide-react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchChatList: () => void;
}

const AddGroup = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchChatList } = props;

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
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmitForm(handleAddPrivate)}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            Tambah Teman Ngobrol
          </DrawerHeader>
          <DrawerBody>
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
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition"
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

                      <div className="flex flex-col">
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
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary" onPress={onClose}>
              Tambah Teman
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default AddGroup;
