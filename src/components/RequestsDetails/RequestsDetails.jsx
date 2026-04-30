import "./RequestsDetails.scss";

export const RequestsDetails = ({ onCreateRequest }) => {
    const handleCreateRequest = () => {
        onCreateRequest();
    }

    return (
        <div className="requests-details__container">
            <div className="requests-details__header">Обращение №12345678</div>
            <span className="requests-details__client">ООО Ромашка</span>

            <div className="requests-details__client-detail">
                <div className="requests-details__client-detail__card">
                    <span className="requests-details__client-detail__card-title">Почта</span>
                    <span className="requests-details__client-detail__card-text">romashka@example.com</span>
                </div>
                <div className="requests-details__client-detail__card">
                    <span className="requests-details__client-detail__card-title">Телеграм</span>
                    <span className="requests-details__client-detail__card-text">@romashka</span>
                </div>
                <div className="requests-details__client-detail__card">
                    <span className="requests-details__client-detail__card-title">Телефон</span>
                    <span className="requests-details__client-detail__card-text">88005553535</span>
                </div>
            </div>

            <div className="requests-details__title">
                <span className="requests-details__title-header">Тема обращения</span>
                <span className="requests-details__title-text">Сломался сайт</span>
            </div>

            <div className="requests-details__description">
                <span className="requests-details__description-header">Описание</span>
                <span className="requests-details__description-text">Не работает сайт с 8:00. Никто не может зайти, помогите!!</span>
            </div>

            <div className="requests-details__ticket">
                <span className="requests-details__ticket-header">Созданная заявка</span>
                <span className="requests-details__ticket-text">Не создана</span>
            </div>

            <button className="requests-details__button" onClick={handleCreateRequest}>Создать заявку</button>
        </div>
    )
}