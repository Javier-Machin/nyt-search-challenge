import React from 'react';
import Header from '../components/Header';
import { changePage } from '../store/articleSlice';
import { useAppDispatch, useAppSelector } from '../store';

function Home() {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.articleReducer);

  return (
    <div>
      <Header pageTitle="New York Times Search" />
      <h2>Hi from Home</h2>
      <h3>Current page: {currentPage}</h3>
      <a href="#bla">link</a>
      <br />
      <br />
      <button
        type="button"
        onClick={() => dispatch(changePage({ currentPage: 1 }))}
      >
        Page 1
      </button>
    </div>
  );
}

export default Home;
