import * as React from 'react';

import './Button.scss';

interface ButtonProps {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  wide?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({ text, onClick, disabled, wide }) => {
  return (
    <button type="submit" disabled={disabled} onClick={onClick} className={`button${wide ? ' button_wide' : ''}`}>
      {text}
    </button>
  );
};

export default Button;
