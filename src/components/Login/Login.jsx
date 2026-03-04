import "./Login.scss";
import logo from "../../assets/logo.svg";

export const Login = () => {
    return (
        <div className="login__container">
            <form className="login__form">
                <div className="login__logo">
                    <img className="login__logo-svg" src={logo}></img>
                    <span className="login__logo-name">ТехШтаб</span>
                </div>

                <input className="login__input" placeholder="Логин" />
                <input className="login__input" placeholder="Пароль" />

                <input type="submit" className="login__button" value="Войти"/>

                <p className="login__text">Нет доступа? Обратитесь в IT-отдел 
                    или к администратору
                </p>
            </form>
        </div>
    )
}