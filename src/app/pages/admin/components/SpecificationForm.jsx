import { useState } from "react";
import {
  Button,
  IconButton,
  Select,
  TextInput,
} from "../../../common/components/form";
import style from "./SpecificationForm.module.scss";
import useForm from "../../../hooks/useForm";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../common/components/modal/Modal";
import Divider from "../../../common/components/divider/Divider";
import { Loading } from "../../../common/components/loading";
import { GrClose } from "react-icons/gr";

const SpecificationForm = (props) => {
  const { form, onChange } = props;
  const INITIAL_FORM = { name: "" };
  const [specifications, setSpecifications] = useState([]);
  const [specificationsListForm, setSpecificationsListForm] = useState({});
  const [specificationModal, setSpecificationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handlerChange: handlerChangeSpecification,
    form: specificationForm,
    data,
    setError,
  } = useForm(INITIAL_FORM);
  // const { isLoading, createCategory, categories } = useCategories();

  const handlerSubmitCategoryForm = async (event) => {
    event.preventDefault();
    console.log(data);

    // await createCategory(data).catch((error) => setError(error));
  };

  /* SPECIFICATION */
  const handlerNewSpecificationForm = (event) => {
    const { name, value } = event.currentTarget;

    // setSpecificationForm({
    //   ...specificationForm,
    //   [name]: { ...specificationForm[name], value },
    // });

    // setSpecificationForm((prevState) => validationForm(prevState));
  };

  const handlerCreateSpecification = async (event) => {
    event.preventDefault();

    // let data;
    // data = { ...data, name: specificationForm.name.value || "" };
    // try {
    //   const response = await createSpecificationHTTP(data);
    //   if (response.ok) {
    //     setSpecificationForm(INITIAL_SPECIFICATION_FORM);
    //     setSpecificationModal(false);
    //     getSpecifications();
    //   }
    // } catch (error) {}
  };

  /* NEW SPECIFICATION */
  const handlerNewFieldSpecification = () => {
    /* Количество элементов */
    const size = Object.keys(specificationsListForm).length;
    /* Новое название */
    const nameNewSpecification = "specification" + size;
    /* Создать */
    // const newSpecification = createForm({ [nameNewSpecification]: "" });
    /* Добавить */
    // setSpecificationsListForm({
    //   ...specificationsListForm,
    //   ...newSpecification,
    // });
  };

  /* SPECIFICATION LIST */
  const handlerSpecificationsListForm = (event) => {
    /* Если инпут */
    if (event.target.nodeName === "INPUT") {
      const { name, value: inputValue } = event.currentTarget;
      setSpecificationsListForm({
        ...specificationsListForm,
        [name]: { ...specificationsListForm[name], value: inputValue },
      });
    }
    /* Если селект */
    if (event.target.nodeName === "SELECT") {
      const { name, value: selectValue } = event.currentTarget;
      setSpecificationsListForm({
        ...specificationsListForm,
        [name]: { ...specificationsListForm[name], value2: selectValue },
      });
    }
    /* Добавить в форму товара */
    // setProductForm({
    //   ...productForm,
    //   specification: { ...specificationsListForm },
    // });
  };

  const handlerRemoveFieldSpecification = (fieldName) => {
    const update = Object.entries(specificationsListForm).filter(
      ([key, value]) => {
        return key !== fieldName;
      }
    );
    const updated = Object.fromEntries(update);
    setSpecificationsListForm(updated);
  };

  return (
    <>
      {specificationsListForm &&
        Object.entries(specificationsListForm).map(([key, value]) => (
          <div key={key}>
            <div className={style.inputGroup}>
              <TextInput
                name={specificationsListForm[key].name}
                value={specificationsListForm[key].value}
                placeholder={specificationsListForm[key].label}
                onChange={handlerSpecificationsListForm}
              />
              <div className={style.inputItem}>
                <Select
                  name={specificationsListForm[key].name}
                  options={specifications}
                  value={specificationsListForm[key].value2}
                  onChange={handlerSpecificationsListForm}
                />
              </div>
              <IconButton
                type="button"
                title="Удалить"
                onClick={() => handlerRemoveFieldSpecification(key)}
              >
                <GrClose />
              </IconButton>
            </div>
            <Divider />
          </div>
        ))}

      <Divider />
      <div className={style.inputGroup}>
        <div className={style.inputItem}>
          <Button
            onClick={handlerNewFieldSpecification}
            className={style.icon}
            title="Добавить"
          >
            Новая характеристика
          </Button>
        </div>
        <div className={style.inputItem}>
          <IconButton
            onClick={() => setSpecificationModal(true)}
            className={style.icon}
            title="Добавить"
          >
            <FiPlus />
          </IconButton>
        </div>
        <Modal
          open={specificationModal}
          setOpen={setSpecificationModal}
          title="Новый тип характеристики"
        >
          <Divider />
          <TextInput
            name={specificationForm.name.name}
            value={specificationForm.name.value}
            placeholder={specificationForm.name.label}
            onChange={handlerNewSpecificationForm}
          />
          <Divider row="2" />
          <Button
            onClick={handlerCreateSpecification}
            disabled={specificationForm.name.error}
          >
            {loading ? <Loading /> : "Создать"}
          </Button>
        </Modal>
      </div>
    </>
  );
};

export default SpecificationForm;
