import React from "react";
import style from "./MainLayout.module.scss";
import Header from "../header";
import Footer from "../footer";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <Header />
      <main className={style.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
