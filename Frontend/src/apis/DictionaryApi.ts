import { publicRequest } from '@src/hooks/requestMethod'

export const fetchWords = async () => {
  return await publicRequest.get(
    'http://localhost:8080/api/v1/dictionary/get/list',
  )
}
