import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IGroup, IPrivate, ISendMessage } from "@/types/Chat";

const chatService = {
  getListChat: (params?: string) =>
    instance.get(`${endpoint.CHAT}/list?${params}`),
  getMessage: (conversationId: string) =>
    instance.get(`${endpoint.MESSAGE}/${conversationId}`),
  getConversation: (conversationId: string) =>
    instance.get(`${endpoint.CONVERSATION}/${conversationId}`),

  sendMessage: (payload: ISendMessage) =>
    instance.post(endpoint.MESSAGE, payload),
  markAsRead: (conversationId: string) =>
    instance.post(`${endpoint.MESSAGE}/read`, {
      conversationId,
    }),

  addGroup: (payload: IGroup) =>
    instance.post(`${endpoint.CONVERSATION}/group`, payload),
  addPrivat: (payload: IPrivate) =>
    instance.post(`${endpoint.CONVERSATION}/private`, payload),
  deleteConversations: (conversationId: string) =>
    instance.delete(`${endpoint.CONVERSATION}/${conversationId}`),
};

export default chatService;
