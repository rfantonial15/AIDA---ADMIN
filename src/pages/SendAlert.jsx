import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SendAlert = () => {
  const [alerts, setAlerts] = useState([]); // All fetched alerts
  const [filteredAlerts, setFilteredAlerts] = useState([]); // Alerts after filtering by search
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [alertsPerPage] = useState(10); // Alerts per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/alerts/');
        setAlerts(response.data); // Save fetched alerts
        setFilteredAlerts(response.data); // Initially, no filter, show all
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  // Filtered alerts based on search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = alerts.filter(
      (alert) =>
        alert.subject.toLowerCase().includes(query) ||
        alert.message.toLowerCase().includes(query)
    );
    setFilteredAlerts(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleRowClick = (alertId) => {
    navigate(`/alert/${alertId}`); // Redirect based on the alert ID
  };

  // Pagination logic
  const indexOfLastAlert = currentPage * alertsPerPage; // Calculate the index of the last alert on the current page
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage; // Calculate the index of the first alert on the current page
  const currentAlerts = filteredAlerts.slice(indexOfFirstAlert, indexOfLastAlert); // Get the current alerts for the current page
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage); // Calculate total pages

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
              <th className="p-2 text-center rounded-tr-lg">Date - Time</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentAlerts.length > 0 ? (
              currentAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="cursor-pointer border-b"
                  onClick={() => handleRowClick(alert.id)}
                >
                  <td className="pl-8 p-4 w-1/3">
                    <div className="flex items-center space-x-2">
                      <span className="text-right">{alert.subject}</span>
                    </div>
                  </td>
                  <td
                    className="p-2 text-left"
                    style={{
                      maxWidth: '300px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {alert.message}
                  </td>
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

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {Math.min(indexOfFirstAlert + 1, filteredAlerts.length)}-{Math.min(indexOfLastAlert, filteredAlerts.length)} of {filteredAlerts.length}
        </div>
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            className="border p-2 mr-2 rounded"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            onClick={handleNextPage}
            className="border p-2 rounded"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendAlert;
