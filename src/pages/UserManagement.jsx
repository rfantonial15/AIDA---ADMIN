import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import reloadIcon from '../assets/reload.svg'; // Adjust the path as needed

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [incidentFilter, setIncidentFilter] = useState('');

  useEffect(() => {
    // Simulating fetching data (replace with actual API call)
    const fetchData = async () => {
      try {
        // Mock data until API integration
        const mockUsers = [
          {
            id: '001',
            firstname: 'Watashi',
            lastname: 'Tashi',
            email: 'Watashitashi@gmail.com',
            phone: 9058329729,
            barangay: 'Poblacion',
            manage: 'Delete',
          },
          {
            id: '002',
            firstname: 'King',
            lastname: 'Kong',
            email: 'Kingkong@gmail.com',
            phone: 9058329729,
            barangay: 'Taytay',
            manage: 'Delete',
          },
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter users based on selected filters
    const filteredData = users.filter(user =>
      user.firstname.toLowerCase().includes(filter.toLowerCase()) &&
      (dateFilter === '' || user.date === dateFilter) &&
      (nameFilter === '' || user.firstname === nameFilter) &&
      (incidentFilter === '' || user.barangay === incidentFilter)
    );
    setFilteredUsers(filteredData);
  }, [filter, dateFilter, nameFilter, incidentFilter, users]);

  const resetFilters = () => {
    // Reset all filters
    setFilter('');
    setDateFilter('');
    setNameFilter('');
    setIncidentFilter('');
  };

  const handleDeleteUser = (userId) => {
    // Implement delete functionality here (e.g., API call to delete user)
    console.log(`Deleting user with ID: ${userId}`);
    // Update state or perform any necessary actions
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">User Management</h1>
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div className="filter-card">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Date</option>
              {users.map((user, index) => (
                <option key={index} value={user.date}>{user.date}</option>
              ))}
            </select>
            <select
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Name</option>
              <option value="firstname">First Name</option>
              <option value="lastname">Last Name</option>
            </select>

            <select
              value={incidentFilter}
              onChange={(e) => setIncidentFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Barangay</option>
              {users.map((user, index) => (
                <option key={index} value={user.barangay}>{user.barangay}</option>
              ))}
            </select>
            <button
              onClick={resetFilters}
              className="p-2 border border-gray-300 rounded flex items-center text-red-500"
            >
              <img src={reloadIcon} alt="Reload" className="h-4 w-4 mr-2" />
              Reset Filter
            </button>
          </div>
          <div className="search-bar-container">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </div>
        </div>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Barangay</th>
              <th className="py-2 px-4">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.firstname}</td>
                <td className="px-4 py-2">{user.lastname}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.barangay}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteUser(user.id)}
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
  );
};

export default UserManagement;
