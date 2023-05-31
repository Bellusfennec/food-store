import React from "react";
import style from "./SearchInput.module.scss";

const SearchInput = (props) => {
  const { name, value, error, onChange, autoComplete, placeholder } = props;

  return (
    <div>
      <div className={style.container}>
        <input
          type="search"
          autoComplete={autoComplete}
          name={name}
          value={value}
          placeholder=" "
          onChange={onChange}
          className={style.input}
        />
        {placeholder && (
          <label className={style.placeholder}>{placeholder}</label>
        )}
      </div>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default SearchInput;
