import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Ticket.scss";
import { priorityMap, valueStatus } from "../../components/TicketCard/TicketCard";

export const Ticket = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState([]);
    
    const fetchData = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
            body: JSON.stringify(),
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

    console.log(ticket);

    return (
        <div className="ticket__container">
            <button onClick={() => navigate(-1)}>
                Назад
            </button>

            <div className="ticket__information">
                <span className="ticket__number">Заявка №{ticket?.id}</span>
                <span className="ticket__prioritet">Приорет {priorityMap[ticket?.priority]?.text.toLowerCase()}</span>
                <span className="ticket__title">{ticket?.name}</span>
                <span className="ticket__type">{ticket?.task_type?.name}</span>
            </div>

            <div className="ticket__cards-list">
                <div className="ticket__card">
                    <span className="ticket__card-title">Назначен</span>
                    <span className="ticket__card-text">
                        {ticket?.engineer ? `${ticket?.engineer?.surname} ${ticket?.engineer?.name}` : 'Не назначен'}
                    </span>
                </div>
                <div className="ticket__card">
                    <span className="ticket__card-title">Обращение</span>
                    <span className="ticket__card-text">№{ticket?.request?.id}</span>
                </div>
                <div className="ticket__card">
                    <span className="ticket__card-title">Статус</span>
                    <span className="ticket__card-text ticket__card-text--status" style={{ backgroundColor: valueStatus[ticket?.status]?.bgColor }}>
                        {valueStatus[ticket?.status]?.text}
                    </span>
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
                            {ticket?.estimated_completion_time ? new Date(ticket?.estimated_completion_time).toLocaleDateString() : "Отсутствует"}
                        </span>
                    </div>
                    <div className="ticket__time-list__card-end">
                        <span className="ticket__time-list__card-title">Окончание работ</span>
                        <span className="ticket__time-list__card-time">
                            {ticket?.actual_completion_time ? new Date(ticket?.actual_completion_time).toLocaleDateString() : "Отсутствует"}
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
        </div>
    );
};