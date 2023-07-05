import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import ContainerWrapper, { SectionWrapper } from "../ui/wrapper";

const Navbar = () => {
  const { authState } = useSelector((state) => state.auth);
  return (
    <nav>
      <SectionWrapper y="0">
        <ContainerWrapper className={style.container}>
          <div className={style.logo}>
            <Link to="/">Food Market</Link>
          </div>
          <div className={style.navMenu}>
            <Link to="/">Главная</Link>
            <Link to="/product">Продукты</Link>
          </div>
          <div className={style.userMenu}>
            {authState ? (
              <>
                <Link to="/" title="Поиск">
                  <AiOutlineSearch />
                </Link>
                <Link to="/basket" title="Корзина">
                  <AiOutlineShoppingCart />
                </Link>
                <Link
                  to="/passport/profile"
                  title="Профиль"
                  className={style.user}
                >
                  <AiOutlineUser />{" "}
                  <div className={style.userArrow}>
                    <IoChevronBackOutline />
                  </div>
                </Link>
                <Link to="/product/create" className={style.item}>
                  <FiPlus className={style.icon} />
                </Link>
              </>
            ) : (
              <Link to="/passport/login">Вход</Link>
            )}
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </nav>
  );
};

export default Navbar;
