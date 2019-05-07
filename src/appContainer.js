import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppHeader from './components/appHeader';

class AppContainer extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <AppHeader />
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppContainer;
