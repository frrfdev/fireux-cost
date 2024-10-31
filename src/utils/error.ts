import { AxiosError } from 'axios';

import { StrapiApiError } from '@/types/strapi-api-error';
import { toast } from '@/hooks/use-toast';

export const ErrorHandler = (error: AxiosError) => {
  if (!error.response) {
    return toast({
      title: 'Erro',
      description: error.message,
      variant: 'destructive',
    });
  }
  if (typeof error.response?.data === 'string') {
    return toast({
      title: 'Erro',
      description: error.message,
      variant: 'destructive',
    });
  }
  if (error.response.data as StrapiApiError) {
    return toast({
      title: 'Erro',
      description: (error.response.data as StrapiApiError).error.message,
      variant: 'destructive',
    });
  }

  return toast({ title: 'Erro', description: 'Ocorreu um erro inesperado' });
};
