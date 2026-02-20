"use client";

import AddGroup from "@/components/views/Chat/AddGroup/AddGroup";
import AddPrivate from "@/components/views/Chat/AddPrivate/AddPrivate";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@heroui/react";
import { EllipsisVertical, Search } from "lucide-react";

interface Proptypes {
  refetchChatList: () => void;
}

const NavBack = ({ refetchChatList }: Proptypes) => {
  const addGroup = useDisclosure();
  const addPrivate = useDisclosure();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-black/70  dark:border-gray-700 p-4 flex flex-col gap-2 md:gap-4">
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          ChatGenerus
        </h1>

        {/* Search bar (opsional, lebih modern) */}
        <div className="flex-1 mx-4 relative hidden md:flex">
          <input
            type="text"
            placeholder="Search chat..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        </div>

        {/* Dropdown Menu */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <EllipsisVertical className="text-gray-700 dark:text-gray-300" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="new" onPress={addGroup.onOpen}>
              Tambah Grup
            </DropdownItem>
            <DropdownItem key="friend" onPress={addPrivate.onOpen}>
              Tambah Teman
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="w-full relative md:hidden mt-2">
        <input
          type="text"
          placeholder="Search chat..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
      </div>
      <AddGroup {...addGroup} refetchChatList={refetchChatList} />
      <AddPrivate {...addPrivate} refetchChatList={refetchChatList} />
    </div>
  );
};

export default NavBack;
