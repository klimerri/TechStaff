import { Drawer } from "../../components/Drawer/Drawer";
import "./WorkersListPage.scss";
import { WorkerCard } from "../../components/WorkerCard/WorkerCard";

export const WorkersList = () => {
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

          <WorkerCard />
          <WorkerCard />
          <WorkerCard />
          <WorkerCard />
          <WorkerCard />
        </div>
      </div>
  );
};
