"use client";

import HeadChat from "@/components/ui/HeadChat";
import { Fragment} from "react";
import useChat from "./useChat";
import { IChat } from "@/types/Chat";
import { Skeleton } from "@heroui/react";
import ChatItem from "./ChatItem";



const Chat = () => {
  const {
    dataChatList,
    isLoadingChatList,
    onlineUsers,
    refetchChatList,

  } = useChat();

  const chatList: IChat[] = Array.isArray(dataChatList?.data)
    ? dataChatList.data
    : [];

  return (
    <Fragment>
      <HeadChat refetchChatList={refetchChatList} />

      <div className="px-4 lg:pt-17.5 pt-32 min-h-screen bg-white dark:bg-black/10">
        <div>
          {isLoadingChatList
            ? Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center rounded-xl p-3"
                >
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col space-y-1">
                      <Skeleton className="w-32 h-4 rounded-md" />
                      <Skeleton className="w-48 h-3 rounded-md" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Skeleton className="w-10 h-3 rounded-md" />
                    <Skeleton className="w-6 h-3 rounded-full" />
                  </div>
                </div>
              ))
            : chatList.map((chat) => (
                <ChatItem
                  key={chat.conversationId}
                  chat={chat}
                  onlineUsers={onlineUsers}
                  refetchChatList={refetchChatList}
                />
              ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
