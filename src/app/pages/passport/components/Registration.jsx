import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import Divider from "../../../common/components/divider/Divider";
import { Button, IconButton, TextInput } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import { useAuth } from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import style from "./Registration.module.scss";

const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const CONFIG = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };
  const email = searchParams?.get("email") ? searchParams?.get("email") : "";
  const FORM = { email, password: "" };
  const { handlerChange, form, setError, handlerSubmit } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });
  const { isLoading, signUp } = useAuth();

  function onSubmit(data) {
    signUp(data)
      .then(() => navigate(`/`))
      .catch((error) => setError(error));
  }

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
      {/* {info && (
        <>
          <p className={style.hint}>{info}</p>
          <Divider row="2" />
        </>
      )} */}
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
