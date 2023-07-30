import { FiPlus } from "react-icons/fi";
import Divider from "../../../common/components/divider/Divider";
import {
  Button,
  FormGroup,
  FormItem,
  IconButton,
  TextInput,
} from "../../../common/components/form";
import Modal from "../../../common/components/modal/Modal";
import { Loading } from "../../../common/components/loading";
import useForm from "../../../hooks/useForm";
import { useState } from "react";
import useSpecification from "../../../hooks/useSpecification";

const SpecificationCreate = () => {
  const [modal, setModal] = useState(false);
  const CONFIG = { name: { isRequared: "" } };
  const FORM = { name: "" };
  const {
    handlerChange,
    form,
    setError,
    handlerSubmit,
    isValid,
    name,
    placeholder,
    error,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });
  const { isLoading, createSpecification } = useSpecification();

  function onSubmit(data) {
    createSpecification(data)
      .then(() => setModal(false))
      .catch((error) => setError(error));
  }

  return (
    <FormGroup>
      <FormItem>
        <IconButton onClick={() => setModal(true)} title="Добавить">
          <FiPlus />
        </IconButton>
      </FormItem>

      <Modal open={modal} setOpen={setModal} title="Новая характеристика">
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
    </FormGroup>
  );
};

export default SpecificationCreate;
