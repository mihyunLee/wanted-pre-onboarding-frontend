import React from "react";
import styled from "styled-components";

export default function Title({ children }) {
  return <TitleText>{children}</TitleText>;
}

const TitleText = styled.h1`
  font-size: 36px;
  font-weight: 700px;
  text-align: center;
  margin: 72px 0;
`;
