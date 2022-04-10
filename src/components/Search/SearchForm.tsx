import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Form = styled.form`
  margin-bottom: 3rem;
  button {
    border-radius: 0 5px 5px 0;
  }
`;
const Input = styled.input`
  padding: 0.6rem 1rem;
  border-radius: 5px 0 0 5px;
  font-size: 1.8rem;
  border: 1px solid white;
`;

interface SearchFormProps {
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

function SearchForm({
  onSearchSubmit,
  onSearchInputChange,
  inputValue,
}: SearchFormProps) {
  return (
    <Form onSubmit={onSearchSubmit}>
      <Input
        onChange={onSearchInputChange}
        placeholder="Enter a term"
        name="search-query"
        value={inputValue}
        type="text"
        required
      />
      <Button submit>Search</Button>
    </Form>
  );
}

export default SearchForm;
