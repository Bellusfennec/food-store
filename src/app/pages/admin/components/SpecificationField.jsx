/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import Divider from "../../../common/components/divider/Divider";
import { IconButton, TextInput } from "../../../common/components/form";
import Dropdown from "../../../common/components/form/Dropdown";
import FormGroup from "../../../common/components/form/FormGroup";
import FormItem from "../../../common/components/form/FormItem";
import useForm from "../../../hooks/useForm";
import { getSpecifications } from "../../../store/specification";

const SpecificationField = (props) => {
  const { item, setData, onRemove } = props;
  const specifications = useSelector(getSpecifications());
  const FORM = item;
  const { handlerChange, form, setForm, name, placeholder } = useForm({
    FORM,
  });

  useEffect(() => {
    setData({ ...item, ...form });
  }, [form]);

  return (
    <>
      <FormGroup>
        <FormItem grow="1">
          <TextInput
            name={name.value}
            value={form.value || ""}
            placeholder={placeholder.value}
            onChange={handlerChange}
          />
        </FormItem>
        <FormItem grow="1">
          <Dropdown
            name={name.specification}
            options={specifications}
            value={form.specification}
            placeholder={placeholder.specification}
            setForm={setForm}
            onChange={handlerChange}
          />
        </FormItem>
        <FormItem align="center">
          <IconButton
            type="button"
            title="Удалить"
            onClick={() => onRemove(item._id)}
          >
            <FiX />
          </IconButton>
        </FormItem>
      </FormGroup>
      <Divider />
    </>
  );
};

export default React.memo(SpecificationField);
