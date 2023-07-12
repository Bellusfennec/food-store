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
import { useUser } from "../../../hooks/useUsers";
import { setUser } from "../../../store/userSlicer";

const EditUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const validateConfig = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };

  const INITIAL_FORM = { ...user };
  const { handlerChange, form, data, setError } = useForm(
    INITIAL_FORM,
    validateConfig
  );
  const { isLoading, updateUser } = useUser();

  const handlerSubmit = async (event) => {
    event.preventDefault();

    updateUser(data)
      .then((user) => {
        dispatch(setUser(user));
        navigate(`/passport/profile`);
      })
      .catch((error) => setError(error));
  };

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
          {isLoading ? <Loading /> : "Обновить"}
        </Button>
      </form>
    </>
  );
};

export default EditUser;
