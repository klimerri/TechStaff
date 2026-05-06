import "./Worker.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const valueRole = {
    "engineer": "Инженер"
}

export const Worker = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [request, setRequest] = useState([]);
    
    const fetchData = async () => {
        const res = await fetch(`http://127.0.0.1:8000/engineers/${id}`, {
            body: JSON.stringify(),
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });

        setRequest(await res.json());
    };

    useEffect(() => {
      fetchData();
    }, []);

    console.log(request);

    return (
        <div className="worker-page__container">
            <button className="worker-page__button-back" onClick={() => navigate(-1)}>
                Назад
            </button>

            <div className="worker-page__fullname">
                <span className="worker-page__name">{request?.user?.surname} {request?.user?.name} {request?.user?.lastname}</span>
                <span className="worker-page__position">Должность: {valueRole[request?.user?.role]}</span>
            </div>

            <div className="worker-page__professional">
                <div className="worker-page__card">
                    <span className="worker-page__card-title">Квалификация</span>
                    <span className="worker-page__card-value">{request?.seniority}</span>
                </div>
                <div className="worker-page__card">
                    <span className="worker-page__card-title">Текущая нагрузка</span>
                    <span className="worker-page__card-value">{request?.workload} ч.</span>
                </div>
                <div className="worker-page__card">
                    <span className="worker-page__card-title">Активные задачи</span>
                    <span className="worker-page__card-value">{request?.tasks?.length}</span>
                </div>
            </div>

            <div className="worker-page__skills">
                <span className="worker-page__skills-title">Навыки сотрудника</span>

                <div className="worker-page__skills-list">
                    {request?.engineering_skills?.map((skill) => {
                        return <div className="worker-page__skills-skill">{skill.skill.name}</div>
                    })}
                </div>
            </div>

            <div className="worker-page__tasks">
                <span className="worker-page__tasks-title">Ближайшие задачи сотрудника</span>

                {request?.tasks?.length === 0 && <span>У сотрудника нет активных задач</span>}
                {request?.tasks?.length ? request.tasks.map((task) => {
                    return (
                        <div className="worker-page__task">
                            <span className="worker-page__task-title">{task.name}</span>

                            <div className="worker-page__task-time">
                                <span className="worker-page__task-start">Начало: {new Date(task.start_time).toLocaleString()}</span>
                                <span className="worker_page__task-end">Конец: {new Date(task.completion_time).toLocaleString()}</span>
                            </div>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    );
}