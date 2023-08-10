/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import Divider from "../../common/components/divider/Divider";
import MainLayout, { ContainerLayout } from "../../common/components/layouts";
import { SectionWrapper } from "../../common/components/wrapper";
import AdminMockData from "./AdminMockData";
import AdminProduct from "./AdminProduct";
import AdminProductForm from "./AdminProductForm";
import NavAdmin from "./components/NavAdmin";

const AdminIndex = () => {
  const { page, action, id } = useParams();

  return (
    <MainLayout>
      <SectionWrapper y="0">
        <NavAdmin />
      </SectionWrapper>
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
      <SectionWrapper>
        {page === "mock-data" && <AdminMockData />}
      </SectionWrapper>
    </MainLayout>
  );
};

export default AdminIndex;
