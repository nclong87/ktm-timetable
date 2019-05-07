import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _orderBy from 'lodash/orderBy';
// import Button from '@material-ui/core/Button';
import { stations } from '../data/stations';
import ScheduleResult from '../components/ScheduleResult';
import './home.less';
import { get3UpcomingTimes, getNextStations } from '../utils/index';
import { fetchTimeTables, addRecentSearch } from '../appActions';
import StationPicker from '../components/stationPicker';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fromStation: null,
      toStation: null,
      result: null,
    };
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

  handleOnSelectRecentSearch = ({ fromStation, toStation }) => {
    this.setState({ fromStation, toStation }, () => this.searchUpcomingTrains());
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
      result = get3UpcomingTimes(fromStation.order < toStation.order ? timetable.timetable1 : timetable.timetable2, fromStation);
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

  render() {
    return (
      <div className="home">
        {this.renderFromStationPicker()}
        {this.renderToStationPicker()}
        <div className="favorite-stations">
          <div className="stations">
            <i className="material-icons">history</i>
            {this.props.recentSearchs.map((e, index) => <span key={index} button="true" onClick={() => this.handleOnSelectRecentSearch(e)}>{`${e.fromStation.name} - ${e.toStation.name}`}</span>)}
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
};

Home.defaultProps = {
  timetables: [],
  recentSearchs: [],
};

function mapStateToProps(state) {
  return {
    timetables: state.timetables,
    recentSearchs: state.recentSearchs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, { fetchTimeTables, addRecentSearch }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
