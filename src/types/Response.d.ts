interface ErrorResponse {
  meta: {
    status: number;
    message: string;
  };
  data: Record<string, string>;
}

export type { ErrorResponse };
