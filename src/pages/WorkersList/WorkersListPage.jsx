import { Drawer } from "../../components/Drawer/Drawer";
import "./WorkersListPage.scss";
import { WorkerCard } from "../../components/WorkerCard/WorkerCard";
import { useEffect, useState } from "react";

export const WorkersList = () => {
  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
          const res = await fetch("http://127.0.0.1:8000/engineers/", {
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
      <div className="workers-list__container">
        <span className="workers-list__header">Список сотрудников</span>

        <div className="workers-list__list">
          <div className="workers-list__list__header">
            <div className="workers-list__list__header__name">
                <span className="workers-list__list__header-text">ФИО</span>
                <span className="workers-list__list__header-text">Роль</span>
            </div>

            <span className="workers-list__list__header-text">Квалификация</span>
            <span className="workers-list__list__header-text">Активен</span>
            <span className="workers-list__list__header-text">Текущая нагрузка</span>
            <span className="workers-list__list__header-text">Локация</span>
          </div>

          {requests.map((request) => {
            return <WorkerCard id={request.id} name={request.user.name} lastname={request.user.surname} role={request.user.role} 
            qualification={request.seniority} active={request.user.is_active} hour={request.weekly_hours} locationName={request.location.name} 
            locationCity={request.location.city} locationStreet={request.location.street} locationHouse={request.location.house} />
          })}
        </div>
      </div>
  );
};
