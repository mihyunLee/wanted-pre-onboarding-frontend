import React from "react";
import styled from "styled-components";

export default function Button({
  children,
  id,
  type = "submit",
  disabled,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      data-testid={id}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export const StyledButton = styled.button`
  background-color: var(--blue);
  width: 100%;
  padding: 14px;
  border-radius: 5px;
  font-size: inherit;
  margin: 14px 0;

  &:disabled {
    background-color: var(--gray500);
    cursor: auto;
  }
`;
