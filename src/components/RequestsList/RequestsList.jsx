import "./RequestsList.scss";
import { RequestCard } from "../RequestCard/RequestCard";
import { useEffect, useState } from "react";

export const RequestsList = () => {
    const [requests, setRequests] = useState([]);

    const fetchData = async () => {
        const res = await fetch("http://127.0.0.1:8000/requests/", {
            body: JSON.stringify(),
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        setRequests(await res.json());
    }

    useEffect( () => {
        fetchData();
    }, []);

    console.log(requests);

    return (
        <div className="requests-list__container">
            <div className="requests-list__header">
                <span className="requests-list__header-name">ID</span>
                <span className="requests-list__header-client">Клиент</span>
                <span className="requests-list__header-date">Дата создания</span>
            </div>
            <div className="requests-list__list">
                {requests.map((request)=> {
                    return <RequestCard id={request.id} client={request.client} date={request.date}/>
                })}
            </div>
        </div>
    )
}