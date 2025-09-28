import axios, { type AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Para Vite

export function useFetch<T = never>(url: string, config: AxiosRequestConfig = {}) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios({
        url: `${API_URL}${url}`,
        ...config
      });
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
