import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUserIsLoading, loadUser } from "../../store/user";
import ErrorLayout from "../../pages/error/components";
import { Loading } from "../components/loading";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isLoading = useSelector(getUserIsLoading());

  useEffect(() => {
    if (isLoggedIn) dispatch(loadUser());
  }, [isLoggedIn]);

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
