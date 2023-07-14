import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import style from "./Table.module.scss";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className={style.table}>
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};
Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object,
  children: PropTypes.array,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
};

export default Table;
