import React from "react";
import List from "../../../common/components/card/List";
import { Loading } from "../../../common/components/loading";
import ContainerWrapper, {
  SectionWrapper,
} from "../../../common/components/wrapper";
import style from "./ListProducts.module.scss";
import { useProducts } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import ProductCard from "../../../common/components/card/ProductCard";

const ListProducts = () => {
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const categoriesListProducts = (categories) => {
    return categories.map((category) => {
      const productsList = [...products].filter(
        (product) => Number(product.category) === Number(category.id)
      );
      category.products = productsList ? productsList : [];
      return category;
    });
  };

  return (
    <SectionWrapper>
      <ContainerWrapper>
        {isLoadingCategories && isLoadingProducts && (
          <>
            <Loading />
          </>
        )}
        {!isLoadingCategories &&
          !isLoadingProducts &&
          categories?.length > 0 &&
          categoriesListProducts(categories).map(
            ({ name, id, products }, i) =>
              products?.length > 0 && (
                <div key={id} className={style.container}>
                  <h3 className={style.title}>{name}</h3>
                  <List>
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        link={`/product/detail/${product.id}`}
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
