import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "20px",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
    },
};

const priorities = [
    { value: "", label: "Выберите приоритет" },
    { value: "1", label: "1 (Высокий)" },
    { value: "2", label: "2 (Средний)" },
    { value: "3", label: "3 (Низкий)" },
];

export const RequestModal = ({ requestId, locationId, isOpen, onClose }) => {
    const [taskTypes, setTaskTypes] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        id_task_type: "",
        text: "",
        priority: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Название обязательно";
        if (!formData.id_task_type) newErrors.id_task_type = "Выберите тип заявки";
        if (!formData.text.trim())
            newErrors.text = "Описание обязательно";
        if (!formData.priority) newErrors.priority = "Выберите приоритет";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Отправка заявки (API)
        console.log("Новая заявка:", formData);

        const body = {
            ...formData,
            id_request: requestId,
            id_location: locationId,
        }
        
        const res = await fetch("http://127.0.0.1:8000/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        onClose();
        // reset form
        setFormData({ name: "", id_task_type: "", text: "", priority: "" });
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://127.0.0.1:8000/task-types/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setTaskTypes(await res.json());
        }

        fetchData();
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Создать заявку"
        >
            <h2 style={{ fontWeight: 400, color: "black", fontSize: "18px", textAlign: "center"}}>Новая заявка</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label>Название заявки:</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                            padding: "8px",
                            border: errors.name ? "1px solid red" : "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                        placeholder="Введите название"
                    />
                    {errors.name && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.name}
                        </span>
                    )}
                </div>

                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px"  }}>
                    <label>Тип заявки:</label>
                    <select
                        name="id_task_type"
                        value={formData.id_task_type}
                        onChange={handleChange}
                        style={{
                            padding: "8px",
                            border: errors.id_task_type ? "1px solid red" : "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        {taskTypes.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    {errors.id_task_type && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.id_task_type}
                        </span>
                    )}
                </div>

                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px"  }}>
                    <label>Описание:</label>
                    <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        rows="4"
                        style={{
                            padding: "8px",
                            border: errors.text ? "1px solid red" : "1px solid #ccc",
                            borderRadius: "4px",
                            resize: "vertical",
                        }}
                        placeholder="Подробное описание проблемы"
                    />
                    {errors.text && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.text}
                        </span>
                    )}
                </div>

                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px"  }}>
                    <label>Приоритет:</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        style={{
                            padding: "8px",
                            border: errors.priority ? "1px solid red" : "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        {priorities.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.priority && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.priority}
                        </span>
                    )}
                </div>

                <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                        type="submit"
                        style={{
                            marginRight: "10px",
                            padding: "10px 20px",
                            background: "#1849dc",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Создать заявку
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: "10px 20px",
                            background: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </Modal>
    );
};
