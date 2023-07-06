import { useState } from "react";
import { createForm, formToData, validatorForm } from "../utils/form";

const useForm = (initialState = {}, validateConfig = {}) => {
  const INITIAL_FORM = createForm(initialState, validateConfig);
  const [form, setForm] = useState(INITIAL_FORM);
  const [data, setData] = useState(initialState);

  const handlerChange = (event) => {
    const { value, name } = event.target;

    const newForm = { ...form, [name]: { ...form[name], value } };
    setForm(newForm);
    setForm(validatorForm(newForm, validateConfig));
    setData(formToData(newForm));
  };

  return { handlerChange, form, data };
};
export default useForm;
