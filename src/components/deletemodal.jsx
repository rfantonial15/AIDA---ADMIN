import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../assets/usermanagement/delete.svg';

const DeleteModal = ({ show, user, onConfirmDelete, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-4">
          <img src={deleteIcon} alt="Delete Icon" className="h-16 w-16 mx-auto" />
        </div>
        <h2 className="font-bold text-xl mb-4 text-red-500">ARE YOU SURE TO DELETE?</h2>
        {user && (
          <>
            <p className="font-bold text-lg">{`${user.firstname} ${user.lastname}`}</p>
            <p className="text-gray-700 mb-6">{user.barangay}</p>
          </>
        )}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white py-2 px-10 rounded hover:bg-red-600"
            onClick={() => onConfirmDelete(user.id)}
          >
            Yes
          </button>
          <button
            className="border border-red-500 text-red-500 py-2 px-10 rounded hover:bg-red-100"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    barangay: PropTypes.string,
  }),
  onConfirmDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteModal;
