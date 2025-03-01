import React from 'react';

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      sx={{
        border: '1px solid gold',
        borderRadius: 5,
        padding: '10px 20px',
        fontFamily: 'Montserrat',
        cursor: 'pointer',
        backgroundColor: selected ? 'gold' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 700 : 500,
        '&:hover': {
          backgroundColor: 'gold',
          color: 'black',
        },
        width: '22%',
        // margin: 5, // Uncomment if margin is needed
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
