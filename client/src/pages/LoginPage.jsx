import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAuth from "../hooks/auth.hook";
import useHttp from "../hooks/https.hook";
// import { useMessage } from "../hooks/message.hook";
import google_ico from "../image/svg/google.svg";
import yandex_ico from "../image/svg/yandex.svg";
import "../css/style.css";

const LoginPage = () => {
  // в объекте auth данные по авторизации
  const auth = useContext(AuthContext);
  // подключаем хук для вывода сообщений на фронте
  // const message = useMessage();
  // подключаем хук для запросов на сервер
  const { loading, error, request, clearError } = useHttp();
  // Создаем состояние для компонента AuthPage
  const [form, setForm] = useState({ email: "", password: "" });
  // Вызываем хук после рендеринга
  useEffect(() => {
    if (error) {
      alert(error);
    }
    // message(error);
    clearError();
  }, [error, clearError]);
  // С помощью spread оператора легко расширять
  // новые объекты дополнительными данными
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // отправка данных на авторизацию
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      // передаем данные на авторизацию
      const data = await request("api/auth/login", "POST", { ...form });
      if (data.message) {
        alert(data.message);
      }
      // message(data.message);
      // получаем и записывем в local storage
      auth.login(data.token, data.userId);
    } catch (e) {}
  };
  return (
    <>
      <div className="auth">
        <div className="container container--center">
          <form action="#" className="auth__form form">
            <div className="form__container">
              <div className="form__item">
                <h1 className="form__title">Вход</h1>
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
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Введите пароль"
                    onChange={changeHandler}
                  />
                </div>
                <br></br>
                <div className="form__btn-box">
                  <button type="submit" id="sign_in" onClick={loginHandler}>
                    Войти
                  </button>
                </div>
                <div className="form__btn-box">
                  <Link to="/register" className="form__link">
                    Регистрация
                  </Link>
                </div>
              </div>
              <br></br>
              <div className="form__item">
                <div className="form__label">или войти с помощью</div>
                <div className="form__social">
                  <a href="#" className="form__social-item">
                    <img src={google_ico} alt="Google" />
                  </a>
                  <a href="#" className="form__social-item">
                    <img src={yandex_ico} alt="Yandex" />
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
