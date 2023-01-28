// Список пользователей

import React from "react";
import User from "./User";

const UsersList = ({ users }) => {
  return (
    <>
      <h1>Список пользователей</h1>
      {users.map((user) => (
        <User user={user} />
      ))}
    </>
  );
};

export default UsersList;
