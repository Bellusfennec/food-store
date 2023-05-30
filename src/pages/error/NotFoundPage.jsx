import React from "react";
// import style from "./NotFoundPage.module.scss";
import ErrorLayout from "./components/layouts";
import { Link, useParams } from "react-router-dom";
import Divider from "../../common/components/ui/divider/Divider";

const NotFoundPage = () => {
  console.log(useParams());

  return (
    <ErrorLayout>
      <div>Страница не найдена!</div>
      <Divider row="2" />
      <div>
        <Link to="/">Назад</Link>
      </div>
    </ErrorLayout>
  );
};

export default NotFoundPage;
