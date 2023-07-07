import { useState } from "react";
import { Loading } from "../../common/components/loading";
import { SectionWrapper } from "../../common/components/wrapper";
import { useProducts } from "../../hooks/useProducts";
import ProductsTable from "./ProductsTable";

const ProductAdmin = () => {
  const { products, isLoading } = useProducts();
  const [sortBy, setSortBy] = useState({ path: "title", order: "asc" });

  const handlerDelete = (userId) => {
    // setUsers((prev) => prev.filter((user) => user._id !== userId));
    console.log(userId);
  };

  const handlerSort = (item) => {
    setSortBy(item);
  };

  return (
    <SectionWrapper>
      {isLoading && (
        <>
          <Loading />
        </>
      )}
      {!isLoading && products && (
        <ProductsTable
          products={products}
          onDeleteProduct={handlerDelete}
          onSort={handlerSort}
          selectedSort={sortBy}
        />
      )}
    </SectionWrapper>
  );
};

export default ProductAdmin;
