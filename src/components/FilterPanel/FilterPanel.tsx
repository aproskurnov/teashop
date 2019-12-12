import * as React from 'react';

import './FilterPanel.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Slider from '../Slider/Slider';
import { Checkbox } from '../Checkbox/Checkbox';
import { Button } from '../Button/Button';

interface FilterPanelProps {
  filterPanelShow: boolean;
  onClosePanel: (e: React.MouseEvent<HTMLElement>) => void;
  filter: FilterData;
  onSliderChange: (value: number[]) => void;
  onLeftChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onRightChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onGreenChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onRedChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onWhiteChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onPuerChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onNewProductChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onDiscountChange: (e: React.ChangeEvent<HTMLElement>) => void;
  onApplyClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const FilterPanel: React.FunctionComponent<FilterPanelProps> = ({
  filterPanelShow,
  onClosePanel,
  filter,
  onSliderChange,
  onLeftChange,
  onRightChange,
  onGreenChange,
  onRedChange,
  onWhiteChange,
  onPuerChange,
  onNewProductChange,
  onDiscountChange,
  onApplyClick,
}) => (
  <aside className="filter-panel">
    <div className={`filter-panel__layout${filterPanelShow ? ' filter-panel__layout_showed' : ''}`} />
    <div className={`filter-panel__content${filterPanelShow ? ' filter-panel__content_showed' : ''}`}>
      <Link to="/unused" onClick={onClosePanel}>
        <FontAwesomeIcon className="filter-panel__close" icon={faTimes} size="2x" />
      </Link>
      <h3>Цена</h3>
      <Slider
        onLeftChange={onLeftChange}
        onRightChange={onRightChange}
        onSliderChange={onSliderChange}
        value={filter.price}
        min={filter.min}
        max={filter.max}
      />
      <h3>Категории</h3>
      <div className="filter-panel__checkbox-group">
        <Checkbox onChangeCheckbox={onGreenChange} checked={filter.green} text="зеленый" name="green" />
        <Checkbox onChangeCheckbox={onRedChange} checked={filter.red} text="красный" name="red" />
        <Checkbox onChangeCheckbox={onWhiteChange} checked={filter.white} text="белый" name="white" />
        <Checkbox onChangeCheckbox={onPuerChange} checked={filter.puer} text="пуэр" name="puer" />
      </div>
      <h3>Дополнительно</h3>
      <div className="filter-panel__checkbox-group">
        <Checkbox
          onChangeCheckbox={onNewProductChange}
          checked={filter.new_product}
          text="новинка"
          name="new_product"
        />
        <Checkbox onChangeCheckbox={onDiscountChange} checked={filter.discount} text="скидка" name="discount" />
      </div>
      <div className="filter-panel__button">
        <Button onClick={onApplyClick} text="Применить" />
      </div>
    </div>
  </aside>
);

export default FilterPanel;
