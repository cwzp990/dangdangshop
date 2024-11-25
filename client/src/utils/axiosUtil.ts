import axios from 'axios'
import type { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import config from '../config'
import storage from './storageUtil'
import router from '../router'

const SERVER_ERROR = 'address error: request server / network connect failed'

interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock?: boolean
}

type Method = 'get' | 'post' | 'delete' | 'patch' | 'put'
type ReqFn = (url: string, isMock: boolean, data?: any) => AxiosPromise<any>
interface ReqExec {
  get: ReqFn
  post: ReqFn
  delete: ReqFn
  patch: ReqFn
  put: ReqFn
}
const methods: Method[] = ['get', 'delete', 'patch', 'post', 'put']

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExec

  constructor() {
    this.request = {
      get: () => Promise.reject(SERVER_ERROR),
      post: () => Promise.reject(SERVER_ERROR),
      delete: () => Promise.reject(SERVER_ERROR),
      patch: () => Promise.reject(SERVER_ERROR),
      put: () => Promise.reject(SERVER_ERROR),
    }
    this.createAxiosInstance()
    this.beforeRequestIntercept()
    this.beforeResponseIntercept()
    this.reqPrepare()
  }

  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 6000 })
  }

  beforeRequestIntercept() {
    this.axiosInstance.interceptors.request.use(
      (req) => {
        const token = storage.get('token')
        const headers = req.headers

        if (!headers.Authorization && token)
          headers.Authorization = `Bearer ${token}`
        return req
      },
      (err) => {
        ElMessage.error(`request error: ${err}`)
      },
    )
  }

  private handleTokenResponseErr(msg: string) {
    if (msg.split(':')[0] === '401') {
      storage.remove('loginUser')
      storage.remove('token')
      router.push('/login')
    }
  }

  beforeResponseIntercept() {
    this.axiosInstance.interceptors.response.use(
      (res) => {
        const { msg, code } = res.data
        if (code === 200) {
          return res.data // match the server response data structure
        }
        else if (code === 500) {
          ElMessage.error(msg)
          this.handleTokenResponseErr(msg)
          return Promise.reject(msg)
        }
        else {
          ElMessage.error('error: unknown')
          return Promise.reject(msg)
        }
      },
      (err) => {
        ElMessage.error(`network error: ${err}`)
      },
    )
  }

  sendRequest(options: AxiosRequestConfig_) {
    if (config.env === 'production') {
      this.axiosInstance.defaults.baseURL = config.baseApi
    }
    else if (config.env === 'development') {
      const isMock: boolean = options.isMock || config.isMock
      this.axiosInstance.defaults.baseURL = isMock ? config.mockBaseApi : config.baseApi
    }

    return this.axiosInstance(options)
  }

  // TS: finish type of req method auto prompt
  reqPrepare() {
    methods.forEach((method) => {
      this.request[method] = (url, isMock, data) => {
        return this.sendRequest({
          url,
          method,
          data,
          isMock,
        })
      }
    })
  }
}

export default AxiosUtil.axiosUtil.request
