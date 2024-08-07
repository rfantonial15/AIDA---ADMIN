import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import filterIcon from "../assets/reports/filter.svg";
import sampleImage from "../assets/reports/accident.png";

const Report = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [incidentFilter, setIncidentFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [formValues, setFormValues] = useState({});

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

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setFormValues(user);
  };

  const handleBackToTable = () => {
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditClick = (field) => {
    setEditMode(field);
  };

  const handleSaveClick = () => {
    // Save the updated form values (replace with actual save logic)
    setSelectedUser(formValues);
    setEditMode(null);
  };

  if (selectedUser) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-3xl text-green-700">Incident: {selectedUser.incident}</h1>
          <div className="flex space-x-4">
            <button className="bg-[#FF9B00] text-white py-2 px-4 rounded">
              Print
            </button>
            <button className="bg-[#007100] text-white py-2 px-4 rounded" onClick={handleBackToTable}>
              Done
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <img src={sampleImage} alt="Incident" className="h-64 w-full object-cover rounded-lg" />
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${selectedUser.address}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location"
            ></iframe>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 bg-white p-4 rounded-lg shadow-lg">
          <DetailField
            label="Reporter's Name"
            name="reporterName"
            value={formValues.reporterName || "JC Vanny Mill Saledaien"}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Date"
            name="date"
            value={formValues.date}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Time"
            name="time"
            value={formValues.time}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Landmark"
            name="landmark"
            value={formValues.landmark || "Zone - 2"}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Barangay"
            name="address"
            value={formValues.address}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Town/City"
            name="townCity"
            value={formValues.townCity || "El Salvador City"}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Name of Victim"
            name="victimName"
            value={formValues.victimName}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Age"
            name="age"
            value={formValues.age}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Sex"
            name="sex"
            value={formValues.sex}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Spot Report"
            name="spot"
            value={formValues.spot}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Duty"
            name="duty"
            value={formValues.duty}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
          <DetailField
            label="Remarks"
            name="remarks"
            value={formValues.remarks}
            editMode={editMode}
            onEdit={handleEditClick}
            onSave={handleSaveClick}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }

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
              {[...new Set(users.map(user => user.date))].map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <select
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="name">Name</option>
              {[...new Set(users.map(user => user.victimName))].map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={incidentFilter}
              onChange={(e) => setIncidentFilter(e.target.value)}
              className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Incident</option>
              {[...new Set(users.map(user => user.incident))].map((incident, index) => (
                <option key={index} value={incident}>
                  {incident}
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
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 w-4 h-4 mr-2" />
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
            <thead className="bg-lightgray">
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
                <tr key={index} className="hover:bg-gray-100 border-b" onClick={() => handleRowClick(user)}>
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

const DetailField = ({ label, name, value, editMode, onEdit, onSave, onChange }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <label className="font-bold">{label}</label>
      <div className="flex items-center">
        <input
          type="text"
          name={name}
          value={value}
          readOnly={editMode !== name}
          onChange={onChange}
          className={`border p-2 rounded flex-1 ${editMode !== name ? 'bg-gray-100' : ''}`}
        />
        <FontAwesomeIcon
          icon={editMode === name ? faCheck : faEdit}
          className="ml-2 cursor-pointer"
          onClick={() => (editMode === name ? onSave() : onEdit(name))}
        />
      </div>
    </div>
  );
};

export default Report;
