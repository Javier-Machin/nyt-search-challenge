import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { changePage, searchArticles, clearCache } from '../store/articleSlice';
import { useAppDispatch, useAppSelector } from '../store';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentPage, articles, searchHits, fetching, lastSearchQuery } =
    useAppSelector((state) => state.articleReducer);
  const [query, setQuery] = useState('');

  // URL based search
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

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // On new search, clear stored pages
    dispatch(clearCache());
    dispatch(searchArticles({ query, page: 0 }));
    setSearchParams(`q=${query}&page=${0}`);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    let newPage;

    if (event.currentTarget.id === 'prev') {
      newPage = currentPage - 1;
    } else {
      newPage = currentPage + 1;
    }

    setSearchParams(`q=${query}&page=${newPage}`);

    // Check if we have that page already in the store
    if (articles[newPage]?.length) {
      dispatch(changePage({ page: newPage }));
      return;
    }

    // If we don't, fetch from API
    dispatch(searchArticles({ query, page: newPage }));
  };

  const articlesAvailable = !!articles[currentPage]?.length;
  const previousPageAvailable = currentPage > 0;
  const nextPageAvailable = currentPage * 10 < searchHits;

  return (
    <div>
      <Header pageTitle="New York Times Search" />
      {articlesAvailable && <h3>Results page: {currentPage}</h3>}
      <form onSubmit={handleSearchSubmit}>
        <input
          onChange={handleSearchInput}
          placeholder="Enter a term"
          name="search-query"
          value={query}
          type="text"
          required
        />
        <button type="submit">Search</button>
      </form>
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

export default Home;
