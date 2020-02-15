import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from '@material-ui/core/Switch';
import { TimePicker } from 'material-ui-pickers';
import IconButton from '@material-ui/core/IconButton';
import _orderBy from 'lodash/orderBy';
import _cloneDeep from 'lodash/cloneDeep';
// import Button from '@material-ui/core/Button';
import { getStations } from '../data/stations';
import TrainSchedules from '../components/TrainSchedules';
import './home.less';
import { getUpcomingTimes, formatDate } from '../utils/index';
import { addRecentSearch, onChangeAdvancedSearchState } from '../appActions';
import StationPicker from '../components/stationPicker';

const stations = getStations();

function getListStationsForPicker(toStation) {
  let list = null;
  if (toStation === null) {
    list = stations;
  } else if (toStation.conjunction === true) {
    list = [];
    stations.forEach((station) => {
      if (station.conjunction === true) {
        station.lines.forEach((line) => {
          list.push({
            id: line.id,
            name: station.name,
            lat: station.lat,
            long: station.long,
            line: line.line,
            order: line.order,
          });
        });
      } else {
        list.push(station);
      }
    });
  } else {
    list = _orderBy(stations, (e) => {
      if (e.line === toStation.line) {
        return -1;
      }
      return 1;
    });
  }
  return list;
}

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
    this.handleOnChangeFromStation = this.handleOnChangeFromStation.bind(this);
    this.handleOnChangeToStation = this.handleOnChangeToStation.bind(this);
  }

  handleOnChangeFromStation(fromStation) {
    if (fromStation === null) {
      this.setState({ fromStation: null, result: null });
      return;
    }
    let toStation = this.state.toStation;
    if (toStation) {
      if (toStation.conjunction === true) {
        toStation = _cloneDeep(this.state.toStation);
        const line = toStation.lines.find(e => e.line === fromStation.line);
        Object.assign(toStation, line);
      } else if (fromStation.conjunction === true) {
        const line = fromStation.lines.find(e => e.line === toStation.line);
        Object.assign(fromStation, line);
      } else if (toStation.line !== fromStation.line) {
        toStation = null;
      }
      this.setState({ fromStation, toStation }, () => this.searchUpcomingTrains());
      return;
    }
    this.setState({ fromStation });
  }

  handleOnChangeToStation(toStation) {
    if (toStation === null) {
      this.setState({ toStation: null, result: null });
      return;
    }
    let fromStation = this.state.fromStation;
    if (toStation) {
      if (fromStation.conjunction === true) {
        fromStation = _cloneDeep(this.state.fromStation);
        const line = fromStation.lines.find(e => e.line === toStation.line);
        Object.assign(fromStation, line);
      } else if (toStation.conjunction === true) {
        const line = toStation.lines.find(e => e.line === fromStation.line);
        Object.assign(toStation, line);
      } else if (fromStation.line !== toStation.line) {
        fromStation = null;
      }
      this.setState({ toStation, fromStation }, () => this.searchUpcomingTrains());
      return;
    }
    this.setState({ toStation });
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

  searchUpcomingTrains() {
    const { fromStation, toStation } = this.state;
    if (!fromStation || !toStation) {
      this.setState({ result: null });
      return;
    }
    const timetable = this.props.timetables.find(e => e.lineNum === fromStation.line);
    let result = null;
    if (timetable !== undefined) {
      result = getUpcomingTimes(fromStation.order < toStation.order ? timetable.timetable1 : timetable.timetable2, fromStation, toStation, this.state.departTime);
    }
    this.props.addRecentSearch(fromStation, toStation);
    this.setState({ result });
  }

  renderResult() {
    if (!this.state.result) {
      return null;
    }
    const { fromStation, toStation } = this.state;
    const selectedLine = fromStation.line;
    const stationsByLine = [];
    stations.forEach((station) => {
      if (station.conjunction === true) {
        const { id, line, order } = station.lines.find(e => e.line === selectedLine);
        stationsByLine.push({
          id,
          name: station.name,
          lat: station.lat,
          long: station.long,
          line,
          order,
        });
      } else if (station.line === selectedLine) {
        stationsByLine.push(station);
      }
    });
    // console.log(stationsByLine);
    return (
      <TrainSchedules
        from={fromStation}
        to={toStation}
        trains={this.state.result}
      />
    );
  }

  renderFromStationPicker() {
    return (
      <StationPicker
        selectedStation={this.state.fromStation}
        label="From station"
        nearby
        stations={getListStationsForPicker(this.state.toStation)}
        onChange={this.handleOnChangeFromStation}
      />
    );
  }

  renderToStationPicker() {
    return (
      <StationPicker
        selectedStation={this.state.toStation}
        label="To station"
        stations={getListStationsForPicker(this.state.fromStation)}
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
              showTodayButton
              todayLabel="NOW"
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
            <div>
              {this.props.recentSearchs.map((e, index) => <span key={index} button="true" onClick={() => this.handleOnSelectRecentSearch(e)}>{`${e.fromStation.name} - ${e.toStation.name}`}</span>)}
            </div>
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
    timetables: state.newtimetables,
    recentSearchs: state.recentSearchsNew,
    advancedSearchEnabled: state.advancedSearchEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, { addRecentSearch, onChangeAdvancedSearchState }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
