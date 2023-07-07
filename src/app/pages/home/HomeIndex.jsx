/* eslint-disable no-unused-vars */
import React from "react";
import MainLayout from "../../common/components/layouts";
import Slider from "./components/Slider";
import style from "./HomeIndex.module.scss";
import MenuHome from "./components/MenuHome";
import AboutHome from "./components/AboutHome";
import TourHome from "./components/TourHome";
import ListProducts from "../product/components/ListProducts";
import { ProductsProvider } from "../../hooks/useProducts";
import { CategoriesProvider } from "../../hooks/useCategories";

const HomeIndex = () => {
  return (
    <MainLayout>
      {/* <Slider />
      <MenuHome />
      <AboutHome />
      <TourHome /> */}
      <ProductsProvider>
        <CategoriesProvider>
          <ListProducts />
        </CategoriesProvider>
      </ProductsProvider>
    </MainLayout>
  );
};

export default HomeIndex;
