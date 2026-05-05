import "./TicketCard.scss";

const valueStatus = {
    new: {
      text: "Новая",
      bgColor: "gray",
    },
    cancelled: {
      text: "Отменена",
      bgColor: "red",
    },
    waiting: {
      text: "В ожидании",
      bgColor: "orange",
    },
    done: {
      text: "Выполнена",
      bgColor: "green",
    },
    process: {
      text: "В работе",
      bgColor: "blue",
    }
}

const priorityMap = {
    1: {
        text: "Высокий",
        bgColor: "red"
    },
    2: {
        text: "Средний",
        bgColor: "orange"
    },
    3: {
        text: "Низкий",
        bgColor: "blue"
    },
}

export const TicketCard = ({ task }) => {
    const status = valueStatus[task.status];
    const priority = priorityMap[task.priority];

    return (
        <div className="ticket-card">
            <div className="ticket-card__left">
                <div className="ticket-card__info">
                    <span className="ticket-card__task">№{task.id}</span>
                    <span className="ticket-card__request"> &rarr; №{task.request.id}</span>
                </div>

                <span className="ticket-card__header">{task.name}</span>
            </div>
            <div className="ticket-card__right">
                <span className="ticket-card__status" style={{ backgroundColor: status?.bgColor }}>
                    {status?.text}
                </span>

                <span className="ticket-card__prioritet" style={{ borderColor: priority?.bgColor, color: priority?.bgColor }}>
                    {priority?.text}
                </span>

                <div className="ticket-card__engineer">
                    <span className="ticket-card__engineer__header">
                        Назначен
                    </span>
                    <span className="ticket-card__engineer__name">
                        {task.engineer ? task.engineer.name + " " + task.engineer.surname : "Не назначен"}
                    </span>
                </div>

                <span className="ticket-card__data">{new Date(task.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
}