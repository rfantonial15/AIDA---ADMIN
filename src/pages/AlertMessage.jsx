import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faExpandArrowsAlt, faTimes, faPaperclip, faLink, faImage, faTrashAlt, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

const AlertMessage = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachedLinks, setAttachedLinks] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
    };
    document.body.appendChild(script);

    // Event listener to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    });
  };

  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignoutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const createPicker = () => {
    if (window.gapi && window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const google = window.google;
      const oauthToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      const view = new google.picker.DocsView(google.picker.ViewId.DOCS);
      const picker = new google.picker.PickerBuilder()
        .setOAuthToken(oauthToken)
        .addView(view)
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    } else {
      handleAuthClick();
    }
  };

  const pickerCallback = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const file = data.docs[0];
      const fileId = file.id;
      const fileName = file.name;
      const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
      setAttachedFiles([...attachedFiles, { name: fileName, url: fileUrl }]);
    }
  };

  const recipients = [
    'All', 'Amoros', 'Bolisong', 'Cogon', 'Himaya', 'Hinigdaan', 'Kalabaylabay', 
    'Molugan', 'Pedro Sa Baculio', 'Poblacion', 'Quibonbon', 'Sambulawan', 
    'San Francisco de Asis', 'Sinaloc', 'Taytay', 'Ulaliman'
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRecipientSelect = (recipient) => {
    setSelectedRecipients((prev) => {
      if (recipient === 'All') {
        return prev.includes('All') ? [] : ['All'];
      } else {
        if (prev.includes('All')) {
          return [recipient];
        } else if (prev.includes(recipient)) {
          return prev.filter((r) => r !== recipient);
        } else {
          return [...prev, recipient];
        }
      }
    });
  };

  const handleRemoveRecipient = (recipient) => {
    setSelectedRecipients((prev) => prev.filter((r) => r !== recipient));
  };

  const handleAlertMessageChange = (e) => {
    setAlertMessage(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileAttach = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFiles([...attachedFiles, file]);
    }
  };

  const handleLinkAttach = () => {
    const link = prompt("Enter the link URL:");
    if (link) {
      setAttachedLinks([...attachedLinks, link]);
    }
  };

  const handleSendAlert = () => {
    // Add logic to send the alert
    console.log(`Alert sent to ${selectedRecipients.join(', ')}: ${alertMessage}`);
    setAlertMessage('');
    setUploadedImage(null);
    setAttachedFiles([]);
    setAttachedLinks([]);
    setShowWarning(false);
  };

  const handleClose = () => {
    navigate('/sendalert');
  };

  const handleMinimize = () => {
    // Implement minimize functionality
    console.log("Minimize clicked");
  };

  const handleExpand = () => {
    // Implement expand functionality
    console.log("Expand clicked");
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-4">Send Alerts</h1>
      <div className="bg-white shadow-md rounded-lg max-w-6xl mx-auto">
        <div className="bg-green-700 flex justify-between items-center p-4 rounded-t-lg">
          <h2 className="font-bold text-white">New Message</h2>
          <div className="flex space-x-2 text-white">
            <FontAwesomeIcon icon={faMinus} className="cursor-pointer" onClick={handleMinimize} />
            <FontAwesomeIcon icon={faExpandArrowsAlt} className="cursor-pointer" onClick={handleExpand} />
            <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={handleClose} />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button 
                className="flex justify-start items-center w-full h-9 px-6 bg-green-200 text-gray-700 rounded" 
                onClick={toggleDropdown}
                style={{
                  width: '248px',
                  height: '37px',
                  padding: '9px 23px',
                  borderRadius: '5px',
                  background: '#D9EAD9'
                }}
              >
                {selectedRecipients.length > 0 ? 'Selected Recipients' : 'Recipients'}
              </button>
              {dropdownOpen && (
                <div 
                  className="absolute mt-2 w-62 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 overflow-y-auto"
                  style={{
                    width: '248px',
                    height: '200px',
                    borderRadius: '5px',
                    background: '#F3F7FF',
                  }}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {recipients.map((recipient) => (
                      <a
                        key={recipient}
                        href="#"
                        onClick={() => handleRecipientSelect(recipient)}
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${selectedRecipients.includes(recipient) ? 'bg-gray-200' : ''}`}
                        role="menuitem"
                      >
                        {recipient}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {selectedRecipients.length > 0 && (
              <div className="ml-4 flex flex-wrap">
                {selectedRecipients.map((recipient) => (
                  <div 
                    key={recipient} 
                    className="px-4 py-2 m-1 bg-gray-200 text-gray-700 rounded cursor-pointer" 
                    onClick={() => handleRemoveRecipient(recipient)}
                  >
                    {recipient}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 mb-4"></div>
          <h3 className="font-bold text-lg text-gray-700 mb-2">DAILY WEATHER FORECAST</h3>
          <div className="flex flex-col lg:flex-row border-b border-gray-200 pb-4 mb-4">
            <div className="flex-1 pr-4">
              <textarea
                className="w-full p-4 border rounded mb-4"
                rows="10"
                value={alertMessage}
                onChange={handleAlertMessageChange}
                placeholder="Enter your alert message here..."
              />
              {attachedFiles.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2">Attached Files:</h4>
                  <ul className="list-disc list-inside">
                    {attachedFiles.map((file, index) => (
                      <li key={index} className="text-gray-700"><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></li>
                    ))}
                  </ul>
                </div>
              )}
              {attachedLinks.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2">Attached Links:</h4>
                  <ul className="list-disc list-inside">
                    {attachedLinks.map((link, index) => (
                      <li key={index} className="text-gray-700"><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                    ))}
                  </ul>
                </div>
              )}
              {showWarning && (
                <div className="mb-4">
                  <h4 className="font-bold text-red-600">Warning!</h4>
                  <p className="text-red-600">This is a critical alert message.</p>
                </div>
              )}
            </div>
            {uploadedImage && (
              <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
                <img src={uploadedImage} alt="Uploaded" className="rounded mx-auto lg:mx-0" />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-green-700 text-white py-2 px-4 rounded"
              onClick={handleSendAlert}
            >
              Send
            </button>
            <div className="flex items-center space-x-4">
              <button className="border p-2 rounded" onClick={() => document.getElementById('fileInput').click()}>
                <FontAwesomeIcon icon={faPaperclip} />
                <input type="file" id="fileInput" className="hidden" onChange={handleFileAttach} />
              </button>
              <button className="border p-2 rounded" onClick={handleLinkAttach}>
                <FontAwesomeIcon icon={faLink} />
              </button>
              <button className="border p-2 rounded" onClick={createPicker}>
                <FontAwesomeIcon icon={faCloudUploadAlt} />
              </button>
              <button className="border p-2 rounded" onClick={() => document.getElementById('imageInput').click()}>
                <FontAwesomeIcon icon={faImage} />
                <input type="file" id="imageInput" className="hidden" onChange={handleImageUpload} />
              </button>
              <button className="border p-2 rounded" onClick={() => {
                setAlertMessage('');
                setUploadedImage(null);
                setAttachedFiles([]);
                setAttachedLinks([]);
                setShowWarning(false);
              }}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;
