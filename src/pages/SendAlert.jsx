/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import starIcon from '../assets/alert/star.svg';
import starIconChecked from '../assets/alert/star-checked.svg';
import checkIcon from '../assets/alert/check.svg';
import uncheckIcon from '../assets/alert/uncheck.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SendAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/alerts/');
        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }
        const data = await response.json();
        setAlerts(data);
        setFilteredAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = alerts.filter((alert) =>
      alert.subject.toLowerCase().includes(query) ||
      alert.message.toLowerCase().includes(query)
    );
    setFilteredAlerts(filtered);
  };

  const handleRowClick = (alertSubject) => {
    // Use encodeURIComponent to safely include the subject in the URL
    const encodedSubject = encodeURIComponent(alertSubject);
    navigate(`/alert/${encodedSubject}`);
  };

  return (
    <div className="p-8 font-inter">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Send Alerts</h1>
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 w-6 h-6" />
            <input
              type="text"
              className="ml-2 outline-none w-full pr-52"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <button onClick={() => navigate('/alert-message')} className="bg-green-700 text-white py-2 px-4 rounded">
          + Send Alert
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full shadow-md">
          <thead className="bg-gray-100">
            <tr className="border-b">
              <th className="p-2 pl-8 rounded-tr-lg text-left">Subject</th>
              <th className="p-2 text-left">Message</th>
              <th className="p-2 text-center rounded-tr-lg">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <tr
                  key={alert.subject}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(alert.subject)}  // Navigate based on subject
                >
                  <td className="pl-8 p-4 w-1/3">
                    <div className="flex items-center space-x-2">
                      <span className="text-right">{alert.subject}</span>
                    </div>
                  </td>
                  <td className="p-2 text-left">{alert.message}</td>
                  <td className="p-2 text-center">{alert.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No alerts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SendAlert;
