import React from "react";
import ContainerWrapper, { SectionWrapper } from "../wrapper";
import style from "./Header.module.scss";
import UserBar from "./UserBar";
import NavBar from "./NavBar";
import Logo from "./Logo";

const Header = () => {
  return (
    <header>
      <SectionWrapper y="0">
        <ContainerWrapper className={style.container}>
          <Logo />
          <NavBar />
          <UserBar />
        </ContainerWrapper>
      </SectionWrapper>
    </header>
  );
};

export default Header;
