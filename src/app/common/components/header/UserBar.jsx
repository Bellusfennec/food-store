import React from "react";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../../store/user";
import style from "./UserBar.module.scss";

const UserBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <div className={style.userMenu}>
      {isLoggedIn ? (
        <>
          <Link to="/" title="Поиск">
            <AiOutlineSearch />
          </Link>
          <Link to="/basket" title="Корзина">
            <AiOutlineShoppingCart />
          </Link>
          <Link to="/passport/profile" title="Профиль" className={style.user}>
            <AiOutlineUser />{" "}
            <div className={style.userArrow}>
              <IoChevronBackOutline />
            </div>
          </Link>
          <Link to="/admin" className={style.item}>
            admin
          </Link>
        </>
      ) : (
        <Link to="/passport/login">Вход</Link>
      )}
    </div>
  );
};

export default UserBar;
