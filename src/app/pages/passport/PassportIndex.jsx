/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Logo from "../../common/components/header/Logo";
import { ModalLayout } from "../../common/components/layouts";
import { Loading } from "../../common/components/loading";
import { getAuthStatus } from "../../store/auth";
import { getCurrentUser } from "../../store/currentUser";
import style from "./PassportIndex.module.scss";
import EditUser from "./components/EditUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";

const PassportIndex = () => {
  const { page } = useParams();
  const isAuth = useSelector(getAuthStatus());
  const user = useSelector(getCurrentUser());

  if (isAuth && page !== "profile" && page !== "edit") {
    return <Navigate to="/" />;
  }
  if (!isAuth && page !== "registration" && page !== "login") {
    return <Navigate to="/passport/login" />;
  }
  console.log(isAuth, user);
  return (
    <ModalLayout>
      <div className={style.container}>
        <Logo className={style.logo} />
        {isAuth && !user && <Loading />}
        {isAuth && user && page === "profile" && <Profile />}
        {isAuth && user && page === "edit" && <EditUser />}
        {!isAuth && page === "login" && <Login />}
        {!isAuth && page === "registration" && <Registration />}
      </div>
    </ModalLayout>
  );
};

export default PassportIndex;
