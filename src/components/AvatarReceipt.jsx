
import React from 'react';
import PropTypes from 'prop-types';

import { menuItemPropType } from './MenuItem';
import './AvatarReceipt.scss';


const AvatarReceipt = ({ meals }) => (
  <div className='avatar-receipt__container'>
    {
      _.map(meals, ({ name }) => (
        <div className='avatar-receipt__item'>
          {name}
        </div>
      ))
    }
  </div>
);

AvatarReceipt.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape(menuItemPropType))
}

export default AvatarReceipt