import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { searchArticles } from '../store/articleSlice';

const useURLBasedSearch = (
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
) => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentPage, articles, fetching } = useAppSelector(
    (state) => state.articleReducer,
  );

  useEffect(() => {
    const searchQueryParam = searchParams.get('q');
    const searchPageParam = Number(searchParams.get('page'));
    const searchCachedParam = searchParams.get('cached');
    const isCachedSearch =
      searchQueryParam &&
      searchPageParam > -1 &&
      searchCachedParam &&
      articles[currentPage]?.length;

    const isURLSearch = searchQueryParam && !query;

    if (isURLSearch && !fetching && !isCachedSearch) {
      dispatch(
        searchArticles({ query: searchQueryParam, page: searchPageParam }),
      );
    }

    if (searchQueryParam) {
      setQuery(searchQueryParam);
    }
  }, []);
};

export default useURLBasedSearch;