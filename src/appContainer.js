import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import AppHeader from './components/appHeader';

class AppContainer extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <AppHeader />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {this.props.children}
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppContainer;
