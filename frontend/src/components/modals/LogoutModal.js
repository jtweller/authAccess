import React from 'react';
import Modal from 'react-modal';

const LogoutModal = ({ isOpen, onRequestClose, onConfirmLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-6"
      overlayClassName="fixed inset-0 bg-black opacity-50"
      contentLabel="Logout Confirmation"
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold">Logout Confirmation</h2>
      </div>
      <div className="mb-4">
        <p>Are you sure you want to log out?</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onConfirmLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
        >
          Confirm Logout
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
