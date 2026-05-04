import "./Login.scss";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({});

    const onChange = (event) => {
        setForm((state) => ({
            ...state,
            [event.target.name]: event.target.value,
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8000/users/login", {
            body: JSON.stringify(form),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.status != 200) {
            alert("Ошибка");
            return;
        }
        
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify({
            name: data.name,
            lastname: data.lastname,
            role: data.role
        }));

        console.log(data);

        navigate('/calendar');
    }

    return (
        <div className="login__container">
            <form className="login__form" onChange={onChange} onSubmit={onSubmit}>
                <div className="login__logo">
                    <img className="login__logo-svg" src={logo}></img>
                    <span className="login__logo-name">ТехШтаб</span>
                </div>

                <input name="login" className="login__input" placeholder="Логин" />
                <input name="password" className="login__input" placeholder="Пароль" />

                <input type="submit" className="login__button" value="Войти"/>

                <p className="login__text">Нет доступа? Обратитесь в IT-отдел 
                    или к администратору
                </p>
            </form>
        </div>
    )
}