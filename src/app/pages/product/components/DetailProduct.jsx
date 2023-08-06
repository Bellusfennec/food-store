import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../common/components/loading";

const DetailProduct = () => {
  const { page, productId } = useParams();
  const [productForm, setForm] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getProduct = async () => {
    setLoading(true);
    try {
      // const response = await getProductByIdHTTP(productId);
      // if (response.ok) {
      //   const newForm = response.data;
      //   setForm(newForm);
      // }
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
  return <div>Страница товара</div>;
};

export default DetailProduct;
