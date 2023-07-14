import React from "react";
import { useParams } from "react-router-dom";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import DetailProduct from "./components/DetailProduct";
import ListProducts from "./components/ListProducts";

const ProductIndex = () => {
  const { page, productId } = useParams();

  return (
    <MainLayout>
      {!page && <ListProducts />}
      {page === "detail" && productId && (
        <ContainerLayout>
          <DetailProduct />
        </ContainerLayout>
      )}
    </MainLayout>
  );
};

export default ProductIndex;
