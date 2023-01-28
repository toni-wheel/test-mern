// взаимодействие с пользователем
import React, { useHttp } from "../hooks/https.hook";

const GetUser = async (user_name) => {
  const { loading, error, request, clearError } = useHttp();
  try {
    const user = await request("api/user", "POST", { user_name });
    return user;
  } catch {
    console.log("Ошибка");
  }
};

export default GetUser;
