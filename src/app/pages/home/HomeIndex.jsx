/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import MainLayout from "../../common/components/layouts";
import { ProductsProvider } from "../../hooks/useProducts";
import ListProducts from "../product/components/ListProducts";
import useSpecification from "../../hooks/useSpecification";
import useCategories from "../../hooks/useCategories";

const HomeIndex = () => {
  const { getSpecificationsList } = useSpecification();
  const { getCategoriesList } = useCategories();
  // console.log(productForm, specificationsList);

  useEffect(() => {
    getSpecificationsList();
    getCategoriesList();
  }, []);

  return (
    <MainLayout>
      {/* <Slider />
      <MenuHome />
      <AboutHome />
      <TourHome /> */}
      <ProductsProvider>
        <ListProducts />
      </ProductsProvider>
    </MainLayout>
  );
};

export default HomeIndex;
