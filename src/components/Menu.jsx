import React from 'react';
import PropTypes from 'prop-types';

import MenuItem, { menuItemPropType } from './MenuItem';
import MenuSection from './MenuSection';
import ModalBanner from './ModalBanner';
import MenuResults from './MenuResults';
import { MenuContext } from '../appContext';
import './Menu.scss';


const Menu = ({ menuItems, alerts, selectedMeals }) => (
  <div className='menu__root'>
    <div className='menu__starters'>
      <div className='menu__alerts-container'>
        {
          _(alerts).map(message => (
            <ModalBanner 
              key={message} 
              message={message}
            />
          )).value()
        }
      </div>
      <MenuSection 
        title='Starters'
        menuItems={menuItems.starters} 
        selectedMeals={selectedMeals}
      />
      <MenuSection 
        title='Mains'
        menuItems={menuItems.mains}
        selectedMeals={selectedMeals}
      />
      <MenuSection 
        title='Desserts'
        menuItems={menuItems.desserts}
        selectedMeals={selectedMeals}
      />
      <MenuResults
        menuItems={_(menuItems).values().flatMap().value()}
        selectedMeals={selectedMeals}
      />
    </div>
  </div>
);

Menu.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.string),
  menuItems: PropTypes.shape(
    {
      starters: PropTypes.arrayOf(PropTypes.shape(menuItemPropType)),
      mains:  PropTypes.arrayOf(PropTypes.shape(menuItemPropType)),
      desserts:  PropTypes.arrayOf(PropTypes.shape(menuItemPropType))
    }
  ),
  selectedMeals: PropTypes.arrayOf(PropTypes.shape(menuItemPropType))
};

export default props => (
  <MenuContext.Consumer>
    {app => <Menu {...props} menuItems={app.menuData}/>}
  </MenuContext.Consumer>
);
