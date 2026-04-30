import "./RequestsList.scss";
import { RequestCard } from "../RequestCard/RequestCard";

export const RequestsList = () => {
    return (
        <div className="requests-list__container">
            <div className="requests-list__header">
                <span className="requests-list__header-name">ID</span>
                <span className="requests-list__header-client">Клиент</span>
                <span className="requests-list__header-date">Дата создания</span>
            </div>
            <div className="requests-list__list">
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </div>
        </div>
    )
}