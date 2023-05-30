import React from "react";
import style from "./Textarea.module.scss";

const Textarea = (props) => {
  const { name, value, error, onChange, placeholder } = props;

  return (
    <div>
      <div className={style.container}>
        <textarea
          name={name}
          placeholder=" "
          onChange={onChange}
          defaultValue={value}
          className={style.textarea}
          spellCheck="true"
        />
        {placeholder && (
          <label className={style.placeholder}>{placeholder}</label>
        )}
      </div>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default Textarea;
