/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginHTTP } from "../../../app/http/userHTTP";
import { setAuthLogin } from "../../../app/store/authSlicer";
import Divider from "../../../common/components/ui/divider/Divider";
import { Button, TextInput } from "../../../common/components/ui/form";
import { Loading } from "../../../common/components/ui/loading";
import {
  createForm,
  formToData,
  validatorForm,
} from "../../../common/utils/form";
import style from "./Login.module.scss";

const Login = () => {
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
    }
  }, []);

  const handlerChangeForm = (event) => {
    const { value, name } = event.target;

    const newForm = { ...form, [name]: { ...form[name], value } };
    setForm(validatorForm(newForm, validateConfig));
    // setError(totalValidatorForm(form));
  };

  const handlerLogin = async (event) => {
    event.preventDefault();

    const data = formToData(form);

    setLoading(true);
    try {
      const result = await loginHTTP(data);
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

  const handlerToRegistration = () => {
    form.email.value.length > 0
      ? navigate(`/passport/registration?email=${form.email.value}`)
      : navigate(`/passport/registration`);
  };

  return (
    <form>
      <h3 className={style.label}>Вход</h3>
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
        onChange={handlerChangeForm}
      />
      <Divider />
      <TextInput
        type="password"
        autoComplete={form.password.name}
        name={form.password.name}
        value={form.password.value}
        placeholder={form.password.label}
        onChange={handlerChangeForm}
      />
      <Divider row="2" />
      <Button
        onClick={handlerLogin}
        disabled={
          !(form.email.value.length > 0 && form.password.value.length > 0)
        }
      >
        {loading ? <Loading /> : "Войти"}
      </Button>
      <Divider />
      <Button type="button" outline={true} onClick={handlerToRegistration}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default Login;
