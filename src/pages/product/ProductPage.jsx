import React from "react";
import { useParams } from "react-router-dom";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import CreateProduct from "./components/CreatePoduct";
import DetailProduct from "./components/DetailProduct";
import EditProduct from "./components/EditProduct";
import ListProducts from "./components/ListProducts";
import Tags from "./components/Tags";

const ProductPage = () => {
  const { page, productId } = useParams();
  //<ListProducts />
  return (
    <>
      {!page && (
        <MainLayout>
          <Tags />
        </MainLayout>
      )}
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
    </>
  );
};

export default ProductPage;
