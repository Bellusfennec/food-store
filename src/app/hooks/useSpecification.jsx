import { useEffect, useState } from "react";
import specificationService from "../services/specification.service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  createSpecifications,
  setSpecifications,
} from "../store/specification";
import { useDispatch } from "react-redux";

const useSpecification = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSpecificationsList = async () => {
    setLoading(true);
    try {
      const { content } = await specificationService.getAll();
      dispatch(setSpecifications(content));
      setLoading(false);
      return content;
    } catch (error) {
      errorCather(error);
    }
  };

  const addSpecification = async (data) => {
    setLoading(true);
    data = { ...data, _id: uuidv4() };
    try {
      const { content } = await specificationService.create(data);
      dispatch(createSpecifications(content));
      setLoading(false);
      return content;
    } catch (error) {
      errorCather(error);
    }
  };

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

  return { isLoading, addSpecification, getSpecificationsList };
};

export default useSpecification;
