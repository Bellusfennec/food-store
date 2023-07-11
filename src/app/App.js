/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./common/components/loading";
import ErrorLayout from "./pages/error/components/ErrorLayout";
import { setAuth } from "./store/authSlicer";
import AppRoutes from "./AppRoutes";

function App() {
  const [loading, setLoading] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(setAuth());
    }
    setLoading(false);
  }, [accessToken]);

  if (loading) {
    return (
      <ErrorLayout>
        <Loading />
      </ErrorLayout>
    );
  }

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
