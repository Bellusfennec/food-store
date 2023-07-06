/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setLogin } from "../../../store/authSlicer";
import Divider from "../../../common/components/divider/Divider";
import { Button, IconButton, TextInput } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import { useAuth } from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import style from "./Registration.module.scss";

const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateConfig = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };
  const email = searchParams?.get("email") ? searchParams?.get("email") : "";
  const INITIAL_FORM = { email, password: "" };
  const { handlerChange, form, data } = useForm(INITIAL_FORM, validateConfig);
  const { isLoading, registartion, info, setInfo } = useAuth();

  const handlerSubmit = async (event) => {
    event.preventDefault();

    registartion(data).then((response) => {
      if (response) {
        dispatch(setLogin(response));
        navigate(`/`);
      }
    });
  };

  useEffect(() => {
    if (info) {
      setInfo(null);
    }
  }, [form]);

  const toLogin = () => {
    form.email.value.length > 0
      ? navigate(`/passport/login?email=${form.email.value}`)
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
      {info && (
        <>
          <p className={style.hint}>{info}</p>
          <Divider row="2" />
        </>
      )}
      <TextInput
        autoComplete={form.email.name}
        name={form.email.name}
        value={form.email.value}
        placeholder={form.email.label}
        error={form.email.error}
        onChange={handlerChange}
      />
      <Divider />
      <TextInput
        type="password"
        autoComplete="off"
        name={form.password.name}
        value={form.password.value}
        placeholder={form.password.label}
        error={form.password.error}
        onChange={handlerChange}
      />
      <Divider row="2" />
      <Button disabled={form.email.error || form.password.error}>
        {isLoading ? <Loading /> : "Зарегистрироваться"}
      </Button>
    </form>
  );
};

export default Registration;
