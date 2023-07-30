/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  createName,
  createPlaceholder,
  totalError,
  validator,
  validate,
} from "../utils/form";

const useForm = ({ onSubmit, FORM, CONFIG }) => {
  FORM = FORM ? FORM : {};
  CONFIG = CONFIG ? CONFIG : {};
  const [form, setForm] = useState(FORM);
  const [name, setName] = useState(createName(FORM));
  const initPlaceholder = createPlaceholder(FORM, CONFIG);
  const [placeholder, setPlaceholder] = useState(initPlaceholder);
  const [errorList, setErrorList] = useState(validator(FORM, CONFIG));
  const [focusList, setFocusList] = useState({});
  const [error, setError] = useState({});
  const [isValid, setValid] = useState(null);

  // Обработчик изменений
  const handlerChange = (e) => {
    const { value, name } = e.target;

    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (focusList !== error) {
      console.log("focusList", focusList);
      const errors = validator(focusList, CONFIG);
      console.log("errors", errors);
      // setError(errors)
    }

    // const errors = validator(form, CONFIG);
    // setErrorList(errors);
    // // setError(errors);
    const errors = validator(form, CONFIG);
    setErrorList(errors);
    console.log("ErrorList", errors);
    setValid(!totalError(errors));
    console.log(form);
  }, [form, focusList]);

  // Обработчик кнопки Submit
  const handlerSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
    setForm(FORM);
  };

  const handlerBlur = (e) => {
    const { name, value } = e.target;
    console.log("handlerBlur", e);
    // console.log(errorList, error, name, value);
    // const current = { [name]: value };
    // console.log(current);
    // // const err = false validator(current, CONFIG);
    // console.log("for", value, CONFIG[name]);
    // const err = validate(value, CONFIG[name]);
    // console.log("err", err);
    // setError({ ...error, [name]: err });
    setError({ ...error, [name]: errorList[name] });
    setFocusList({ ...focusList, [name]: value });
  };

  return {
    form,
    setForm,
    error,
    setError,
    placeholder,
    setPlaceholder,
    name,
    setName,
    handlerChange,
    handlerSubmit,
    isValid,
    handlerBlur,
  };
};
export default useForm;
