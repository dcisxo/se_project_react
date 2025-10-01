import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const reset = (newValues = {}) => {
    setValues(newValues);
  };

  return { values, handleChange, setValues, reset };
}
