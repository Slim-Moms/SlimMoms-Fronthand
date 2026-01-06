import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const handleRegister = async (values, { setFieldValue }) => {
    const payload = {
      name: values.username || values.name,
      email: values.email,
      password: values.password,
    };
    const result = await dispatch(register(payload));
    if (register.fulfilled.match(result)) {
      toast.success("Successfully registered and logged in");
      navigate("/diary");
    } else if (register.rejected.match(result)) {
      const errorMessage = result.payload || "Registration failed. Please try again.";
      toast.error(errorMessage);
      setFieldValue('password', '');
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
