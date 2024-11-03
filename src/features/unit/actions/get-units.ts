import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-response';
import { Unit } from '../types/Unit';
import { Pagination } from '@/types/pagination';
import { useFakeProductApiStore } from '@/features/product/stores/use-fake-product-api-store';

export type GetUnitsProps = {
  pagination: Pagination;
};

export const getUnits = async ({ pageParam = 1 }: { pageParam: number }) => {
  const getUnits = useFakeProductApiStore.getState().getUnits;
  const units = useFakeProductApiStore.getState().units;

  if (!localStorage.getItem('TOKEN')) {
    const response = getUnits({
      pagination: {
        page: pageParam,
        pageSize: 25,
      },
    });

    return {
      data: response,
      meta: {
        pagination: {
          page: pageParam,
          pageSize: 25,
          total: units.length,
          pageCount: units.length / 25,
        },
      },
    } as ApiResponse<Unit[]>;
  }

  const response = await api.get<ApiResponse<Unit[]>>('/api/units', {
    params: {
      pagination: {
        page: pageParam,
        pageSize: 25,
      },
    },
  });
  return response.data;
};
