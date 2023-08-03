/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import categoryService from "../services/category.service";
import { createCategory, setCategories } from "../store/categorySlicer";

const useCategories = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getCategoriesList = async () => {
    try {
      const { content } = await categoryService.getAll();
      dispatch(setCategories(content));
      setLoading(false);
      return content;
    } catch (error) {
      errorCather(error);
    }
  };

  const addCategory = async (data) => {
    setLoading(true);
    data = { ...data, _id: uuidv4() };
    try {
      const { content } = await categoryService.create(data);
      dispatch(createCategory(content));
      setLoading(false);
      return content;
    } catch (error) {
      errorCather(error);
    }
  };

  // const getCategory = (id) => {
  //   return categories.find((p) => p._id === id);
  // };

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

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return {
    addCategory,
    isLoading,
    getCategoriesList,
  };
};

export default useCategories;
