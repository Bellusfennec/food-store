/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import { SectionWrapper } from "../../common/components/wrapper";
import useCategories from "../../hooks/useCategories";
import { ProductsProvider } from "../../hooks/useProducts";
import useSpecification from "../../hooks/useSpecification";
import AdminMockData from "./AdminMockData";
import AdminProduct from "./AdminProduct";
import AdminProductForm from "./AdminProductForm";
import NavAdmin from "./components/NavAdmin";
import Divider from "../../common/components/divider/Divider";

const AdminIndex = () => {
  const { page, action, id } = useParams();
  const { getSpecificationsList } = useSpecification();
  const { getCategoriesList } = useCategories();

  useEffect(() => {
    getSpecificationsList();
    getCategoriesList();
  }, []);

  return (
    <MainLayout>
      <SectionWrapper y="0">
        <NavAdmin />
      </SectionWrapper>
      <ProductsProvider>
        <Divider />
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
      </ProductsProvider>
      <SectionWrapper>
        {page === "mock-data" && <AdminMockData />}
      </SectionWrapper>
    </MainLayout>
  );
};

export default AdminIndex;
