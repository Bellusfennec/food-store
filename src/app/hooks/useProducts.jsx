/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import productService from "../../app/services/product.service";
import { toast } from "react-toastify";

export const ProductsContext = React.createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getProduct = (id) => {
    return products.find((p) => p._id === id);
  };

  const getProductsList = async () => {
    try {
      const { content } = await productService.fetchAll();
      setProducts(content);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  };

  // const updateQuality = async ({ _id: id, ...data }) => {
  //   try {
  //     const { content } = await qualityService.update(id, data);
  //     setQualities((prevState) =>
  //       prevState.map((item) => {
  //         if (item._id === content._id) {
  //           return content;
  //         }
  //         return item;
  //       })
  //     );
  //     return content;
  //   } catch (error) {
  //     errorCather(error);
  //   }
  // };

  // const addQuality = async (data) => {
  //   try {
  //     const { content } = await qualityService.create(data);
  //     setQualities((prevState) => [...prevState, content]);
  //     return content;
  //   } catch (error) {
  //     errorCather(error);
  //   }
  // };

  // const deleteQuality = async (id) => {
  //   try {
  //     const { content } = await qualityService.delete(id);
  //     setQualities((prevState) => {
  //       return prevState.filter((item) => item._id !== content._id);
  //     });
  //     return content;
  //   } catch (error) {
  //     errorCather(error);
  //   }
  // };

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProduct,
        isLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
