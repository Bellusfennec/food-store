/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserByUuidHTTP, updateUserHTTP } from "../../../app/http/userHTTP";
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
import style from "./EditUser.module.scss";

const EditUser = () => {
  const { userState } = useSelector((state) => state.auth);
  const { uuid: userId } = userState;
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateConfig = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };

  const handlerChangeForm = (event) => {
    const { value, name } = event.target;

    const newForm = { ...form, [name]: { ...form[name], value } };
    setForm(validatorForm(newForm, validateConfig));
  };

  const handlerUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = formToData(form);
    try {
      const response = await updateUserHTTP(data);
      const newForm = createForm(response.data);
      setForm(newForm);
      navigate("/passport/profile");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await getUserByUuidHTTP(userId);
      if (response.ok) {
        const newForm = createForm(response.data);
        setForm(newForm);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  if (!form) {
    return <Loading />;
  }

  return (
    <form>
      <div className={style.back}>
        <IconButton type="button" onClick={() => navigate("/passport/profile")}>
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
        onClick={handlerUpdate}
        disabled={form.email.error || form.password.error}
      >
        {loading ? <Loading /> : "Обновить"}
      </Button>
    </form>
  );
};

export default EditUser;
