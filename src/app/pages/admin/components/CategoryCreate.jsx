import { useState } from "react";
import useForm from "../../../hooks/useForm";
import { Button, IconButton, TextInput } from "../../../common/components/form";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../common/components/modal/Modal";
import Divider from "../../../common/components/divider/Divider";
import { Loading } from "../../../common/components/loading";
import useCategories from "../../../hooks/useCategories";

const CategoryCreate = () => {
  const [modal, setModal] = useState(false);
  const CONFIG = { name: { isRequared: "" } };
  const FORM = { name: "" };
  const {
    handlerChange,
    form,
    setError,
    handlerSubmit,
    placeholder,
    name,
    error,
    isValid,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });
  const { isLoading, createCategory } = useCategories();
  // console.log(form, placeholder, name, error, isValid);

  function onSubmit(data) {
    createCategory(data)
      .then(() => setModal(false))
      .catch((error) => setError(error));
  }

  return (
    <>
      <IconButton onClick={() => setModal(true)} title="Добавить">
        <FiPlus />
      </IconButton>
      <Modal open={modal} setOpen={setModal} title="Новая категория">
        <Divider />
        <TextInput
          name={name.name}
          value={form.name}
          error={error.name}
          placeholder={placeholder.name}
          onChange={handlerChange}
        />
        <Divider row="2" />
        <Button onClick={handlerSubmit} disabled={!isValid}>
          {isLoading ? <Loading /> : "Создать"}
        </Button>
      </Modal>
    </>
  );
};

export default CategoryCreate;
