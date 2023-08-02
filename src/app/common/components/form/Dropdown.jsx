/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";
import style from "./Dropdown.module.scss";

const Dropdown = (props) => {
  const { placeholder, name, error, value, onChange, setForm, onBlur } = props;
  const initOptions = props.options;
  const [options, setOptions] = useState(initOptions);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const refDropdown = useRef(null);

  const handlerSelect = (option) => {
    setSelected(option.name);
    setForm((form) => ({ ...form, [name]: option._id }));
    setOpen(false);
  };

  const handlerClear = () => {
    setSelected("");
    setForm((form) => ({ ...form, [name]: "" }));
    setOpen(false);
  };

  const handlerOpen = () => {
    setOpen(!isOpen);
  };

  const outsideClick = (e) => {
    if (!refDropdown.current.contains(e.target) && isOpen) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", outsideClick);
      return () => document.removeEventListener("click", outsideClick);
    }
  }, [isOpen]);

  useEffect(() => {
    const finded = options.filter((o) => o._id === value)[0];
    if (finded) {
      setSelected(finded.name);
      setOptions(initOptions);
    } else {
      if (!isOpen && value.length > 0) setOpen(true);
      if (value.length > 0) {
        setOpen(true);
        /* Поиск */
        const blockSymbols = value.includes("\\")
          ? value.replace(/\\/g, "")
          : value;
        const searchRegExp = new RegExp(blockSymbols.toLowerCase());
        const searchFilter = options.filter((o) =>
          searchRegExp.test(o.name.toLowerCase())
        );
        setOptions(searchFilter);
      } else {
        setOptions(initOptions);
      }

      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    setOptions(initOptions);
  }, [initOptions]);

  return (
    <div ref={refDropdown} className={style.grow}>
      <div>
        <div className={style.container + (error ? " " + style.error : "")}>
          <input
            name={name}
            value={selected}
            placeholder=" "
            className={style.input}
            onChange={onChange}
            onClick={handlerOpen}
            onBlur={onBlur}
          />
          {placeholder && (
            <div className={style.placeholder}>{placeholder}</div>
          )}
          <div className={style.border}></div>
          <div className={style.func}>
            {selected.length > 0 && (
              <div className={style.clear} onClick={handlerClear}>
                <IoClose />
              </div>
            )}
            <span className={style.divider}></span>
            <div className={style.arrow} onClick={handlerOpen}>
              <IoChevronDown />
            </div>
          </div>
        </div>
        <div className={style.containerOptions}>
          {isOpen && (
            <div className={style.options}>
              {options.length === 0 && (
                <div className={style.notFound}>Ничего не найдено</div>
              )}
              {options.map((option) => (
                <div
                  key={option._id}
                  onClick={() => handlerSelect(option)}
                  className={
                    style.option +
                    (option._id === selected?._id ? " " + style.active : "")
                  }
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && <p className={style.hint}>{error}</p>}
    </div>
  );
};
export default Dropdown;
