import React from "react";
import style from "./TextInput.module.scss";

const TextInput = (props) => {
  const { name, value, error, onChange, autoComplete, placeholder } = props;
  const type = props.type ? props.type : "text";

  return (
    <div>
      <div className={style.container}>
        <input
          type={type}
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

export default TextInput;
