import { Route, Routes } from "react-router-dom";
import UserProvider from "./hooks/useUsers.jsx";
import HomeIndex from "./pages/home/index.js";
import PassportIndex from "./pages/passport/index.js";
import ProductIndex from "./pages/product/index.js";
import NotFoundIndex from "./pages/error/NotFoundIndex.jsx";
import AdminIndex from "./pages/admin/AdminIndex.jsx";

const AppRoutes = () => {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<HomeIndex />} />
        <Route path="passport/:page?" element={<PassportIndex />} />
        <Route path="product/:page?/:productId?" element={<ProductIndex />} />
        <Route path="admin/:page?/:action?" element={<AdminIndex />} />
        <Route path="*" element={<NotFoundIndex />} />
      </Routes>
    </UserProvider>
  );
};

export default AppRoutes;
