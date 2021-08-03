import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
    <div className="flexContainer">
        
          <input
            checked={isOn}
            onChange={handleToggle}
            className="react-switch-checkbox"
            id={`react-switch-new1`}
            type="checkbox"
          />
            <label
            // style={{ background: isOn && '#06D6A0' }}
            className="react-switch-label"
            htmlFor={`react-switch-new1`}
            >
            <span className={`react-switch-button`} />
          </label>
    </div>
    </>
  );
};

export default Switch;