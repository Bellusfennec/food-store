import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Divider from "../../../common/components/divider/Divider";
import {
  Button,
  IconButton,
  TextInput,
  Textarea,
} from "../../../common/components/form";
import Select from "../../../common/components/form/Select";
import { Loading } from "../../../common/components/loading";
import Modal from "../../../common/components/modal/Modal";
import { createForm, validatorForm } from "../../../utils/form";
import {
  createCategoryHTTP,
  getCategoriesListHTTP,
} from "../../../http/categoryHTTP";
import { createProductHTTP } from "../../../http/productHTTP";
import {
  createSpecificationHTTP,
  getSpecificationsListHTTP,
} from "../../../http/specificationHTTP";
import style from "./CreateProduct.module.scss";

const CreateProduct = () => {
  const { userState } = useSelector((state) => state.auth);
  const { uuid } = userState;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateConfig = {
    title: { isRequared: "" },
    category: { isRequared: "" },
    description: { isRequared: "" },
  };
  const INITIAL_PRODUCT_FORM = createForm({
    title: "",
    category: "",
    description: "",
    specification: "",
  });
  const [productForm, setProductForm] = useState(INITIAL_PRODUCT_FORM);
  const INITIAL_CATEGORY_FORM = createForm({ name: "" });
  const [categoryForm, setCategoryForm] = useState(INITIAL_CATEGORY_FORM);
  const [categories, setCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const INITIAL_SPECIFICATION_FORM = createForm({ name: "" });
  const [specificationForm, setSpecificationForm] = useState(
    INITIAL_SPECIFICATION_FORM
  );
  const [specifications, setSpecifications] = useState([]);
  const [specificationsListForm, setSpecificationsListForm] = useState({});
  const [specificationModal, setSpecificationModal] = useState(false);

  /* PRODUCT */
  const handlerChangeProductForm = (event) => {
    const { value, name } = event.target;

    const newForm = { ...productForm, [name]: { ...productForm[name], value } };
    setProductForm(validatorForm(newForm, validateConfig));
    if (error) {
      setError("");
    }
  };

  const handlerNewCreateProduct = async (event) => {
    event.preventDefault();

    let data;
    data = { ...data, title: productForm.title.value || "" };
    data = { ...data, category: productForm.category.value || "" };
    data = { ...data, description: productForm.description.value || "" };
    /* Если есть характеристики */
    if (productForm.specification) {
      /* Извлекаем значения для отправки */
      Object.entries(productForm.specification).map(([key, value]) => {
        const specification = {
          value: value.value || "",
          specificationsId: value.value2 || "",
        };
        const init_specification = data.specification ? data.specification : [];
        data = {
          ...data,
          specification: [...init_specification, specification],
        };
        return [key, value];
      });
    }
    console.log("data", data);
    try {
      const response = await createProductHTTP(data);
      console.log("response", response);
      // const newForm = createForm(response.data);
      // setProductForm(newForm);
    } catch (error) {}
  };

  /* CATEGORY */
  const handlerNewCategoryForm = (event) => {
    const { name, value } = event.currentTarget;

    setCategoryForm({
      ...categoryForm,
      [name]: { ...categoryForm[name], value },
    });

    // setCategoryForm((prevState) => validationForm(prevState));
  };

  const handlerCreateCategory = async (event) => {
    event.preventDefault();

    let data;
    data = { ...data, name: categoryForm.name.value || "" };
    try {
      const response = await createCategoryHTTP(data);
      if (response.ok) {
        setCategoryForm(INITIAL_CATEGORY_FORM);
        setCategoryModal(false);
        getCategories();
      }
    } catch (error) {}
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategoriesListHTTP(uuid);
      if (response.ok) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  /* SPECIFICATION */
  const handlerNewSpecificationForm = (event) => {
    const { name, value } = event.currentTarget;

    setSpecificationForm({
      ...specificationForm,
      [name]: { ...specificationForm[name], value },
    });

    // setSpecificationForm((prevState) => validationForm(prevState));
  };

  const handlerCreateSpecification = async (event) => {
    event.preventDefault();

    let data;
    data = { ...data, name: specificationForm.name.value || "" };
    try {
      const response = await createSpecificationHTTP(data);
      if (response.ok) {
        setSpecificationForm(INITIAL_SPECIFICATION_FORM);
        setSpecificationModal(false);
        getSpecifications();
      }
    } catch (error) {}
  };

  const getSpecifications = async () => {
    setLoading(true);
    try {
      const response = await getSpecificationsListHTTP(uuid);
      if (response.ok) {
        setSpecifications(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
    getSpecifications();
  }, []);

  /* NEW SPECIFICATION */
  const handlerNewFieldSpecification = () => {
    /* Количество элементов */
    const size = Object.keys(specificationsListForm).length;
    /* Новое название */
    const nameNewSpecification = "specification" + size;
    /* Создать */
    const newSpecification = createForm({ [nameNewSpecification]: "" });
    /* Добавить */
    setSpecificationsListForm({
      ...specificationsListForm,
      ...newSpecification,
    });
  };

  /* SPECIFICATION LIST */
  const handlerSpecificationsListForm = (event) => {
    /* Если инпут */
    if (event.target.nodeName === "INPUT") {
      const { name, value: inputValue } = event.currentTarget;
      setSpecificationsListForm({
        ...specificationsListForm,
        [name]: { ...specificationsListForm[name], value: inputValue },
      });
    }
    /* Если селект */
    if (event.target.nodeName === "SELECT") {
      const { name, value: selectValue } = event.currentTarget;
      setSpecificationsListForm({
        ...specificationsListForm,
        [name]: { ...specificationsListForm[name], value2: selectValue },
      });
    }
    /* Добавить в форму товара */
    setProductForm({
      ...productForm,
      specification: { ...specificationsListForm },
    });
  };

  const handlerRemoveFieldSpecification = (fieldName) => {
    const update = Object.entries(specificationsListForm).filter(
      ([key, value]) => {
        return key !== fieldName;
      }
    );
    const updated = Object.fromEntries(update);
    setSpecificationsListForm(updated);
  };

  return (
    <>
      {!productForm && <Loading />}
      {productForm && (
        <div className={style.container}>
          <div className={style.back}>
            <IconButton type="button" onClick={() => navigate("/product")}>
              <IoChevronBackOutline />
            </IconButton>
          </div>
          <h3 className={style.label}>Новый товар</h3>
          <Divider row="2" />
          <TextInput
            name={productForm.title.name}
            value={productForm.title.value}
            placeholder={productForm.title.label}
            onChange={handlerChangeProductForm}
          />
          <Divider />
          <div className={style.inputGroup}>
            <Select
              name={productForm.category.name}
              options={categories}
              value={productForm.category.value}
              placeholder={productForm.category.label}
              onChange={handlerChangeProductForm}
            />
            <div className={style.inputItem}>
              <IconButton
                onClick={() => setCategoryModal(true)}
                className={style.icon}
                title="Добавить"
              >
                <FiPlus />
              </IconButton>
            </div>
            <Modal
              open={categoryModal}
              setOpen={setCategoryModal}
              title="Новая категория"
            >
              <Divider />
              <TextInput
                name={categoryForm.name.name}
                value={categoryForm.name.value}
                placeholder={categoryForm.name.label}
                onChange={handlerNewCategoryForm}
              />
              <Divider row="2" />
              <Button
                onClick={handlerCreateCategory}
                disabled={categoryForm.name.error}
              >
                {loading ? <Loading /> : "Создать"}
              </Button>
            </Modal>
          </div>
          <Divider />
          <Textarea
            name={productForm.description.name}
            placeholder={productForm.description.label}
            onChange={handlerChangeProductForm}
            value={productForm.description.value}
          />
          <Divider />

          {specificationsListForm &&
            Object.entries(specificationsListForm).map(([key, value]) => (
              <div key={key}>
                <div className={style.inputGroup}>
                  <TextInput
                    name={specificationsListForm[key].name}
                    value={specificationsListForm[key].value}
                    placeholder={specificationsListForm[key].label}
                    onChange={handlerSpecificationsListForm}
                  />
                  <div className={style.inputItem}>
                    <Select
                      name={specificationsListForm[key].name}
                      options={specifications}
                      value={specificationsListForm[key].value2}
                      onChange={handlerSpecificationsListForm}
                    />
                  </div>
                  <IconButton
                    type="button"
                    title="Удалить"
                    onClick={() => handlerRemoveFieldSpecification(key)}
                  >
                    <GrClose />
                  </IconButton>
                </div>
                <Divider />
              </div>
            ))}

          <Divider />
          <div className={style.inputGroup}>
            <div className={style.inputItem}>
              <Button
                onClick={handlerNewFieldSpecification}
                className={style.icon}
                title="Добавить"
              >
                Новая характеристика
              </Button>
            </div>
            <div className={style.inputItem}>
              <IconButton
                onClick={() => setSpecificationModal(true)}
                className={style.icon}
                title="Добавить"
              >
                <FiPlus />
              </IconButton>
            </div>
            <Modal
              open={specificationModal}
              setOpen={setSpecificationModal}
              title="Новый тип характеристики"
            >
              <Divider />
              <TextInput
                name={specificationForm.name.name}
                value={specificationForm.name.value}
                placeholder={specificationForm.name.label}
                onChange={handlerNewSpecificationForm}
              />
              <Divider row="2" />
              <Button
                onClick={handlerCreateSpecification}
                disabled={specificationForm.name.error}
              >
                {loading ? <Loading /> : "Создать"}
              </Button>
            </Modal>
          </div>

          <Divider row="2" />
          <Button
            onClick={handlerNewCreateProduct}
            disabled={productForm.title.error}
          >
            {loading ? <Loading /> : "Создать"}
          </Button>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
