import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import filterIcon from "../assets/filter.svg";

const UserManagement = () => {
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
            id: "001",
            firstname: "Watashi",
            lastname: "Tashi",
            email: "Watashitashi@gmail.com",
            phone: 9058329729,
            barangay: "Poblacion",
            date: "06-18-24",
            incident: "Car Crash",
            manage: "Delete",
          },
          {
            id: "002",
            firstname: "King",
            lastname: "Kong",
            email: "Kingkong@gmail.com",
            phone: 9058329729,
            barangay: "Taytay",
            date: "06-19-24",
            incident: "Crime",
            manage: "Delete",
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
        user.firstname.toLowerCase().includes(filter.toLowerCase()) &&
        (dateFilter === "" || user.date === dateFilter) &&
        (nameFilter === "" ||
          user.firstname.toLowerCase().includes(nameFilter.toLowerCase()) ||
          user.lastname.toLowerCase().includes(nameFilter.toLowerCase())) &&
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

  const handleDeleteUser = (userId) => {
    // Implement delete functionality here (e.g., API call to delete user)
    console.log(`Deleting user with ID: ${userId}`);
    // Update state or perform any necessary actions
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">
        User Management
      </h1>
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
              <option value="">Name</option>
              {users.map((user, index) => (
                <option key={index} value={user.firstname}>
                  {user.firstname}
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
                <th className="py-2 px-4 rounded-tr-lg">ID</th>
                <th className="py-2 px-4 text-left">First Name</th>
                <th className="py-2 px-4 text-left">Last Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Barangay</th>
                <th className="py-2 px-4 rounded-tr-lg">Manage</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b">
                  <td className="px-4 py-2 text-center">{user.id}</td>
                  <td className="px-4 py-2 text-left">{user.firstname}</td>
                  <td className="px-4 py-2 text-left">{user.lastname}</td>
                  <td className="px-4 py-2 text-left">{user.email}</td>
                  <td className="px-4 py-2 text-left">{user.phone}</td>
                  <td className="px-4 py-2 text-left">{user.barangay}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Freeze
                    </button>
                  </td>
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

export default UserManagement;
