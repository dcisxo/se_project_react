import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onCloseModal, onRegister, errorMessage }) => {
  const { values, handleChange, reset } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) reset({ name: "", avatar: "", email: "", password: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const isNameValid = values.name.trim().length >= 2;
    const isAvatarValid = values.avatar.startsWith("http");
    const isEmailValid =
      values.email.includes("@") && values.email.includes(".");
    const isPasswordValid = values.password.length >= 8;
    setIsValid(isNameValid && isAvatarValid && isEmailValid && isPasswordValid);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values, reset);
  };

  return (
    <ModalWithForm
      buttonText="Sign Up"
      title="Sign Up"
      modalName="register"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
    >
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
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

export default RegisterModal;
