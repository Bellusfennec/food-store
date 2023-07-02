import { useState, useEffect } from "react";
import { parceYupError } from "../../utils/parceYupError";
import { createOrder } from "../../api/request";

export const useOrderForm = (initialState, validationSchema) => {
  const [values, setValues] = useState(initialState);
  const [schema] = useState(validationSchema);

  const [errors, setErrors] = useState({});

  const isValid = Object.keys(errors).length === 0;

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    schema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((yupError) => {
        const errors = parceYupError(yupError);
        setErrors(errors);
      });
  }, [values, schema]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setLoading(true);
      createOrder(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e.response);
        })
        .finally(() => setLoading(false));
    }
  };

  return {
    values,
    handleChange,
    loading,
    isValid,
    handleSubmit,
    errors,
  };
};
