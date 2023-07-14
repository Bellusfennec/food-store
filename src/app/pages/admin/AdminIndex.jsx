import React from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import AdminProduct from "./AdminProduct";
import { SectionWrapper } from "../../common/components/wrapper";
import { ProductsProvider } from "../../hooks/useProducts";
import MockDataAdmin from "./MockDataAdmin";
import AdminProductForm from "./AdminProductForm";
import { CategoriesProvider } from "../../hooks/useCategories";

const AdminIndex = () => {
  const { page, action, id } = useParams();

  return (
    <MainLayout>
      <SectionWrapper>
        <Link to={`/admin/product`}>Продукты</Link>
        <br />
        <Link to={`/admin/category`}>Категории</Link>
        <br />
        <Link to={`/admin/mock-data`}>Mock data</Link>
      </SectionWrapper>
      <ProductsProvider>
        <CategoriesProvider>
          {page === "product" && action === "edit" && id && (
            <ContainerLayout>
              <AdminProductForm />
            </ContainerLayout>
          )}
          {page === "product" && action === "create" && (
            <ContainerLayout>
              <AdminProductForm />
            </ContainerLayout>
          )}
          {page === "product" && <AdminProduct />}
        </CategoriesProvider>
      </ProductsProvider>
      <SectionWrapper>
        {page === "mock-data" && <MockDataAdmin />}
      </SectionWrapper>
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
