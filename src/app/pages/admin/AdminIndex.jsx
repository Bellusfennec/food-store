import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../common/components/layouts";
import ProductAdmin from "./ProductAdmin";
import { SectionWrapper } from "../../common/components/wrapper";

const AdminIndex = () => {
  const { page, action } = useParams();

  return (
    <MainLayout>
      <SectionWrapper>
        <div>dd</div>
      </SectionWrapper>

      {page === "product" && <ProductAdmin />}
      {/* {!page && <ListProducts />}
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
      )} */}
    </MainLayout>
  );
};

export default AdminIndex;
