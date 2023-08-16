import React from "react";
import styled from "styled-components";

export default function Input({ id, type, value, onChange }) {
  return (
    <StyledInput
      id={id}
      data-testid={id}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}

const StyledInput = styled.input`
  color: var(--white);
  border-bottom: 2px solid var(--gray500);

  &:focus {
    border-bottom: 2px solid var(--blue);
    outline: none;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
