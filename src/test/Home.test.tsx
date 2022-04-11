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
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('from the initial state', () => {
  beforeEach(() =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    ),
  );

  test('renders the title', () => {
    const pageTitle = screen.getByText('New York Times Search');
    expect(pageTitle).toBeInTheDocument();
  });

  test('the user can make a new search', async () => {
    const searchInput = screen.getByPlaceholderText('Enter a term');
    const submitButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'elections' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const detailsViewLink = screen.getAllByText('Read more')[0];
      expect(detailsViewLink).toBeInTheDocument();
    });
  });
});

test('it supports url based search', async () => {
  render(
    <MemoryRouter initialEntries={['/?q=president&page=0']}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
  );

  await waitFor(() => {
    const detailsViewLink = screen.getAllByText('Read more')[0];
    expect(detailsViewLink).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(
      'Enter a term',
    ) as HTMLInputElement;
    expect(searchInput.value).toBe('president');
  });
});
