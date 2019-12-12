import * as React from 'react';

import { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';
import './Slider.scss';

import { Input } from '../Input/Input';

interface SliderProps {
  value: number[];
  min: number;
  max: number;
  onSliderChange: (value: number[]) => void;
  onLeftChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onRightChange: (e: React.ChangeEvent<HTMLElement>) => void;
}

const Slider: React.FunctionComponent<SliderProps> = ({
  min,
  max,
  value,
  onLeftChange,
  onRightChange,
  onSliderChange,
}: SliderProps) => (
  <div className="slider">
    <div className="slider__inputs">
      <Input type="number" centered value={value[0]} onChange={onLeftChange} />
      <Input type="number" centered value={value[1]} onChange={onRightChange} />
    </div>
    <div className="slider__slider">
      <Range onChange={onSliderChange} value={value} min={min} max={max} />
    </div>
  </div>
);

export default Slider;
