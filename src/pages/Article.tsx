import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store';
import { ArticleType, getArticleByURI } from '../store/articleSlice';

const Container = styled.div`
  background-color: var(--color-black);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const ArticleContent = styled.article`
  max-width: var(--max-content-width);
  margin: 0 1rem;
`;

const Text = styled.p`
  margin: 3rem 0 0 0;
  padding-bottom: 3rem;
  font-size: calc(2rem + 2vmin);
  text-align: left;
  color white;
`;

const PublicationDate = styled.p`
  margin-bottom: 2rem;
  font-size: calc(0.8rem + 2vmin);
  text-align: left;
  color white;
`;

function Article() {
  const [currentArticle, setCurrentArticle] = useState<ArticleType | null>(
    null,
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { articlesByURI, fetching } = useAppSelector(
    (state) => state.articleReducer,
  );

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

  const getNavigateBackLink = () => {
    const query = searchParams.get('q');
    const page = searchParams.get('page');

    if (query && page) {
      return `/?q=${query}&page=${page}&cached=true`;
    }
    return '/';
  };

  let articleDate;
  if (currentArticle) {
    articleDate = new Date(currentArticle.pub_date);
  }

  const hasImage = !!currentArticle?.multimedia[0]?.url;

  return currentArticle ? (
    <Container>
      <Header pageTitle={currentArticle.headline.main} />
      <ArticleContent>
        <PublicationDate>{articleDate?.toDateString()}</PublicationDate>
        {hasImage && (
          <Img
            src={`https://www.nytimes.com/${currentArticle.multimedia[0].url}`}
            width={currentArticle.multimedia[0]?.width}
            height={currentArticle.multimedia[0]?.height}
            alt={currentArticle.headline.main}
          />
        )}
        <Text>{currentArticle.lead_paragraph}</Text>
        <Link to={getNavigateBackLink()}>Back to search</Link>
      </ArticleContent>
    </Container>
  ) : (
    <Container>
      <Header pageTitle="Loading..." />
    </Container>
  );
}

export default Article;
