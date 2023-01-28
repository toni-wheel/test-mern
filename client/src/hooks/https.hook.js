import React, { useState, useCallback } from "react";

// кастомный хук для отправки HTTP-запросов
const useHttp = () => {
  const [loading, setLoading] = useState(false); // ответ с сервера
  const [error, setError] = useState(null); // ошибки с сервера

  // отправляем HTTP-запрос
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true); // начинаем отправку данных
      try {
        if (body) {
          body = JSON.stringify(body); // преобразуем объект в строку для сети
          headers["Content-type"] = "application/json"; // задаем тип данных
        }
        // послывем запрос
        const response = await fetch(url, { method, body, headers });
        const data = await response.json(); // преобразуем ответ в JSON

        // обрабатываем ошибочный ответ
        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        setLoading(false); // заканчиваем отправку данных
        return data; // возвращяем успешный ответ
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    }
  );

  // очистка ошибок
  const clearError = () => {
    setError(null);
  };

  return { loading, error, request, clearError };
};

export default useHttp;
