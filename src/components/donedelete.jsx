import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../assets/navbar/deleted.svg'; // Adjust the path as needed

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
          className="bg-green-700 text-white py-2 px-20 rounded hover:bg-green-600"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

DoneDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    barangay: PropTypes.string,
  }),
  onContinue: PropTypes.func.isRequired,
};

export default DoneDeleteModal;
