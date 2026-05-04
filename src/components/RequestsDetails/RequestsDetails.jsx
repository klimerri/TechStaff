import "./RequestsDetails.scss";

export const RequestsDetails = ({ onCreateRequest, currentRequest }) => {
    const handleCreateRequest = () => {
        onCreateRequest();
    }

    if (!currentRequest) return;

    return (
        <div className="requests-details__container">
            <div className="requests-details__header">Обращение №{currentRequest.id}</div>
            <span className="requests-details__client">{currentRequest.client.name}</span>

            <div className="requests-details__client-detail">
                <div className="requests-details__client-detail__card">
                    <span className="requests-details__client-detail__card-title">Почта</span>
                    <span className="requests-details__client-detail__card-text">{currentRequest.client.mail}</span>
                </div>
                <div className="requests-details__client-detail__card">
                    <span className="requests-details__client-detail__card-title">Телеграм</span>
                    <span className="requests-details__client-detail__card-text">{currentRequest.client.telegram}</span>
                </div>
                <div className="requests-details__client-detail__card">
                    <span className="requests-details__client-detail__card-title">Телефон</span>
                    <span className="requests-details__client-detail__card-text">{currentRequest.client.phone}</span>
                </div>
            </div>

            <div className="requests-details__title">
                <span className="requests-details__title-header">Тема обращения</span>
                <span className="requests-details__title-text">{currentRequest.header}</span>
            </div>

            <div className="requests-details__description">
                <span className="requests-details__description-header">Описание</span>
                <span className="requests-details__description-text">{currentRequest.text}</span>
            </div>

            <div className="requests-details__ticket">
                <span className="requests-details__ticket-header">Созданная заявка</span>

                {currentRequest.task_ids.length > 0 ? currentRequest.task_ids.map((id) => {
                    return <span className="requests-details__ticket-text">№{id}</span>
                }) : <span className="requests-details__ticket-text">Не создана</span>}
                
            </div>

            <button className="requests-details__button" onClick={handleCreateRequest}>Создать заявку</button>
        </div>
    )
}