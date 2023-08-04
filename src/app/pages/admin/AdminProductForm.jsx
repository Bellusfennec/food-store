import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../../app/common/components/divider/Divider";
import {
  Button,
  Dropdown,
  FormGroup,
  FormItem,
  IconButton,
  TextInput,
  TextareaField,
} from "../../../app/common/components/form";
import { Loading } from "../../../app/common/components/loading";
import { useProducts } from "../../hooks/useProducts";
import style from "./AdminProductForm.module.scss";
import CategoryCreate from "./components/CategoryCreate";
import SpecificationForm from "./components/SpecificationForm";
import useForm from "../../hooks/useForm";
import { getCategories } from "../../store/categorySlicer";

const AdminProductForm = () => {
  const { id } = useParams();
  const { isLoading, createProduct, getProduct } = useProducts();
  const product = id ? getProduct(id) : null;
  const navigate = useNavigate();
  const CONFIG = {
    name: { isRequared: "" },
    category: { isRequared: "" },
    description: { isRequared: "" },
    price: { isRequared: "" },
  };
  const initialForm = {
    name: "",
    category: "",
    description: "",
    specifications: [],
    price: "",
    priceSale: "",
    image: "1.jpg",
  };
  const FORM = product ? product : initialForm;
  // const FORM = initialForm;
  const {
    handlerChange,
    form,
    setForm,
    handlerSubmit,
    isValid,
    placeholder,
    name,
    error,
    handlerBlur,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });

  const categories = useSelector(getCategories());

  async function onSubmit(data) {
    await createProduct(data).then(() => {
      // navigate(`/`);
    });
    // .catch((error) => setError(error));
  }

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handlerSubmit} className={style.container}>
      <div className={style.back}>
        <IconButton type="button" onClick={() => navigate("/admin/product")}>
          <IoChevronBackOutline />
        </IconButton>
      </div>
      <h3 className={style.label}>Новый товар</h3>
      <Divider row="2" />
      <FormGroup>
        <FormItem grow="1">
          <TextInput
            name={name.name}
            value={form.name}
            error={error.name}
            placeholder={placeholder.name}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
        <FormItem>
          <TextInput
            name={name.price}
            value={form.price}
            error={error.price}
            placeholder={placeholder.price}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
      </FormGroup>
      <Divider />
      <TextareaField
        name={name.description}
        value={form.description}
        error={error.description}
        placeholder={placeholder.description}
        onChange={handlerChange}
        onBlur={handlerBlur}
      />
      <Divider />
      <FormGroup>
        <FormItem grow="1">
          <Dropdown
            name={name.category}
            value={form.category}
            error={error.category}
            placeholder={placeholder.category}
            options={categories}
            setForm={setForm}
            onChange={handlerChange}
            onBlur={handlerBlur}
          />
        </FormItem>
        <FormItem align="center">
          <CategoryCreate />
        </FormItem>
      </FormGroup>
      <Divider />
      <SpecificationForm value={form.specifications} setForm={setForm} />
      <Divider row="2" />
      <Button disabled={!isValid}>{isLoading ? <Loading /> : "Создать"}</Button>
    </form>
  );
};

export default AdminProductForm;
