import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import filterIcon from "../assets/Filter.svg";
import DeleteModal from "../components/deletemodal"; // Adjust the path as needed
import DoneDeleteModal from "../components/donedelete"; // Adjust the path as needed
import '@fontsource/inter'; // Import Inter font
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [incidentFilter, setIncidentFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDoneDeleteModal, setShowDoneDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setUsers(response.data); // Set the fetched users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter users based on the search criteria
  useEffect(() => {
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
    setFilter("");
    setDateFilter("");
    setNameFilter("");
    setIncidentFilter("");
  };

  const handleDeleteUser = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
    // Ideally, you would also call an API to delete the user
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteModal(false);
    setShowDoneDeleteModal(true);
  };

  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleContinue = () => {
    setShowDoneDeleteModal(false);
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">User Management</h1>
      <div>
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
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 w-6 h-6" />
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
                      onClick={() => handleShowDeleteModal(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        user={selectedUser}
        onConfirmDelete={handleDeleteUser}
        onCancel={handleCancelDelete}
      />
      <DoneDeleteModal
        show={showDoneDeleteModal}
        user={selectedUser}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default UserManagement;
