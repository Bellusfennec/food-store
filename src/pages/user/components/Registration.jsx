/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { registartionHTTP } from "../../../app/http/userHTTP";
import { setAuthLogin } from "../../../app/store/authSlicer";
import Divider from "../../../common/components/ui/divider/Divider";
import {
  Button,
  IconButton,
  TextInput,
} from "../../../common/components/ui/form";
import { Loading } from "../../../common/components/ui/loading";
import {
  createForm,
  formToData,
  validatorForm,
} from "../../../common/utils/form";
import style from "./Registration.module.scss";

const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const validateConfig = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };
  const INITIAL_FORM = createForm({ email: "", password: "" });
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams?.get("email")) {
      const emailValue = searchParams?.get("email");
      const newForm = { ...form, email: { ...form.email, value: emailValue } };
      setForm(validatorForm(newForm, validateConfig));
    } else if (form) {
      setForm(validatorForm(form, validateConfig));
    }
  }, []);

  const handlerChangeForm = (event) => {
    const { value, name } = event.target;

    const newForm = { ...form, [name]: { ...form[name], value } };
    setForm(validatorForm(newForm, validateConfig));
    if (error) {
      setError("");
    }
  };

  const handlerToLogin = () => {
    form.email.value.length > 0
      ? navigate(`/passport/login?email=${form.email.value}`)
      : navigate(`/passport/login`);
  };

  const handlerRegistration = async (event) => {
    event.preventDefault();

    const data = formToData(form);

    setLoading(true);
    try {
      const result = await registartionHTTP(data);
      if (result?.ok) {
        setForm(INITIAL_FORM);
        dispatch(setAuthLogin({ user: result.data }));
        navigate(`/passport/profile`);
      }
      if (!result?.ok && result?.message) {
        setError(result.message);
      }
      if (!result?.ok && !result?.message) {
        setError("Произошла неизвестная ошибка");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form>
      <div className={style.back}>
        <IconButton type="button" onClick={handlerToLogin}>
          <IoChevronBackOutline />
        </IconButton>
      </div>
      <h3 className={style.label}>Регистрация</h3>
      <Divider row="2" />
      {error && (
        <>
          <p className={style.hint}>{error}</p>
          <Divider row="2" />
        </>
      )}
      <TextInput
        autoComplete={form.email.name}
        name={form.email.name}
        value={form.email.value}
        placeholder={form.email.label}
        error={form.email.error}
        onChange={handlerChangeForm}
      />
      <Divider />
      <TextInput
        type="password"
        autoComplete="off"
        name={form.password.name}
        value={form.password.value}
        placeholder={form.password.label}
        error={form.password.error}
        onChange={handlerChangeForm}
      />
      <Divider row="2" />
      <Button
        onClick={handlerRegistration}
        disabled={form.email.error || form.password.error}
      >
        {loading ? <Loading /> : "Зарегистрироваться"}
      </Button>
    </form>
  );
};

export default Registration;
