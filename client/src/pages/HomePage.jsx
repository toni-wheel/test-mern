import React, { useState, useEffect, useContext } from "react";
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/https.hook";
import UsersList from "../components/users-list/UsersList";
import logo from "../image/time.png";

const HomePage = () => {
  const [user, setUser] = useState({
    name: null,
    status: null,
    email: null,
    _id: null,
  });
  const [users, setUsers] = useState([]);
  const { loading, error, request, clearError } = useHttp();

  const auth = useContext(AuthContext);
  const { logout } = useAuth();
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await request("api/user", "POST", { id: auth.userId });
    setUser(user);
    console.log(user.name);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await request("api/users", "POST", { status: "user" });
    setUsers(users);
    console.log(users);
  };

  return (
    <>
      <div className="admin">
        <div className="admin__menu">
          <a href="#" className="admin__logo">
            <img src={logo} alt="Logo" />
            <h1>Time track</h1>
          </a>
          <ul className="admin__list">
            <li>
              <a href="#">Главная</a>
            </li>
            <li>
              <a href="#">Работники</a>
            </li>
            <li>
              <a href="#">Объекты</a>
            </li>
          </ul>
          <ul className="admin__list">
            <li>
              <a href="#">Настройки</a>
            </li>
            <li>
              <a href="#">Помощь</a>
            </li>
            <li>
              <a href="#" onClick={logoutHandler}>
                Выход
              </a>
            </li>
          </ul>
        </div>
        <div className="admin__content">
          <div className="admin__hello">Добро пожаловать, {user.name}</div>
          <div className="admin__status">Ваш статус: {user.status}</div>
          <div className="admin__email">Ваш email: {user.email}</div>
          <div className="admin__id">Ваш id: {user._id}</div>
          <div className="info__users">
            <UsersList users={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
