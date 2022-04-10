import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Search from '../components/Search';

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--max-content-width);
`;

function Home() {
  return (
    <Container>
      <Header pageTitle="New York Times Search" />
      <Search />
    </Container>
  );
}

export default Home;
