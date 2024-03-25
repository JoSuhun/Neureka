import { pythonRequest } from "@src/hooks/pythonMethod";
import { publicRequest } from "@src/hooks/requestMethod";
import { Category } from "@src/types/MainType";

export const fetchKeywords = async (categories: Category[]) => {
  const queryString = categories.map(category => `keywords=${category.name}`).join('&');
  return await publicRequest.get(`keyword?${queryString}`);
}

export const fetchKeywordArticles = async (links: string[]) => {
  return await pythonRequest.post('news/api/keyword_article/', {"links":links})
};