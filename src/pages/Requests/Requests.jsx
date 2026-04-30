import "./Requests.scss";
import { RequestsList } from "../../components/RequestsList/RequestsList";
import { RequestsDetails } from "../../components/RequestsDetails/RequestsDetails";


export const Requests = () => {
    return (
        <div className="requests__container">
            <span className="requests__header">Входящие обращения</span>

            <div className="requests__main">
                <div className="requests__list">
                    <RequestsList />
                </div>
                <div className="reqiests__detail">
                    <RequestsDetails />
                </div> 
            </div>
        </div>
    )
}