import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useURLBasedSearch from '../../hooks/useURLBasedSearch';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  changePage,
  clearCache,
  searchArticles,
} from '../../store/articleSlice';
import SearchForm from './SearchForm';
import SearchPagination from './SearchPagination';
import SearchResults from './SearchResults';

const Container = styled.div`
  margin: 0 auto;
`;

function Search() {
  const { currentPage, articles, lastSearchQuery, fetching } = useAppSelector(
    (state) => state.articleReducer,
  );
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [queryInput, setQueryInput] = useState('');

  useURLBasedSearch(queryInput, setQueryInput);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // On new search, clear stored pages
    dispatch(clearCache());
    dispatch(searchArticles({ query: queryInput, page: 0 }));
    setSearchParams(`q=${queryInput}&page=0`);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (fetching) return;

    let newPage;
    if (event.currentTarget.id === 'prev') {
      newPage = currentPage - 1;
    } else {
      newPage = currentPage + 1;
    }

    setSearchParams(`q=${lastSearchQuery}&page=${newPage}`);
    // Check if we have that page already in the store
    if (articles[newPage]?.length) {
      dispatch(changePage({ page: newPage }));
      return;
    }
    // If we don't, fetch from API
    dispatch(searchArticles({ query: lastSearchQuery, page: newPage }));
  };

  return (
    <Container>
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        onSearchInputChange={handleSearchInput}
        inputValue={queryInput}
      />
      <SearchPagination onChangePage={handleChangePage} />
      <SearchResults />
    </Container>
  );
}

export default Search;
