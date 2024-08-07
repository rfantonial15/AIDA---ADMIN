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
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Reporter's Name</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="reporterName"
                  value={formValues.reporterName || "JC Vanny Mill Saledaien"}
                  readOnly={editMode !== "reporterName"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "reporterName" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "reporterName" ? handleSaveClick() : handleEditClick("reporterName"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Date</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="date"
                  value={formValues.date}
                  readOnly={editMode !== "date"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "date" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "date" ? handleSaveClick() : handleEditClick("date"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Time</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="time"
                  value={formValues.time}
                  readOnly={editMode !== "time"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "time" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "time" ? handleSaveClick() : handleEditClick("time"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Landmark</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="landmark"
                  value={formValues.landmark || "Zone - 2"}
                  readOnly={editMode !== "landmark"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "landmark" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "landmark" ? handleSaveClick() : handleEditClick("landmark"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Barangay</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="address"
                  value={formValues.address}
                  readOnly={editMode !== "address"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "address" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "address" ? handleSaveClick() : handleEditClick("address"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Town/City</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="townCity"
                  value={formValues.townCity || "El Salvador City"}
                  readOnly={editMode !== "townCity"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "townCity" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "townCity" ? handleSaveClick() : handleEditClick("townCity"))}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Name of Victim</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="victimName"
                  value={formValues.victimName}
                  readOnly={editMode !== "victimName"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "victimName" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "victimName" ? handleSaveClick() : handleEditClick("victimName"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Age</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="age"
                  value={formValues.age}
                  readOnly={editMode !== "age"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "age" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "age" ? handleSaveClick() : handleEditClick("age"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Sex</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="sex"
                  value={formValues.sex}
                  readOnly={editMode !== "sex"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "sex" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "sex" ? handleSaveClick() : handleEditClick("sex"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Spot Report</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="spot"
                  value={formValues.spot}
                  readOnly={editMode !== "spot"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "spot" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "spot" ? handleSaveClick() : handleEditClick("spot"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Duty</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="duty"
                  value={formValues.duty}
                  readOnly={editMode !== "duty"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "duty" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "duty" ? handleSaveClick() : handleEditClick("duty"))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold">Remarks</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="remarks"
                  value={formValues.remarks}
                  readOnly={editMode !== "remarks"}
                  onChange={handleInputChange}
                  className="border p-2 rounded flex-1"
                />
                <FontAwesomeIcon
                  icon={editMode === "remarks" ? faCheck : faEdit}
                  className="ml-2 cursor-pointer"
                  onClick={() => (editMode === "remarks" ? handleSaveClick() : handleEditClick("remarks"))}
                />
              </div>
            </div>
          </div>
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

export default Report;
