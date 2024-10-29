import axios, { AxiosError } from 'axios';
import { StrapiApiError } from '../types/strapi-api-error';
import { ErrorHandler } from '@/utils/error';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/local`,
      { identifier: email, password }
    );

    return {
      data: response.data,
      status: 'success',
      statusCode: response.status,
    };
  } catch (error) {
    ErrorHandler(error as AxiosError);
    return {
      data: null,
      status: 'error',
      message: ((error as AxiosError).response?.data as StrapiApiError).error
        .message,
      statusCode: 500,
    };
  }
};
