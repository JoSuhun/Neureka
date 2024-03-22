import { pythonRequest } from "@src/hooks/pythonMethod";
import { Category, KeywordCount } from "@src/types/MainType";

export const fetchKeywords = async (categories: Category[]) => {
  const queryString = categories.map(category => `keywords=${category.name}`).join('&');
  
  // `axios`에 전체 URL을 문자열로 전달합니다.
  const response = await pythonRequest.get(`news/api/bubble/?${queryString}`);
  return response;
  
};

export const fetchKeywordArticles = async (links: string[]) => {
  const response = await pythonRequest.post('news/api/keyword_article/', {"links":links})
  // const response = await pythonRequest.post('news/api/keyword_article/')
  console.log(response)
  return response
}