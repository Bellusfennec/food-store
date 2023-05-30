import React from "react";
import ProductDetails from "../../../components/product/ProductDetails";
import ProductsList from "../../../components/product/ProductsList";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();
  const { productId } = params;

  return <>{productId ? <ProductDetails /> : <ProductsList />}</>;
};

export default Product;
