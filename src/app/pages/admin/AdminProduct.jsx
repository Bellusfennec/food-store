import { useState } from "react";
import { Loading } from "../../common/components/loading";
import { SectionWrapper } from "../../common/components/wrapper";
import { useProducts } from "../../hooks/useProducts";
import ProductsTable from "./ProductsTable";
import _ from "lodash";
import SearchInput from "../../common/components/form/SearchInput";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useCategories } from "../../hooks/useCategories";

const AdminProduct = () => {
  const { products, isLoading } = useProducts();
  // const { categories, isLoading: isLoadingCategories } = useCategories();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [search, setSearch] = useState("");

  /* Поиск */
  const searchRegExp = new RegExp(search);
  const searchResult = products?.filter((product) =>
    searchRegExp.test(product.name.toLowerCase())
  );
  /* Сортировка колонки */
  const sortedProducts = _.orderBy(searchResult, [sortBy.path], [sortBy.order]);

  const handlerDelete = (id) => {
    // setUsers((prev) => prev.filter((user) => user._id !== userId));
    console.log(id);
  };

  const handlerSort = (item) => {
    setSortBy(item);
  };

  const handlerSerach = ({ target }) => {
    setSearch(target.value.toLowerCase());
  };

  return (
    <SectionWrapper>
      <Link to="/admin/product/create">
        <FiPlus />
      </Link>
      {isLoading && (
        <>
          <Loading />
        </>
      )}
      {!isLoading && (
        <>
          {sortedProducts && (
            <>
              <SearchInput
                value={search}
                onChange={handlerSerach}
                placeholder="Serach..."
              />
              <br />
            </>
          )}
          {search && sortedProducts.length === 0 && (
            <h5 className="mt-4">Не найдено</h5>
          )}
          {sortedProducts.length > 0 && (
            <ProductsTable
              products={sortedProducts}
              onDeleteProduct={handlerDelete}
              onSort={handlerSort}
              selectedSort={sortBy}
            />
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default AdminProduct;
