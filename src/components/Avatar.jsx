import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import './Avatar.scss';


export default class Avatar extends React.Component {
  _updateName(value) {
    this.props.onChange('name', value);
  }

  _onNameChange = e => {
    this._updateName(e.target.value);
  }

  _handleClick = e => {
    e.stopPropagation();
  }

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.target.blur();
      this._updateName(e.target.value);
    }
  }

  render() {
    const { onClick, name, alert } = this.props;
    const className = cn('avatar__root', {'alert-background': alert});
    const title = alert ? `Error in ${name}'s menu selection. ` : `Select courses for ${name}`;

    return (
      <div className={className} onClick={onClick} title={title}>
      	<img className='avatar__image' src='./images/empty-avatar.png'/>
        <div className='avatar__name'>
          <input 
            className='avatar__name-input' 
            onChange={this._onNameChange}
            onClick={this._handleClick}
            value={name}
            onKeyPress={this._handleKeyPress}
          />
        </div>
      </div>
    );
  }
}

Avatar.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  alert: PropTypes.bool
}
																																																						