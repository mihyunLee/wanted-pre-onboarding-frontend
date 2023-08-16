import React, { useState } from "react";
import { postSignin } from "../api/signinApi";
import { postSignup } from "../api/signupApi";
import { useLocation, useNavigate } from "react-router-dom";
import useUserValidation from "../hooks/useUserValidation";
import Input from "./Input";
import styled from "styled-components";
import Button from "./Button";

export default function UserForm() {
  const [email, emailError, handleChangeEmail] = useUserValidation("", "email");
  const [password, passwordError, handleChangePassword] = useUserValidation(
    "",
    "password"
  );
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailError && !passwordError) {
      switch (pathname) {
        case "/signin":
          // 로그인
          try {
            await postSignin({ email: email, password: password }).then(
              (res) => {
                localStorage.setItem("token", res.access_token);
                navigate("/todo", { replace: false });
              }
            );
          } catch {
            setUserError("이메일 또는 비밀번호가 올바르지 않습니다.");
          }
          break;
        case "/signup":
          // 회원가입
          try {
            await postSignup({ email: email, password: password });
            alert("회원가입이 완료되었습니다.");
            navigate("/signin");
          } catch {
            setUserError("이미 가입된 이메일입니다.");
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        id="email-input"
        type="email"
        labelText="이메일"
        value={email}
        onChange={handleChangeEmail}
        errorMsg={emailError}
      />
      <Input
        id="password-input"
        type="password"
        labelText="비밀번호"
        value={password}
        onChange={handleChangePassword}
        errorMsg={passwordError}
      />
      <ErrorMsg>{userError}</ErrorMsg>
      <Button id={`${pathname}-button`} disabled={emailError || passwordError}>
        {pathname === "/signin" ? "로그인" : "회원가입"}
      </Button>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  width: clamp(390px, 100%, 760px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMsg = styled.span`
  color: var(--warning);
  font-size: 12px;
`;
