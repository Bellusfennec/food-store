import React from "react";
import style from "./TextInput.module.scss";

const TextInput = (props) => {
  const { name, value, error, onChange, autoComplete, placeholder, onBlur } =
    props;
  const type = props.type ? props.type : "text";

  return (
    <div className={style.grow}>
      <div className={style.container + (error ? " " + style.error : "")}>
        <input
          type={type}
          autoComplete={autoComplete}
          name={name}
          value={value}
          placeholder=" "
          onChange={onChange}
          onBlur={onBlur}
          className={style.input}
        />
        {placeholder && <div className={style.placeholder}>{placeholder}</div>}
        <div className={style.border}></div>
      </div>
      {error && <p className={style.hint}>{error}</p>}
    </div>
  );
};

export default React.memo(TextInput);
