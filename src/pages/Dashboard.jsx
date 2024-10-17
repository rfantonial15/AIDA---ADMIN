/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import PendingAlerts from "../assets/dashboard/pending-alerts-icon.svg";
import TotalAlerts from "../assets/dashboard/total-alerts-icon.svg";
import TotalReports from "../assets/dashboard/total-report-icon.svg";
import TotalUsers from "../assets/dashboard/total-user-icon.svg";
import TrendDown from "../assets/dashboard/trending-down.svg";
import TrendUp from "../assets/dashboard/trending-up.svg";
import CarCrashIcon from "../assets/dashboard/Car.svg";
import FireIcon from "../assets/dashboard/Fire.svg";
import Image from "../assets/dashboard/accidentimage.png";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [incidentFilter, setIncidentFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockUsers = [
          {
            date: "04-23-34",
            time: "10:00 AM",
            incident: "Fire",
            location: "123 Main St",
            reporter: "John Doe",
            status: "Pending",
            icon: FireIcon,
            image: Image,
          },
          {
            date: "04-27-34",
            time: "02:00 PM",
            incident: "Car Crash",
            location: "456 Elm St",
            reporter: "Jane Smith",
            status: "Pending",
            icon: CarCrashIcon,
            image: Image,
          },
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/"); // Fetch total users from the backend
        setTotalUsers(response.data.length); // Set the total number of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchTotalAlerts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/alerts/");
        setTotalAlerts(response.data.length); // Set total alerts count
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };


    fetchData();
    fetchTotalUsers();
    fetchTotalAlerts();
  }, []);

  useEffect(() => {
    const filteredData = users.filter(
      (user) =>
        user.incident.toLowerCase().includes(filter.toLowerCase()) &&
        (dateFilter === "" || user.date === dateFilter) &&
        (nameFilter === "" || user.reporter === nameFilter) &&
        (incidentFilter === "" || user.incident === incidentFilter) &&
        (monthFilter === "" || user.date.startsWith(monthFilter))
    );
    setFilteredUsers(filteredData);
  }, [filter, dateFilter, nameFilter, incidentFilter, monthFilter, users]);

  const resetFilters = () => {
    setFilter("");
    setDateFilter("");
    setNameFilter("");
    setIncidentFilter("");
    setMonthFilter("");
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const viewDetails = () => {
    if (selectedUser) {
      navigate(`/reports`, { state: { user: selectedUser } });
    }
  };

  const toggleStatus = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].status =
      updatedUsers[index].status === "Pending" ? "Done" : "Pending";
    setUsers(updatedUsers);
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Total Reports"
          count="123"
          trend="8.5% Up from yesterday"
          trendIcon={TrendUp}
          icon={TotalReports}
        />
        <DashboardCard
          title="Total Users"
          count={totalUsers}
          trend="1.3% Up from past week"
          trendIcon={TrendUp}
          icon={TotalUsers}
        />
        <DashboardCard
          title="Total Alerts"
          count={totalAlerts}
          trend="4.3% Down from yesterday"
          trendIcon={TrendDown}
          icon={TotalAlerts}
        />
        <DashboardCard
          title="Pending Alerts"
          count="101"
          trend="1.8% Up from yesterday"
          trendIcon={TrendUp}
          icon={PendingAlerts}
        />
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
                <th className="py-2 px-4 text-left rounded-l-lg">
                  Incident Report
                </th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Date - Time</th>
                <th className="py-2 px-4 text-left">Reporter</th>
                <th className="py-2 px-4 text-center rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b-2">
                  <td
                    className="px-4 py-6 text-left flex items-center"
                    onClick={() => openModal(user)}
                  >
                    <img
                      src={user.icon}
                      alt={`${user.incident} Icon`}
                      className="w-6 h-6 mr-3"
                    />
                    {user.incident}
                  </td>
                  <td
                    className="px-4 py-2 text-left"
                    onClick={() => openModal(user)}
                  >
                    {user.location}
                  </td>
                  <td
                    className="px-4 py-2 text-left"
                    onClick={() => openModal(user)}
                  >{`${user.date} - ${user.time}`}</td>
                  <td
                    className="px-4 py-2 text-left"
                    onClick={() => openModal(user)}
                  >
                    {user.reporter}
                  </td>
                  <td className="px-4 py-2 text-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(index);
                      }}
                      className={`w-24 px-2 py-2 rounded ${
                        user.status === "Done"
                          ? "bg-green text-white"
                          : "bg-lightyellow text-black"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-50 overflow-auto bg-white bg-opacity-60"
          overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        >
          <div className="bg-red-600 text-white rounded-lg overflow-hidden max-w-md mx-auto my-auto">
            <div className="p-8 text-center">
              <img
                src={selectedUser.image}
                alt={selectedUser.incident}
                className="w-full rounded-lg object-cover"
              />
              <h2 className="pt-3 text-xl font-bold">
                {selectedUser.incident.toUpperCase()} ACCIDENT
              </h2>
              <p className="text-sm font-semibold mt-2">
                {selectedUser.location}
              </p>
              <p className="text-xs font-thin">
                Reporter: {selectedUser.reporter}
              </p>
              <button
                onClick={viewDetails}
                className="mt-4 px-36 py-2 bg-white text-red-600 rounded-md font-semibold"
              >
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
