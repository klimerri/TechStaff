import "./WorkerCard.scss";

export const WorkerCard = () => {
    return (
        <div className="worker-card__container">
            <div className="worker-card__info">
                <span className="worker-card__name">Иванов Иван</span>
                <span className="worker-card__role">Диспетчер</span>
            </div>

            <span className="worker-card__qualification">junior</span>

            <span className="worker-card__active">Работает</span>

            <span className="worker-card__hours">40 ч.</span>

            <div className="worker-card__location">
                <span className="worker-card__location__name">Север</span>
                <span className="worker-card__location__address">г. Самара, ул. Иванова, д. 14</span>
            </div>
        </div>
    )
}