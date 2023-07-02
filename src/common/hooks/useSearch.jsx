// Файл с хуком

import { useState, useCallback, useEffect } from "react";
import { getSearchPost } from "api";
import { debounce } from "lodash";

// Обращение к API поиска
const getSearch = async (search) => {
  try {
    return await getSearchPost(search);
  } catch {
    return {};
  }
};

// Сам Хук
export const useSearch = () => {
  // Сотояние input для ввода строики поиска
  const [value, setValue] = useState("");

  // Результаты поиска
  const [data, setData] = useState(null);

  // Строка поиска для запроса на сервер
  const [query, setQuery] = useState("");

  // Функция для отчистки состояния
  const resetValue = useCallback(() => {
    setValue("");
    setQuery("");
    setData(null);
  }, [setData, setQuery, setValue]);

  /**
   * Изменения строки запроса с задержкой 200мс
   * нужно для оптимизации, чтобы не делать запрос
   * при измении каждой буквы в строке поиска.
   */
  const updateQuery = useCallback(
    debounce((value) => {
      setQuery(value);
    }, 200),
    [setQuery]
  );

  /**
   * Вызов useEffect() в момент изменения query
   * обращается на сервер за результатами поиска
   */
  useEffect(() => {
    if (query && query.length) {
      // Метод API для запроса на сервер
      getSearch(query).then((newData) => {
        // Устанавливается результат поиска
        setData(newData);
      });
    } else {
      // Если строка поиска пуста, то результаты отчищаются
      setData(null);
    }
  }, [query]);

  // Функция для изменения значения строки поиска
  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      setValue(value);
      updateQuery(value);
    },
    [setValue]
  );

  // Возвращаются функции и значения для работы с поиском
  return [value, onChange, data, resetValue];
};
