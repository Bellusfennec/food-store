import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Divider from "../../../common/components/divider/Divider";
import { Button, IconButton, TextInput } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import useForm from "../../../hooks/useForm";
import { getAuthLoadingStatus, setSignUp } from "../../../store/auth";
import style from "./Registration.module.scss";

const Registration = () => {
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

  function onSubmit(data) {
    dispatch(setSignUp(data));
    // dispatch(setSignUp(data));
    // signUp(data)
    //   .then(() => navigate(`/`))
    //   .catch((error) => setError(error));
  }

  const toLogin = () => {
    form.email.length > 0
      ? navigate(`/passport/login?email=${form.email}`)
      : navigate(`/passport/login`);
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div className={style.back}>
        <IconButton type="button" onClick={toLogin}>
          <IoChevronBackOutline />
        </IconButton>
      </div>
      <h3 className={style.label}>Регистрация</h3>
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
        autoComplete="off"
        name={name.password}
        value={form.password}
        placeholder={placeholder.password}
        error={error.password}
        onChange={handlerChange}
      />
      <Divider row="2" />
      <Button disabled={!isValid}>
        {isLoading ? <Loading /> : "Зарегистрироваться"}
      </Button>
    </form>
  );
};

export default Registration;
