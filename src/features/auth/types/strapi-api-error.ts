export type StrapiApiError = {
  data: null;
  error: {
    message: string;
    details: unknown;
    name: string;
    statusCode: number;
  };
};
