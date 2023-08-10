import React from "react";
import { useParams } from "react-router-dom";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import DetailProduct from "./components/DetailProduct";
import ListProducts from "./components/ListProducts";
import { SectionWrapper } from "../../common/components/wrapper";

const ProductIndex = () => {
  const { page, productId } = useParams();

  return (
    <MainLayout>
      {!page && <ListProducts />}
      {page === "detail" && productId && (
        <SectionWrapper>
          <ContainerLayout>
            <DetailProduct />
          </ContainerLayout>
        </SectionWrapper>
      )}
    </MainLayout>
  );
};

export default ProductIndex;
