import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import _ from 'lodash';

import Avatar from './Avatar';
import AvatarReceipt from './AvatarReceipt';
import { AppContext } from '../appContext';
import './Diners.scss';


const Diners = ({ style, diners, onChangeUserId, createOpenModal }) => {
  const divStyle = { gridTemplateColumns: `repeat(${_.size(diners)}, '100px')` };

  return (
    <div className='diners__root' style={_.merge(divStyle, style)}>
      {
        _(diners).map(({ id, name, meals, alerts }) => (
          <div key={id} className='diners__avatar-container'>
            <Avatar 
              onChange={onChangeUserId(id)}
              onClick={createOpenModal(id)}
              name={name}
              alert={_.size(alerts) > 0}
            />
            <AvatarReceipt meals={meals}/>
          </div>
          )
        ).value()
      }
    </div>
  );
};

Diners.propTypes = {
  style: PropTypes.object,
  diners: PropTypes.arrayOf(
      PropTypes.shape(
      {
        name: PropTypes,
        meal: PropTypes.arrayOf(PropTypes.object),
        alerts: PropTypes.arrayOf(PropTypes.string)
      }
    )
  ),
  onChangeUserId: PropTypes.func,
  createOpenModal: PropTypes.func
}

export default props => (
  <AppContext.Consumer>
    {app => <Diners {...props} diners={app.users}/>}
  </AppContext.Consumer>
);