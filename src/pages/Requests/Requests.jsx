import "./Requests.scss";
import { RequestsList } from "../../components/RequestsList/RequestsList";
import { RequestsDetails } from "../../components/RequestsDetails/RequestsDetails";
import { RequestModal } from "../../components/RequestModal/RequestModal";
import { useState } from "react";

export const Requests = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    
    return (
        <div className="requests__container">
            <span className="requests__header">Входящие обращения</span>

            <div className="requests__main">
                <div className="requests__list">
                    <RequestsList openRequest={setCurrentRequest}/>
                </div>
                <div className="requests__detail">
                    <RequestsDetails onCreateRequest={openModal} currentRequest={currentRequest}/>
                </div> 
            </div>
            <RequestModal isOpen={isOpen} onClose={closeModal}/>
        </div>
    )
}