import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Article from '../pages/Article';
import Home from '../pages/Home';

const Container = styled.div`
  text-align: center;
`;

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="article" element={<Article />} />
      </Routes>
    </Container>
  );
}

export default App;
