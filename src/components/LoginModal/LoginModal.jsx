import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onCloseModal, onLogin, errorMessage }) => {
  const { values, handleChange, reset } = useForm({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) reset({ email: "", password: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const isEmailValid =
      values.email.includes("@") && values.email.includes(".");
    const isPasswordValid = values.password.length >= 8;
    setIsValid(isEmailValid && isPasswordValid);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values, reset);
  };

  return (
    <ModalWithForm
      buttonText="Log In"
      title="Log In"
      modalName="login"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
