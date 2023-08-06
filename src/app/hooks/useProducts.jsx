/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import productService from "../../app/services/product.service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import productSpecificationService from "../services/productSpecification.service";

export const ProductsContext = React.createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // getProductsList().then((res) => {});
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getProduct = async (id) => {
    // setLoading(true);
    // console.log("products", products);
    // let product = products.filter((p) => {
    //   console.log("p", p);
    //   return p._id === id;
    // });
    // console.log("product", product[0]);
    // try {
    //   // Если есть характеристики
    //   if (product.specifications.length > 0) {
    //     for (let i = 0; i < product.specifications.length; i++) {
    //       const id = product.specifications[i];
    //       console.log(id);
    //       const { content } = await productSpecificationService.get(id);
    //       console.log(content);
    //       product.specifications[i] = content;
    //     }
    //   }
    //   return product;
    // } catch (error) {
    //   errorCather(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const getProductsList = async () => {
    // setLoading(true);
    // try {
    //   const { content } = await productService.getAll();
    //   setProducts(content);
    //   return content;
    // } catch (error) {
    //   errorCather(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const createProduct = async (data) => {
    // setLoading(true);
    // data = { ...data, _id: uuidv4() };
    // try {
    //   // Если есть характеристики
    //   if (data.specifications.length > 0) {
    //     for (let i = 0; i < data.specifications.length; i++) {
    //       const item = { ...data.specifications[i], _id: uuidv4() };
    //       const { content } = await productSpecificationService.create(item);
    //       data.specifications[i] = content._id;
    //     }
    //   }
    //   const { content } = await productService.create(data);
    //   setProducts((prevState) => [...prevState, content]);
    //   // return content;
    // } catch (error) {
    //   errorCather(error);
    // } finally {
    //   setLoading(false);
    // }
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
        createProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
