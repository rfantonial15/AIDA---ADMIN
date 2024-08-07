import React from 'react';
import deleteIcon from '../assets/modals/deleted.svg';

const DoneDeleteModal = ({ show, user, onContinue }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-4">
          <img src={deleteIcon} alt="Deleted Icon" className="h-16 w-16 mx-auto" />
        </div>
        <h2 className="font-bold text-xl mb-4 text-red-500">ACCOUNT DELETED</h2>
        {user && (
          <>
            <p className="font-bold text-lg">{`${user.firstname} ${user.lastname}`}</p>
            <p className="text-gray-700 mb-6">{user.barangay}</p>
          </>
        )}
        <button
          className="bg-green-500 text-white py-2 px-20 rounded"
          style={{ backgroundColor: '#007100' }}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DoneDeleteModal;
