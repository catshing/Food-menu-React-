import React from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';
import _ from 'lodash';

export default class Screen extends React.Component {
  static windowDimensions() {
    return {
      height: $(window).height(),
      width: $(window).width()
    }
  }

  constructor(props) {
    super(props);
    this.state = Screen.windowDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateDimensions.bind(this));
  }

  _updateDimensions() {
    this.setState(Screen.windowDimensions());
  }

  render() {
    const { children, style, ...props } = this.props;
    const { height, width } = this.state;

    return (
      <div style={{ height, width }} {...props}>
        {children}
      </div>
    );
  }
}
                                                                                                            

Screen.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
}
