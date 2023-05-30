import React from "react";
import { GrClose } from "react-icons/gr";
import style from "./Modal.module.scss";

const Modal = (props) => {
  const { open, setOpen, children, title } = props;
  return (
    <>
      {open && (
        <div className={style.modal}>
          <div className={style.body}>
            <div className={style.header}>
              <h4>{title}</h4>
              <button
                onClick={() => setOpen(false)}
                className={style.icon}
                title="Закрыть"
              >
                <GrClose />
              </button>
            </div>
            <div className={style.main}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
