import React from "react";
import Table, { TableHeader, TableBody } from "../../common/components/table";
import { Link } from "react-router-dom";

const ProductsTable = ({ products, onDeleteProduct, onSort, selectedSort }) => {
  const columns = {
    title: {
      path: "title",
      name: "Название",
      component: (product) => (
        <Link to={`/product/${product._id}`}>{product.title}</Link>
      ),
    },
    category: { path: "category", name: "Категория" },
    delete: {
      component: (product) => (
        <button
          className="btn btn-danger"
          onClick={() => onDeleteProduct(product._id)}
        >
          Delete
        </button>
      ),
    },
  };

  return (
    <Table {...{ onSort, selectedSort, columns, data: products }}>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: products }} />
    </Table>
  );
};

export default ProductsTable;
