import { useEffect, useState } from "react";
import EngineerCalendar  from "../../components/Calendar/Calendar"
import { Drawer } from "../../components/Drawer/Drawer"

export const Calendar = () => {
    const [tasks, setTasks] = useState([]);
    
    const fetchData = async () => {
        const res = await fetch(`http://127.0.0.1:8000/tasks/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        setTasks(data.map((task) => ({
            ...task,
            start: new Date(task.start_time),
            end: new Date(task.completion_time),
        })));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="calendar-page__right">
            <EngineerCalendar events={tasks} />
        </div>
    )
}