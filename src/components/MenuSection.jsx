import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import MenuItem, { menuItemPropType } from './MenuItem';
import { AppContext } from '../appContext';
import './MenuSection.scss';


const MenuSection = ({ title, menuItems, createOnMealSelect, selectedMeals }) => (
  <div className='menu-section__root'>
    <div className='menu-section__title'>
      <h3>{title}</h3>
      <hr/>
    </div>
    <div className='menu-section__items'>
      {
        _(menuItems).map(meal => (
          <MenuItem
            key={meal.id}
            id={meal.id} 
            name={meal.name} 
            price={meal.price}
            onSelect={createOnMealSelect(meal)}
            selected={!!(_.find(selectedMeals, { id: meal.id }))}
          />
        )).value()
      }
    </div>
  </div>
);

MenuSection.propTypes = {
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.shape(menuItemPropType)),
  createOnMealSelect: PropTypes.func,
  selectedMeals: PropTypes.arrayOf(PropTypes.shape(menuItemPropType))
};

export default props => (
  <AppContext.Consumer>
    {app => <MenuSection {...props} createOnMealSelect={app.createSelectMealCallback}/>}
  </AppContext.Consumer>
);
