import React, { useState, useCallback, useEffect } from "react";

// переменная для local storage
const storageName = "useData";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // функция для логина
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwtToken, userId: id })
    );
  });

  // функция для разлогина
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  });

  // если данные есть в local storage
  // автоматически записать их в state
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};

export default useAuth;
