/* Авто label для form */
export function labelForm(value) {
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
  if (value === "value") return "Значение";
  if (value === "price") return "Цена";
  if (value === "priceSale") return "Цена по акции";
  return value;
}

export function validator(form, config) {
  if (!form || !config) return;
  /* Перебрать config */
  const arrayСonfig = Object.entries(config);
  const newСonfig = arrayСonfig.map(([keyСonfig, valueСonfig], i) => {
    /* Перебрать form */
    const array = Object.entries(form);
    array.map(([keyForm, valueForm], i) => {
      /* Если в form совпал ключ с config */
      if (keyForm === keyСonfig) {
        /* Проверить поле на валидаторы */
        valueСonfig = validate(valueForm, valueСonfig);
      }
      return [keyForm, valueForm];
    });
    return [keyСonfig, valueСonfig];
  });
  return Object.fromEntries(newСonfig);
}

export function validate(valueForm, valueСonfig) {
  /* Если config существует тип проверки */
  let error = false;
  for (const key in valueСonfig) {
    /* Если есть ошибка - пропустить */
    if (error) continue;
    /* Если ошибок нет - проверить */
    switch (key) {
      case "isRequared": {
        valueForm =
          valueForm?.trim() === "" ? `Обязательное поле для заполнения` : false;
        break;
      }
      case "isYear": {
        const number = Number(valueForm.value);
        const currentYear = new Date().getFullYear();
        const isValid = number >= 1900 && number <= currentYear;
        valueForm = !isValid ? `Поле '${valueForm.label}' не корректно` : false;
        break;
      }
      case "isHttp": {
        const regex = /^https?:\/\/\S+\.\S+$/;
        valueForm = !regex.test(valueForm.value)
          ? `Поле '${valueForm.label}' должна быть ссылкой`
          : false;
        break;
      }
      default: {
        break;
      }
    }
    /* Если ошибка - ошибка, иначе нет */
    error = valueForm ? valueForm : false;
  }
  return valueForm;
}

/* Остались ли ошибки */
export function totalError(errors = {}) {
  if (!errors) return false;
  let error = false;
  const arrayErrors = Object.entries(errors);
  arrayErrors.map(([keyForm, valueForm]) => {
    /* Если есть ошибка вернуть */
    if (error) return valueForm;
    if (valueForm !== false) error = true;
    /* Просто потому что надо */
    return [keyForm, valueForm];
  });
  return error;
}

export function createPlaceholder(form, validateConfig) {
  const arrayForm = Object.entries(form);
  const newArrayForm = arrayForm.map(([keyForm, valueForm]) => {
    valueForm = labelForm(keyForm);
    /* Перебрать validateConfig */
    if (validateConfig) {
      const arrayСonfig = Object.entries(validateConfig);
      arrayСonfig.map(([keyСonfig, valueСonfig], i) => {
        /* Если в validateConfig совпал ключ с form, делаем обязательным полем с "*" */
        if (keyForm === keyСonfig) {
          valueForm = valueForm + "*";
        }
        return [keyСonfig, valueСonfig];
      });
    }
    return [keyForm, valueForm];
  });

  return Object.fromEntries(newArrayForm);
}

export function createName(form) {
  const arrayForm = Object.entries(form);
  const newArrayForm = arrayForm.map(([keyForm, valueForm]) => {
    valueForm = keyForm;
    return [keyForm, valueForm];
  });
  return Object.fromEntries(newArrayForm);
}

// export const createForm = (initialState, validateConfig) => {
//   if (!initialState) return;
//   const arrayForm = Object.entries(initialState);
//   const newArrayForm = arrayForm.map(([keyForm, valueForm]) => {
//     /* Создать нужные поля для ключа */
//     valueForm = {
//       name: keyForm,
//       label: labelForm(keyForm),
//       value: valueForm,
//       error: false,
//     };

//     return [keyForm, valueForm];
//   });

//   return Object.fromEntries(newArrayForm);
// };
