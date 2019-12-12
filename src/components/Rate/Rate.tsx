import * as React from 'react';

import './Rate.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

interface RateProps {
  name: string;
  rating: number;
  disabled?: boolean;
}

const Rate: React.FunctionComponent<RateProps> = ({ name, rating, disabled }: RateProps) => (
  <div className="rate">
    <label
      className="rate__element"
      htmlFor={`${name}-star-1`}
    >
      <input
        className="rate__input"
        type="radio"
        value="1"
        checked={rating === 1}
        disabled={disabled}
        id={`${name}-star-1`}
      />
      <FontAwesomeIcon icon={rating >= 1 || (!rating && disabled) ? faStarSolid : faStarRegular} size="1x" />
    </label>
    <label
      className="rate__element"
      htmlFor={`${name}-star-2`}
    >
      <input
        className="rate__input"
        type="radio"
        value="2"
        checked={rating === 2}
        disabled={disabled}
        id={`${name}-star-2`}
      />
      <FontAwesomeIcon icon={rating >= 2 || (!rating && disabled) ? faStarSolid : faStarRegular} size="1x" />
    </label>
    <label className="rate__element" htmlFor={`${name}-star-3`}>
      <input
        className="rate__input"
        type="radio"
        value="3"
        checked={rating === 3}
        disabled={disabled}
        id={`${name}-star-3`}
      />
      <FontAwesomeIcon icon={rating >= 3 || (!rating && disabled) ? faStarSolid : faStarRegular} size="1x" />
    </label>
    <label className="rate__element" htmlFor={`${name}-star-4`}>
      <input
        className="rate__input"
        type="radio"
        value="4"
        checked={rating === 4}
        disabled={disabled}
        id={`${name}-star-4`}
      />
      <FontAwesomeIcon icon={rating >= 4 || (!rating && disabled) ? faStarSolid : faStarRegular} size="1x" />
    </label>
    <label className="rate__element" htmlFor={`${name}-star-5`}>
      <input
        className="rate__input"
        type="radio"
        value="5"
        checked={rating === 5}
        disabled={disabled}
        id={`${name}-star-5`}
      />
      <FontAwesomeIcon icon={rating >= 5 || (!rating && disabled) ? faStarSolid : faStarRegular} size="1x" />
    </label>
  </div>
);

Rate.defaultProps = {
  disabled: false,
};

export default Rate;
