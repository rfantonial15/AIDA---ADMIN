import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AlertDetailView = () => {
  const { subject } = useParams(); // Get the subject from the URL
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlertDetails = async () => {
      try {
        const encodedSubject = encodeURIComponent(subject);
        const response = await fetch(`http://localhost:8000/api/alerts/?subject=${encodedSubject}`);
        if (!response.ok) {
          throw new Error('Failed to fetch alert details');
        }
        const data = await response.json();
        if (data.length > 0) {
          setAlert(data[0]);
        } else {
          setError('Alert not found');
        }
      } catch (error) {
        console.error('Error fetching alert details:', error);
        setError('Failed to fetch alert details.');
      }
    };

    fetchAlertDetails();
  }, [subject]);

  if (error) {
    return <div className="p-8">Error: {error}</div>;
  }

  if (!alert) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 font-inter">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Send Alerts</h1>
      {/* Header with title and time */}
      <div className="bg-green-700 p-4 flex justify-between items-center rounded-t-lg">
        <h1 className="font-bold text-white text-xl pl-4">ALERT MESSAGE</h1>
      </div>

      {/* Main content with alert details */}
      <div className="bg-white shadow-md rounded-lg mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-1 bg-green-100 text-green-700 rounded">All</button>
          <td className="p-2 text-center">{alert.timeDate}</td>
        </div>
    
        <div className="border-t border-gray-200 my-4"></div>

        <div className="flex">
          {/* Left side with message content */}
          <div className="w-2/3 pr-4">
            <h2 className="font-bold text-lg text-gray-700 mb-2">{alert.subject}</h2>
            <p className="text-gray-700 mb-4">{alert.message}</p>

            {/* Additional details like weather forecast */}
            {alert.additional_info && (
              <div className="mt-4">
                <h3 className="font-bold text-sm text-gray-700 mb-2">OVER LAGUINDINGAN UPPER AIR AND SYNOPTIC STATION</h3>
                <p className="text-gray-600 text-sm">Maximum Temperature: {alert.additional_info.max_temp} °C</p>
                <p className="text-gray-600 text-sm">Minimum Temperature: {alert.additional_info.min_temp} °C</p>
                <p className="text-gray-600 text-sm">Maximum Relative Humidity: {alert.additional_info.max_humidity} %</p>
                <p className="text-gray-600 text-sm">Minimum Relative Humidity: {alert.additional_info.min_humidity} %</p>
              </div>
            )}
          </div>

          {/* Right side with image content */}
          <div className="w-1/3">
            {alert.image && (
              <img src={alert.image} alt="Alert Content" className="rounded mx-auto" />
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>
      </div>
    </div>
  );
};

export default AlertDetailView;
