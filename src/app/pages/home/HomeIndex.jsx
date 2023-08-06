/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import MainLayout from "../../common/components/layouts";
import ListProducts from "../product/components/ListProducts";
import { loadProducts } from "../../store/product";
import { loadCategories } from "../../store/category";
import { loadSpecifications } from "../../store/specification";
import { useDispatch } from "react-redux";

const HomeIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
    dispatch(loadSpecifications());
  }, []);

  return (
    <MainLayout>
      <ListProducts />
    </MainLayout>
  );
};

export default HomeIndex;
