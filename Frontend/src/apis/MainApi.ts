import { publicRequest } from "@src/hooks/requestMethod";
import { Category } from "@src/types/MainType";

export const fetchKeywords = async (categories: Category[]) => {
  const queryString = categories.map(category => `keywords=${category.name}`).join('&');
  // const response = await publicRequest.get(`keyword?${queryString}`)
  // console.log(response.data)
  // return response
  return await publicRequest.get(`keyword?${queryString}`);
}

export const fetchKeywordArticles = async (ids: string[]) => {
  // const response = await publicRequest.post('news/keyword', {"ids":ids})
  // console.log(response.data)
  // return response
  return await publicRequest.post('news/keyword', {"ids":ids})
};