import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ArticleType } from '../store/articleSlice';
import ArrowLeft from '../assets/arrow-left.svg';

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Container = styled.article`
  max-width: var(--max-content-width);
  margin: 0 1rem 5rem 1rem;
`;

const Text = styled.p`
  margin: 4rem 0;
  font-size: 1.8rem;
  text-align: left;
  color white;
`;

const PublicationDate = styled.p`
  margin-bottom: 1.8rem;
  font-size: 1.5rem;
  text-align: left;
  color white;
`;

const ArrowIcon = styled.img`
  height: 1.2rem;
  color: white;
  fill: white;
  margin-right: 1rem;
`;

const LinkStyles = css`
  font-size: 1.8rem;
`;

const StyledLink = styled(Link)`
  ${LinkStyles}
`;

const ExternalLink = styled.a`
  ${LinkStyles}
`;

interface ArticleContentProps {
  article: ArticleType;
}

function ArticleContent({ article }: ArticleContentProps) {
  const [searchParams] = useSearchParams();

  const getNavigateBackLink = () => {
    const query = searchParams.get('q');
    const page = searchParams.get('page');

    if (query && page) {
      return `/?q=${query}&page=${page}&cached=true`;
    }
    return '/';
  };

  let articleDate;
  if (article) {
    articleDate = new Date(article.pub_date);
  }

  const hasImage = !!article?.multimedia[0]?.url;

  return (
    <Container>
      <StyledLink to={getNavigateBackLink()}>
        <ArrowIcon src={ArrowLeft} alt="arrow left" />
        Back to search
      </StyledLink>
      <PublicationDate>{articleDate?.toDateString()}</PublicationDate>
      {hasImage && (
        <Img
          src={`https://www.nytimes.com/${article.multimedia[0].url}`}
          width={article.multimedia[0]?.width}
          height={article.multimedia[0]?.height}
          alt={article.headline.main}
        />
      )}
      <Text>{article.lead_paragraph}</Text>
      <ExternalLink href={article.web_url} target="_blank" rel="noreferrer">
        Read full article on New York Times&apos; site
      </ExternalLink>
    </Container>
  );
}

export default ArticleContent;
