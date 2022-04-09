import React, { useState } from 'react';
import Header from '../components/Header';
import { changePage, searchArticles, clearCache } from '../store/articleSlice';
import { useAppDispatch, useAppSelector } from '../store';

function Home() {
  const dispatch = useAppDispatch();
  const { currentPage, articles, searchHits } = useAppSelector(
    (state) => state.articleReducer,
  );
  const [query, setQuery] = useState('');

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // On new search, clear stored pages
    dispatch(clearCache());
    dispatch(searchArticles({ query, page: 0 }));
  };

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newPage;

    if (e.currentTarget.id === 'prev') {
      newPage = currentPage - 1;
    } else {
      newPage = currentPage + 1;
    }

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
      <h2>Hi from Home</h2>
      {articlesAvailable && <h3>Results page: {currentPage + 1}</h3>}
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
          <li key={article.uri}>{article.headline.main}</li>
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
