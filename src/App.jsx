import React, { useEffect, useState } from 'react';
import CallWindow from './components/CallWindow';
import Report from './components/Report';
import './App.css';
import About from './components/About';
import { v4 as uuidv4 } from 'uuid'; 

const App = () => {
  const [data, setData] = useState([]);
  const [currentCall, setCurrentCall] = useState(null);
  const [history, setHistory] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для видимости модалки
  const [modalData, setModalData] = useState(null); 

  const [isCallStarted, setIsCallStarted] = useState(false); // Состояние для отслеживания начала разговора

  const [showAbout, setShowAbout] = useState(false); 

  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };
  useEffect(() => {
    fetch('/bd.json')
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((call) => ({
          ...call,
          id: call.id || uuidv4(), // Генерируем уникальный id, если его нет
        }));
        setData(updatedData);
      })
      .catch((err) => console.error('Ошибка загрузки данных:', err));
  }, []);

  const handleNextCall = () => {
    if (data.length > 0) {
      const nextCall = data[Math.floor(Math.random() * data.length)];
      if (nextCall?.from && nextCall?.to) {
        setCurrentCall(nextCall);
        setIsCallStarted(true);
      } else {
        console.error("Некорректная запись в данных:", nextCall);
        setCurrentCall(null);
      }
    } else {
      console.warn("Нет доступных данных для звонков.");
      setCurrentCall(null);
    }
  };
  

  const handleCall = (duration) => {
    const cost = duration * 10;
    const uniqueId = Math.max(0, ...history.map((call) => call.id)) + 1;
    const callDate = currentCall?.date || "Не указана дата";
    setHistory([
      ...history,
      {
        id: uniqueId,
        from: currentCall.from,
        to: currentCall.to,
        duration,
        cost,
        callDate
      },
    ]);
    
    setModalData({
      date: callDate,
      duration: duration,
      cost: cost,
    });
    
    setIsModalVisible(true);
  };
 const handleDeleteCall = (id) => {
    // Удаляем конкретный звонок по id
    setHistory((prevHistory) => prevHistory.filter((call) => call.id !== id));
  };
  const handleDeleteByLastName = (lastName) => {
    // Удаляем звонки, где фамилия отправителя или получателя совпадает
    setHistory((prevHistory) =>
      prevHistory.filter(
        (call) =>
          !call.from.name.includes(lastName) && !call.to.name.includes(lastName)
      )
    );
  };
  const maxCost = history.reduce((max, call) => Math.max(max, call.cost || 0), 0);

  const closeModal = () => {
    setIsModalVisible(false);
  };


  
  return (
    <div className="container">
      <h1>Учет междугородных разговоров</h1>
      {!isCallStarted && (
        <button onClick={handleShowAbout}>О программе</button>
      )}

      {showAbout && <About onClose={handleCloseAbout} />}

      {currentCall ? (
        <CallWindow call={currentCall} onCall={handleCall} onNext={handleNextCall} />
      ) : (
        <button onClick={handleNextCall}>Начать разговор</button>
      )}
      {history.length > 0 && (
        <>
          <Report history={history} maxCost={maxCost} onDeleteCall={handleDeleteCall}
          onDeleteByLastName={handleDeleteByLastName}  />
        </>
      )}

     
      
      {isModalVisible && modalData && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Информация о звонке</h2>
            <p>Дата звонка: {modalData.date}</p>
            <p>Длительность: {modalData.duration} мин</p>
            <p>Стоимость: {modalData.cost} руб.</p>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
