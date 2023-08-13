/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronBackOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
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
import useForm from "../../hooks/useForm";
import { getCategories } from "../../store/category";
import {
  createdProduct,
  getProductById,
  getProductsLoadingStatus,
  removedProduct,
  updatedProduct,
} from "../../store/product";
import style from "./AdminProductForm.module.scss";
import CategoryCreate from "./components/CategoryCreate";
import SpecificationForm from "./components/SpecificationForm";
import {
  getProductSpecificationsById,
  loadedProductSpecifications,
} from "../../store/productSpecification";

const AdminProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const isLoading = useSelector(getProductsLoadingStatus());
  const product = useSelector(getProductById(id));
  const specifications = useSelector(getProductSpecificationsById(id));
  const [specificationStatus, setSpecificationStatus] = useState(true);
  const render = useRef(null);
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
  const FORM = initialForm;
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

  function onSubmit(data) {
    if (product) {
      dispatch(updatedProduct(data));
      navigate(`/admin/product`);
    } else {
      dispatch(createdProduct(data));
      navigate(`/admin/product`);
    }
  }
  function handlerRemoveProduct(id) {
    dispatch(removedProduct(id));
    navigate(`/admin/product`);
  }

  useEffect(() => {
    if (product) {
      // console.log("111111", product);
      setForm(product);
      dispatch(loadedProductSpecifications(product.specifications));
    }
  }, []);

  useEffect(() => {
    // console.log("333", specifications);
    if (specificationStatus) {
      // console.log("22222", specifications);
      setForm({ ...product, specifications });
      setSpecificationStatus(false);
    }
  }, [specifications]);

  useEffect(() => {
    render.current++;
    console.log("render", render.current);
  });

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handlerSubmit} className={style.container}>
      <div className={style.back}>
        <IconButton type="button" onClick={() => navigate("/admin/product")}>
          <IoChevronBackOutline />
        </IconButton>
      </div>
      <div className={style.remove}>
        <IconButton
          type="button"
          onClick={() => handlerRemoveProduct(form._id)}
        >
          <IoTrashOutline />
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
      <Button disabled={!isValid}>
        {isLoading ? <Loading /> : product ? "Обновить" : "Создать"}
      </Button>
    </form>
  );
};

export default React.memo(AdminProductForm);
