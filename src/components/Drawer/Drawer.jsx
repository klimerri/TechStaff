import "./Drawer.scss";
import logo from "../../assets/logo.svg";
import userImage from "../../assets/user.svg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const value = {
  "admin": "Администратор",
  "dispatcher": "Диспетчер",
  "engineer": "Инженер"
}

export const Drawer = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="drawer__container">
      <div className="drawer__logo">
        <img className="drawer__logo__img" src={logo}></img>

        <span className="drawer__logo__name">ТехШтаб</span>
      </div>
      <div className="drawer__list">
        <NavLink to="/requests" className="drawer__link">Обращения</NavLink>
        <NavLink to="/calendar" className="drawer__link">Календарь</NavLink>
        <NavLink to="/" className="drawer__link">Статистика</NavLink>
        <NavLink to="/workers" className="drawer__link">Список сотрудников</NavLink>
      </div>
      <div className="drawer__user">
        <img className="drawer__user__icon" src={userImage}></img>

        <div className="drawer__user__info">
          <span className="drawer__user__name">{user.name} {user.lastname}</span>
          <span className="drawer__user__post">{value[user.role]}</span>
        </div>

        <div className="drawer__user__logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <title></title>
            <path d="M11.25 19a.75.75 0 0 1 .75-.75h6a.25.25 0 0 0 .25-.25V6a.25.25 0 0 0-.25-.25h-6a.75.75 0 0 1 0-1.5h6c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0 1 18 19.75h-6a.75.75 0 0 1-.75-.75" />
            <path d="M3.5 13.115a1 1 0 0 0 1 1h4.856c.023.356.052.71.086 1.066l.03.305a.718.718 0 0 0 1.025.578a16.844 16.844 0 0 0 4.884-3.539l.03-.031a.721.721 0 0 0 0-.998l-.03-.031a16.842 16.842 0 0 0-4.884-3.539a.718.718 0 0 0-1.025.578l-.03.305c-.034.355-.063.71-.086 1.066H4.5a1 1 0 0 0-1 1z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
