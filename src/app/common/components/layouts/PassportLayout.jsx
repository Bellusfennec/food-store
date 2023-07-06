import React from "react";
import style from "./PassportLayout.module.scss";
import Header from "../header";

const PassportLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default PassportLayout;
