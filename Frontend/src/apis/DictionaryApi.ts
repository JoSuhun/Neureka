import { publicRequest } from '@src/hooks/requestMethod'

export const fetchWords = async () => {
  return await publicRequest.get('dictionary/get/list')
}
