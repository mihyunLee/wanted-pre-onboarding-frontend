import React, { useState } from "react";
import { postSignin } from "../../api/signinApi";
import { useNavigate } from "react-router-dom";
import useUserValidation from "../../hooks/useUserValidation";

export default function SignInPage() {
  const [email, emailError, handleChangeEmail] = useUserValidation("", "email");
  const [password, passwordError, handleChangePassword] = useUserValidation(
    "",
    "password"
  );
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailError && !passwordError) {
      try {
        await postSignin({ email: email, password: password }).then((res) => {
          localStorage.setItem("token", JSON.stringify(res.access_token));
          navigate("/todo", { replace: false });
        });
      } catch {
        setUserError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user-email">이메일</label>
      <input
        id="user-email"
        type="email"
        data-testid="email-input"
        value={email}
        onChange={handleChangeEmail}
      />
      <span>{emailError}</span>
      <label htmlFor="user-pw">비밀번호</label>
      <input
        id="user-pw"
        type="password"
        data-testid="password-input"
        value={password}
        onChange={handleChangePassword}
      />
      <span>{passwordError}</span>
      <span>{userError}</span>
      <button
        data-testid="signin-button"
        disabled={emailError || passwordError}
      >
        로그인
      </button>
    </form>
  );
}
