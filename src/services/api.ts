import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { BASE_URL, REQUEST_TIMEOUT } from '../const';
import { getToken } from './token';
import { toast } from 'react-toastify';

type ErrorResponseType = {
  type: string;
  message: string;
}

const StatusCodesMap: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.UNAUTHORIZED]: true,
};

const shouldRenderError = (response: AxiosResponse) => !!StatusCodesMap[response.status];

const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ErrorResponseType>) => {
      if (error.response && shouldRenderError(error.response)) {
        toast.warn(error.response.data.message);
      }

      throw error;
    }
  );

  return api;
};

const api = createAPI();

export { api };
