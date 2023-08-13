import React from "react";
import style from "./TextareaField.module.scss";

const TextareaField = (props) => {
  const { name, value, error, onChange, placeholder, onBlur } = props;

  return (
    <div className={style.grow}>
      <div className={style.container + (error ? " " + style.error : "")}>
        <textarea
          name={name}
          placeholder=" "
          onChange={onChange}
          value={value}
          className={style.textarea}
          onBlur={onBlur}
          spellCheck="true"
        />
        {placeholder && <div className={style.placeholder}>{placeholder}</div>}
        <div className={style.border}></div>
      </div>
      {error && <p className={style.hint}>{error}</p>}
    </div>
  );
};

export default React.memo(TextareaField);
