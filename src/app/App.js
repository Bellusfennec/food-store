/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./common/components/loading";
import ErrorLayout from "./pages/error/components/ErrorLayout";
import { setAuth } from "./store/authSlicer";
import AppRoutes from "./AppRoutes";
import { loadUser, setUser } from "./store/userSlicer";
import { useUser } from "./hooks/useUsers";

function App() {
  const [loading, setLoading] = useState(true);
  const { accessToken, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { getUser } = useUser();

  useEffect(() => {
    if (accessToken) {
      dispatch(setAuth());
    }
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    if (userId) {
      // dispatch(loadUser(userId));
      getUser(userId).then((user) => {
        dispatch(setUser(user));
      });
    }
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
