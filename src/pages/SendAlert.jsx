import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import starIcon from '../assets/Star.svg'; // Adjust the path as needed
import starIconChecked from '../assets/Star-checked.svg'; // Adjust the path as needed
import checkIcon from '../assets/check.svg'; // Adjust the path as needed
import uncheckIcon from '../assets/uncheck.svg'; // Adjust the path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SendAlert = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      subject: 'All',
      message: 'PAHIBALO: Tanan lumulupyo sa siyudad, adunay umaabot nga...',
      time: '8:38 AM',
    },
    {
      id: 2,
      subject: 'Barangay Pedro sa Baculio',
      message: 'PAHIBALO: Gihikayt ang tanan nga mu-bakwit na sa evacuation...',
      time: '8:38 AM',
    },
  ]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [starredAlerts, setStarredAlerts] = useState([]);
  const navigate = useNavigate();

  const handleSelectAlert = (alertId) => {
    setSelectedAlert(alertId === selectedAlert ? null : alertId);
  };

  const handleToggleStar = (alertId) => {
    setStarredAlerts((prevStarred) =>
      prevStarred.includes(alertId)
        ? prevStarred.filter((id) => id !== alertId)
        : [...prevStarred, alertId]
    );
  };

  const navigateToAlertMessage = () => {
    navigate('/alert-message');
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-4">Send Alerts</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 pl-10 rounded w-full"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button onClick={navigateToAlertMessage} className="bg-green-700 text-white py-2 px-4 rounded">
          + Send Alert
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg border-collapse">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="pl-20 p-4">Subject</th>
            <th className="p-4">Message</th>
            <th className="p-4 pr-10 text-right">Time</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className={`cursor-pointer ${selectedAlert === alert.id ? 'bg-gray-100' : ''}`}
              onClick={() => handleSelectAlert(alert.id)}
              style={
                selectedAlert === alert.id
                  ? { borderRadius: '14px', border: '0.3px solid #B9B9B9', background: '#FFF' }
                  : {}
              }
            >
              <td className="pl-4 p-4 w-1/3">
                <div className="flex items-center space-x-2">
                  <img
                    src={selectedAlert === alert.id ? checkIcon : uncheckIcon}
                    alt={selectedAlert === alert.id ? 'Checked' : 'Unchecked'}
                    className="h-6 w-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAlert(alert.id);
                    }}
                  />
                  <img
                    src={starredAlerts.includes(alert.id) ? starIconChecked : starIcon}
                    alt="Star"
                    className="w-6 h-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(alert.id);
                    }}
                  />
                  <span>{alert.subject}</span>
                </div>
              </td>
              <td className="p-4">{alert.message}</td>
              <td className="p-4 text-right">{alert.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>Showing 1-2 of 2</div>
        <div className="flex items-center">
          <button className="border p-2 mr-2 rounded">&lt;</button>
          <button className="border p-2 rounded">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default SendAlert;
