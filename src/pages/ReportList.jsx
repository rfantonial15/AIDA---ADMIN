/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import filterIcon from "../assets/Filter.svg";
import '@fontsource/inter'; // Import Inter font

const ReportList = ({
  users,
  filter,
  dateFilter,
  nameFilter,
  incidentFilter,
  onFilterChange,
  onDateFilterChange,
  onNameFilterChange,
  onIncidentFilterChange,
  onResetFilters,
  onRowClick,
}) => {
  // Get unique values for filters
  const uniqueDates = [...new Set(users.map(user => user.date))];
  const uniqueNames = [...new Set(users.map(user => user.victimName))];
  const uniqueIncidents = [...new Set(users.map(user => user.incident))];

  return (
    <>
      <h1 className="font-bold text-3xl text-green-700 mb-8">Reports</h1>
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
              onChange={onDateFilterChange}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Date</option>
              {uniqueDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <select
              value={nameFilter}
              onChange={onNameFilterChange}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Name</option>
              {uniqueNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={incidentFilter}
              onChange={onIncidentFilterChange}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Incident</option>
              {uniqueIncidents.map((incident, index) => (
                <option key={index} value={incident}>
                  {incident}
                </option>
              ))}
            </select>
            <button
              onClick={onResetFilters}
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
                onChange={onFilterChange}
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
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b" onClick={() => onRowClick(user)}>
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
    </>
  );
};

export default ReportList;
