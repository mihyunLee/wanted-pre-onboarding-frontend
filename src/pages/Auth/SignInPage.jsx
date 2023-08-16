import React, { useState } from "react";
import { postSignin } from "../../api/signinApi";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postSignin({ email: email, password: password }).then((res) => {
        localStorage.setItem("token", JSON.stringify(res.access_token));
        navigate("/todo", { replace: false });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="email-input"
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        data-testid="password-input"
        value={password}
        onChange={handleChangePassword}
      />
      <button data-testid="signin-button">로그인</button>
    </form>
  );
}
