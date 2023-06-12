import React from "react";
import MainLayout from "../../common/components/layouts";
import Slider from "./components/Slider";
import style from "./HomePage.module.scss";
import MenuHome from "./components/MenuHome";
import AboutHome from "./components/AboutHome";
import TourHome from "./components/TourHome";

const Home = () => {
  return (
    <MainLayout>
      <Slider />
      <MenuHome />
      <AboutHome />
      <TourHome />
    </MainLayout>
  );
};

export default Home;
