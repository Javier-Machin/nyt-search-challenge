import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';

function Article() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('id'));

  return (
    <div>
      <Header pageTitle="Some news article title" />
      <h2>Hi from Article</h2>
    </div>
  );
}

export default Article;
