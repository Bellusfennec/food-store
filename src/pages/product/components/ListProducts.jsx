import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./ListProducts.module.scss";
import { getCategoriesListHTTP } from "../../../app/http/categoryHTTP";
import { getProductsListHTTP } from "../../../app/http/productHTTP";
import {
  MdCurrencyRuble,
  MdFavorite,
  MdFavoriteBorder,
  MdStar,
} from "react-icons/md";
import { Loading } from "../../../common/components/ui/loading";
import { Button } from "../../../common/components/ui/form";
import TagsProduct from "./TagsProduct";
import List from "../../../common/components/ui/card/List";
import TitleProduct from "./TitleProduct";
import ContainerWrapper, {
  SectionWrapper,
} from "../../../common/components/ui/wrapper";
import NavProduct from "./NavProduct";

const ListProducts = () => {
  const [loading, setLoading] = useState(true);
  const [INIT_PRODUCTS, setINIT_PRODUCTS] = useState([]);
  const [products, setProducts] = useState(false);
  const [categories, setCategories] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await getProductsListHTTP();
      if (response.ok) {
        setINIT_PRODUCTS(response.data);
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategoriesListHTTP();
      if (response.ok) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handlerSelectedCategory = (id) => {
    if (id === undefined || Number(id) < 1) return setProducts(INIT_PRODUCTS);
    const filtredProducts = INIT_PRODUCTS.filter(
      (product) => product.category.id === Number(id)
    );
    setProducts(filtredProducts);
  };

  return (
    <>
      <ContainerWrapper>
        <TitleProduct />
        <NavProduct options={categories} selected={handlerSelectedCategory} />
        {/* <TagsProduct options={categories} /> */}
      </ContainerWrapper>
      <SectionWrapper>
        <ContainerWrapper>
          {!loading && products && (
            <List>
              {products.length > 0 &&
                products.map(({ title, uuid }, i) => (
                  <div key={uuid} className={style.item}>
                    <div className={style.image}>
                      <img
                        src={process.env.PUBLIC_URL + `/image/${i}.jpg`}
                        alt={title}
                      />
                    </div>
                    <div className={style.main}>
                      <Link
                        to={`/product/detail/${uuid}`}
                        className={style.label}
                      >
                        <h3>{title}</h3>
                      </Link>
                      <div className={style.info}>
                        <div className={style.action}>
                          <div className={style.rating}>
                            <MdStar /> <span>4.5/5</span>
                          </div>
                          <div className={style.favorite}>
                            {false ? <MdFavorite /> : <MdFavoriteBorder />}{" "}
                            <span>Избранное</span>
                          </div>
                        </div>
                        <div className={style.price}>
                          <div className={style.discount}>
                            <div>Скидка -30%</div>
                            <span>
                              129 <MdCurrencyRuble />
                            </span>
                          </div>
                          <div className={style.regular}>
                            {" "}
                            99 <MdCurrencyRuble />
                          </div>
                        </div>
                      </div>
                      <div className={style.button}>
                        <Button type="button">В корзину</Button>
                      </div>
                    </div>
                  </div>
                ))}
              {products.length === 0 && <div>Не найдено</div>}
              {!products && <div>Нет продуктов</div>}
            </List>
          )}
          {loading && (
            <div>
              <Loading />
            </div>
          )}
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
};

export default ListProducts;
