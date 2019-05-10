import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from '@material-ui/core/Switch';
import { TimePicker } from 'material-ui-pickers';
import IconButton from '@material-ui/core/IconButton';
import _orderBy from 'lodash/orderBy';
// import Button from '@material-ui/core/Button';
import { stations } from '../data/stations';
import ScheduleResult from '../components/ScheduleResult';
import './home.less';
import { get3UpcomingTimes, getNextStations, formatDate } from '../utils/index';
import { fetchTimeTables, addRecentSearch, onChangeAdvancedSearchState } from '../appActions';
import StationPicker from '../components/stationPicker';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fromStation: null,
      toStation: null,
      departTime: null,
      result: null,
      openTimePicker: false,
    };
    this.handleOnChangeDepartTime = this.handleOnChangeDepartTime.bind(this);
    this.handleOnSwapStations = this.handleOnSwapStations.bind(this);
  }

  componentDidMount() {
    if (this.props.timetables.length === 0) {
      console.log('fetchTimeTables');
      this.props.fetchTimeTables();
    }
  }

  handleOnChangeFromStation = (fromStation) => {
    if (fromStation === null) {
      this.setState({ fromStation: null, result: null });
      return;
    }
    const newState = { fromStation };
    if (this.state.toStation !== null && this.state.toStation.line !== fromStation.line) {
      newState.toStation = null;
    }
    this.setState(newState, () => this.searchUpcomingTrains());
  }

  handleOnChangeToStation = (toStation) => {
    if (toStation === null) {
      this.setState({ toStation: null, result: null });
      return;
    }
    const newState = { toStation };
    if (this.state.fromStation !== null && this.state.fromStation.line !== toStation.line) {
      newState.fromStation = null;
    }
    this.setState(newState, () => this.searchUpcomingTrains());
  }

  handleOnSwapStations() {
    this.setState({
      fromStation: this.state.toStation,
      toStation: this.state.fromStation,
    }, () => this.searchUpcomingTrains());
  }

  handleOnSelectRecentSearch = ({ fromStation, toStation }) => {
    this.setState({ fromStation, toStation }, () => this.searchUpcomingTrains());
  }

  handleOnChangeDepartTime(departTime) {
    this.setState({ departTime, openTimePicker: false }, () => {
      // this.timePicker.close();
      this.searchUpcomingTrains();
    });
  }

  searchUpcomingTrains = () => {
    const { fromStation, toStation } = this.state;
    if (!fromStation || !toStation) {
      this.setState({ result: null });
      return;
    }
    const timetable = this.props.timetables.find(e => e.lineNum === fromStation.line);
    let result = null;
    if (timetable !== undefined) {
      result = get3UpcomingTimes(fromStation.order < toStation.order ? timetable.timetable1 : timetable.timetable2, fromStation, this.state.departTime);
    }
    this.props.addRecentSearch(fromStation, toStation);
    this.setState({ result });
  }

  renderResult() {
    if (!this.state.result) {
      return null;
    }
    const { fromStation, toStation } = this.state;
    return (
      <div>
        <ScheduleResult
          endStation={toStation.name}
          selectedStation={fromStation.name}
          nextStations={getNextStations(stations, fromStation, toStation, 2)}
          result={this.state.result}
        />
      </div>
    );
  }

  renderFromStationPicker() {
    const toStation = this.state.toStation;
    const list = toStation === null ? stations : _orderBy(stations, (e) => {
      if (e.line === toStation.line) {
        return -1;
      }
      return 1;
    });
    return (
      <StationPicker
        selectedStation={this.state.fromStation}
        label="From station"
        nearby
        stations={list}
        onChange={this.handleOnChangeFromStation}
      />
    );
  }

  renderToStationPicker() {
    const fromStation = this.state.fromStation;
    const list = fromStation === null ? stations : _orderBy(stations, (e) => {
      if (e.line === fromStation.line) {
        return -1;
      }
      return 1;
    });
    return (
      <StationPicker
        selectedStation={this.state.toStation}
        label="To station"
        stations={list}
        onChange={this.handleOnChangeToStation}
      />
    );
  }

  renderAdvancedSearchCheckbox() {
    return (
      <div className="advance-search-checkbox" >
        Advanced search <Switch checked={this.props.advancedSearchEnabled} onChange={(event, checked) => this.props.onChangeAdvancedSearchState(checked)} color="primary" />
      </div>
    );
  }

  renderDepartTime() {
    const departTime = this.state.departTime;
    return (
      <div className="depart-time" title="Change depart time" role="button" tabIndex={0} onClick={() => this.setState({ openTimePicker: true })}>
        <i className="far fa-clock" />
        <i>Depart {departTime === null ? 'now' : `at ${formatDate(departTime, 'HH:mm')}`}</i>
        <i className="fas fa-chevron-down" />
      </div>
    );
  }

  renderSwapButton() {
    if (!this.state.fromStation && !this.state.toStation) {
      return null;
    }
    return (
      <div className="switch">
        <IconButton title="Swap stations" role="button" tabIndex={0} className="icon" onClick={() => this.handleOnSwapStations()}>
          <i className="fas fa-retweet"></i>
        </IconButton>
      </div>
    );
  }

  render() {
    return (
      <div className="home">
        <div className="search">
          <div style={{ display: 'none' }}>
            <TimePicker
              DialogProps={{ open: this.state.openTimePicker }}
              label="Time picker"
              onChange={this.handleOnChangeDepartTime}
              onClose={() => this.setState({ openTimePicker: false })}
            />
          </div>
          {this.renderDepartTime()}
          {this.renderFromStationPicker()}
          {this.renderSwapButton()}
          {this.renderToStationPicker()}
        </div>
        <div className="favorite-stations">
          <div className="stations">
            {this.props.recentSearchs.slice(0, 2).map((e, index) => <span key={index} button="true" onClick={() => this.handleOnSelectRecentSearch(e)}>{`${e.fromStation.name} - ${e.toStation.name}`}</span>)}
          </div>
        </div>
        {this.renderResult()}
      </div>
    );
  }
}

Home.propTypes = {
  timetables: PropTypes.instanceOf(Array),
  recentSearchs: PropTypes.instanceOf(Array),
  fetchTimeTables: PropTypes.func.isRequired,
  addRecentSearch: PropTypes.func.isRequired,
  onChangeAdvancedSearchState: PropTypes.func.isRequired,
  advancedSearchEnabled: PropTypes.bool,
};

Home.defaultProps = {
  timetables: [],
  recentSearchs: [],
  advancedSearchEnabled: false,
};

function mapStateToProps(state) {
  return {
    timetables: state.timetables,
    recentSearchs: state.recentSearchs,
    advancedSearchEnabled: state.advancedSearchEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, { fetchTimeTables, addRecentSearch, onChangeAdvancedSearchState }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
