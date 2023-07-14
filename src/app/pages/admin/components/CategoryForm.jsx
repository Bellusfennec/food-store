import { FiPlus } from "react-icons/fi";
import {
  Button,
  IconButton,
  Select,
  TextInput,
} from "../../../common/components/form";
import Modal from "../../../common/components/modal/Modal";
import Divider from "../../../common/components/divider/Divider";
import { Loading } from "../../../common/components/loading";
import style from "./CategoryForm.module.scss";
import { useState } from "react";
import useForm from "../../../hooks/useForm";
import { useCategories } from "../../../hooks/useCategories";

const CategoryForm = (props) => {
  const { form, onChange } = props;
  const [categoryModal, setCategoryModal] = useState(false);
  const {
    handlerChange: handlerChangeCategory,
    form: categoryForm,
    data,
    setError,
  } = useForm({ name: "" });
  const { isLoading, createCategory, categories } = useCategories();

  const handlerSubmitCategoryForm = async (event) => {
    event.preventDefault();
    console.log(data);

    await createCategory(data).catch((error) => setError(error));
  };

  return (
    <div className={style.inputGroup}>
      <Select
        name={form.category.name}
        options={categories}
        value={form.category.value}
        placeholder={form.category.label}
        onChange={onChange}
      />
      <div className={style.inputItem}>
        <IconButton
          onClick={() => setCategoryModal(true)}
          className={style.icon}
          title="Добавить"
        >
          <FiPlus />
        </IconButton>
      </div>
      <Modal
        open={categoryModal}
        setOpen={setCategoryModal}
        title="Новая категория"
      >
        <Divider />
        <TextInput
          name={categoryForm.name.name}
          value={categoryForm.name.value}
          placeholder={categoryForm.name.label}
          onChange={handlerChangeCategory}
        />
        <Divider row="2" />
        <Button
          onClick={handlerSubmitCategoryForm}
          disabled={categoryForm.name.error}
        >
          {isLoading ? <Loading /> : "Создать"}
        </Button>
      </Modal>
    </div>
  );
};

export default CategoryForm;
