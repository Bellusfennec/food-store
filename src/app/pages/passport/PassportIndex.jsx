/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { ModalLayout } from "../../common/components/layouts";
import style from "./PassportIndex.module.scss";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";
import Registration from "./components/Registration";
import AuthProvider from "../../hooks/useAuth";
import { Loading } from "../../common/components/loading";
import Logo from "../../common/components/header/Logo";

const PassportIndex = () => {
  const { page } = useParams();
  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  if (auth && page !== "profile" && page !== "edit") {
    return <Navigate to="/" />;
  }
  if (!auth && page !== "registration" && page !== "login") {
    return <Navigate to="/passport/login" />;
  }

  return (
    <ModalLayout>
      <div className={style.container}>
        <Logo className={style.logo} />
        {auth && !user && <Loading />}
        {auth && user && page === "profile" && <Profile />}
        {auth && user && page === "edit" && <EditUser />}
        <AuthProvider>
          {!auth && page === "login" && <Login />}
          {!auth && page === "registration" && <Registration />}
        </AuthProvider>
      </div>
    </ModalLayout>
  );
};

export default PassportIndex;
