import React, { useState, useEffect, useContext } from "react";
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/https.hook";
import UsersList from "../components/users-list/UsersList";

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
      {/* <div className="info__name">Приветствую, {user.name}</div>
              <div className="info__status">Ваш статус: {user.status}</div>
              <div className="info__email">Ваш email: {user.email}</div>
              <div className="info__id">Ваш id: {user._id}</div>
              <div className="info__users">
                <UsersList users={users} />
              </div>
            </div>
            <div className="form__btn-box btn-box">
              <button type="submit" id="sign_out" onClick={logoutHandler}>
                Выйти
              </button>
              </div> */}
    </>
  );
};

export default HomePage;
