import "./Requests.scss";
import { RequestsList } from "../../components/RequestsList/RequestsList";
import { RequestsDetails } from "../../components/RequestsDetails/RequestsDetails";
import { RequestModal } from "../../components/RequestModal/RequestModal";
import { useState } from "react";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Input } from "../../components/Input/Input";

export const Requests = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState("");

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    
    return (
        <div className="requests__container">
            <span className="requests__header">Входящие обращения</span>

            <div style={{display: 'flex', gap: '20px'}}>
                <div style={{marginTop: '20px', width: '300px'}}>
                    <Input
                        label=""
                        placeholder="Поиск по клиенту"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                
                <Checkbox
                    style={{
                        marginTop: '20px'
                    }}
                    checked={checked}
                    onChange={setChecked}
                    label="Только без заявок"
                />
            </div>

            <div className="requests__main">
                <div className="requests__list">
                    <RequestsList openRequest={setCurrentRequest} withoutTasks={checked} clientSearch={value} />
                </div>
                <div className="requests__detail">
                    <RequestsDetails onCreateRequest={openModal} currentRequest={currentRequest}/>
                </div> 
            </div>
            <RequestModal requestId={currentRequest?.id} locationId={currentRequest?.client?.id_location} isOpen={isOpen} onClose={closeModal}/>
        </div>
    )
}