import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Checkbox,
} from "@heroui/react";
import useAddGroup from "./useAddGroup";
import { useEffect } from "react";
import { IGenerus } from "@/types/Generus";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchChatList: () => void;
}

const AddGroup = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchChatList } = props;

  const {
    dataGenerus,
    isLoadingGenerus,
    control,
    handleSubmitForm,

    isSuccessMutateAddGroup,
    handleAddGroup,
    selectedIds,
    toggleSelect,
  } = useAddGroup();

  const mumiList = dataGenerus?.data ?? [];

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
          <DrawerBody>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Nama Grup"
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-900 rounded-full focus:outline-none"
                />
              )}
            />
            {isLoadingGenerus ? (
              <p>Loading...</p>
            ) : mumiList.length === 0 ? (
              <p className="text-sm text-gray-500">Tidak ada data Caberawit</p>
            ) : (
              <div className="flex flex-col gap-3">
                {mumiList.map((mumi: IGenerus) => {
                  const isSelected = selectedIds.includes(mumi.id);

                  return (
                    <label
                      key={mumi.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition"
                    >
                      <Checkbox
                        isSelected={isSelected}
                        onValueChange={() => {
                          toggleSelect(mumi.id);
                        }}
                        color="primary"
                        radius="sm"
                      />

                      <div className="flex flex-col">
                        <span className="font-medium">{mumi.nama}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary" onPress={onClose}>
              Action
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default AddGroup;
