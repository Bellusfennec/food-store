/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Divider from "../../../common/components/divider/Divider";
import { Button, IconButton, TextInput } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import useForm from "../../../hooks/useForm";

import style from "./EditUser.module.scss";
import {
  getCurrentUser,
  getUserLoadingStatus,
  updatedUser,
} from "../../../store/user";

const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser());
  const isLoading = useSelector(getUserLoadingStatus());
  const navigate = useNavigate();
  const CONFIG = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };

  const FORM = { ...user };
  const {
    handlerChange,
    handlerSubmit,
    form,
    isValid,
    name,
    placeholder,
    error,
  } = useForm({ FORM, CONFIG, onSubmit });

  function onSubmit(data) {
    dispatch(updatedUser(data));
    navigate(`/passport/profile`);
  }

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <div className={style.back}>
          <IconButton
            type="button"
            onClick={() => navigate("/passport/profile")}
          >
            <IoChevronBackOutline />
          </IconButton>
        </div>
        <h3 className={style.label}>Редактирвание профиля</h3>
        <Divider row="2" />
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
          {isLoading ? <Loading /> : "Обновить"}
        </Button>
      </form>
    </>
  );
};

export default EditUser;
