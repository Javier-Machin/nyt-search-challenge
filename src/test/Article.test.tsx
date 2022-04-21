/* eslint-disable max-len */
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../components/App';
import { searchMockResponse } from './mocks/mockData';

const server = setupServer(
  rest.get(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    (req, res, ctx) =>
      res(
        ctx.json({
          response: searchMockResponse,
        }),
      ),
  ),
);

beforeAll(() => server.listen());
beforeEach(() =>
  render(
    <MemoryRouter
      initialEntries={[
        '/article?uri=nyt://article/7bd241d9-2109-5d74-b33d-7e4ba929f9de&q=elections&page=0',
      ]}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
  ),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('from the initial state', () => {
  test('renders the go back to search link', async () => {
    await waitFor(async () => {
      const backToSearch = screen.getByText('Back to search');
      expect(backToSearch).toBeInTheDocument();
    });
  });

  test('renders the nyt external link back', async () => {
    await waitFor(async () => {
      const externalLink = screen.getByText(
        "Read full article on New York Times' site",
      );
      expect(externalLink).toBeInTheDocument();
    });
  });

  test("renders the article's title", async () => {
    await waitFor(async () => {
      const articleTitle = screen.getByText('‘This Was Trump Pulling a Putin’');
      expect(articleTitle).toBeInTheDocument();
    });
  });

  test("renders the article's text", async () => {
    await waitFor(async () => {
      const articleText = screen.getByText(
        'beginning the process of obtaining NATO membership.',
      );
      expect(articleText).toBeInTheDocument();
    });
  });
});
