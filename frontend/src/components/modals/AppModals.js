import React from 'react';
import Modal from 'react-modal';

// Set the root element for accessibility
Modal.setAppElement('#root');

// LogoutModal component for confirming user logout
const LogoutModal = ({ isOpen, onRequestClose, onConfirmLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-6"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      contentLabel="Logout Confirmation"
    >
      <div>
        <h2 className="text-xl font-bold mb-4">Logout Confirmation</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
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
      </div>
    </Modal>
  );
};

// ProfileUpdateModal component for confirming profile update
const ProfileUpdateModal = ({ isOpen, onRequestClose, onConfirmUpdate }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-6"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      contentLabel="Profile Update Confirmation"
    >
      <div>
        <h2 className="text-xl font-bold mb-4">Profile Update Confirmation</h2>
        <p className="mb-4">Are you sure you want to save these changes?</p>
        <div className="flex justify-between">
          <button
            onClick={onConfirmUpdate}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onRequestClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { LogoutModal, ProfileUpdateModal };




