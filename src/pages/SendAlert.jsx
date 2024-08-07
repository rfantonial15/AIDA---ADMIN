import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import starIcon from "../assets/alerts/star.svg";
import starIconChecked from "../assets/alerts/star-checked.svg"
import checkIcon from "../assets/alerts/check.svg";
import uncheckIcon from "../assets/alerts/uncheck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const SendAlert = () => {
  const [filter, setFilter] = useState("");

  const resetFilters = () => {
    setFilter("");
  };

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      subject: "All",
      message: "PAHIBALO: Tanan lumulupyo sa siyudad, adunay umaabot nga...",
      time: "8:38 AM",
    },
    {
      id: 2,
      subject: "Barangay Pedro sa Baculio",
      message: "PAHIBALO: Gihikayt ang tanan nga mu-bakwit na sa evacuation...",
      time: "8:38 AM",
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
    navigate("/alert-message");
  };

  return (
    <div className="p-8 font-inter">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Send Alerts</h1>
      <div className="flex justify-between items-center mb-8">
        <div>
        <div>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                className="ml-2 outline-none w-full pr-52"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          onClick={navigateToAlertMessage}
          className="bg-green-700 text-white py-2 px-4 rounded"
        >
          <span className="mr-3">+</span>Send Alert
        </button>
      </div>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full shadow-md">
          <thead className="bg-lightgray">
            <tr className="border-b">
              <th className="p-2 rounded-tr-lg">Subject</th>
              <th className="p-2 text-left">Message</th>
              <th className="p-2 text-center rounded-tr-lg">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white">
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className={`cursor-pointer ${selectedAlert === alert.id ? 'bg-gray-100' : ''}` }
              onClick={() => handleSelectAlert(alert.id)}
              style={
                selectedAlert === alert.id
                  ? { borderRadius: '14px', border: '0.3px solid #B9B9B9', background: '#FFF' }
                  : {}
              }
            >
              <td className="pl-4 p-4 w-1/3">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedAlert === alert.id ? checkIcon : uncheckIcon}
                    alt={selectedAlert === alert.id ? 'Checked' : 'Unchecked'}
                    className="h-4 w-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAlert(alert.id);
                    }}
                  />
                  <img
                    src={starredAlerts.includes(alert.id) ? starIconChecked : starIcon}
                    alt="Star"
                    className="w-4 h-6 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(alert.id);
                    }}
                  />
                  <span className="text-right pl-2">{alert.subject}</span>
                </div>
              </td>
              <td className="p-2 text-left">{alert.message}</td>
              <td className="p-2 text-center">{alert.time}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
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
