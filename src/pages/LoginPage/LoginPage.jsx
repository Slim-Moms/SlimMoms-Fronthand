import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
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

  const handleLogin = async (values, { setFieldValue }) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      const email = values.email;
      const nameFromEmail = email.split("@")[0];
      dispatch({
        type: "auth/setUser",
        payload: {
          name: nameFromEmail,
          email: email,
        }
      });
      
      toast.success("Successfully logged in");
      navigate("/diary");
    } else if (login.rejected.match(result)) {
      const errorMessage = result.payload || "Login failed. Please try again.";
      toast.error(errorMessage);
      setFieldValue('password', '');
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
