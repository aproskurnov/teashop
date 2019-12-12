import React, { useState } from 'react';

import './FavoriteButton.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

interface FavoriteButtonProps {
  toggle?: boolean;
  onClick?: (id: number) => void;
  id: number;
}
interface FavoriteButtonStates {
  isToggleOn: boolean;
}

const FavoriteButton: React.FunctionComponent<FavoriteButtonProps> = ({ toggle, id, onClick }) => {
  const [isToggleOn, setToggle] = useState(toggle);

  const handleClick = (): void => {
    const url = new URL(`http://api.${window.location.host}/tea/${id}/favorite/${+!isToggleOn}`);
    fetch(url.toString(), { mode: 'cors' })
      .then(response => response.json())
      .then(() => {
        onClick(id);
        setToggle(!toggle);
        return null;
      })
      .catch(e => {
        throw new Error(e);
      });
  };

  return (
    <button type="submit" className="favorite-button" onClick={handleClick}>
      <FontAwesomeIcon icon={isToggleOn ? faHeartSolid : faHeartRegular} size="2x" />
    </button>
  );
};

FavoriteButton.defaultProps = {
  toggle: false,
};

export default FavoriteButton;
