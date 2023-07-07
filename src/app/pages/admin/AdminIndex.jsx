import React from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../common/components/layouts";
import ProductAdmin from "./ProductAdmin";
import { SectionWrapper } from "../../common/components/wrapper";
import { ProductsProvider } from "../../hooks/useProducts";

const AdminIndex = () => {
  const { page, action } = useParams();

  return (
    <MainLayout>
      <SectionWrapper>
        <Link to={`/admin/product`}>Продукты</Link> <br />
        <Link to={`/admin/category`}>Категории</Link>
      </SectionWrapper>
      <ProductsProvider>
        {page === "product" && <ProductAdmin />}
      </ProductsProvider>
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
