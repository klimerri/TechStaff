import "./RequestsList.scss";
import { RequestCard } from "../RequestCard/RequestCard";
import { useEffect, useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";

export const RequestsList = ({ withoutTasks, clientSearch, openRequest }) => {
    const [requests, setRequests] = useState([]);
    const { changePage, currentPage, totalPages, data } = usePagination({ perPage: 10, list: requests });

    const fetchData = async () => {
        const res = await fetch("http://127.0.0.1:8000/requests/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        let data = await res.json();
        console.log(data);
        
        if (withoutTasks) {
            data = data.filter((req) => !req.task_ids.length);
        }

        if (clientSearch && clientSearch.trim()) {
            data = data.filter((task) =>
                task.client.name
                    .toLowerCase()
                    .includes(clientSearch.toLowerCase())
            );
        }

        setRequests(data);
    }
    
    useEffect( () => {
        fetchData();
    }, [withoutTasks, clientSearch]);

    return (
        <div className="requests-list__container">
            <div className="requests-list__header">
                <span className="requests-list__header-name">ID</span>
                <span className="requests-list__header-client">Клиент</span>
                <span className="requests-list__header-date">Дата создания</span>
                <span className="requests-list__header-task">Есть заявки</span>
            </div>
            <div className="requests-list__list">
                {data.map((request)=> {
                    return <RequestCard id={request.id} task={request.task_ids} client={request.client} date={request.date} onClick={() => {
                        openRequest(request)
                    }}/>
                })}
            </div>

            <Pagination  currentPage={currentPage} onPageChange={changePage} totalPages={totalPages} />
        </div>
    )
}