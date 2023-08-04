/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  createName,
  createPlaceholder,
  totalError,
  validator,
} from "../utils/form";

const useForm = ({ onSubmit, FORM, CONFIG }) => {
  FORM = FORM ? FORM : {};
  console.log(FORM);
  CONFIG = CONFIG ? CONFIG : {};
  const [form, setForm] = useState(FORM);
  const [name, setName] = useState(createName(FORM));
  const initPlaceholder = createPlaceholder(FORM, CONFIG);
  const [placeholder, setPlaceholder] = useState(initPlaceholder);
  const [focusСonfig, setFocusСonfig] = useState({});
  const [error, setError] = useState({});
  const [isValid, setValid] = useState(null);

  // обработчик изменений
  const handlerChange = (e) => {
    const { value, name } = e.target;

    setForm({ ...form, [name]: value });
  };

  // обработчик кнопки Submit
  const handlerSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
    setForm(FORM);
    setFocusСonfig({});
    setError({});
  };

  // обработчик отпускания фокуса
  const handlerBlur = (e) => {
    const { name } = e.target;
    const arrayСonfig = Object.entries(CONFIG);
    const newСonfig = arrayСonfig.map(([keyСonfig, valueСonfig], i) => {
      if (keyСonfig === name) {
        return [keyСonfig, valueСonfig];
      }
    });
    const newOutFocus = Object.fromEntries(newСonfig.filter(Boolean));
    setFocusСonfig({ ...focusСonfig, ...newOutFocus });
  };

  // обновление ошибок
  useEffect(() => {
    const errors = validator(form, focusСonfig);
    setError(errors);
    const totalErrors = validator(form, CONFIG);
    setValid(!totalError(totalErrors));
    console.log(form);
  }, [form, focusСonfig]);

  // обновление FORM
  useEffect(() => {
    setForm(FORM);
    setName(createName(FORM));
    const initPlaceholder = createPlaceholder(FORM, CONFIG);
    setPlaceholder(initPlaceholder);
  }, [FORM]);

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
    handlerBlur,
    isValid,
  };
};
export default useForm;
