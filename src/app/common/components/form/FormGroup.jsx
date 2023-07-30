import style from "./FormGroup.module.scss";

const FormGroup = (props) => {
  const { children } = props;

  return <div className={style.formGroup}>{children}</div>;
};

export default FormGroup;
