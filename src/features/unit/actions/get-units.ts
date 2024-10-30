import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-response';
import { Unit } from '../types/Unit';
import { Pagination } from '@/types/pagination';

export type GetUnitsProps = {
  pagination: Pagination;
};

export const getUnits = async ({ pageParam = 1 }: { pageParam: number }) => {
  const units = await api.get<ApiResponse<Unit[]>>('/api/units', {
    params: {
      pagination: {
        page: pageParam,
        pageSize: 25,
      },
    },
  });
  return units.data;
};
