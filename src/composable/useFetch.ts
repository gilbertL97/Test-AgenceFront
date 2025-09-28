import axios, { type AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axiosInstance.defaults.headers.get.Accept = 'application/json';

export function useFetch<T = never>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchData = async <T>(endpoint = url, params?: Record<string, any>,
    config?: AxiosRequestConfig,) => {
    loading.value = true;
    error.value = null;
    try {
      const requestConfig: AxiosRequestConfig = {
        ...config,
        params: params,
      };
      const response = await axiosInstance.get<T>(
        endpoint,
        requestConfig
      );

      data.value = response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message || 'Error fetching data';
    } finally {
      loading.value = false;
    }
  };

  // // Opcional: fetch automático al crear
  fetchData();

  return { data, error, loading, fetchData };
}
