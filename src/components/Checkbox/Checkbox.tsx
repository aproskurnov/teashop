import React, { useState } from 'react';

import './Checkbox.scss';

interface CheckboxProps {
  text: string;
  name: string;
  checked?: boolean;
  onChangeCheckbox?: (e: React.ChangeEvent) => void;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({ onChangeCheckbox, checked, name, text }) => {
  const [toggle, setToggle] = useState(checked);
  const onChange = (e: React.ChangeEvent): void => {
    setToggle(!toggle);
    if (onChangeCheckbox) {
      onChangeCheckbox(e);
    }
  };

  return (
    <div className="checkbox">
      <label htmlFor={name} className="checkbox__content">
        <input id={name} className="checkbox__input" onChange={onChange} type="checkbox" name={name} checked={toggle} />
        <div className="checkbox__element" />
        <div className="checkbox__label">{text}</div>
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
