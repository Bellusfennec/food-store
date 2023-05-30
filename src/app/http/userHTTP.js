import { HTTP } from "./HTTP";
import { v4 as uuidv4 } from "uuid";

export const registartionHTTP = async (formData) => {
  try {
    /* Проверить */
    const { email } = formData;
    const response = await HTTP.get(`users?email=${email}`);

    /* Если найдено */
    if (response.data.length > 0) {
      return {
        ...response,
        ok: false,
        message: "Такой email уже используется",
      };
    }

    /* Создать*/
    const responseNewUser = await HTTP.post(`users`, {
      ...formData,
      uuid: uuidv4(),
    });
    return { ...responseNewUser, ok: true };
  } catch (error) {
    console.log(error);
  }
};

export const loginHTTP = async (formData) => {
  try {
    const { email, password } = formData;
    let response = await HTTP.get(`users?email=${email}&password=${password}`);

    /* Если нет */
    if (response.data.length === 0) {
      return { ...response, ok: false, message: "Проверьте email или пароль" };
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

export const getUserByUuidHTTP = async (uuid) => {
  try {
    /* Проверить */
    let response = await HTTP.get(`users?uuid=${uuid}`);

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

export const updateUserHTTP = async (form) => {
  try {
    /* Обновить */
    let response = await HTTP.put(`users/${form.id}`, form);

    return { ...response, ok: true, message: "Обновлено" };
  } catch (error) {
    console.log(error);
  }
};
export const removeUserHTTP = async (id) => {
  try {
    /* Обновить */
    let response = await HTTP.delete(`users/${id}`);

    return { ...response, ok: true, message: "Удалено" };
  } catch (error) {
    console.log(error);
  }
};

export const getUsersHTTP = async () => {
  try {
    const response = await HTTP.get(`users`);

    /* Если нет */
    if (response.data.length === 0) {
      return { ...response, ok: false, message: "Не найдено" };
    }

    return { ...response, ok: true };
  } catch (error) {
    console.log(error);
  }
};

// export const getHTTP = async (table, query) => {
//   try {
//     const array = Object.entries(query);
//     console.log(array);
//     // const { email, password } = data;
//     const response = await HTTP.get(
//       `${table}?${query}` // email=${email}&password=${password}
//     );
//     const { data } = response;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Получение задачи по ключу
// const getUserByKey = (key, val) => getUsersHTTP(`${key}=${val}`);

// // По `id`
// const getUserById = (id) => getUserByKey("id", id);
