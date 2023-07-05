export const createForm = (form) => {
  if (!form) return;
  const arrayForm = Object.entries(form);
  const newArrayForm = arrayForm.map(([keyForm, valueForm]) => {
    /* Создать нужные поля для ключа */
    valueForm = {
      name: keyForm,
      label: labelForm(keyForm),
      value: valueForm,
      error: false,
    };

    return [keyForm, valueForm];
  });

  return Object.fromEntries(newArrayForm);
};

/* Авто label для form */
const labelForm = (value) => {
  if (value === "firstName") return "Имя";
  if (value === "lastName") return "Фамилия";
  if (value === "birthDate") return "Год рождения";
  if (value === "category") return "Категория";
  if (value === "name") return "Название";
  if (value.indexOf("specification") !== -1) return "Характеристика";
  if (value === "title") return "Загаловок";
  if (value === "description") return "Описание";
  if (value === "email") return "Электронная почта";
  if (value === "password") return "Пароль";
  return value;
};

export const validatorForm = (form, config) => {
  if (!form || !config) return;
  /* Перебрать form */
  const array = Object.entries(form);
  const newArray = array.map(([keyForm, valueForm], i) => {
    /* Перебрать config */
    const arrayСonfig = Object.entries(config);
    arrayСonfig.map(([keyСonfig, valueСonfig], i) => {
      /* Если в config совпал ключ с form */
      if (keyForm === keyСonfig) {
        /* Проверить поле на валидаторы */
        valueForm = validate(valueForm, valueСonfig);
      }

      return [keyСonfig, valueСonfig];
    });

    return [keyForm, valueForm];
  });

  return Object.fromEntries(newArray);
};

const validate = (valueForm, valueСonfig) => {
  /* Если config существует тип проверки */
  let error = false;
  for (const key in valueСonfig) {
    /* Если есть ошибка - пропустить */
    if (error) continue;
    /* Если ошибок нет - проверить */
    switch (key) {
      case "isRequared": {
        valueForm.error =
          valueForm.value.trim() === ""
            ? `Поле '${valueForm.label}' обязательна для заполнения`
            : false;
        break;
      }
      case "isYear": {
        const number = Number(valueForm.value);
        const currentYear = new Date().getFullYear();
        const isValid = number >= 1900 && number <= currentYear;
        valueForm.error = !isValid
          ? `Поле '${valueForm.label}' не корректно`
          : false;
        break;
      }
      case "isHttp": {
        const regex = /^https?:\/\/\S+\.\S+$/;
        valueForm.error = !regex.test(valueForm.value)
          ? `Поле '${valueForm.label}' должна быть ссылкой`
          : false;
        break;
      }

      default: {
        break;
      }
    }
    /* Если ошибка - ошибка, иначе нет */
    error = valueForm.error ? valueForm.error : false;
  }

  return valueForm;
};

export const formToData = (form) => {
  if (!form) return;
  const arrayForm = Object.entries(form);
  const newArrayForm = arrayForm.map(([keyForm, valueForm]) => {
    /* Вернуть обычные данные */
    valueForm = valueForm.value;

    return [keyForm, valueForm];
  });

  return Object.fromEntries(newArrayForm);
};

/* Остались ли ошибки */
export const totalValidatorForm = (form) => {
  if (!form) return false;
  let error = false;
  Object.entries(form).map(([keyForm, valueForm]) => {
    /* Если есть ошибка вернуть */
    if (error) return [keyForm, valueForm];
    if (valueForm.error) error = true;

    /* Просто потому что надо */
    return [keyForm, valueForm];
  });

  return error;
};
