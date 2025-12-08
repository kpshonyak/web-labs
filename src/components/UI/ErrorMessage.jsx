import React from 'react';

const errorStyle = {
  color: 'red',
  fontSize: '0.85em',
  marginTop: '5px'
};

const FormError = ({ message }) => {
  if (!message) return null;
  
  return <div style={errorStyle}>{message}</div>;
};

export default FormError;