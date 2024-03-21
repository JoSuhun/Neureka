import { publicRequest } from '@src/hooks/requestMethod'

export const fetchCompanyList = async () => {
  return await publicRequest
    .get('company/list')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchCompanyPrice = async (code: string) => {
  return await publicRequest
    .get(`company/stock/price?code=${code}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
