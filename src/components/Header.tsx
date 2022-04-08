import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.header`
  background-color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(0.5rem + 2vmin);
  color: white;
`;

const PageTitle = styled.h1`
  max-width: 120rem;
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