import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faExpandArrowsAlt, faTimes, faPaperclip, faLink, faExclamationTriangle, faImage, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import alertImage from '../assets/alertmessage.png'; // Adjust the path as needed

const AlertMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('Recipients');
  const recipients = [
    'All', 'Amoros', 'Bolisong', 'Cogon', 'Himaya', 'Hinigdaan', 'Kalabaylabay', 
    'Molugan', 'Pedro Sa Baculio', 'Poblacion', 'Quibonbon', 'Sambulawan', 
    'San Francisco de Asis', 'Sinaloc', 'Taytay', 'Ulaliman'
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRecipientSelect = (recipient) => {
    setSelectedRecipient(recipient);
    setDropdownOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl text-green-700 mb-4">Send Alerts</h1>
      <div className="bg-white shadow-md rounded-lg max-w-6xl mx-auto">
        <div className="bg-green-700 flex justify-between items-center p-4 rounded-t-lg">
          <h2 className="font-bold text-white">New Message</h2>
          <div className="flex space-x-2 text-white">
            <FontAwesomeIcon icon={faMinus} className="cursor-pointer" />
            <FontAwesomeIcon icon={faExpandArrowsAlt} className="cursor-pointer" />
            <FontAwesomeIcon icon={faTimes} className="cursor-pointer" />
          </div>
        </div>
        <div className="p-6">
          <div className="relative inline-block text-left mb-4">
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
              {selectedRecipient}
            </button>
            {dropdownOpen && (
              <div 
                className="absolute mt-2 w-62 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                style={{
                  width: '248px',
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
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {recipient}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 mb-4"></div>
          <h3 className="font-bold text-lg text-gray-700 mb-2">DAILY WEATHER FORECAST</h3>
          <div className="flex flex-col lg:flex-row border-b border-gray-200 pb-4 mb-4">
            <div className="flex-1 pr-4">
              <p className="text-gray-700 mb-4">
                MINDANAO WEATHER FORECAST #MIN_PRSD
                <br />
                ISSUED AT: 5:00 AM 15 June 2024
                <br />
                VALID UNTIL: 5:00 AM Tomorrow
                <br />
                <br />
                SYNOPSIS: Southwest Monsoon affecting western section of Mindanao.
                <br />
                <br />
                Ang Zamboanga Peninsula, Basilan, Sulu, ug ang Tawi-Tawi makasinati sa mapanganuron nga kalangitan inubanan sa katag katag nga pag ulan, kilat ug pagpanganlugdog tungod sa Southwest Monsoon. Possible ang flash floods o landslides tungod sa kasarangang pag-ulan. 
                <br />
                <br />
                Ang ubang dapit sa Mindanao makasinati sa panalagsang pagdag-um ngadto sa mapanganuron nga kalangitan inubanan sa patak patak nga pag-ulan, kilat ug pagpanganlugdog tungod sa Localized Thunderstorms. Hinay ngadto sa kasarangang nga hangin ang maga gikan sa habagatang kasadpan ngadto sa habagatang direksyon ug ang kadagatan hapsay ngadto na sa kasarangang pagbalud.
                <br />
                <br />
                OVER LAGUINDINGAN UPPER AIR AND SYNOPTIC STATION, MISAMIS ORIENTAL
                <br />
                Maximum Temperature: 2:00 PM Yesterday --- 31.8 °C
                <br />
                Minimum Temperature: 2:00 AM Today --- 26.4 °C
                <br />
                Maximum Relative Humidity: 8:00 PM Yesterday --- 89 %
                <br />
                Minimum Relative Humidity: 2:00 PM Yesterday --- 62 %
              </p>
            </div>
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
              <img src={alertImage} alt="Weather Forecast" className="rounded mx-auto lg:mx-0" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="bg-green-700 text-white py-2 px-4 rounded">Send</button>
            <div className="flex items-center space-x-4">
              <button className="border p-2 rounded">
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <button className="border p-2 rounded">
                <FontAwesomeIcon icon={faLink} />
              </button>
              <button className="border p-2 rounded">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </button>
              <button className="border p-2 rounded">
                <FontAwesomeIcon icon={faImage} />
              </button>
              <button className="border p-2 rounded">
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
