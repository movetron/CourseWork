import React from 'react';
import './About.css'; 

const About = ({ onClose }) => {
  return (
    <div className="about-overlay">
      <div className="about-window">
        <h2>О программе "МежСвязь"</h2>
        <p><strong>Версия:</strong> 1.0.0</p>
        <p><strong>Разработал:</strong> Назаров Михаил</p>
        <p><strong>Дата выпуска:</strong> 29.11.2024</p>
        <p><strong>Назначение:</strong> Приложение "МежСвязь" разрботано для учета и анализа междугородних звонков.<br/> В разработанном ПО доступны функции:<br/> - Просмотр поступающих звонков;<br/> - Просмотр истории звонков; <br/> - Просмотр отчёта с набольшим количестовом город от исходных звонков; <br/> - Удаление записей и удаление по фамилии <br/> - Модальное окно с информацией <br/> - Максимальная и суммарная стоимость</p>
        <button className="close-button" onClick={onClose}>Ок</button>
      </div>
    </div>
  );
};

export default About;
