import "./RequestCard.scss";

export const RequestCard = ({id, client, date, onClick, task}) => {
    return (
        <div className="request-card__container" onClick={onClick}>
            <span className="request-card__name">{id}</span>
            <span className="request-card__client">{client.name}</span>
            <span className="request-card__date">{date}</span>
            <span className={`request-card__task${!task.length ? ' error' : ''}`}>{task.length ? 'Да' : 'Нет'}</span>
        </div>
    )
}