import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useURLBasedSearch from '../../hooks/useURLBasedSearch';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  changePage,
  clearCache,
  searchArticles,
} from '../../store/articleSlice';
import SearchForm from './SearchForm';

function ArticleSearch() {
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

  const { currentPage, articles, searchHits, lastSearchQuery } = useAppSelector(
    (state) => state.articleReducer,
  );

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const articlesAvailable = !!articles[currentPage]?.length;
  const previousPageAvailable = currentPage > 0;
  const nextPageAvailable = currentPage * 10 < searchHits;

  return (
    <div>
      {articlesAvailable && <h3>Results page: {currentPage}</h3>}
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleSearchInput={handleSearchInput}
        inputValue={queryInput}
      />
      <br />
      <br />
      <ul>
        {articles[currentPage]?.map((article) => (
          <li key={article.uri}>
            <span>{article.headline.main} </span>
            <Link
              to={{
                pathname: '/article',
                search: `?uri=${article.uri}&q=${lastSearchQuery}&page=${currentPage}`,
              }}
            >
              Read article
            </Link>
          </li>
        ))}
      </ul>
      {previousPageAvailable && (
        <button id="prev" type="button" onClick={handleChangePage}>
          prev page
        </button>
      )}
      {nextPageAvailable && (
        <button id="next" type="button" onClick={handleChangePage}>
          next page
        </button>
      )}
    </div>
  );
}

export default ArticleSearch;
