/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Loading } from "../common/components/ui/loading";
import { setAuthState } from "./store/authSlicer";
import HomePage from "../pages/home";
import NotFoundPage from "../pages/error";
import ErrorLayout from "../pages/error/components/layouts";
import PassportPage from "../pages/user";
import ProductPage from "../pages/product";
import Tags from "../pages/product/components/Tags";

function App() {
  const [loading, setLoading] = useState(true);
  const { tokenState } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenState) {
      dispatch(setAuthState(true));
    }
    setLoading(false);
  }, [tokenState]);

  if (loading) {
    return (
      <ErrorLayout>
        <Loading />
      </ErrorLayout>
    );
  }

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="passport/:page?" element={<PassportPage />} />
        <Route path="product/:page?/:productId?" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
