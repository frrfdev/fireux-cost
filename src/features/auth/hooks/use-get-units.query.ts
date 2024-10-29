import { getUnits } from '@/features/unit/actions/get-units';
import { useQuery } from '@tanstack/react-query';

export const useGetUnitsQuery = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: () => getUnits(),
  });
};
