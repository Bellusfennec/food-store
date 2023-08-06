/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";
import { Loading } from "./common/components/loading";
import ErrorLayout from "./pages/error/components/ErrorLayout";
import { checkAuth } from "./store/auth";
import { loadUser } from "./store/currentUser";

function App() {
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userId) dispatch(loadUser(userId));
  }, [userId]);

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
