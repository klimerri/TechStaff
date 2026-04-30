import "./Ticket.scss";

export const Ticket = () => {
    return (
        <div className="ticket__container">
            <div className="ticket__information">
                <span className="ticket__number">Заявка №123456</span>
                <span className="ticket__prioritet">Приорет 1</span>
                <span className="ticket__title">Замена серверного оборудования в ЦОД</span>
                <span className="ticket__type">Замена сервера</span>
            </div>

            <div className="ticket__cards-list">
                <div className="ticket__card">
                    <span className="ticket__card-title">Назначен</span>
                    <span className="ticket__card-text">Иванов Иван Иванович</span>
                </div>
                <div className="ticket__card">
                    <span className="ticket__card-title">Обращение</span>
                    <span className="ticket__card-text">№987654</span>
                </div>
                <div className="ticket__card">
                    <span className="ticket__card-title">Статус</span>
                    <span className="ticket__card-text">В работе</span>
                </div>
            </div>
            <div className="ticket__description">
                <span className="ticket__description-title">Описание</span>

                <span className="ticket__description-text">Требуется заменить устаревшее серверное оборудование 
                    в центре обработки данных. 
                    Необходимо провести миграцию данных, 
                    установку нового оборудования 
                    и тестирование системы.
                </span>
            </div>

            <div className="ticket__time-list">
                <span className="ticket__time-list__title">Время работы</span>
                
                <div className="ticket__time-list__card-list">
                    <div className="ticket__time-list__card-start">
                        <span className="ticket__time-list__card-title">Начало работ</span>
                        <span className="ticket__time-list__card-time">14:00 19.04.2026</span>
                    </div>
                    <div className="ticket__time-list__card-end">
                        <span className="ticket__time-list__card-title">Окончание работ</span>
                        <span className="ticket__time-list__card-time">14:00 19.04.2026</span>
                    </div>
                </div>
            </div>

            <span className="ticket__location">Серверная 3, г. Самара, ул. Пушкина, д. 67</span>
        </div>
    );
};