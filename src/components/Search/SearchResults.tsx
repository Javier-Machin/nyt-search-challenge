import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../store';

const Container = styled.div`
  color: white;
  margin-bottom: 5rem;
`;

const ResultItem = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 8fr 2fr;
  text-align: left;
  align-items: center;
  font-size: 1.8rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;

  a {
    transition: transform 0.2s linear;
    text-align: center;
    justify-self: flex-end;

    :hover,
    :focus {
      transform: translateY(-2px);
    }
  }
`;

const Headline = styled.span``;

function SearchResults() {
  const { currentPage, lastSearchQuery, articles } = useAppSelector(
    (state) => state.articleReducer,
  );

  const articlesAvailable = articles[currentPage]?.length;

  return articlesAvailable ? (
    <Container>
      {articles[currentPage].map((article) => (
        <ResultItem key={article.uri}>
          <Headline>{article.headline.main} </Headline>
          <Link
            to={{
              pathname: '/article',
              search: `?uri=${article.uri}&q=${lastSearchQuery}&page=${currentPage}`,
            }}
          >
            Read more
          </Link>
        </ResultItem>
      ))}
    </Container>
  ) : null;
}

export default SearchResults;
