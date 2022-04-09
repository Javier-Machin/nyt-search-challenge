/* eslint-disable no-console */
import axios from 'axios';

const SEARCH_REQUIRED_FIELDS = ['uri', 'headline'];
const ARTICLE_REQUIRED_FIELDS = ['headline'];
const NYT_API_URL = 'https://api.nytimes.com/svc/search/v2/';

const axiosInstance = axios.create({
  baseURL: NYT_API_URL,
  timeout: 6000,
});

const searchArticlesAPI = async (query: string, page: number) => {
  try {
    const response = await axiosInstance.get(
      `articlesearch.json?q=${query}&fq=document_type:("article")&page=${page}&api-key=${
        process.env.REACT_APP_NYT_API_KEY
      }&fl=${SEARCH_REQUIRED_FIELDS.join(',')}`,
    );

    return response.data.response;
  } catch (e) {
    console.log(e);
    return null;
  }
};
/*
  Using URI instead of id as the field in the response is called _id,
  by convention a private key
*/
const getArticleByURIAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `articlesearch.json?fq=_id:(${id})&api-key=${
        process.env.REACT_APP_NYT_API_KEY
      }&fl=${ARTICLE_REQUIRED_FIELDS.join(',')}`,
    );

    return response.data.response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { searchArticlesAPI, getArticleByURIAPI };
