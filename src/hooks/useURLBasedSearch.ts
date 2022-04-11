import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { searchArticles } from '../store/articleSlice';

const useURLBasedSearch = (
  queryInput: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
) => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentPage, articles, fetching } = useAppSelector(
    (state) => state.articleReducer,
  );

  useEffect(() => {
    const searchQueryParam = searchParams.get('q');
    let searchPageParam = Number(searchParams.get('page'));
    if (Number.isNaN(searchPageParam)) searchPageParam = 0;

    const searchCachedParam = searchParams.get('cached');
    const isCachedSearch =
      searchQueryParam &&
      searchPageParam > -1 &&
      searchCachedParam &&
      articles[currentPage]?.length;

    const isURLSearch = searchQueryParam && !queryInput;

    if (isURLSearch && !fetching && !isCachedSearch) {
      dispatch(
        searchArticles({
          query: searchQueryParam,
          page: Math.abs(searchPageParam),
        }),
      );
    }

    if (searchQueryParam) {
      setQuery(searchQueryParam);
    }
  }, []);
};

export default useURLBasedSearch;
