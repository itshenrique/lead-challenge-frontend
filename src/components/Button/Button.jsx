import React from 'react';
import styles from './Button.module.css';

const InputField = (props) => {
  let buttonStyle = 'button';

  switch (true) {
    case props.disabled:
      buttonStyle = buttonStyle.concat('-disabled');
      break;
    case props.secundary:
      buttonStyle = buttonStyle.concat('-blue');
      break;
    case props.tertiary:
      buttonStyle = buttonStyle.concat('-yellow');
      break;
    default:
      buttonStyle = buttonStyle.concat('-white');
  }

  return (
    <input
      className={styles[buttonStyle]}
      type={props.type || 'button'}
      onClick={props.onClick}
      value={props.value}
      disabled={props.disabled}
    />
  );
};

export default InputField;
