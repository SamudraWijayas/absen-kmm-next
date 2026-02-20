"use client";

import React, { useRef, useEffect, useMemo, Fragment } from "react";
import useMessage from "./useMessage";
import Image from "next/image";
import { Button, Skeleton } from "@heroui/react";
import { ChevronLeft, EllipsisVertical, SendHorizontal } from "lucide-react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import useProfile from "@/hooks/useProfile";
import Emoji from "@/components/ui/Emoji/Emoji";

interface IMessage {
  id: number;
  conversationId: string;
  senderId: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    nama: string;
    foto: string;
  };
}

interface IParticipant {
  mumiId: number;
  mumi: {
    id: number;
    nama: string;
    foto: string;
  };
}

interface IConversation {
  id: string;
  image: string;
  isGroup: boolean;
  name: string | null;
  participants: IParticipant[];
}

const Message = () => {
  const { dataProfile } = useProfile();
  const currentUserId = dataProfile?.id;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    dataMessage,
    isLoadingMessage,
    dataConversation,
    control,
    handleSubmitForm,
    handleSendMessage,
    markAsRead,
  } = useMessage();

  const messages = useMemo(() => dataMessage?.data ?? [], [dataMessage?.data]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentUserId && dataMessage?.data?.length) {
      markAsRead(); // tandai semua message sudah dibaca
    }
  }, [currentUserId, dataMessage, markAsRead]);

  // scroll ke bawah setiap update message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const conversation = dataConversation as IConversation | undefined;

  const otherUser = conversation?.participants.find(
    (p) => p.mumiId !== currentUserId,
  );

  const chatName = conversation?.isGroup
    ? (conversation.name ?? "")
    : (otherUser?.mumi.nama ?? "");

  const photoPath = conversation?.isGroup
    ? conversation.image
    : otherUser?.mumi.foto;

  const photoSrc =
    photoPath && photoPath.startsWith("http")
      ? photoPath
      : photoPath
        ? `${process.env.NEXT_PUBLIC_IMAGE}${photoPath}`
        : "/profil.jpg";

  const truncateText = (text: string, max: number) => {
    if (text.length <= max) return text;
    return text.slice(0, max) + "...";
  };

  return (
    <Fragment>
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-black/70  dark:border-gray-700 p-4 flex flex-col gap-2 md:gap-4">
        {/* Title */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition cursor-pointer"
            >
              <ChevronLeft size={23} />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={photoSrc}
                alt={chatName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {truncateText(chatName, 18)}
            </h1>
          </div>

          {/* Dropdown Menu */}
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <EllipsisVertical className="text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>
      <div className="px-4 pt-17.5 min-h-screen bg-white dark:bg-black/10">
        <div>
          {isLoadingMessage ? (
            <div className="flex flex-col space-y-3 p-4 overflow-y-auto max-h-screen dark:bg-black/10">
              {Array.from({ length: 5 }).map((_, idx) => {
                const isCurrentUser = idx % 2 === 0; // simulasi kiri/kanan
                return (
                  <div
                    key={idx}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} items-end gap-2`}
                  >
                    {!isCurrentUser && (
                      <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse" />
                    )}

                    <div
                      className={cn(
                        "rounded-2xl p-3 max-w-[70%] animate-pulse",
                        isCurrentUser
                          ? "bg-yellow-600/70 dark:bg-yellow-700/70 rounded-br-none"
                          : "bg-yellow-400/70 dark:bg-yellow-500/70 rounded-bl-none",
                      )}
                    >
                      <div className="h-4 w-32 mb-2 rounded-md bg-yellow-500/50 dark:bg-yellow-600/50" />
                      <div className="h-3 w-24 rounded-md bg-yellow-500/50 dark:bg-yellow-600/50" />
                    </div>

                    {isCurrentUser && (
                      <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex flex-col space-y-3 px-4 pt-4 lg:pb-5 pb-10 overflow-y-auto lg:max-h-147 max-h-127  scrollbar-hide dark:bg-black/10"
            >
              {messages.map((msg: IMessage) => {
                const isCurrentUser = msg.senderId === currentUserId;

                const date = new Date(msg.createdAt);
                const time = `${date.getUTCHours().toString().padStart(2, "0")}:${date
                  .getUTCMinutes()
                  .toString()
                  .padStart(2, "0")}`;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    {/* Avatar kiri */}
                    {!isCurrentUser && (
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-400">
                        <Image
                          src={
                            msg.sender.foto
                              ? `${process.env.NEXT_PUBLIC_IMAGE}${msg.sender.foto}`
                              : "/profil.jpg"
                          }
                          alt={msg.sender.nama}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Chat bubble */}
                    <div
                      className={cn(
                        "max-w-[70%] px-4 py-2 rounded-2xl shadow wrap-break-words",
                        isCurrentUser
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none",
                      )}
                    >
                      {!isCurrentUser && (
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          {msg.sender.nama}
                        </div>
                      )}
                      <div>{msg.content}</div>
                      <div
                        className={cn(
                          "text-xs mt-1 text-right",
                          isCurrentUser ? "text-white/80" : "text-gray-400",
                        )}
                      >
                        {time}
                      </div>
                    </div>

                    {/* Avatar kanan */}
                    {isCurrentUser && (
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-400">
                        <Image
                          src={
                            msg.sender.foto
                              ? `${process.env.NEXT_PUBLIC_IMAGE}${msg.sender.foto}`
                              : "/profil.jpg"
                          }
                          alt={msg.sender.nama}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="fixed bottom-0 left-0 w-full">
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmitForm(handleSendMessage)}
              className="flex gap-2 px-3 py-2"
            >
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <div className="w-full flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-900 rounded-full">
                    <div className="flex items-center justify-center">
                      <Emoji
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={inputRef}
                      />
                    </div>

                    <input
                      {...field}
                      ref={(e) => {
                        field.ref(e);
                        inputRef.current = e;
                      }}
                      placeholder="Ketik pesan"
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                  </div>
                )}
              />

              <Button
                isIconOnly
                type="submit"
                radius="full"
                color="primary"
                className="w-10 h-10 min-w-0"
              >
                <SendHorizontal size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
