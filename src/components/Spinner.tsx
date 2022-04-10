import React from 'react';
import styled from 'styled-components';

const SpinnerElement = styled.div`
  border: 0.6rem solid white;
  border-top: 0.6rem solid var(--color-blue);
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner() {
  return <SpinnerElement />;
}
export default Spinner;
