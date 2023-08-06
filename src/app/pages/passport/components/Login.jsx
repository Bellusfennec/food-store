/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Divider from "../../../common/components/divider/Divider";
import { Button, TextInput } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import useForm from "../../../hooks/useForm";
import { getAuthLoadingStatus, setSignIn } from "../../../store/auth";
import style from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const CONFIG = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };
  const email = searchParams?.get("email") ? searchParams?.get("email") : "";
  const FORM = { email, password: "" };
  const {
    handlerChange,
    form,
    setError,
    handlerSubmit,
    isValid,
    placeholder,
    name,
    error,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });
  const isLoading = useSelector(getAuthLoadingStatus());
  // const { isLoading, signIn } = useAuth();

  function onSubmit(data) {
    dispatch(setSignIn(data));
    // dispatch(setSignIn(data));
    // signIn(data)
    //   .then(() => navigate(`/`))
    //   .catch((error) => setError(error));
  }

  const toRegistration = () => {
    form.email.length > 0
      ? navigate(`/passport/registration?email=${form.email}`)
      : navigate(`/passport/registration`);
  };

  return (
    <form onSubmit={handlerSubmit}>
      <h3 className={style.label}>Вход</h3>
      <Divider row="2" />
      {/* {info && (
        <>
          <p className={style.hint}>{info}</p>
          <Divider row="2" />
        </>
      )} */}
      <TextInput
        autoComplete={name.email}
        name={name.email}
        value={form.email}
        placeholder={placeholder.email}
        error={error.email}
        onChange={handlerChange}
      />
      <Divider />
      <TextInput
        type="password"
        autoComplete={name.password}
        name={name.password}
        value={form.password}
        placeholder={placeholder.password}
        error={error.password}
        onChange={handlerChange}
      />
      <Divider row="2" />
      <Button disabled={!isValid}>{isLoading ? <Loading /> : "Войти"}</Button>
      <Divider />
      <Button type="button" outline={true} onClick={toRegistration}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default Login;
