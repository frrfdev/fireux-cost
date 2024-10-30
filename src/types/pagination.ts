export type Pagination = {
  sort?: string;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  fields?: string;
  populate?: string;
  filters?: Record<string, string | number | boolean>;
};
