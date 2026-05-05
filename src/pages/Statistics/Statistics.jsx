import "./Statistics.scss";
import { TicketCard } from "../../components/TicketCard/TicketCard";
import { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

export const Statistics = () => {
    const [tasks, setTasks] = useState([]);
    const [newTasks, setNewTasks] = useState([]);
    const [waitingTasks, setWaitingTasks] = useState([]);
    const [cancelledTasks, setCancelledTasks] = useState([]);
    const [processTasks, setProcessTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
        
    const fetchData = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks`, {
            body: JSON.stringify(),
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        const grouped = {
            new: [],
            waiting: [],
            process: [],
            done: [],
            cancelled: []
        };

        data.forEach(task => {
            if (grouped[task.status]) {
                grouped[task.status].push(task);
            }
        });

        setTasks(data);
        setNewTasks(grouped.new);
        setWaitingTasks(grouped.waiting);
        setProcessTasks(grouped.process);
        setDoneTasks(grouped.done);
        setCancelledTasks(grouped.cancelled);
    }
    
    useEffect( () => {
        fetchData();
    }, []);
    
    console.log(tasks);

    return (
        <div className="statistics__container">
            <div className="statistics__header">Распределение заявок</div>

            <div className="statistics__information-list">
                <div className="statistics__information__card">
                    <span className="statistics__information__card-header">Всего</span>

                    <span className="statistics__information__card-value">{tasks.length}</span>
                </div>
                <div className="statistics__information__card">
                    <span className="statistics__information__card-header">Новые</span>

                    <span className="statistics__information__card-value">{newTasks.length}</span>
                </div>
                <div className="statistics__information__card">
                    <span className="statistics__information__card-header">Не были распределены</span>

                    <span className="statistics__information__card-value">{waitingTasks.length}</span>
                </div>
                <div className="statistics__information__card">
                    <span className="statistics__information__card-header">Отменены</span>

                    <span className="statistics__information__card-value">{cancelledTasks.length}</span>
                </div>
                <div className="statistics__information__card">
                    <span className="statistics__information__card-header">В работе</span>

                    <span className="statistics__information__card-value">{processTasks.length}</span>
                </div>
                <div className="statistics__information__card">
                    <span className="statistics__information__card-header">Выполнено</span>

                    <span className="statistics__information__card-value">{doneTasks.length}</span>
                </div>
            </div>

            <div className="statistics__ticket-list">
                {tasks.map((task) => (
                    <NavLink to={`/ticket/${task.id}`} key={task.id}>
                        <TicketCard task={task} key={task.id} />
                    </NavLink>
                ))}
            </div>
        </div>
    )
}