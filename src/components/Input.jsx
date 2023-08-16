import React from "react";
import styled from "styled-components";

export default function Input({
  id,
  type,
  labelText,
  value,
  onChange,
  errorMsg,
}) {
  return (
    <>
      <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
      <StyledInput
        id={id}
        type={type}
        data-testid={id}
        value={value}
        onChange={onChange}
      />
      <ErrorMsg>{errorMsg}</ErrorMsg>
    </>
  );
}

const StyledLabel = styled.label`
  display: block;
  margin: 10px 0;
`;

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

const ErrorMsg = styled.span`
  color: var(--warning);
  font-size: 12px;
`;
