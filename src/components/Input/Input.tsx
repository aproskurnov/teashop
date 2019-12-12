import * as React from 'react';

import './Input.scss';

import MaskedInput, { maskArray } from 'react-text-mask';

interface InputProps {
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultValue?: number;
  value?: string | number;
  centered?: boolean;
  mask?: maskArray | ((value: string) => maskArray);
}

const Input: React.FunctionComponent<InputProps> = ({
  centered,
  mask,
  onKeyDown,
  onChange,
  onBlur,
  value,
  defaultValue,
  name,
  type,
  placeholder,
}) => {
  const renderInput = (): JSX.Element => {
    if (mask) {
      return (
        <MaskedInput
          className={`input__field${centered ? ' input__field_centered' : ''}`}
          mask={mask}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          defaultValue={defaultValue}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      );
    }
    return (
      <input
        className={`input__field${centered ? ' input__field_centered' : ''}`}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        defaultValue={defaultValue}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    );
  };

  return <div className="input">{renderInput()}</div>;
};

Input.defaultProps = {
  type: 'text',
  centered: false,
};

export default Input;
