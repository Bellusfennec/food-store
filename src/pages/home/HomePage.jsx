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
      <Divider row="2" />
      <h2 className={style.label}>Меню ресторана</h2>
      <MenuHome />
      <Divider row="2" />
      <AboutHome />
      <Divider row="2" />
      <TourHome />
      <Divider row="2" />
    </MainLayout>
  );
};

export default Home;
