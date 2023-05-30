/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { ModalLayout } from "../../common/components/layouts";
import style from "./PassportPage.module.scss";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";
import Registration from "./components/Registration";

const PassportPage = () => {
  const { page } = useParams();
  const { authState } = useSelector((state) => state.auth);

  if (authState && page !== "profile" && page !== "edit") {
    return <Navigate to="/" />;
  }
  if (!authState && page !== "registration" && page !== "login") {
    return <Navigate to="/passport/login" />;
  }

  return (
    <ModalLayout>
      <div className={style.container}>
        {authState && page === "profile" && <Profile />}
        {authState && page === "edit" && <EditUser />}
        {!authState && page === "login" && <Login />}
        {!authState && page === "registration" && <Registration />}
      </div>
    </ModalLayout>
  );
};

export default PassportPage;
