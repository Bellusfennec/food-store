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
import AuthProvider from "../../common/hooks/useAuth";
import { Loading } from "../../common/components/ui/loading";

const PassportPage = () => {
  const { page } = useParams();
  const { authState, userState } = useSelector((state) => state.auth);

  const isLoading = userState?.uuid ? false : true;

  if (authState && page !== "profile" && page !== "edit") {
    return <Navigate to="/" />;
  }
  if (!authState && page !== "registration" && page !== "login") {
    return <Navigate to="/passport/login" />;
  }

  return (
    <ModalLayout>
      <div className={style.container}>
        {authState && isLoading && <Loading />}
        {authState && !isLoading && page === "profile" && <Profile />}
        {authState && !isLoading && page === "edit" && <EditUser />}
        <AuthProvider>
          {!authState && page === "login" && <Login />}
          {!authState && page === "registration" && <Registration />}
        </AuthProvider>
      </div>
    </ModalLayout>
  );
};

export default PassportPage;
