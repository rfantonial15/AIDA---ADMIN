/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import PendingAlerts from "../assets/dashboard/pending-alerts-icon.svg";
import TotalAlerts from "../assets/dashboard/total-alerts-icon.svg";
import TotalReports from "../assets/dashboard/total-report-icon.svg";
import TotalUsers from "../assets/dashboard/total-user-icon.svg";
import TrendDown from "../assets/dashboard/trending-down.svg";
import TrendUp from "../assets/dashboard/trending-up.svg";
import CarCrashIcon from "../assets/dashboard/Car.svg";
import FireIcon from "../assets/dashboard/Fire.svg";
import Image from '../assets/dashboard/accidentimage.png';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); 
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [filter, setFilter] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [incidentFilter, setIncidentFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  // Fetch reports from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/reports/');
        setReports(response.data);  // Store the reports data
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');  // Replace with your backend URL
        setTotalUsers(response.data.length);  // Set the total number of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchTotalAlerts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/alerts/');  // Replace with your backend URL
        setTotalAlerts(response.data.length);  // Set the total number of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchTotalAlerts();
    fetchReports();
    fetchTotalUsers();  // Fetch total users on component mount
  }, []);

  useEffect(() => {
    const filteredData = reports.filter(report =>
      report.incident_type.toLowerCase().includes(filter.toLowerCase()) &&
      (dateFilter === '' || report.date_time.startsWith(dateFilter)) &&
      (nameFilter === '' || report.victim_name === nameFilter) &&
      (incidentFilter === '' || report.incident_type === incidentFilter) &&
      (monthFilter === '' || report.date_time.startsWith(monthFilter))
    );
    setFilteredReports(filteredData);
  }, [filter, dateFilter, nameFilter, incidentFilter, monthFilter, reports]);

  const resetFilters = () => {
    setFilter('');
    setDateFilter('');
    setNameFilter('');
    setIncidentFilter('');
    setMonthFilter('');
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReport(null);
  };

  const viewDetails = () => {
    if (selectedReport) {
      navigate(`/reports`, { state: { report: selectedReport } });
    }
  };

  // Toggle remarks (status) and update in the backend
  const toggleRemarks = async (index) => {
    const updatedReports = [...reports];
    const currentReport = updatedReports[index];

    try {
      // Send a patch request to update the remarks field
      const response = await axios.patch(`http://127.0.0.1:8000/api/reports/${currentReport.id}/`);
      
      // Update the local state with the new remarks (toggle between Pending and Done)
      updatedReports[index] = response.data;
      setReports(updatedReports);
    } catch (error) {
      console.error('Error updating report remarks:', error);
    }
  };

  // Get the icon based on the incident type
  const getIcon = (incident_type) => {
    if (incident_type === 'Fire') {
      return FireIcon;
    } else if (incident_type === 'Car Crash') {
      return CarCrashIcon;
    }
    return Image;  // Default image if no specific icon
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Dashboard</h1>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Reports" count={reports.length} trend="8.5% Up from yesterday" trendIcon={TrendUp} icon={TotalReports} />
        <DashboardCard title="Total Users" count={totalUsers} trend="1.3% Up from past week" trendIcon={TrendUp} icon={TotalUsers} />
        <DashboardCard title="Total Alerts" count={totalAlerts} trend="4.3% Down from yesterday" trendIcon={TrendDown} icon={TotalAlerts} />
        <DashboardCard title="Pending Alerts" count={reports.filter(report => report.remarks === "Pending").length} trend="1.8% Up from yesterday" trendIcon={TrendUp} icon={PendingAlerts} />
      </div>
      <div className="p-6 rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl text-green-700">Report Details</h2>
          <select
            className="p-1 border border-gray-300 rounded focus:outline-none bg-gray-100 text-gray-500 text-sm font-medium"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="overflow-x-auto pt-4">
          <table className="min-w-full bg-white shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left rounded-l-lg">Incident Report</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Date - Time</th>
                <th className="py-2 px-4 text-left">Reporter</th>
                <th className="py-2 px-4 text-center rounded-r-lg">Remarks (Status)</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b-2">
                  <td className="px-4 py-6 text-left flex items-center" onClick={() => openModal(report)}>
                    <img src={getIcon(report.incident_type)} alt={`${report.incident_type} Icon`} className="w-6 h-6 mr-3"/>
                    {report.incident_type}
                  </td>
                  <td className="px-4 py-2 text-left" onClick={() => openModal(report)}>{report.landmark}, {report.city}</td>
                  <td className="px-4 py-2 text-left" onClick={() => openModal(report)}>{new Date(report.date_time).toLocaleString()}</td>
                  <td className="px-4 py-2 text-left" onClick={() => openModal(report)}>{report.victim_name}</td>
                  <td className="px-4 py-2 text-center relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRemarks(index);  // Toggle remarks between 'Pending' and 'Done'
                      }}
                      className={`w-24 px-2 py-2 rounded ${
                        report.remarks === "Done"
                          ? "bg-green text-white"
                          : "bg-lightyellow text-black"
                      }`}
                    >
                      {report.remarks}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReport && (
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal}
          className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-50 overflow-auto bg-white bg-opacity-60"
          overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        >
          <div className="bg-red-600 text-white rounded-lg overflow-hidden max-w-md mx-auto my-auto">
            <div className="p-8 text-center">
              <img src={selectedReport.image_url} alt={selectedReport.incident_type} className="w-full rounded-lg object-cover" />
              <h2 className="pt-3 text-xl font-bold">{selectedReport.incident_type.toUpperCase()} ACCIDENT</h2>
              <p className="text-sm font-semibold mt-2">{selectedReport.landmark}, {selectedReport.city}</p>
              <p className="text-xs font-thin">Reporter: {selectedReport.victim_name}</p>
              <button onClick={viewDetails} className="mt-4 px-36 py-2 bg-white text-red-600 rounded-md font-semibold">
                View Details
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const DashboardCard = ({ title, count, trend, trendIcon, icon }) => {
  const isTrendUp = trend.includes("Up");
  const trendColor = isTrendUp ? "text-mintgreen" : "text-red-500";

  const [percentage, ...textArray] = trend.split(" ");
  const text = textArray.join(" ");

  return (
    <div className="p-4 rounded-lg bg-white flex flex-col relative">
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-gray-500">{title}</h2>
      </div>
      <div className="absolute top-2 right-2 m-2">
        <img src={icon} alt={`${title} Icon`} className="w-16 h-16" />
      </div>
      <div className="flex-grow flex items-center justify-start mt-4">
        <p className="text-2xl font-bold">{count}</p>
      </div>
      <div className="flex items-center mt-6">
        <img src={trendIcon} alt="Trend Icon" className="mr-2 w-6 h-6" />
        <p className="text-gray-500">
          <span className={trendColor}>{percentage}</span> {text}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
