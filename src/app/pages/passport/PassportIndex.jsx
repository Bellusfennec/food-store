/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Logo from "../../common/components/header/Logo";
import { ModalLayout } from "../../common/components/layouts";
import { Loading } from "../../common/components/loading";
import { getCurrentUser, getLoggedStatus } from "../../store/user";
import style from "./PassportIndex.module.scss";
import EditUser from "./components/EditUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";

const PassportIndex = () => {
  const { page } = useParams();
  const isLogged = useSelector(getLoggedStatus());
  const user = useSelector(getCurrentUser());

  if (isLogged && page !== "profile" && page !== "edit") {
    return <Navigate to="/" />;
  }
  if (!isLogged && page !== "registration" && page !== "login") {
    return <Navigate to="/passport/login" />;
  }

  return (
    <ModalLayout>
      <div className={style.container}>
        <Logo className={style.logo} />
        {isLogged && !user && <Loading />}
        {isLogged && user && page === "profile" && <Profile />}
        {isLogged && user && page === "edit" && <EditUser />}
        {!isLogged && page === "login" && <Login />}
        {!isLogged && page === "registration" && <Registration />}
      </div>
    </ModalLayout>
  );
};

export default PassportIndex;
