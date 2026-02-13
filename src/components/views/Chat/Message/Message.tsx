"use client";

import { Button, Skeleton } from "@heroui/react";
import { IChat, IMessage } from "@/types/Chat";
import useMessage from "./useMessage";

interface MessageViewProps {
  chat: IChat;
  onBack: () => void;
}

const currentUserId = 1; // 🔥 ganti dari auth/session nanti

const MessageView: React.FC<MessageViewProps> = ({ chat, onBack }) => {
  const isPersonal = chat.type === "personal";

  const chatId = isPersonal ? String(chat.user?.id) : String(chat.group?.id);

  const { dataMessage, isLoadingMessage } = useMessage(chatId, chat.type);

  const messages = dataMessage?.data || [];

  const name = isPersonal ? chat.user?.nama : chat.group?.name || "Group Chat";

  return (
    <div className="px-4 lg:pt-17.5 pt-32 min-h-screen bg-white dark:bg-black/10 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button size="sm" variant="light" onClick={onBack}>
          ← Back
        </Button>
        <h2 className="text-xl font-bold ml-4">{name}</h2>
      </div>

      {/* Message List */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {isLoadingMessage ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="w-3/4 h-12 rounded-lg" />
          ))
        ) : messages.length === 0 ? (
          <p className="text-gray-400">Belum ada pesan</p>
        ) : (
          messages.map((msg: IMessage) => {
            const isMe = msg.senderId === currentUserId;

            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow ${
                    isMe
                      ? "bg-green-400 text-black rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-800 rounded-bl-none"
                  }`}
                >
                  {/* Kalau group dan bukan kita, tampilkan nama */}
                  {!isPersonal && !isMe && (
                    <p className="text-xs font-semibold mb-1">
                      {msg.sender?.nama}
                    </p>
                  )}

                  <p>{msg.content}</p>

                  <p className="text-[10px] text-right mt-1 opacity-60">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MessageView;
