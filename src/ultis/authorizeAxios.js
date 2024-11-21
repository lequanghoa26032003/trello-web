import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './format'
const authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 10000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

// interceptor request: can thiệp vào giữa những cái req API
authorizedAxiosInstance.interceptors.request.use( (config) => {
  // chặn spam click
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// interceptor request: can thiệp vào giữa những cái res nhận về
authorizedAxiosInstance.interceptors.response.use( (response) => {
  // chặn spam click
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Mọi mã http status nằm ngoài 2xx sẽ là error và rơi vào đây
  // chặn spam click
  interceptorLoadingElements(true)
  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error?.response?.data?.message
  }
  if (error?.response?.status !==410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error)
})

export default authorizedAxiosInstance