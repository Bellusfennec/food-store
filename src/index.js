import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./app/common/styles/global.scss";
import { Provider } from "react-redux";
import store from "./app/store/store";
import UserProvider from "./app/hooks/useUsers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
