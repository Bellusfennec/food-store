import { useState } from "react";
import { Loading } from "../../common/components/loading";
import { SectionWrapper } from "../../common/components/wrapper";
import { useProducts } from "../../hooks/useProducts";
import ProductsTable from "./ProductsTable";
import _ from "lodash";
import SearchInput from "../../common/components/form/SearchInput";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const ProductAdmin = () => {
  const { products, isLoading } = useProducts();
  const [sortBy, setSortBy] = useState({ path: "title", order: "asc" });
  const [search, setSearch] = useState("");

  /* Поиск */
  const searchRegExp = new RegExp(search);
  const searchResult = products?.filter((product) =>
    searchRegExp.test(product.title.toLowerCase())
  );
  /* Сортировка колонки */
  const sortedProducts = _.orderBy(searchResult, [sortBy.path], [sortBy.order]);

  const handlerDelete = (userId) => {
    // setUsers((prev) => prev.filter((user) => user._id !== userId));
    console.log(userId);
  };

  const handlerSort = (item) => {
    setSortBy(item);
  };

  const handlerSerach = ({ target }) => {
    setSearch(target.value.toLowerCase());
  };

  return (
    <SectionWrapper>
      <Link to="/product/create">
        <FiPlus />
      </Link>
      {isLoading && (
        <>
          <Loading />
        </>
      )}
      {sortedProducts && (
        <SearchInput
          value={search}
          onChange={handlerSerach}
          placeholder="Serach..."
        />
      )}
      {search && sortedProducts.length === 0 && (
        <h5 className="mt-4">Не найдено</h5>
      )}
      {!isLoading && products && (
        <ProductsTable
          products={sortedProducts}
          onDeleteProduct={handlerDelete}
          onSort={handlerSort}
          selectedSort={sortBy}
        />
      )}
    </SectionWrapper>
  );
};

export default ProductAdmin;
