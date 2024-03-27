import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/'

axios.defaults.withCredentials = true
const accessToken = localStorage.getItem('accessToken')

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: accessToken,
  },
})

// publicRequest.interceptors.request.use(
//   config => {
//     if (!config.headers.Authorization) {
//       config.headers['Authorization'] = accessToken
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   },
// )

// publicRequest.interceptors.response.use(
//   response => {
//     return response
//   },
//   async error => {
//     if (error.response?.status === 403) {
//       console.log('토큰 없음')
//       console.log(error)

//       error.config.headers = {
//         Authorization: accessToken,
//       }
//     } else if (error.response?.status === 401) {
//       console.log('토큰 만료')
//       console.log(error)
//     } else {
//       return error
//     }
//   },
// )
