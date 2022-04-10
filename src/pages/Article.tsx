import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ArticleContent from '../components/ArticleContent';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store';
import { ArticleType, getArticleByURI } from '../store/articleSlice';

const Container = styled.div`
  background-color: var(--color-black);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Article() {
  const { articlesByURI, fetching } = useAppSelector(
    (state) => state.articleReducer,
  );
  const [currentArticle, setCurrentArticle] = useState<ArticleType | null>(
    null,
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uri = searchParams.get('uri');

    if (uri) {
      const articleInStore = articlesByURI[uri];

      if (articleInStore) {
        setCurrentArticle(articleInStore);
      } else if (!fetching) {
        dispatch(getArticleByURI({ uri }));
      }
    } else {
      // If no URI provided, redirect to home
      navigate('/', { replace: true });
    }
  }, [articlesByURI]);

  return currentArticle ? (
    <Container>
      <Header pageTitle={currentArticle.headline.main} />
      <ArticleContent article={currentArticle} />
    </Container>
  ) : (
    <Container>
      <Header pageTitle="Loading..." />
    </Container>
  );
}

export default Article;
