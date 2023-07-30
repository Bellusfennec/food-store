import _ from "lodash";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchInput from "../../common/components/form/SearchInput";
import { Loading } from "../../common/components/loading";
import { SectionWrapper } from "../../common/components/wrapper";
import { useProducts } from "../../hooks/useProducts";
import ProductsTable from "./components/ProductsTable";
import { FormGroup, FormItem } from "../../common/components/form";

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
      <FormGroup>
        <FormItem grow={true}>
          {!isLoading && sortedProducts && (
            <SearchInput
              value={search}
              onChange={handlerSerach}
              placeholder="Serach..."
            />
          )}
        </FormItem>
        <FormItem>
          <Link to="/admin/product/create">
            <FiPlus />
          </Link>
        </FormItem>
      </FormGroup>
      <br />
      {isLoading && (
        <>
          <Loading />
        </>
      )}
      {!isLoading && (
        <>
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
