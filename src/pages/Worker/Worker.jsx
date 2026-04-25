import "./Worker.scss";

export const Worker = () => {
    return (
        <div className="worker-page__container">
            <div className="worker-page__fullname">
                <span className="worker-page__name">Иванов Иван Иванович</span>
                <span className="worker-page__position">Должность: Инженер</span>
            </div>

            <div className="worker-page__professional">
                <div className="worker-page__card">
                    <span className="worker-page__card-title">Квалификация</span>
                    <span className="worker-page__card-value">junior</span>
                </div>
                <div className="worker-page__card">
                    <span className="worker-page__card-title">Текущая нагрузка</span>
                    <span className="worker-page__card-value">40 ч.</span>
                </div>
                <div className="worker-page__card">
                    <span className="worker-page__card-title">Активные задачи</span>
                    <span className="worker-page__card-value">5</span>
                </div>
            </div>

            <div className="worker-page__skills">
                <span className="worker-page__skills-title">Навыки сотрудника</span>

                <div className="worker-page__skills-list">
                    <div className="worker-page__skills-skill">Настройка Linux</div>
                    <div className="worker-page__skills-skill">Прокладка оптоволокна</div>
                </div>
            </div>

            <div className="worker-page__tasks">
                <span className="worker-page__tasks-title">Ближайшие задачи сотрудника</span>

                <div className="worker-page__tasks-list">
                    <div className="worker-page__task">
                        <span className="worker-page__task-title">Настройка Kali Linux</span>

                        <div className="worker-page__task-time">
                            <span className="worker-page__task-start">Начало: 10:00, 21.04.2026</span>
                            <span className="worker_page__task-end">Конец: 12:00 22.04.2026</span>
                        </div>
                    </div>
                    <div className="worker-page__task">
                        <span className="worker-page__task-title">Настройка Kali Linux</span>

                        <div className="worker-page__task-time">
                            <span className="worker-page__task-start">Начало: 10:00, 21.04.2026</span>
                            <span className="worker_page__task-end">Конец: 12:00 22.04.2026</span>
                        </div>
                    </div>
                    <div className="worker-page__task">
                        <span className="worker-page__task-title">Настройка Kali Linux</span>

                        <div className="worker-page__task-time">
                            <span className="worker-page__task-start">Начало: 10:00, 21.04.2026</span>
                            <span className="worker_page__task-end">Конец: 12:00 22.04.2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}