/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import products from "../../mockData/products.json";
import categories from "../../mockData/categories.json";
import users from "../../mockData/users.json";
import httpService from "../services/http.service";
import configFile from "../../config/index.json";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

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
    console.log(count, "/", summaryCount, "* 100 =", newProgress);
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

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function initialize() {
    try {
      if (configFile.isFireBase) {
        for (let profession of products) {
          const id = profession._id ? profession._id : uuidv4();
          profession = { _id: id, ...profession };
          await httpService.put("product/" + profession._id, profession);
          incrementCount();
        }
        for (let user of users) {
          const id = user._id ? user._id : uuidv4();
          user = { _id: id, ...user };
          await httpService.put("user/" + user._id, user);
          incrementCount();
        }
        for (let quality of categories) {
          const id = quality._id ? quality._id : uuidv4();
          quality = { _id: id, ...quality };
          await httpService.put("category/" + quality._id, quality);
          incrementCount();
        }
      }
    } catch (error) {
      setError(error);
      console.log(error);
      setStatus(statusConsts.error);
    }
  }
  return { error, initialize, progress, status };
};
export default useMockData;
