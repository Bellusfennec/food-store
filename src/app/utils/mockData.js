import { useState, useEffect } from "react";
import products from "../../mockData/products.json";
import categories from "../../mockData/categories.json";
import users from "../../mockData/users.json";
import httpService from "../services/http.service";

const useMockData = () => {
  const statusConsts = {
    idle: "Not Started",
    pending: "In process",
    seccessed: "Ready",
    error: "Error occured",
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = products.length + categories.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.seccessed);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const profession of products) {
        await httpService.put("products/" + profession._id, profession);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put("user/" + user._id, user);
        incrementCount();
      }
      for (const quality of categories) {
        await httpService.put("categories/" + quality._id, quality);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }
  return { error, initialize, progress, status };
};
export default useMockData;
