import React from "react";
import { useParams } from "react-router-dom";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import CreateProduct from "./components/CreatePoduct";
import DetailProduct from "./components/DetailProduct";
import EditProduct from "./components/EditProduct";
import ListProducts from "./components/ListProducts";

const ProductPage = () => {
  const { page, productId } = useParams();

  return (
    <MainLayout>
      {!page && <ListProducts />}
      {page === "create" && (
        <ContainerLayout>
          <CreateProduct />
        </ContainerLayout>
      )}
      {page === "detail" && productId && (
        <ContainerLayout>
          <DetailProduct />
        </ContainerLayout>
      )}
      {page === "edit" && productId && (
        <ContainerLayout>
          <EditProduct />
        </ContainerLayout>
      )}
    </MainLayout>
  );
};

export default ProductPage;
