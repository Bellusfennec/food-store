import { Route, Routes } from "react-router-dom";
import AdminIndex from "./pages/admin/AdminIndex.jsx";
import NotFoundIndex from "./pages/error/NotFoundIndex.jsx";
import HomeIndex from "./pages/home/index.js";
import PassportIndex from "./pages/passport/index.js";
import ProductIndex from "./pages/product/index.js";
import PassportLoggedOut from "./pages/passport/PassportLoggedOut.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomeIndex />} />
      <Route path="passport/:page?" element={<PassportIndex />} />
      <Route path="logout" element={<PassportLoggedOut />} />
      <Route path="product/:page?/:productId?" element={<ProductIndex />} />
      <Route path="admin/:page?/:action?/:id?" element={<AdminIndex />} />
      <Route path="*" element={<NotFoundIndex />} />
    </Routes>
  );
};

export default AppRoutes;
