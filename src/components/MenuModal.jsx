import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import _ from 'lodash';

import { menuItemPropType } from './MenuItem';
import Menu from './Menu';


// Pass through modal props to reactstrap's Modal
const MenuModal = ({ user, onSubmit, ...props }) => (
  <Modal {...props}>
    <Modal.Header>
      <Modal.Title>Menu for {_.get(user, 'name')}</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
      <Menu 
        alerts={_.get(user, 'alerts')}
        selectedMeals={_.get(user, 'meals')}
      />
    </Modal.Body>

    <Modal.Footer>
      <Button bsStyle='primary' onClick={onSubmit}>Reserve</Button>
    </Modal.Footer>
  </Modal>
);

MenuModal.propTypes= {
  user: PropTypes.shape(
    {
      id: PropTypes.number,
      name: PropTypes.string,
      meals: PropTypes.arrayOf(PropTypes.shape(menuItemPropType)),
      alerts: PropTypes.arrayOf(PropTypes.string)
    }
  ),
  onSubmit: PropTypes.func
};

export default MenuModal;