import React from 'react';
import PropTypes from 'prop-types';

import { menuItemPropType } from './MenuItem';
import './MenuResults.scss';


const MenuResults = ({ menuItems, selectedMeals }) => (
  <div className='menu-results__root'>
    <div className='menu-results__total'>
      Total:
      {' $'}
      {
        _(selectedMeals).reduce(
          (a, meal) => a + _.chain(menuItems).find({ id: meal.id }).get('price').value(),
          0
        )
      }
    </div>
  </div>
);

MenuResults.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape(menuItemPropType)),
  selectedMeals: PropTypes.arrayOf(PropTypes.shape(menuItemPropType)),
};

export default MenuResults;
