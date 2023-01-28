import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../hooks/https.hook";
// import { useMessage } from "../hooks/message.hook";
import google_ico from "../image/svg/google.svg";
import yandex_ico from "../image/svg/yandex.svg";
import "../css/style.css";

const RegisterPage = () => {
  // подключаем хук для HTTP запросов
  const { loading, error, request, clearError } = useHttp();

  // создаем состояние для компонента RegisterPage
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    status: "",
  });

  // подключаем хук для вывода сообщений на фронте
  // const message = useMessage();

  // вызываем хук после рендеринга
  useEffect(() => {
    if (error) {
      alert(error);
    }

    // message(error); // выводим ошибку (если есть)
    clearError(); // очищаем ошибки
  }, [error, clearError]);

  // заполняем данные формы
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // отправка данных формы на регистрацию
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      if (data.message) {
        alert(data.message);
      }

      // message(data.message);
    } catch (e) {}
  };

  return (
    <>
      <div className="auth">
        <div className="container container--center">
          <form action="#" className="auth__form form">
            <div className="form__container">
              <div className="form__item">
                <h1 className="form__title">Регистрация</h1>
              </div>
              <div className="form__item">
                <div className="form__input-box">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Введите Email"
                    onChange={changeHandler}
                  />
                </div>
                <div className="form__input-box">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Введите имя"
                    onChange={changeHandler}
                  />
                </div>
                <div className="form__input-box">
                  <input
                    type="text"
                    name="status"
                    id="status"
                    placeholder="Ваш статус"
                    onChange={changeHandler}
                  />
                </div>
                <div className="form__input-box">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Введите пароль"
                    onChange={changeHandler}
                  />
                </div>
                <br></br>
                <div className="form__btn-box">
                  <button type="submit" id="sign_in" onClick={registerHandler}>
                    Создать
                  </button>
                </div>
                <div className="form__btn-box">
                  <Link to="/" className="form__link">
                    Уже есть аккаунт
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
