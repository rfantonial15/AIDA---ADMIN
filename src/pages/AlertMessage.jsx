/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faExpandArrowsAlt, faTimes, faPaperclip, faLink, faImage, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../components/alertmodal'; // Adjust the path as needed

const AlertMessage = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [selectedRecipients, setSelectedRecipients] = useState([]); // State to store selected barangays
  const [subject, setSubject] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachedLinks, setAttachedLinks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // List of available recipients (barangays)
  const recipients = [
    'All', 'Amoros', 'Bolisong', 'Cogon', 'Himaya', 'Hinigdaan', 'Kalabaylabay', 
    'Molugan', 'Pedro Sa Baculio', 'Poblacion', 'Quibonbon', 'Sambulawan', 
    'San Francisco de Asis', 'Sinaloc', 'Taytay', 'Ulaliman'
  ];

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle the selection of recipients
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleRecipientSelect = (recipient) => {
    if (recipient === 'All') {
      setSelectedRecipients(['All']);
    } else {
      setSelectedRecipients(prev => {
        if (prev.includes('All')) {
          return [recipient];
        }
        return prev.includes(recipient)
          ? prev.filter(r => r !== recipient)
          : [...prev, recipient];
      });
    }
  };

  const handleRecipientRemove = (recipient) => {
    setSelectedRecipients(prev => prev.filter(r => r !== recipient));
  };

  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleAlertMessageChange = (e) => setAlertMessage(e.target.value);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileAttach = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFiles([...attachedFiles, { name: file.name, url: URL.createObjectURL(file) }]);
    }
  };

  const handleLinkAttach = () => {
    const link = prompt("Enter the link URL:");
    if (link) {
      setAttachedLinks([...attachedLinks, link]);
    }
  };

  const handleSendAlert = async () => {
    if (!subject || !alertMessage || selectedRecipients.length === 0) {
      alert("Subject, message, and recipients are required.");
      return;
    }

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', alertMessage);
    formData.append('recipients', JSON.stringify(selectedRecipients)); // Send recipients

    if (uploadedImage) {
      const imageBlob = await fetch(uploadedImage).then(res => res.blob());
      formData.append('image', imageBlob, 'image.jpg');
    }

    attachedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    formData.append('links', JSON.stringify(attachedLinks));

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:8000/api/alerts/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text(); // Add this to get more error details from the response
        throw new Error(`Failed to send alert: ${errorText}`);
      }

      setSubject('');
      setAlertMessage('');
      setUploadedImage(null);
      setAttachedFiles([]);
      setAttachedLinks([]);
      setSelectedRecipients([]); // Clear selected recipients
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error sending alert:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/sendalert');
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-4">Send Alerts</h1>
      <div className="bg-white shadow-md rounded-lg mx-auto">
        <div className="bg-green-700 flex justify-between items-center p-4 rounded-t-lg">
          <h2 className="font-bold text-white">{subject || 'New Message'}</h2>
          <div className="flex space-x-2 text-white">
            <FontAwesomeIcon icon={faMinus} className="cursor-pointer" />
            <FontAwesomeIcon icon={faExpandArrowsAlt} className="cursor-pointer" />
            <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={handleCloseModal} />
          </div>
        </div>
        <div className="p-6">
          {/* Display Selected Recipients */}
          {selectedRecipients.length > 0 && (
            <div className="flex flex-wrap mb-4">
              {selectedRecipients.map((recipient) => (
                <div key={recipient} className="bg-green-200 text-gray-700 rounded px-4 py-2 mr-2 mb-2 flex items-center">
                  {recipient}
                  <FontAwesomeIcon 
                    icon={faTimes} 
                    className="ml-2 cursor-pointer text-gray-600" 
                    onClick={() => handleRecipientRemove(recipient)} 
                  />
                </div>
              ))}
            </div>
          )}

          {/* Recipients Dropdown */}
          <div className="relative inline-block text-left mb-4" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="px-4 py-2 bg-green-200 text-gray-700 rounded">
              {selectedRecipients.length > 0 ? 'Select More Recipients' : 'Recipients'}
            </button>
            {dropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10"
              >
                {recipients.map((recipient) => (
                  <div
                    key={recipient}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer ${selectedRecipients.includes(recipient) ? 'bg-gray-200' : ''}`}
                    onClick={() => handleRecipientSelect(recipient)}
                  >
                    {recipient}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            className="w-full p-4 mb-4 border rounded"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="Enter the subject"
          />
          <textarea
            className="w-full p-4 border rounded mb-4"
            rows="10"
            value={alertMessage}
            onChange={handleAlertMessageChange}
            placeholder="Enter your alert message here..."
          />
          <FileList title="Attached Files" files={attachedFiles} />
          <FileList title="Attached Links" files={attachedLinks} />
          {uploadedImage && (
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
              <img src={uploadedImage} alt="Uploaded" className="rounded mx-auto lg:mx-0" />
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-green-700 text-white py-2 px-4 rounded"
              onClick={handleSendAlert}
            >
              Send
            </button>
            <div className="flex items-center space-x-4">
              <FileInput handleChange={handleFileAttach} icon={faPaperclip} />
              <button className="border p-2 rounded" onClick={handleLinkAttach}>
                <FontAwesomeIcon icon={faLink} />
              </button>
              <FileInput handleChange={handleImageUpload} icon={faImage} />
              <button className="border p-2 rounded" onClick={() => setAlertMessage('')}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AlertModal show={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};

const FileList = ({ title, files }) => (
  files.length > 0 && (
    <div className="mb-4">
      <h4 className="font-bold text-gray-700 mb-2">{title}:</h4>
      <ul className="list-disc list-inside">
        {files.map((file, index) => (
          <li key={index} className="text-gray-700">
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name || file}</a>
          </li>
        ))}
      </ul>
    </div>
  )
);

const FileInput = ({ handleChange, icon }) => (
  <button className="border p-2 rounded" onClick={() => document.getElementById('fileInput').click()}>
    <FontAwesomeIcon icon={icon} />
    <input type="file" id="fileInput" className="hidden" onChange={handleChange} />
  </button>
);

export default AlertMessage;
