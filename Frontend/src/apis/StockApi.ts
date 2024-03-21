import { publicRequest } from '@src/hooks/requestMethod'

export const fetchCompanyList = async () => {
  return await publicRequest
    .get('company/list')
    .then(res => res.data)
    .catch(err => console.log(err))
}
