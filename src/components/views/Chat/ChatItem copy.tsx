import { IChat } from "@/types/Chat";
import { animate, motion, useMotionValue } from "framer-motion";
import { Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useChat from "./useChat";
import useProfile from "@/hooks/useProfile";
import { Avatar, Spinner } from "@heroui/react";

interface Proptypes {
  chat: IChat;
  onlineUsers: Set<number>;
  refetchChatList: () => void;
}

const ChatItem = (props: Proptypes) => {
  const { chat, onlineUsers, refetchChatList } = props;
  const { dataProfile } = useProfile();
  const currentUserId = dataProfile?.id;
  const {
    mutateDeleteConversation,
    isPendingMutateDeleteConversation,
    isSuccessMutateDeleteConversation,
  } = useChat();

  const x = useMotionValue(0);
  const DELETE_WIDTH = 90;
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isSuccessMutateDeleteConversation) {
      refetchChatList();
    }
  }, [isSuccessMutateDeleteConversation, refetchChatList]);

  let name = "";
  let avatar = "/profil.jpg";
  let userId: number | null = null;
  const id: string = chat.conversationId;

  let lastMessage = chat.lastMessage || "";

  if (
    chat.lastMessage &&
    chat.lastMessageSender &&
    chat.lastMessageSender.id === currentUserId
  ) {
    lastMessage = `Anda: ${chat.lastMessage}`;
  }
  const unread = chat.unreadCount || 0;

  if (chat.type === "personal") {
    name = chat.user.nama;
    avatar = chat.user.foto || avatar;
    userId = chat.user.id;
  } else if (chat.type === "group") {
    name = chat.name;
    avatar = chat.image || avatar;
  }

  const isOnline = userId ? onlineUsers.has(userId) : false;

  const date = new Date(chat.createdAt);
  const time = `${date.getUTCHours().toString().padStart(2, "0")}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}`;
  return (
    <div className="relative overflow-hidden rounded-xl mb-2">
      {/* DELETE BUTTON (di belakang) */}
      <div
        className="absolute right-0 top-0 h-full flex items-center justify-center"
        style={{ width: DELETE_WIDTH }}
      >
        <button
          onClick={() => mutateDeleteConversation(id || "")}
          className="text-red-600 bg-red-100 p-4 rounded-2xl font-semibold"
        >
          {isPendingMutateDeleteConversation ? (
            <Spinner size="sm" color="white" />
          ) : (
            <Trash />
          )}
        </button>
      </div>

      {/* FOREGROUND (yang di swipe) */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -DELETE_WIDTH, right: 0 }}
        dragElastic={0.15}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          setTimeout(() => setIsDragging(false), 50);

          if (info.offset.x < -40) {
            animate(x, -DELETE_WIDTH, {
              type: "spring",
              stiffness: 400,
              damping: 30,
            });
          } else {
            animate(x, 0, {
              type: "spring",
              stiffness: 400,
              damping: 30,
            });
          }
        }}
        className="relative z-10 bg-white dark:bg-black select-none cursor-grab active:cursor-grabbing"
      >
        <Link
          href={`/chat/message/${id}`}
          draggable={false}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
          }}
          className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-xl dark:hover:bg-gray-800"
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-white font-bold text-lg">
              {chat.type === "group" ? (
                chat.image ? (
                  <Image
                    src={chat.image}
                    alt={name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // fallback: inisial nama grup
                  <Avatar
                    src={undefined} // karena tidak ada image
                    name={name} // nama grup untuk inisial
                    showFallback
                    className="w-12 h-12 bg-blue-100 text-blue-500 text-xl font-bold md:text-2xl"
                  />
                )
              ) : (
                <Image
                  src={avatar}
                  alt={name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Online indicator */}
              {userId && (
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-medium">{name}</span>
              <span className="text-gray-500 text-sm truncate">
                {lastMessage}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-gray-400 text-xs">{time}</span>
            {unread > 0 && (
              <span className="bg-green-400 text-black text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                {unread}
              </span>
            )}
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default ChatItem;
