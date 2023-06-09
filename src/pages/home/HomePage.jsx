import React from "react";
import MainLayout from "../../common/components/layouts";
import Slider from "./components/Slider";
import Divider from "../../common/components/ui/divider";
import style from "./HomePage.module.scss";
import MenuHome from "./components/MenuHome";
import AboutHome from "./components/AboutHome";
import TourHome from "./components/TourHome";

const Home = () => {
  return (
    <MainLayout>
      <Slider />
      <Divider row="4" />
      <h2 className={style.label}>Меню ресторана</h2>
      <MenuHome />
      <Divider row="4" />
      <AboutHome />
      <Divider row="4" />
      <TourHome />
      <Divider row="4" />
    </MainLayout>
  );
};

export default Home;
