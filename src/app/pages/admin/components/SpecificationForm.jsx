import React from "react";
import { Button, FormGroup, FormItem } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import SpecificationCreate from "./SpecificationCreate";
import SpecificationField from "./SpecificationField";

const SpecificationForm = (props) => {
  const { setForm, value } = props;
  const valueIsString = typeof value[0] !== "object";
  const notEmpty = value?.length > 0;

  // console.log(value);

  const handlerCreateField = () => {
    const newSpecification = {
      _id: value?.length || 0,
      value: "",
      specification: "",
    };
    setForm((form) => ({
      ...form,
      specifications: [...(form?.specifications || []), newSpecification],
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

  if (valueIsString) return <Loading />;

  return (
    <>
      {value?.map((item) => (
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

export default React.memo(SpecificationForm);
