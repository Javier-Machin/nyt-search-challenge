import React from 'react';
import styled from 'styled-components';

const ButtonElement = styled.button`
  background-color: var(--color-black);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  border: 2px solid var(--color-blue);
  font-size: 1.8rem;
  text-transform: uppercase;
  cursor: pointer;

  :focus {
    border: 2px solid white;
    outline: none;
  }

  :disabled {
    border-color: gray;
    color: gray;
  }
`;

export interface ButtonProps {
  id?: string;
  submit?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({ children, submit, id, onClick, disabled }: ButtonProps) {
  return (
    <ButtonElement
      disabled={disabled}
      id={id}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </ButtonElement>
  );
}

Button.defaultProps = {
  id: '',
  submit: false,
  onClick: Function.prototype,
  disabled: false,
};

export default Button;
