import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.header`
  background-color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: white;
`;

const PageTitle = styled.h1`
  max-width: var(--max-content-width);
  border-bottom: 0.5rem solid white;
  padding-bottom: 1rem;
  margin-top: 2rem;
`;

interface HeaderProps {
  pageTitle: string;
}

function Header({ pageTitle }: HeaderProps) {
  return (
    <Container>
      <PageTitle>{pageTitle}</PageTitle>
    </Container>
  );
}

export default memo(Header);
