import React from 'react';
import Header from '../components/Header';
import ArticleSearch from '../components/ArticleSearch';

function Home() {
  return (
    <div>
      <Header pageTitle="New York Times Search" />
      <ArticleSearch />
    </div>
  );
}

export default Home;
