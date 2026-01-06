import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/diary");
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = async (values) => {
    const payload = {
      name: values.username || values.name,
      email: values.email,
      password: values.password,
    };
    const result = await dispatch(register(payload));
    if (register.fulfilled.match(result)) {
      navigate("/diary");
    }
  };

  return (
    <main className={s.pageWrapper}>
      <div className={s.container}>
        <RegistrationForm onSubmit={handleRegister} />
      </div>
    </main>
  );
};

export default RegistrationPage;
