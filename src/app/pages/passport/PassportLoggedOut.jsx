/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedOutUser } from "../../store/user";
import { useNavigate } from "react-router-dom";

const PassportLoggedOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loggedOutUser());
    navigate(`/`);
  }, []);

  return <h1>Loading</h1>;
};

export default PassportLoggedOut;
