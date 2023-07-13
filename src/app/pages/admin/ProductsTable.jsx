import React from "react";
import Table, { TableHeader, TableBody } from "../../common/components/table";
import { Link, useNavigate } from "react-router-dom";

const ProductsTable = ({ products, onDeleteProduct, onSort, selectedSort }) => {
  const navigate = useNavigate();
  const columns = {
    title: {
      path: "name",
      name: "Название",
      component: (product) => (
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      ),
    },
    category: { path: "category", name: "Категория" },
    edit: {
      component: (product) => (
        <button
          className="btn btn-danger"
          onClick={() => navigate(`/admin/product/edit/${product._id}`)}
        >
          Редактировать
        </button>
      ),
    },
    delete: {
      component: (product) => (
        <button
          className="btn btn-danger"
          onClick={() => onDeleteProduct(product._id)}
        >
          Удалить
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
