import { pythonRequest } from "@src/hooks/pythonMethod";
import { Category } from "@src/types/MainType";

export const fetchKeywords = async (categories: Category[]) => {
  // const params = new URLSearchParams();

  // categories.forEach(category => {
  //   params.append('keywords', category.name);
  // });
  // console.log(params)
  // return await pythonRequest.get('news/api/bubble/', { params });
  // 각 카테고리 이름을 쿼리 파라미터로 직접 추가합니다.
  const queryString = categories.map(category => `keywords=${category.name}`).join('&');
  
  // `axios`에 전체 URL을 문자열로 전달합니다.
  const response = await pythonRequest.get(`news/api/bubble/?${queryString}`);
  console.log(response)
  return response;
  
};