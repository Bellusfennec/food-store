import React from "react";
import { useSelector } from "react-redux";
import List from "../../../common/components/card/List";
import ProductCard from "../../../common/components/card/ProductCard";
import { Loading } from "../../../common/components/loading";
import ContainerWrapper, {
  SectionWrapper,
} from "../../../common/components/wrapper";
import { useProducts } from "../../../hooks/useProducts";
import style from "./ListProducts.module.scss";

const ListProducts = () => {
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { categories } = useSelector((state) => state.category);

  const categoriesListProducts = (data) => {
    return [...data].map((category) => {
      const filtredProducts = [...products].filter(
        (product) => product.category === category._id
      );
      const productsList = filtredProducts ? filtredProducts : [];
      return { ...category, products: productsList };
    });
  };

  return (
    <SectionWrapper>
      <ContainerWrapper>
        {isLoadingProducts && (
          <>
            <Loading />
          </>
        )}
        {!isLoadingProducts &&
          categories?.length > 0 &&
          categoriesListProducts(categories).map(
            ({ name, _id, products }, i) =>
              products?.length > 0 && (
                <div key={_id} className={style.container}>
                  <h3 className={style.title}>{name}</h3>
                  <List>
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        {...product}
                        link={`/product/detail/${product._id}`}
                      />
                    ))}
                  </List>
                </div>
              )
          )}
        {/* {!isLoading && products && (
          <List>
            {products?.length > 0 &&
              products.map(({ title, id }, i) => (
                <ProductCard key={id} />
                // <div key={uuid} className={style.item}>
                //   <div className={style.image}>
                //     <img
                //       src={process.env.PUBLIC_URL + `/image/${i}.jpg`}
                //       alt={title}
                //     />
                //   </div>
                //   <div className={style.main}>
                //     <Link
                //       to={`/product/detail/${uuid}`}
                //       className={style.label}
                //     >
                //       <h3>{title}</h3>
                //     </Link>
                //     <div className={style.info}>
                //       <div className={style.action}>
                //         <div className={style.rating}>
                //           <MdStar /> <span>4.5/5</span>
                //         </div>
                //         <div className={style.favorite}>
                //           {false ? <MdFavorite /> : <MdFavoriteBorder />}{" "}
                //           <span>Избранное</span>
                //         </div>
                //       </div>
                //       <div className={style.price}>
                //         <div className={style.discount}>
                //           <div>Скидка -30%</div>
                //           <span>
                //             129 <MdCurrencyRuble />
                //           </span>
                //         </div>
                //         <div className={style.regular}>
                //           {" "}
                //           99 <MdCurrencyRuble />
                //         </div>
                //       </div>
                //     </div>
                //     <div className={style.button}>
                //       <Button type="button">В корзину</Button>
                //     </div>
                //   </div>
                // </div>
              ))}
            {products.length === 0 && <div>Не найдено</div>}
            {!products && <div>Нет продуктов</div>}
          </List>
        )} */}
      </ContainerWrapper>
    </SectionWrapper>
  );
};

export default ListProducts;
