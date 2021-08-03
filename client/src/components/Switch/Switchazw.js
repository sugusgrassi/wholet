import React from 'react';
import './Switch.css';

const Switchazw = ({ azWeight, handleToggleazw }) => {
  return (
    <>
    <div className="flexContainer">
        
          <input
            checked={azWeight}
            onChange={handleToggleazw}
            className="react-switch-checkbox"
            id={`react-switch-new2`}
            type="checkbox"
          />
            <label
            // style={{ background: azWeight && '#06D6A0' }}
            className="react-switch-label"
            htmlFor={`react-switch-new2`}
            >
            <span className={`react-switch-button`} />
          </label>
    </div>
    </>
  );
};

export default Switchazw;