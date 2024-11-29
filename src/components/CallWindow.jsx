import React from 'react';
import './CallWindow.css';

const CallWindow = ({ call, onNext, onCall }) => {
    if (!call || !call.from || !call.to) {
        return <div>Данные звонка отсутствуют или некорректны.</div>;
      }
    const { from, to, duration} = call;

    const handleCall = () => {
        if (onCall) onCall(duration);
      };
  return (
    <div className="call-window">
        <div className="call-column">
            <div className="call-content">
                <div className="call-card">
                    <h3>Исходящий звонок</h3>
                    <p>{from?.name || "Неизвестно"}</p>
                    <p>{from?.phone || "Неизвестно"}</p>
                    <p>{from?.city || "Неизвестно"}</p>
                </div>
                <div className="call-card">
                    <h3>Входящий звонок</h3>
                    <p>{to?.name || "Неизвестно"}</p>
                    <p>{to?.phone || "Неизвестно"}</p>
                    <p>{to?.city || "Неизвестно"}</p>
                </div>
            </div>
            <button className="call-btn" onClick={handleCall}>Созвониться</button>
        </div>
    <button className="call-btn-next" onClick={onNext}>Следующий разговор</button>
  </div>
  );
};

export default CallWindow;
