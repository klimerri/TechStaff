import "./Statistics.scss";
import { TicketCard } from "../../components/TicketCard/TicketCard";
import { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../../components/Pagination/Pagination";

export const Statistics = () => {
    const { user, isEngineer } = useUser();

    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [newTasks, setNewTasks] = useState([]);
    const [waitingTasks, setWaitingTasks] = useState([]);
    const [cancelledTasks, setCancelledTasks] = useState([]);
    const [processTasks, setProcessTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState();

    const { changePage, totalPages, data, currentPage } = usePagination({ perPage: 5, list: tasks });
    
    const fetchData = async (group = true) => {
        const res = await fetch(`http://127.0.0.1:8000/tasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        let data = await res.json();

        if (isEngineer) {
            data = data.filter(task => task?.engineer && task?.engineer?.id_user === user.id);
        }

        if (statusFilter) {
            data = data.filter(task => task.status === statusFilter);   
        }

        if (!group) {
            setTasks(data);
            return;
        }

        const grouped = {
            all: [],
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

            grouped.all.push(task);
        });

        setTasks(data);
        setAllTasks(grouped.all);
        setNewTasks(grouped.new);
        setWaitingTasks(grouped.waiting);
        setProcessTasks(grouped.process);
        setDoneTasks(grouped.done);
        setCancelledTasks(grouped.cancelled);
    }
    
    useEffect( () => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData(false);
    }, [statusFilter]);
    
    const runSchedule = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks/plan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        fetchData()
    }

    return (
        <div className="statistics__container">
            <div className="statistics__header">
                {isEngineer ? 'Ваши заявки' : 'Распределение заявок'}
            </div>

            {!isEngineer && (
                <button 
                    className="statistics__button" 
                    onClick={runSchedule}
                >
                    Запустить алгоритм распределения заявок
                </button>
            )}

            <div className="statistics__information-list">
                <div className={`statistics__information__card${!statusFilter ? ' checked' : ''}`} onClick={() => setStatusFilter(null)}>
                    <span className="statistics__information__card-header">Всего</span>

                    <span className="statistics__information__card-value">{allTasks.length}</span>
                </div>
                <div className={`statistics__information__card${statusFilter === 'new' ? ' checked' : ''}`} onClick={() => setStatusFilter('new')}>
                    <span className="statistics__information__card-header">Новые</span>

                    <span className="statistics__information__card-value">{newTasks.length}</span>
                </div>
                <div className={`statistics__information__card${statusFilter === 'cancelled' ? ' checked' : ''}`} onClick={() => setStatusFilter('cancelled')}>
                    <span className="statistics__information__card-header">Отменены</span>

                    <span className="statistics__information__card-value">{cancelledTasks.length}</span>
                </div>
                <div className={`statistics__information__card${statusFilter === 'process' ? ' checked' : ''}`} onClick={() => setStatusFilter('process')}>
                    <span className="statistics__information__card-header">В работе</span>

                    <span className="statistics__information__card-value">{processTasks.length}</span>
                </div>
                <div className={`statistics__information__card${statusFilter === 'done' ? ' checked' : ''}`} onClick={() => setStatusFilter('done')}>
                    <span className="statistics__information__card-header">Выполнено</span>

                    <span className="statistics__information__card-value">{doneTasks.length}</span>
                </div>
            </div>

            <div className="statistics__ticket-list">
                {data.map((task) => (
                    <NavLink to={`/ticket/${task.id}`} key={task.id}>
                        <TicketCard task={task} key={task.id} />
                    </NavLink>
                ))}

                {data.length === 0 && (
                    <div className="statistics__empty">
                        <span className="statistics__empty-header">Заявок нет</span>
                    </div>
                )}
            </div>

            <Pagination onPageChange={changePage} totalPages={totalPages} currentPage={currentPage} />
        </div>
    )
}