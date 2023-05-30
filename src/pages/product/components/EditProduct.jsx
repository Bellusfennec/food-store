import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductByIdHTTP,
  updateProductHTTP,
} from "../../../app/http/productHTTP";
import { Loading } from "../../../common/components/ui/loading";
import {
  createForm,
  formToData,
  validatorForm,
} from "../../../common/utils/form";

const EditProduct = () => {
  const { page, productId } = useParams();
  const { userState } = useSelector((state) => state.auth);
  const { uuid: userId } = userState;
  const [productForm, setForm] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateConfig = {
    // email: { isRequared: "" },
    // password: { isRequared: "" },
  };

  const handlerChangeForm = (event) => {
    const { value, name } = event.target;

    const newForm = { ...productForm, [name]: { ...productForm[name], value } };
    setForm(validatorForm(newForm, validateConfig));
  };

  const handlerProductUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = formToData(productForm);
    try {
      const response = await updateProductHTTP(data);
      const newForm = createForm(response.data);
      setForm(newForm);
      navigate("/passport/profile");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await getProductByIdHTTP(productId);
      if (response.ok) {
        const newForm = createForm(response.data);
        setForm(newForm);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  if (!productForm) {
    return <Loading />;
  }
  return <div>Страница редактирования товара</div>;
};

export default EditProduct;
