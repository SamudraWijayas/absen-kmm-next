import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const chatService = {
  getListChat: (params?: string) =>
    instance.get(`${endpoint.CHAT}/list?${params}`),
  getPrivatChat: (receiverId: string) =>
    instance.get(`${endpoint.MESSAGE}/private/${receiverId}`),
  getGroupChat: (groupId: string) =>
    instance.get(`${endpoint.MESSAGE}/group/${groupId}`),
};

export default chatService;
