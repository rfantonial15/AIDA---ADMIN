import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import sampleImage from "../assets/reports/accident.png";

const ReportDetails = ({ selectedUser, handleBackToTable }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(null);
  const [formValues, setFormValues] = useState(selectedUser);

  useEffect(() => {
    setFormValues(selectedUser);
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditClick = (field) => {
    setEditMode(field);
  };

  const handleSaveClick = () => {
    // Save the updated form values (replace with actual save logic)
    setEditMode(null);
  };

  return (
    <div className="p-8 font-inter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-3xl text-green-700">Incident: {formValues.incident}</h1>
        <div className="flex space-x-4">
          <button className="bg-[#FF9B00] text-white py-2 px-4 rounded">Print</button>
          <button className="bg-[#007100] text-white py-2 px-4 rounded" onClick={handleBackToTable}>
            Done
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <img src={sampleImage} alt="Incident" className="h-64 w-full object-cover rounded-lg" />
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${formValues.address}`}
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
        </div>
        <div className="flex flex-col">
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

export default ReportDetails;
