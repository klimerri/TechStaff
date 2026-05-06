import "./Login.scss";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        login: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const onChange = (event) => {
        const { name, value } = event.target;

        setForm((state) => ({
            ...state,
            [name]: value,
        }));
        
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!form.login.trim()) newErrors.login = "Логин обязателен";
        if (!form.password.trim()) newErrors.password = "Пароль обязателен";

        return newErrors;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
            role: data.role,
            id: data.id
        }));

        setForm({});
        navigate('/calendar');
    }

    return (
        <div className="login__container">
            <form className="login__form" onChange={onChange} onSubmit={onSubmit}>
                <div className="login__logo">
                    <img className="login__logo-svg" src={logo}></img>
                    <span className="login__logo-name">ТехШтаб</span>
                </div>

                <label htmlFor="login">
                    <input 
                        name="login"
                        id="login" 
                        className="login__input" 
                        placeholder="Логин" 
                        style={{ border: errors.login ? "1.5px solid red" : "1.5px solid #bec0c8" }} 
                    
                    />
                    {errors.login && <span className="login__error">{errors.login}</span>}
                </label>

                <label htmlFor="password">
                    <input 
                        name="password" 
                        id="password" 
                        className="login__input" 
                        placeholder="Пароль" 
                        type="password"
                        style={{ border: errors.password ? "1.5px solid red" : "1.5px solid #bec0c8" }}
                    />
                    {errors.password && <span className="login__error">{errors.password}</span>}

                </label>

                <input type="submit" className="login__button" value="Войти"/>

                <p className="login__text">Нет доступа? Обратитесь в IT-отдел 
                    или к администратору
                </p>
            </form>
        </div>
    )
}