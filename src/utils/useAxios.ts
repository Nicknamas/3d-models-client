import axios, { type AxiosInstance } from "axios";
import { inject, provide } from "vue";
import { useRouter } from "vue-router";

export function useAxios(): AxiosInstance {
  const existingData = inject<AxiosInstance>('axios')
  const router = useRouter()

  if (existingData) {
    return existingData
  }

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
  })

  instance.interceptors.response.use(
  function (config) {
    return config
  },
  function (error) {
    if (error.status === 401) {
      router.push({ name: 'Login' })
    }
    return error
  })

  provide('axios', instance)

  return instance
}
