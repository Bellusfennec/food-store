import React from "react";
import style from "./Select.module.scss";

const Select = (props) => {
  const { placeholder, options, value, onChange, name, error } = props;

  return (
    <div>
      <div className={style.container}>
        <select
          value={value}
          onChange={onChange}
          name={name}
          className={style.select}
        >
          {value === "" && <option value="0" className={style.option}></option>}
          {options.map((option) => (
            <option
              key={option._id}
              value={option._id}
              className={style.option}
            >
              {option.name}
            </option>
          ))}
        </select>
        {placeholder && (
          <label
            className={
              style.placeholder + (value ? " " + style.activePlaceholder : "")
            }
          >
            {placeholder}
          </label>
        )}
      </div>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default React.memo(Select);
