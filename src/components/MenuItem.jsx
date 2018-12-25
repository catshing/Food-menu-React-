import React from 'react';
import PropTypes from 'prop-types';

import './MenuItem.scss';

const MenuItem = ({ id, name, price, onSelect, selected }) => (
  <div className='menu-item__root'>
    <input
      id={id}
      className='menu-item__check-box'
      type='checkbox'
      onChange={onSelect}
      checked={selected}
    />
    <label className='menu-item__label' htmlFor={id}>
      <span className='menu-item__name'>{name}</span>
      <span className='menu-item__price'>{price}</span>
    </label>
  </div>
);

export const menuItemPropType = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  onSelect: PropTypes.func,
  selected: PropTypes.bool
};

MenuItem.propTypes = {
  ...menuItemPropType
}

export default MenuItem;
