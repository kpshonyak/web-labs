import React from 'react';

const selectStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  minWidth: '150px',
};

const Select = ({ options, value, onChange, label }) => {
  return (
    <select style={selectStyle} value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select; 