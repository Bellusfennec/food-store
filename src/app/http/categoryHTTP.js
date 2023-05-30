import { HTTP } from "./HTTP";
import { v4 as uuidv4 } from "uuid";

export const createCategoryHTTP = async (form) => {
  try {
    /* Проверить в базе данных */
    const response = await HTTP.get(`categories?name=${form.name}`);

    /* Если найдено */
    if (response.data.length > 0) {
      return {
        ...response,
        ok: false,
        message: "Такое название уже используется",
      };
    }

    /* Создать*/
    const newResponse = await HTTP.post(`categories`, {
      ...form,
      uuid: uuidv4(),
    });
    return { ...newResponse, ok: true };
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByIdHTTP = async (userId) => {
  try {
    /* Проверить */
    let response = await HTTP.get(`categories?uuid=${userId}`);

    /* Если нет */
    if (response.data.length === 0) {
      return { ...response, ok: false, message: "Не найдено" };
    }

    /* Eсли найден массив */
    if (Array.isArray(response.data)) {
      const { data } = response;
      response = { ...response, data: data[0] };
    }

    return { ...response, ok: true };
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryHTTP = async (form) => {
  try {
    /* Обновить */
    let response = await HTTP.put(`categories/${form.id}`, form);

    return { ...response, ok: true, message: "Обновлено" };
  } catch (error) {
    console.log(error);
  }
};
export const removeCategoryHTTP = async (id) => {
  try {
    /* Обновить */
    let response = await HTTP.delete(`categories/${id}`);

    return { ...response, ok: true, message: "Удалено" };
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesListHTTP = async () => {
  try {
    const response = await HTTP.get(`categories`);

    /* Если нет */
    if (response.data.length === 0) {
      return { ...response, ok: false, message: "Не найдено" };
    }

    return { ...response, ok: true };
  } catch (error) {
    console.log(error);
  }
};
