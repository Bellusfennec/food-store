/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { createForm, formToData, validatorForm } from "../utils/form";

const useForm = (initialState = {}, validateConfig = {}) => {
  const STATE_FORM = createForm(initialState, validateConfig);
  const [form, setForm] = useState(STATE_FORM);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  const handlerChange = (event) => {
    const { value, name } = event.target;

    const newForm = { ...form, [name]: { ...form[name], value } };
    setForm(newForm);
    setForm(validatorForm(newForm, validateConfig));
    setData(formToData(newForm));
  };

  useEffect(() => {
    if (error !== null) {
      Object.entries(error).map(([key, value]) => {
        setForm({ ...form, [key]: { ...form[key], error: value } });
      });
    }
  }, [error]);

  return { handlerChange, form, setError, data };
};
export default useForm;
