// src/pages/LoginPage/LoginPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import LoginForm from "../../components/LoginForm/LoginForm";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/diary");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (values) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      navigate("/diary");
    }
  };

  return (
    <main className={s.pageWrapper}>
      <div className={s.container}>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </main>
  );
};

export default LoginPage;
