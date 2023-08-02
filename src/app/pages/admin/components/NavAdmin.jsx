import { Link } from "react-router-dom";
import style from "./NavAdmin.module.scss";

const NavAdmin = () => {
  return (
    <nav className={style.nav}>
      <Link to={`/admin/product`}>Все продукты</Link>
      <br />
      <Link to={`/admin/category`}>Все категории</Link>
      <br />
      <Link to={`/admin/mock-data`}>Mock data</Link>
    </nav>
  );
};

export default NavAdmin;
