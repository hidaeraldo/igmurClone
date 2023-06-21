import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const clientID = import.meta.env.VITE_Client_ID;

  if (clientID) {
    config.headers = {
      ...config.headers,
      Authorization: `Client-ID ${clientID}`,
    };
  }
  return config;
});

export { axiosInstance };

export class ApiService {
  static async get<T>(
    path: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    try {
      const response = await axiosInstance.get(path, {
        params: params,
        headers: headers,
      });

      return ApiService.handleResponse(response);
    } catch (error: any) {
      return ApiService.handleError(error);
    }
  }
  static handleResponse(response: AxiosResponse): any {
    return response.data;
  }

  static handleError(error: AxiosError): never {
    const statusCode = error.response?.status;

    if (statusCode === 422) {
      throw {
        statusCode: 422,
        status: "unprocessable_entity",
        message: "Validation Failed",
      };
    } else {
      const responseData: any = error.response?.data;
      throw {
        statusCode: statusCode as number,
        status: responseData?.status,
        message: responseData?.data?.join(","),
      };
    }
  }
}
