/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Loading } from "../common/components/ui/loading";
import UserProvider from "../common/hooks/useUsers";
import NotFoundPage from "../pages/error";
import ErrorLayout from "../pages/error/components/layouts";
import HomePage from "../pages/home";
import ProductPage from "../pages/product";
import PassportPage from "../pages/user";
import { setAuthState } from "./store/authSlicer";

function App() {
  const [loading, setLoading] = useState(true);
  const { tokenState } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenState) {
      dispatch(setAuthState());
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
      <UserProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="passport/:page?" element={<PassportPage />} />
          <Route path="product/:page?/:productId?" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
