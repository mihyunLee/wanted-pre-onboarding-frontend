import React from "react";
import { postSignup } from "../../api/signupApi";
import { useNavigate } from "react-router-dom";
import useUserValidation from "../../hooks/useUserValidation";

export default function SignInPage() {
  const [email, emailError, handleChangeEmail] = useUserValidation("", "email");
  const [password, passwordError, handleChangePassword] = useUserValidation(
    "",
    "password"
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailError && !passwordError) {
      try {
        await postSignup({ email: email, password: password });
        navigate("/signin");
      } catch (error) {
        console.log(error);
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
      <button
        data-testid="signup-button"
        disabled={emailError || passwordError}
      >
        회원가입
      </button>
    </form>
  );
}
