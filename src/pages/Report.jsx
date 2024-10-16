/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
import filterIcon from "../assets/report/filter.svg";
import resetIcon from "../assets/report/reset.svg";
import sampleImage from "../assets/Bg.png";

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
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [barangayFilter, setBarangayFilter] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
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
        setReports(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Generate unique options for filters based on backend data
  const uniqueDates = [...new Set(reports.map(report => report.date_time.split('T')[0]))];
  const uniqueVictimNames = [...new Set(reports.map(report => report.victim_name))];
  const uniqueBarangays = [...new Set(reports.map(report => report.barangay))];

  // Filter reports based on the search criteria
  useEffect(() => {
    const filteredData = reports.filter((report) => {
      const victimName = report.victim_name || "";
      const date = report.date_time.split('T')[0] || "";
      const barangay = report.barangay || "";

      return (
        (victimName.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
          date.includes(debouncedFilter) ||
          barangay.toLowerCase().includes(debouncedFilter)) &&
        (dateFilter === "" || date === dateFilter) &&
        (nameFilter === "" || victimName === nameFilter) &&
        (barangayFilter === "" || barangay === barangayFilter)
      );
    });
    setFilteredReports(filteredData);
  }, [debouncedFilter, dateFilter, nameFilter, barangayFilter, reports]);

  const resetFilters = () => {
    setFilter("");
    setDateFilter("");
    setNameFilter("");
    setBarangayFilter("");
  };

  const handleRowClick = (report) => {
    setSelectedReport(report);
    setFormValues(report);
  };

  const handleBackToTable = () => {
    setSelectedReport(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditClick = (field) => {
    setEditMode(field);
  };

  const handleSaveClick = () => {
    setSelectedReport(formValues);
    setEditMode(null);
  };

  if (selectedReport) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-3xl text-green-700">Incident: {selectedReport.incident_type}</h1>
          <div className="flex space-x-4">
            <button className="bg-[#FF9B00] text-white py-2 px-4 rounded">Print</button>
            <button className="bg-[#007100] text-white py-2 px-4 rounded" onClick={handleBackToTable}>Done</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <img src={sampleImage} alt="Incident" className="h-64 w-full object-cover rounded-lg" />
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${selectedReport.latitude},${selectedReport.longitude}`}
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
          {["victim_name", "victim_age", "victim_sex", "incident_type", "barangay", "city", "date_time", "landmark", "spot_report", "duty", "remarks"].map((field, index) => (
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
            {uniqueDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
          <select value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">Name</option>
            {uniqueVictimNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <select value={barangayFilter} onChange={(e) => setBarangayFilter(e.target.value)} className="p-2 border-r border-gray-300 rounded-none focus:outline-none focus:ring focus:ring-blue-200">
            <option value="">Barangay</option>
            {uniqueBarangays.map((barangay, index) => (
              <option key={index} value={barangay}>{barangay}</option>
            ))}
          </select>
          <button onClick={resetFilters} className="p-2 border-gray-300 rounded-none flex items-center focus:outline-none focus:ring focus:ring-blue-200" style={{ height: "40.5px" }}>
            <img src={resetIcon} className="text-red-500 mr-2" alt="Reset Icon" />
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
              <th className="py-2 px-4 text-left">Barangay</th>
              <th className="py-2 px-4 text-left">Spot</th>
              <th className="py-2 px-4 text-left">Duty</th>
              <th className="py-2 px-4 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredReports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-100 border-b" onClick={() => handleRowClick(report)}>
                <td className="py-4 px-4">{report.date_time.split('T')[0]}</td> {/* Adjust for date */}
                <td className="py-4 px-4">{report.date_time.split('T')[1].split('.')[0]}</td> {/* Adjust for time */}
                <td className="py-4 px-4">{report.incident_type}</td>
                <td className="py-4 px-4">{report.victim_name}</td>
                <td className="py-4 px-4">{report.victim_age}</td>
                <td className="py-4 px-4">{report.victim_sex}</td>
                <td className="py-4 px-4">{report.barangay}</td>
                <td className="py-4 px-4">{report.spot_report}</td>
                <td className="py-4 px-4">{report.duty}</td>
                <td className="py-4 px-4">{report.remarks}</td>
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
