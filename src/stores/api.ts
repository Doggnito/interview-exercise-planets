import { ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/axios";
import { CanceledError, type AxiosRequestConfig } from "axios";

export const useApiStore = defineStore("apiStore", () => {
  const controllers = ref(new Map());
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getWithCancel = async <T>(
    url: string,
    config?: AxiosRequestConfig<unknown> | undefined
  ): Promise<T | undefined> => {
    if (controllers.value.has(url)) {
      controllers.value.get(url).abort();
    }
    const controller = new AbortController();
    controllers.value.set(url, controller);
    loading.value = true;
    error.value = null;

    try {
      return (await api.get(url, { signal: controller.signal, ...config }))
        .data;
    } catch (err: unknown) {
      if (!(err instanceof CanceledError)) {
        error.value = "Failed to fetch data";
        console.error("Axios error:", err);
      }
    } finally {
      controllers.value.delete(url);
      loading.value = false;
    }
  };

  return {
    controllers,
    loading,
    error,
    getWithCancel,
  };
});
