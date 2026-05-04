import "./WorkerCard.scss";
import { NavLink } from "react-router-dom";

const valueRole = {
    "engineer": "Инженер"
}

const valueActive = {
    "true": "Работает",
    "false": "Не работает"
}

export const WorkerCard = ({id, name, lastname, role, qualification, active, hour, locationName, locationCity, locationStreet, locationHouse}) => {
    return (
        <NavLink to={`/worker/${id}`}>
            <div className="worker-card__container">
            <div className="worker-card__info">
                <span className="worker-card__name">{name} {lastname}</span>
                <span className="worker-card__role">{valueRole[role]}</span>
            </div>

            <span className="worker-card__qualification">{qualification}</span>

            <span className="worker-card__active">{valueActive[active]}</span>

            <span className="worker-card__hours">{hour} ч.</span>

            <div className="worker-card__location">
                <span className="worker-card__location__name">{locationName}</span>
                <span className="worker-card__location__address">г. {locationCity}, ул. {locationStreet}, д. {locationHouse}</span>
            </div>
        </div>
        </NavLink>
    )
}