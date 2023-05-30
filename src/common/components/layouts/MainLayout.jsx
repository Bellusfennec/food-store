import React from "react";
import style from "./MainLayout.module.scss";
import Navbar from "../navbar";
import Footer from "../footer";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
