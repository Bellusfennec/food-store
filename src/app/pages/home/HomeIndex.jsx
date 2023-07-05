import React from "react";
import MainLayout from "../../common/components/layouts";
import Slider from "./components/Slider";
import style from "./HomeIndex.module.scss";
import MenuHome from "./components/MenuHome";
import AboutHome from "./components/AboutHome";
import TourHome from "./components/TourHome";

const HomeIndex = () => {
  return (
    <MainLayout>
      <Slider />
      <MenuHome />
      <AboutHome />
      <TourHome />
    </MainLayout>
  );
};

export default HomeIndex;
