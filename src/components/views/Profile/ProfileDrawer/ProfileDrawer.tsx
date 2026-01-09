import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const ProfileDrawer = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange } = props;
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <DrawerContent className="shadow-lg">
        <DrawerHeader className="border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
          Detail Order
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-6 p-5"></DrawerBody>
        <DrawerFooter>
          <Button
            color="primary"
            variant="solid"
            onPress={onClose}
            className="w-full rounded-xl"
          >
            Tutup
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
