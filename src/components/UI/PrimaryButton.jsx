import React from 'react';

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const PrimaryButton = ({ children, onClick, style = {}, type = 'button' }) => {
  return (
    <button type={type} style={{ ...buttonStyle, ...style }} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;