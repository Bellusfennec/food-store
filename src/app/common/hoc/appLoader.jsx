/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorLayout from "../../pages/error/components";
import {
  getLoggedStatus,
  getUserLoadingStatus,
  loadedUser,
} from "../../store/user";
import { Loading } from "../components/loading";
import { loadSpecifications } from "../../store/specification";
import { loadCategories } from "../../store/category";
import { loadProducts } from "../../store/product";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getLoggedStatus());
  const isLoading = useSelector(getUserLoadingStatus());

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
    dispatch(loadSpecifications());
    if (isLogged) dispatch(loadedUser());
  }, [isLogged]);

  if (isLoading) {
    return (
      <ErrorLayout>
        <Loading />
      </ErrorLayout>
    );
  }

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
