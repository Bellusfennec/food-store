import { Button, FormGroup, FormItem } from "../../../common/components/form";
import SpecificationCreate from "./SpecificationCreate";
import SpecificationField from "./SpecificationField";

const SpecificationForm = (props) => {
  const { setForm, value } = props;

  const handlerCreateField = () => {
    const newSpecification = {
      _id: value.length,
      value: "",
      specification: "",
    };
    setForm((form) => ({
      ...form,
      specifications: [...form.specifications, newSpecification],
    }));
  };

  const handlerRemoveField = (id) => {
    const specifications = value.filter((item) => item._id !== id);
    setForm((form) => ({ ...form, specifications }));
  };

  const handlerChangeData = (data) => {
    const isRepeat = value.filter((item) => item._id === data._id);
    const specifications =
      isRepeat.length > 0
        ? value.map((item) => (item._id === data._id ? data : item))
        : [...value, data];
    setForm((form) => ({ ...form, specifications }));
  };

  return (
    <>
      {value.map((item) => (
        <SpecificationField
          key={item._id}
          item={item}
          setData={handlerChangeData}
          onRemove={handlerRemoveField}
        />
      ))}
      <FormGroup>
        <FormItem grow={true}>
          <Button type="button" onClick={handlerCreateField} title="Добавить">
            Добавить характеристику к товару
          </Button>
        </FormItem>
        <FormItem align="center">
          <SpecificationCreate />
        </FormItem>
      </FormGroup>
    </>
  );
};

export default SpecificationForm;
