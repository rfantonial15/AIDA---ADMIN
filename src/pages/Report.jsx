import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import reloadIcon from "../assets/reset.png"; // Adjust the path as needed
import filterIcon from "../assets/Filter.svg";

const Report = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [incidentFilter, setIncidentFilter] = useState("");

  useEffect(() => {
    // Simulating fetching data (replace with actual API call)
    const fetchData = async () => {
      try {
        // Mock data until API integration
        const mockUsers = [
          {
            date: "04-23-34",
            time: "10:00 AM",
            incident: "Fire",
            victimName: "John Doe",
            age: 34,
            sex: "Male",
            address: "123 Main St",
            spot: "Transport",
            duty: "Charlie",
            remarks: "OWWA",
          },
          {
            date: "04-27-34",
            time: "02:00 PM",
            incident: "Car Crash",
            victimName: "Jane Smith",
            age: 29,
            sex: "Female",
            address: "456 Elm St",
            spot: "No Sign of Life",
            duty: "Bravo",
            remarks: "Clinic",
          },
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter users based on selected filters
    const filteredData = users.filter(
      (user) =>
        user.victimName.toLowerCase().includes(filter.toLowerCase()) &&
        (dateFilter === "" || user.date === dateFilter) &&
        (nameFilter === "" || user.victimName === nameFilter) &&
        (incidentFilter === "" || user.incident === incidentFilter)
    );
    setFilteredUsers(filteredData);
  }, [filter, dateFilter, nameFilter, incidentFilter, users]);

  const resetFilters = () => {
    // Reset all filters
    setFilter("");
    setDateFilter("");
    setNameFilter("");
    setIncidentFilter("");
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Reports</h1>
      <div className="">
        <div className="flex justify-between items-center mb-4 space-x-2">
          <div className="filter-card flex items-center border rounded-lg bg-white">
            <div className="flex items-center border-r p-2">
              <img src={filterIcon} alt="Filter Icon" className="h-6 w-6" />
            </div>
            <div className="flex items-center border-r p-2">
              <span>Filter By</span>
            </div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Date</option>
              {users.map((user, index) => (
                <option key={index} value={user.date}>
                  {user.date}
                </option>
              ))}
            </select>
            <select
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="name">Name</option>
              {users.map((user, index) => (
                <option key={index} value={user.victimName}>
                  {user.victimName}
                </option>
              ))}
            </select>
            <select
              value={incidentFilter}
              onChange={(e) => setIncidentFilter(e.target.value)}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Incident</option>
              {users.map((user, index) => (
                <option key={index} value={user.incident}>
                  {user.incident}
                </option>
              ))}
            </select>
            <button
              onClick={resetFilters}
              className="p-2 border-gray-300 rounded-none flex items-center focus:outline-none focus:ring focus:ring-blue-200"
              style={{ height: "40.5px" }}
            >
              <FontAwesomeIcon icon={faSyncAlt} className="text-red-500 mr-2" />
              <span className="text-red-500">Reset Filter</span>
            </button>
          </div>
          <div className="pb-6">
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
              <input
                type="text"
                className="ml-2 outline-none w-full pr-52"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full shadow-md">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4 text-left">Incident</th>
                <th className="py-2 px-4 text-left">Name of Victim</th>
                <th className="py-2 px-4 text-left">Age</th>
                <th className="py-2 px-4 text-left">Sex</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Spot</th>
                <th className="py-2 px-4 text-left">Duty</th>
                <th className="py-2 px-4 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b">
                  <td className="px-4 py-3 text-center">{user.date}</td>
                  <td className="px-4 py-3 text-center">{user.time}</td>
                  <td className="px-4 py-3">{user.incident}</td>
                  <td className="px-4 py-3">{user.victimName}</td>
                  <td className="px-4 py-3">{user.age}</td>
                  <td className="px-4 py-3">{user.sex}</td>
                  <td className="px-4 py-3">{user.address}</td>
                  <td className="px-4 py-3">{user.spot}</td>
                  <td className="px-4 py-3">{user.duty}</td>
                  <td className="px-4 py-3">{user.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default Report;
