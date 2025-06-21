import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000', // 后端API地址
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 处理未授权
          break
        case 404:
          // 处理资源不存在
          break
        case 500:
          // 处理服务器错误
          break
        default:
          console.error('请求错误:', error)
      }
    }
    return Promise.reject(error)
  }
)

export default api