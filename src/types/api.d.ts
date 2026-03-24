// types/api.ts
export interface ApiMeta {
  status: number;
  message: string;
}

export interface ApiResponse<T = null> {
  meta: ApiMeta;
  data: T;
}

export interface PushSubscribePayload {
  endpoint?: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

