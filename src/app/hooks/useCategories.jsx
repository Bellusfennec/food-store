/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import categoryService from "../services/category.service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const CategoriesContext = React.createContext();

export const useCategories = () => {
  return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCategoriesList().then((res) => {});
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getCategory = (id) => {
    return categories.find((p) => p._id === id);
  };

  const getCategoriesList = async () => {
    try {
      const { content } = await categoryService.fetchAll();
      setCategories(content);
      setLoading(false);
      return content;
    } catch (error) {
      errorCather(error);
    }
  };

  const createCategory = async (data) => {
    setLoading(true);
    const _id = uuidv4();
    data = { ...data, _id };
    try {
      const { content } = await categoryService.create(data);
      setCategories((prevState) => [...prevState, content]);
      setLoading(false);
      return content;
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
    console.log(error);
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getCategory,
        createCategory,
        isLoading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
