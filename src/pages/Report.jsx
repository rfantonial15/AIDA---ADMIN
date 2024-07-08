import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import reloadIcon from '../assets/reset.png'; // Adjust the path as needed

const Report = () => {
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
            date: '04-23-34',
            time: '10:00 AM',
            incident: 'Fire',
            victimName: 'John Doe',
            age: 34,
            sex: 'Male',
            address: '123 Main St',
            spot: 'Transport',
            duty: 'Charlie',
            remarks: 'OWWA'
          },
          {
            date: '04-27-34',
            time: '02:00 PM',
            incident: 'Car Crash',
            victimName: 'Jane Smith',
            age: 29,
            sex: 'Female',
            address: '456 Elm St',
            spot: 'No Sign of Life',
            duty: 'Bravo',
            remarks: 'Clinic'
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
      user.victimName.toLowerCase().includes(filter.toLowerCase()) &&
      (dateFilter === '' || user.date === dateFilter) &&
      (nameFilter === '' || user.victimName === nameFilter) &&
      (incidentFilter === '' || user.incident === incidentFilter)
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

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Reports</h1>
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div className="filter-card">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Date</option>
              {users.map((user, index) => (
                <option key={index} value={user.date}>{user.date}</option>
              ))}
            </select>
            <select
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="sex">Sex</option>
              <option value="address">Address</option>
              <option value="duty">Duty</option>
            </select>

            <select
              value={incidentFilter}
              onChange={(e) => setIncidentFilter(e.target.value)}
              className="p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Incident</option>
              {users.map((user, index) => (
                <option key={index} value={user.incident}>{user.incident}</option>
              ))}
            </select>
            <button
              onClick={resetFilters}
              className="p-2 border border-gray-300 flex items-center text-red-500"
            >
              <img src={reloadIcon} alt="Reload" className=" mr-2" />
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
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Incident</th>
              <th className="py-2 px-4">Name of Victim</th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Sex</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Spot</th>
              <th className="py-2 px-4">Duty</th>
              <th className="py-2 px-4">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{user.date}</td>
                <td className="px-4 py-2">{user.time}</td>
                <td className="px-4 py-2">{user.incident}</td>
                <td className="px-4 py-2">{user.victimName}</td>
                <td className="px-4 py-2">{user.age}</td>
                <td className="px-4 py-2">{user.sex}</td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">{user.spot}</td>
                <td className="px-4 py-2">{user.duty}</td>
                <td className="px-4 py-2">{user.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
