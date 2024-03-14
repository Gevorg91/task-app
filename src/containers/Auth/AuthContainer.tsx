import React, { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import { useAuth } from "../../hooks/useAuth";
import { RegisterPayload } from "../../payload/AuthPayload";
import { useNavigate } from "react-router-dom";

function AuthContainer() {
  const { login, register } = useAuth();
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const isLogin = await login(email, password);
    if (isLogin) {
      navigate("/");
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    passwordConfirm: string,
  ) => {
    let payload: RegisterPayload = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      firstName: firstName,
      lastName: lastName,
    };
    register(payload);
  };

  return (
    <div>
      {isLoginScreen ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <RegisterForm onRegister={handleRegister} />
      )}
      <button onClick={() => setIsLoginScreen(!isLoginScreen)}>
        {isLoginScreen ? "Register" : "Login"}
      </button>
    </div>
  );
}

export default AuthContainer;
