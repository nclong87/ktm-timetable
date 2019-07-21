import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import './styles/style.less';
import AppHeader from './components/appHeader';
import Loading from './components/Loading';
import ErrorMessage from './components/errorMessage';
import { fetchMetadata, fetchTimeTables } from './appActions';

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    if (this.props.timetables.length > 0) {
      this.setState({ isLoading: false });
    }
    this.props.fetchMetadata();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appMetadata.version !== this.props.appMetadata.version || this.props.timetables.length === 0) {
      console.log('Refresh data');
      this.props.fetchTimeTables().then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.props.timetables.length === 0) {
      return <ErrorMessage />;
    }
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
  timetables: PropTypes.instanceOf(Array).isRequired,
  appMetadata: PropTypes.instanceOf(Object).isRequired,
  fetchMetadata: PropTypes.func.isRequired,
  fetchTimeTables: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    timetables: state.newtimetables,
    appMetadata: state.appMetadata,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, { fetchMetadata, fetchTimeTables }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
