import React from "react";
import UserForm from "../../components/UserForm";
import styled from "styled-components";
import Title from "../../components/Title";

export default function SignUpPage() {
  return (
    <Container>
      <Title>회원가입</Title>
      <UserForm />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
