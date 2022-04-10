import React from 'react';

interface SearchFormProps {
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

function SearchForm({
  handleSearchSubmit,
  handleSearchInput,
  inputValue,
}: SearchFormProps) {
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        onChange={handleSearchInput}
        placeholder="Enter a term"
        name="search-query"
        value={inputValue}
        type="text"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
