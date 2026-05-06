import { useEffect, useState } from "react";
import EngineerCalendar  from "../../components/Calendar/Calendar"
import { Drawer } from "../../components/Drawer/Drawer"
import { useUser } from "../../hooks/useUser";
import Resource from "../../components/Calendar/Cal";

export const Calendar = () => {
    const { user, isEngineer } = useUser();

    const [tasks, setTasks] = useState([]);
    
    const fetchData = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let data = await res.json();

        if (isEngineer) {
            data = data.filter((task) => task?.engineer?.id_user === user.id);
        }
        
        setTasks(data
            .map((task) => ({
                ...task,
                start: new Date(task.start_time),
                end: new Date(task.completion_time),
            }
        )));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="calendar-page__right">
            {isEngineer ? (
                <EngineerCalendar events={tasks} />
            ) : (
                <Resource events={tasks} />
            )}
        </div>
    )
}