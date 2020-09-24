import React from 'react';
import './InputFields.css';

const InputField = (props) => (
  <div className="input">
    <label className="input-label">{props.label}</label>
    <input
      className="input-field"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleChange}
    />
  </div>
);

export default InputField;
