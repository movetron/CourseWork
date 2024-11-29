import React, { useState }   from 'react';
import './Report.css';

const Report = ({ history, maxCost, onDeleteCall, onDeleteByLastName  }) => {
  const [filterLastName, setFilterLastName] = useState('');

  if (!history || history.length === 0) {
    return <p>История звонков пуста.</p>;
  }
  const cityCalls  = {};
  let totalCost = 0;

  history.forEach((call) => {
    const city = call?.from?.city || "Город не указан";
    const cost = call?.cost || 0;

    cityCalls[city] = (cityCalls[city] || 0) + 1;

    totalCost += cost;
  });

  
  const maxCityEntry = Object.entries(cityCalls).reduce(
    (max, [city, count]) => (count > max.count ? { city, count } : max),
    { city: "Нет данных", count: 0 }
  );


  return (
    <div className="report">
     <h2>Отчёт</h2>
      <p>Суммарная стоимость всех разговоров: {totalCost} руб.</p>
      <p>Максимальная стоимость звонка: {maxCost || 'Нет данных'} руб.</p>
      <p>Город с наибольшим количеством звонков: { maxCityEntry.city} ({maxCityEntry.count} звонков)</p>
      <h3>Распределение звонков по городам:</h3>
      {Object.entries(cityCalls).length > 0 ? (
        <ul>
          {Object.entries(cityCalls).map(([city, count]) => (
            <li key={city}>
              {city}: {count} звонков
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет данных для отображения распределения по городам.</p>
      )}
      <h3>История звонков:</h3>
      <ul>
        {history.map((call, index) => (
          <li key={`${call.id}-${index}`}>
            {call.from.name}, город {call.from.city} → {call.to.name}, {call.duration} мин, {call.cost} руб., дата: {call.callDate}.
            <button onClick={() => onDeleteCall(call.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <h3>Удаление звонков по фамилии:</h3>
      <input
        className='input'
        type="text"
        value={filterLastName}
        placeholder="Введите фамилию"
        onChange={(e) => setFilterLastName(e.target.value)}
      />
      <button onClick={() => onDeleteByLastName(filterLastName)}>
        Удалить
      </button>
    </div>
  );
};

export default Report;
