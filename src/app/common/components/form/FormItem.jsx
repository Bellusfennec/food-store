import style from "./FormItem.module.scss";

const FormItem = (props) => {
  const { children, grow, align } = props;

  return (
    <div
      className={
        (grow ? `${style.grow}` : "") + (align ? ` ${style.center}` : "")
      }
    >
      {children}
    </div>
  );
};

export default FormItem;
