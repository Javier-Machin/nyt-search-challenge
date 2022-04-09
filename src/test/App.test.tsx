import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../components/App';

test('renders the title', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
  const pageTitle = screen.getByText('New York Times Search');
  expect(pageTitle).toBeInTheDocument();
});
