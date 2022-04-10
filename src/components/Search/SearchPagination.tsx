import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import Button from '../Button';
import Spinner from '../Spinner';

const Container = styled.div`
  margin: 5rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  padding: 0 1rem;
`;

const PageDisplay = styled.span`
  font-size: 1.8rem;
  text-transform: uppercase;
  color: white;
`;

interface SearchPaginationProps {
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function SearchPagination({ onChangePage }: SearchPaginationProps) {
  const { currentPage, searchHits, fetching } = useAppSelector(
    (state) => state.articleReducer,
  );
  const previousPageAvailable = currentPage > 0;
  const nextPageAvailable = currentPage * 10 < searchHits;

  return (
    <Container>
      <Button
        disabled={!previousPageAvailable}
        id="prev"
        onClick={onChangePage}
      >
        prev page
      </Button>
      {fetching ? <Spinner /> : <PageDisplay>page: {currentPage}</PageDisplay>}
      <Button disabled={!nextPageAvailable} id="next" onClick={onChangePage}>
        next page
      </Button>
    </Container>
  );
}

export default SearchPagination;
