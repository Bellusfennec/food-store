import React from "react";
import style from "./Dropdown.module.scss";

const Dropdown = (props) => {
  const { trigger, options } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={style.dropdown}>
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className={style.select}>
          {options.map((option, index) => (
            <li key={index} className={style.itemMenu}>
              {React.cloneElement(option, {
                onClick: () => {
                  option.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Dropdown;
