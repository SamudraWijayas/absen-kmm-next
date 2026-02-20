"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/libs/socket";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: Set<number>;
  typingUsers: Record<string, Set<number>>; // conversationId -> set of userId
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: new Set(),
  typingUsers: {},
});

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

  // Derived state: include current user if connected
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

    // Register diri sendiri
    socket.emit("register_user", userId);

    // ======================================
    // Online / Offline
    // ======================================
    const handleUserOnline = ({ userId }: { userId: number }) => {
      setOnlineUsersState((prev) => new Set(prev).add(userId));
    };

    const handleUserOffline = ({ userId }: { userId: number }) => {
      setOnlineUsersState((prev) => {
        const copy = new Set(prev);
        copy.delete(userId);
        return copy;
      });
    };

    // ======================================
    // Typing
    // ======================================
    const handleUserTyping = (data: {
      conversationId: string;
      userId: number;
      isTyping: boolean;
    }) => {
      setTypingUsers((prev) => {
        const copy: Record<string, Set<number>> = { ...prev };
        if (!copy[data.conversationId]) copy[data.conversationId] = new Set();
        if (data.isTyping) copy[data.conversationId].add(data.userId);
        else copy[data.conversationId].delete(data.userId);
        return copy;
      });
    };

    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);
    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.disconnect(); // disconnect saat unmount
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
      socket.off("user_typing", handleUserTyping);
    };
  }, [userId, socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, typingUsers }}>
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
