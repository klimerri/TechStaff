import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Ticket.scss";
import { priorityMap, valueStatus } from "../../components/TicketCard/TicketCard";
import { NavLink } from "react-router-dom";

export const Ticket = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState([]);
    
    const fetchData = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });

        setTicket(await res.json());
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleCancel = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks/${id}/cancel/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
        });

        alert("Заявка отменена.");
        fetchData();
    }

    const handleComplete = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks/${id}/complete/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        alert("Заявка завершена.");
        fetchData();
    }

    return (
        <div className="ticket__container">
            <button className="ticket__button-back" onClick={() => navigate(-1)}>
                Назад
            </button>

            <div className="ticket__information">
                <div className="ticket__information__top">
                    <span className="ticket__number">Заявка №{ticket?.id}</span>
                    <span className="ticket__prioritet">Приорет {priorityMap[ticket?.priority]?.text.toLowerCase()}</span>
                </div>
                <span className="ticket__title">{ticket?.name}</span>
                <span className="ticket__type">{ticket?.task_type?.name}</span>
            </div>

            <div className="ticket__cards-list">
                <div className="ticket__card">
                    <span className="ticket__card-title">Назначен</span>
                    <span className="ticket__card-text">
                        {!ticket?.engineer && 'Не назначен'}
                        {ticket?.engineer ? (
                            <NavLink to={`/worker/${ticket.engineer.id}`}>
                                {ticket.engineer.user.name} {ticket.engineer.user.surname}
                            </NavLink>
                        ) : null}
                    </span>
                </div>
                <div className="ticket__card">
                    <span className="ticket__card-title">Обращение</span>
                    <NavLink to={`/requests`} className="ticket__card-text--request">№{ticket?.request?.id}</NavLink>
                </div>
                <div className="ticket__card">
                    <span className="ticket__card-title">Статус</span>
                    <span className="ticket__card-text ticket__card-text--status" style={{ backgroundColor: valueStatus[ticket?.status]?.bgColor }}>
                        {valueStatus[ticket?.status]?.text}
                    </span>
                </div>
            </div>
            <div className="ticket__client">
                <span className="ticket__client-title">Информация о клиенте</span>

                <div className="ticket__client__container">
                    <div className="ticket__client-name">{ticket?.request?.client?.name}</div>
                    <div className="ticket__client-list">
                        <div className="ticket__client-info">
                            <span className="ticket__client-info__title">Телефон:</span>
                            <span className="ticket__client-info__value">{ticket?.request?.client?.phone}</span>
                        </div>
                        <div className="ticket__client-info">
                            <span className="ticket__client-info__title">Почта:</span>
                            <span className="ticket__client-info__value">{ticket?.request?.client?.mail}</span>
                        </div>
                        <div className="ticket__client-info">
                            <span className="ticket__client-info__title">Телеграмм:</span>
                            <span className="ticket__client-info__value">{ticket?.request?.client?.telegram}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ticket__description">
                <span className="ticket__description-title">Описание</span>

                <span className="ticket__description-text">
                    {ticket.text}
                </span>
            </div>

            <div className="ticket__time-list">
                <span className="ticket__time-list__title">Время работы</span>
                
                <div className="ticket__time-list__card-list">
                    <div className="ticket__time-list__card-start">
                        <span className="ticket__time-list__card-title">Начало работ</span>
                        <span className="ticket__time-list__card-time">
                            {ticket?.start_time ? new Date(ticket?.start_time).toLocaleString() : "Отсутствует"}
                        </span>
                    </div>
                    <div className="ticket__time-list__card-end">
                        <span className="ticket__time-list__card-title">Окончание работ</span>
                        <span className="ticket__time-list__card-time">
                            {ticket?.completion_time ? new Date(ticket?.completion_time).toLocaleString() : "Отсутствует"}
                        </span>
                    </div>
                </div>
            </div>

            <span className="ticket__location">
                {ticket?.location?.name + ", "}
                {ticket?.location?.city + ", "}
                {ticket?.location?.street + ", "}
                {ticket?.location?.house}
            </span>

            {
                ticket?.status === 'process' ? (
                    <div className="ticket__buttons">
                        <button className="ticket__buttons__refuse" onClick={handleCancel}>Отказаться от заявки</button>
                        <button className="ticket__buttons__end" onClick={handleComplete}>Завершить заявку</button>
                    </div>
                ) : null
            }
        </div>
    );
};