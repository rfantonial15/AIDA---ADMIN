import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import filterIcon from "../assets/Filter.svg";
import sampleImage from "../assets/Bg.png"; // Adjust the path as needed
import '@fontsource/inter'; // Import Inter font

// Custom hook for debouncing input
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

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

  const debouncedFilter = useDebounce(filter, 300); // 300 ms delay for search input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/reports/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = users.filter((user) => {
      const victimName = user.victimName || "";
      const date = user.date || "";
      const incident = user.incident || "";

      return (
        victimName.toLowerCase().includes(debouncedFilter.toLowerCase()) &&
        (dateFilter === "" || date === dateFilter) &&
        (nameFilter === "" || victimName === nameFilter) &&
        (incidentFilter === "" || incident === incidentFilter)
      );
    });
    setFilteredUsers(filteredData);
  }, [debouncedFilter, dateFilter, nameFilter, incidentFilter, users]);

  const resetFilters = () => {
    setFilter("");
    setDateFilter("");
    setNameFilter("");
    setIncidentFilter("");
  };

  const handleRowClick = (user) => {
    console.log("Selected user:", user); // Debugging
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
    console.log("Saving values:", formValues); // Debugging
    setSelectedUser(formValues);
    setEditMode(null);
  };

  if (selectedUser) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-3xl text-green-700">Incident: {selectedUser.incident}</h1>
          <div className="flex space-x-4">
            <button className="bg-[#FF9B00] text-white py-2 px-4 rounded">Print</button>
            <button className="bg-[#007100] text-white py-2 px-4 rounded" onClick={handleBackToTable}>Done</button>
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
        {["reporterName", "date", "time", "landmark", "address", "townCity", "victimName", "age", "sex", "spot", "duty", "remarks"].map((field, index) => (
  <DetailField
    key={index}
    label={capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))}
    name={field}
    value={formValues[field] || ""} // Ensure formValues contains the field
    editMode={editMode}
    onEdit={handleEditClick}
    onSave={handleSaveClick}
    onChange={handleInputChange}
  />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-8">Reports</h1>
      <div className="flex justify-between items-center mb-4 space-x-2">
        <div className="filter-card flex items-center border rounded-lg bg-white">
          <div className="flex items-center border-r p-2">
            <img src={filterIcon} alt="Filter Icon" className="h-6 w-6" />
          </div>
          <div className="flex items-center border-r p-2">
            <span>Filter By</span>
          </div>
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">Date</option>
            {[...new Set(users.map(user => user.date))].map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
          <select value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">Name</option>
            {[...new Set(users.map(user => user.victimName))].map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <select value={incidentFilter} onChange={(e) => setIncidentFilter(e.target.value)} className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">Incident</option>
            {[...new Set(users.map(user => user.incident))].map((incident, index) => (
              <option key={index} value={incident}>{incident}</option>
            ))}
          </select>
          <button onClick={resetFilters} className="p-2 border-gray-300 rounded-none flex items-center focus:outline-none focus:ring focus:ring-blue-200" style={{ height: "40.5px" }}>
            <FontAwesomeIcon icon={faSyncAlt} className="text-red-500 mr-2" />
            <span className="text-red-500">Reset Filter</span>
          </button>
        </div>
        <div className="pb-6">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 w-6 h-6" />
            <input type="text" className="ml-2 outline-none w-full pr-52" placeholder="Search" value={filter} onChange={(e) => setFilter(e.target.value)} />
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
      <td className="py-2 px-4">{user.date_time.split('T')[0]}</td> {/* Adjust for date */}
      <td className="py-2 px-4">{user.date_time.split('T')[1].split('.')[0]}</td> {/* Adjust for time */}
      <td className="py-2 px-4">{user.incident_type}</td>
      <td className="py-2 px-4">{user.victim_name}</td>
      <td className="py-2 px-4">{user.victim_age}</td>
      <td className="py-2 px-4">{user.victim_sex}</td>
      <td className="py-2 px-4">{user.barangay}</td>
      <td className="py-2 px-4">{user.spot_report}</td>
      <td className="py-2 px-4">{user.duty}</td>
      <td className="py-2 px-4">{user.remarks}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

const DetailField = ({ label, name, value, editMode, onEdit, onSave, onChange }) => (
  <div className="flex flex-col mb-2">
    <label className="font-medium">{label}</label>
    <div className="flex items-center">
      {editMode === name ? (
        <>
          <input type="text" name={name} value={value} onChange={onChange} className="border p-2 rounded mr-2" />
          <button onClick={onSave} className="bg-green-500 text-white py-2 px-4 rounded">Save</button>
        </>
      ) : (
        <>
          <span className="flex-grow">{value}</span>
          <button onClick={() => onEdit(name)} className="text-blue-500"><FontAwesomeIcon icon={faEdit} /></button>
        </>
      )}
    </div>
  </div>
);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Report;
