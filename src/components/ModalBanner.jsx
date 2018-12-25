import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap'

import './ModalBanner.scss';

const ModalBanner = ({ message }) => (
  <div className='modal-banner__root'>
    <Alert className='modal-banner__alert' bsStyle='danger'>{message}</Alert>
  </div>
);

ModalBanner.propTypes = {
  message: PropTypes.string
};

export default ModalBanner;
