/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import AppRoutes from "./AppRoutes";
import AppLoader from "./common/hoc/appLoader";

function App() {
  return (
    <AppLoader>
      <AppRoutes />
    </AppLoader>
  );
}

export default App;
