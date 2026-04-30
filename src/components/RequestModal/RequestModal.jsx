import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
};

const requestTypes = [
  { value: '', label: 'Выберите тип' },
  { value: 'ubuntu-setup', label: 'Настройка Ubuntu' },
  { value: 'backup-setup', label: 'Настройка резервного копирования' },
  { value: 'website-fix', label: 'Ремонт сайта' },
  { value: 'server-config', label: 'Конфигурация сервера' },
];

const priorities = [
  { value: '', label: 'Выберите приоритет' },
  { value: '1', label: '1 (Критично)' },
  { value: '2', label: '2 (Высокий)' },
  { value: '3', label: '3 (Низкий)' },
];

export const RequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    priority: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Название обязательно';
    if (!formData.type) newErrors.type = 'Выберите тип заявки';
    if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
    if (!formData.priority) newErrors.priority = 'Выберите приоритет';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Отправка заявки (API)
    console.log('Новая заявка:', formData);
    onClose();
    // reset form
    setFormData({ title: '', type: '', description: '', priority: '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Создать заявку"
    >
      <h2>Новая заявка</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Название заявки:</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: errors.title ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
            placeholder="Введите название"
          />
          {errors.title && <span style={{ color: 'red', fontSize: '12px' }}>{errors.title}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Тип заявки:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: errors.type ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            {requestTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.type && <span style={{ color: 'red', fontSize: '12px' }}>{errors.type}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Описание:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: errors.description ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical'
            }}
            placeholder="Подробное описание проблемы"
          />
          {errors.description && <span style={{ color: 'red', fontSize: '12px' }}>{errors.description}</span>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Приоритет:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: errors.priority ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            {priorities.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.priority && <span style={{ color: 'red', fontSize: '12px' }}>{errors.priority}</span>}
        </div>

        <div>
          <button 
            type="submit" 
            style={{ 
              marginRight: '10px', 
              padding: '10px 20px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Создать заявку
          </button>
          <button 
            type="button" 
            onClick={onClose}
            style={{ 
              padding: '10px 20px', 
              background: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
}