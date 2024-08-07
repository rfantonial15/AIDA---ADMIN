import React from 'react';
import { useNavigate } from 'react-router-dom';
import sentIcon from '../assets/modals/sent.svg';

const AlertModal = ({ show }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/sendalert');
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-4">
          <img src={sentIcon} alt="Alert Sent" className="h-16 w-16 mx-auto" />
        </div>
        <h2 className="font-bold text-xl mb-4" style={{ color: '#007100' }}>ALERT SENT</h2>
        <p className="text-gray-700 mb-0">Your message has been sent to the recipients.</p>
        <p className="text-gray-700 mb-6">Thank you for making them alert.</p>
        <button className="text-white py-2 px-4 rounded" style={{ backgroundColor: '#007100' }} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
