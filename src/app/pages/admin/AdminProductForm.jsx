import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../../app/common/components/divider/Divider";
import {
  Button,
  IconButton,
  TextInput,
  Textarea,
} from "../../../app/common/components/form";
import { Loading } from "../../../app/common/components/loading";
import useForm from "../../hooks/useForm";
import { useProducts } from "../../hooks/useProducts";
import style from "./AdminProductForm.module.scss";
import CategoryForm from "./components/CategoryForm";
import SpecificationForm from "./components/SpecificationForm";

const AdminProductForm = () => {
  const { page, action, id } = useParams();
  const navigate = useNavigate();
  const validateConfig = {
    name: { isRequared: "" },
    category: { isRequared: "" },
    description: { isRequared: "" },
  };
  const INITIAL_PRODUCT = {
    name: "",
    category: "",
    description: "",
    specification: "",
  };
  const {
    handlerChange: handlerChangeProduct,
    form: productForm,
    data,
    setError,
  } = useForm(INITIAL_PRODUCT, validateConfig);
  const { isLoading, createProduct } = useProducts();

  const handlerSubmitProductForm = async (event) => {
    event.preventDefault();
    console.log(data);

    // await signUp(data)
    //   .then(() => navigate(`/`))
    //   .catch((error) => setError(error));
  };

  return (
    <>
      {!productForm && <Loading />}
      {productForm && (
        <form onSubmit={handlerSubmitProductForm} className={style.container}>
          <div className={style.back}>
            <IconButton
              type="button"
              onClick={() => navigate("/admin/product")}
            >
              <IoChevronBackOutline />
            </IconButton>
          </div>
          <h3 className={style.label}>Новый товар</h3>
          <Divider row="2" />
          <TextInput
            name={productForm.name.name}
            value={productForm.name.value}
            placeholder={productForm.name.label}
            onChange={handlerChangeProduct}
          />
          <Divider />
          <Textarea
            name={productForm.description.name}
            placeholder={productForm.description.label}
            onChange={handlerChangeProduct}
            value={productForm.description.value}
          />
          <Divider />
          <CategoryForm form={productForm} onChange={handlerChangeProduct} />
          <Divider />
          <SpecificationForm
            form={productForm}
            onChange={handlerChangeProduct}
          />
          <Divider row="2" />
          <Button disabled={productForm.name.error}>
            {isLoading ? <Loading /> : "Создать"}
          </Button>
        </form>
      )}
    </>
  );
};

export default AdminProductForm;
