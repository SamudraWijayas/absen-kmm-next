// types/Chat.ts
interface IUser {
  id: number;
  nama: string;
  slug: string;
  password: string;
  hasPassword: boolean;
  jenjangId: string;
  kelasJenjangId: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  gol_darah: string;
  nama_ortu: string;
  mahasiswa: boolean;
  foto: string;
  kelompokId: string;
  desaId: string;
  daerahId: string;
  createdAt: string;
  updatedAt: string;
}

interface IMessage {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
  // bisa tambah properti lain sesuai kebutuhan
}

interface IGroup {
  id: number;
  name: string;
  description: string | null;
  createdById: number;
  createdAt: string;
  messages: IMessage[];
}

interface IPersonalChat {
  type: "personal";
  user: IUser;
  lastMessage: string | null;
  createdAt: string;
  unreadCount: number;
}

interface IGroupChat {
  type: "group";
  group: IGroup;
  lastMessage: string | null;
  createdAt: string;
  unreadCount: number;
}

type IChat = IPersonalChat | IGroupChat;

export interface IMessageSender {
  id: number;
  nama: string;
  slug: string;
  foto: string;
}

export interface IMessage {
  id: number;
  senderId: number;
  receiverId: number | null;
  groupId: number | null;
  content: string;
  createdAt: string;
  sender: IMessageSender;
  attachments: unknown[]; // ganti kalau sudah ada type
  reads: unknown[]; // ganti kalau sudah ada type
}

export interface IMessageResponse {
  meta: {
    status: number;
    message: string;
  };
  data: IMessage[];
}

export type {
  IChat,
  IUser,
  IGroup,
  IPersonalChat,
  IGroupChat,
  IMessageResponse,
  IMessage,
};
