import axios from 'axios'

// const BASE_URL = 'http://localhost:8000/'
const BASE_URL = 'http://j10c105.p.ssafy.io:8000/'

axios.defaults.withCredentials = true

export const pythonRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

