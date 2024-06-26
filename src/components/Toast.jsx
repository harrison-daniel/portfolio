import React from 'react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${type === 'success' ? 'bg-emerald-800' : 'bg-red-500'} text-white`}>
      <p>{message}</p>
      <button onClick={onClose} className='mt-2 underline'>
        Close
      </button>
    </div>
  );
};

export default Toast;
