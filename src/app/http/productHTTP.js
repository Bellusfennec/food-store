import { HTTP } from "./HTTP";
import { v4 as uuidv4 } from "uuid";

export const createProductHTTP = async (form) => {
  try {
    /* Проверить в базе данных */
    const response = await HTTP.get(`products?title=${form.title}`);

    /* Если найдено */
    if (response.data.length > 0) {
      return {
        ...response,
        ok: false,
        message: "Такое название уже используется",
      };
    }
    console.log(form);
    /* Создать*/
    const newResponse = await HTTP.post(`products`, {
      ...form,
      uuid: uuidv4(),
    });
    return { ...newResponse, ok: true };
  } catch (error) {
    console.log(error);
  }
};

export const getProductByIdHTTP = async (id) => {
  try {
    /* Проверить */
    let response = await HTTP.get(`products?uuid=${id}`);

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

export const updateProductHTTP = async (form) => {
  try {
    /* Обновить */
    let response = await HTTP.put(`products/${form.id}`, form);

    return { ...response, ok: true, message: "Обновлено" };
  } catch (error) {
    console.log(error);
  }
};
export const removeProductHTTP = async (id) => {
  try {
    /* Обновить */
    let response = await HTTP.delete(`products/${id}`);

    return { ...response, ok: true, message: "Удалено" };
  } catch (error) {
    console.log(error);
  }
};

export const getProductsListHTTP = async () => {
  try {
    let response = await HTTP.get(`products`);

    /* Если нет */
    if (response.data.length === 0) {
      return { ...response, ok: false, message: "Не найдено" };
    }

    const responseCategories = await HTTP.get(`categories`);

    /* Если есть */
    if (response.data.length > 0) {
      response.data = response.data.map((item) => {
        item.category = responseCategories.data.find(
          (f) => f.id === Number(item.category)
        ).name;
        return item;
      });
    }

    return { ...response, ok: true };
  } catch (error) {
    console.log(error);
  }
};
