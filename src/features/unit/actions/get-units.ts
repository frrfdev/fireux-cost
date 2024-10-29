import { api } from '@/lib/api';

export const getUnits = async () => {
  const units = await api.get('/api/units');
  return units;
};
