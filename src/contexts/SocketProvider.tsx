"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/libs/socket";

/* ===============================
   TYPES
================================= */

export interface Attachment {
  id: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface Sender {
  id: number;
  nama: string;
}

export interface Message {
  id: string;
  content: string | null;
  senderId: number;
  conversationId: string;
  createdAt: string;
  sender: Sender;
  attachments: Attachment[];
}

interface OnlineUsersListPayload {
  users: number[];
}

interface UserOnlineOfflinePayload {
  userId: number;
}

interface TypingPayload {
  conversationId: string;
  userId: number;
  isTyping: boolean;
}

interface MessagesReadPayload {
  conversationId: string;
  userId: number;
  readAt: string;
}

interface ChatListUpdatePayload {
  conversationId: string;
  updatedAt: string;
}

interface SendMessagePayload {
  content: string | null;
  conversationId: string;
  attachments?: {
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }[];
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: Set<number>;
  typingUsers: Record<string, Set<number>>;
  joinRoom: (conversationId: string) => void;
  leaveRoom: (conversationId: string) => void;
  sendMessage: (data: SendMessagePayload) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  markAsRead: (conversationId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: new Set(),
  typingUsers: {},
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  startTyping: () => {},
  stopTyping: () => {},
  markAsRead: () => {},
});

/* ===============================
   PROVIDER
================================= */

export const SocketProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: number | null;
}) => {
  const socket = getSocket();

  const [onlineUsersState, setOnlineUsersState] = useState<Set<number>>(
    new Set(),
  );

  const [typingUsers, setTypingUsers] = useState<Record<string, Set<number>>>(
    {},
  );

  // ===============================
  // DERIVED ONLINE USERS
  // ===============================
  const onlineUsers = useMemo(() => {
    if (userId && socket.connected) {
      const copy = new Set(onlineUsersState);
      copy.add(userId);
      return copy;
    }
    return onlineUsersState;
  }, [userId, socket.connected, onlineUsersState]);

  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) socket.connect();

    socket.emit("register_user", userId);

    /* ===============================
       EVENT HANDLERS
    ================================= */

    const handleOnlineUsersList = ({ users }: OnlineUsersListPayload) => {
      setOnlineUsersState(new Set(users));
    };

    const handleUserOnline = ({ userId }: UserOnlineOfflinePayload) => {
      setOnlineUsersState((prev) => new Set(prev).add(userId));
    };

    const handleUserOffline = ({ userId }: UserOnlineOfflinePayload) => {
      setOnlineUsersState((prev) => {
        const copy = new Set(prev);
        copy.delete(userId);
        return copy;
      });
    };

    const handleUserTyping = (data: TypingPayload) => {
      setTypingUsers((prev) => {
        const copy = { ...prev };

        if (!copy[data.conversationId]) {
          copy[data.conversationId] = new Set();
        }

        if (data.isTyping) {
          copy[data.conversationId].add(data.userId);
        } else {
          copy[data.conversationId].delete(data.userId);
        }

        return { ...copy };
      });
    };

    const handleMessagesRead = (data: MessagesReadPayload) => {
      console.log("Messages read:", data);
    };

    const handleReceiveMessage = (message: Message) => {
      console.log("New message:", message);
    };

    const handleChatListUpdate = (data: ChatListUpdatePayload) => {
      console.log("Chat list updated:", data);
    };

    /* ===============================
       REGISTER EVENTS
    ================================= */

    socket.on("online_users_list", handleOnlineUsersList);
    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);
    socket.on("user_typing", handleUserTyping);
    socket.on("messages_read", handleMessagesRead);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("chat_list_update", handleChatListUpdate);

    return () => {
      socket.off("online_users_list", handleOnlineUsersList);
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
      socket.off("user_typing", handleUserTyping);
      socket.off("messages_read", handleMessagesRead);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("chat_list_update", handleChatListUpdate);
      socket.disconnect();
    };
  }, [userId, socket]);

  /* ===============================
     SOCKET ACTIONS
  ================================= */

  const joinRoom = useCallback(
    (conversationId: string) => {
      socket.emit("join_room", conversationId);
    },
    [socket],
  );

  const leaveRoom = useCallback(
    (conversationId: string) => {
      socket.emit("leave_room", conversationId);
    },
    [socket],
  );

  const sendMessage = useCallback(
    (data: SendMessagePayload) => {
      socket.emit("send_message", data);
    },
    [socket],
  );

  const startTyping = useCallback(
    (conversationId: string) => {
      socket.emit("typing_start", { conversationId });
    },
    [socket],
  );

  const stopTyping = useCallback(
    (conversationId: string) => {
      socket.emit("typing_stop", { conversationId });
    },
    [socket],
  );

  const markAsRead = useCallback(
    (conversationId: string) => {
      socket.emit("mark_read", { conversationId });
    },
    [socket],
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        typingUsers,
        joinRoom,
        leaveRoom,
        sendMessage,
        startTyping,
        stopTyping,
        markAsRead,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

// "use client";

// import { createContext, useContext, useEffect } from "react";
// import { Socket } from "socket.io-client";
// import { getSocket } from "@/libs/socket";

// interface SocketContextType {
//   socket: Socket | null;
// }

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
// });

// export const SocketProvider = ({
//   children,
//   userId,
// }: {
//   children: React.ReactNode;
//   userId: number | null;
// }) => {
//   const socket = getSocket(); // AMAN karena bukan ref

//   useEffect(() => {
//     if (!userId) return;

//     if (!socket.connected) {
//       socket.connect();
//     }

//     socket.emit("register_user", userId);

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, socket]);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);
