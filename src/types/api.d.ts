// types/api.ts
export interface ApiMeta {
  status: number;
  message: string;
}

export interface ApiResponse<T = null> {
  meta: ApiMeta;
  data: T;
}

export interface saveFcmToken {
  token: string;
}
