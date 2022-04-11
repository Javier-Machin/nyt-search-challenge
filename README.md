# The New York Times Search

Small app making use of NYT' API to search news articles.

<img src=public/nyt-1.png alt="The New York Times app screenshot" width="100%"> 

<img src=public/nyt-2.png alt="The New York Times app screenshot" width="100%"> 

# How I approached the project

I decided to focus in the architecture and meeting the different requirements, in a way that creates a performant and scalable application, without falling too much into early optimization.

It's written in TypeScript, using create-react-app as the starting point.

Coding style and formatting is ensured via ESLint with Airbnb ruleset, enforced via a husky pre-commit hook.

In addition to the required and optional features, I added client side caching of the search result pages using the redux store, which lasts for the duration of the session or until a new search term is submitted, and caching of the details view for individual articles for the duration of the session.

In the tests the API calls are intercepted and mocked via Mock Service Worker (MSW).

There's another husky pre-commit hook which runs the tests.

The styles are just functional, with a CSS-in-JS approach, making sure the app remains usable in a different array of screen sizes and the accessibility is correct (can be used keyboard only, avoids low color contrast situations, as some examples).

It allows URL based search using the following pattern: `http://localhost:3000/?q=elections&page=1`

Replace `elections` with any other search term to specify the topic and `1` with any other 0 or higher number to specify the results page.

# Development

Node version: v16.14.2

## Setup

- Create a file named `.env` in the root of the project, add the variable `REACT_APP_NYT_API_KEY=` and set your NYT API key as the value.
- `npm install`
- `npm start` to run the development server
- `npm test` to run the tests, it will display a coverage report and generate a HTML version of it in the  `coverage` folder. Explore it by openning the `index.html` file found inside the folder with your web browser.
