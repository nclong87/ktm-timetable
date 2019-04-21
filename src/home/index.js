import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { stations, getTerminals } from '../data/stations';
import ScheduleResult from '../components/ScheduleResult';
import Suggestions from '../components/Suggestions';
import './home.less';
import { get3UpcomingTimes, searchByKeywords, getNearbyStations, getNextStations } from '../utils/index';
import { fetchTimeTables, setSelectedStation } from '../appActions';


class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      suggestions: [],
      selectedStation: null,
      result1: null,
      result2: null,
      isFetchingLocation: false,
    };
  }

  componentDidMount() {
    if (this.props.timetables.length === 0) {
      this.props.fetchTimeTables();
    }
  }

  handleOnChangeKeywords = (keywords) => {
    const trimedKeywors = _.trim(keywords);
    // console.log(keywords);
    const suggestions = trimedKeywors.length === 0 ? [] : stations.filter(e => searchByKeywords(e.name, trimedKeywors));
    this.setState({ keywords, suggestions, result1: null, result2: null, selectedStation: null });
  }

  handleOnSelectStation = (selectedStation) => {
    const timetable = this.props.timetables.find(e => e.lineNum === selectedStation.line);
    let result1 = null;
    let result2 = null;
    if (timetable !== undefined) {
      result1 = get3UpcomingTimes(timetable.timetable1, selectedStation);
      result2 = get3UpcomingTimes(timetable.timetable2, selectedStation);
    }
    // console.log(timetable, result1, result2);
    this.props.setSelectedStation(selectedStation);
    // console.log(result1, result2);
    this.setState({
      selectedStation,
      keywords: selectedStation.name,
      suggestions: [],
      result1,
      result2,
    });
  }

  handleOnGetNearbyStations = () => {
    if (navigator.geolocation) {
      this.setState({ isFetchingLocation: true, result1: null, result2: null, selectedStation: null, keywords: '' }, () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log('handleOnGetNearbyStations', position);
            this.setState({ isFetchingLocation: false });
            const { latitude, longitude } = position.coords;
            const nearbyStations = getNearbyStations(latitude, longitude, stations);
            this.setState({ suggestions: nearbyStations });
            // console.log(nearbyStations);
          },
          (error) => {
            console.log(error);
            this.setState({ isFetchingLocation: false });
            alert(error.message);
          },
        );
      });
    }
  }

  renderSuggestions() {
    if (this.state.suggestions.length === 0) {
      return null;
    }
    return (
      <Suggestions
        suggestions={this.state.suggestions}
        onSelectStation={e => this.handleOnSelectStation(e)}
        onClickOutside={() => this.setState({ suggestions: [] })}
      />
    );
    // return (
    //   <div className="suggestions">
    //     <div>
    //       <List component="nav">
    //         {this.state.suggestions.map(e => (
    //           <ListItem key={e.id} button onClick={() => this.handleOnSelectStation(e)}>
    //             <ListItemText primary={e.name} />
    //             <span className="line-name">
    //               <i className="material-icons">tram</i>
    //               {`${getLineName(e.line)}`}</span>
    //           </ListItem>
    //         ))}
    //       </List>
    //     </div>
    //   </div>
    // );
  }

  renderResult() {
    if (!this.state.selectedStation) {
      return null;
    }
    const [startStation, endStation] = getTerminals(this.state.selectedStation.line);
    return (
      <div>
        <ScheduleResult
          endStation={endStation}
          selectedStation={this.state.selectedStation.name}
          nextStations={getNextStations(this.state.selectedStation, stations, 1)}
          result={this.state.result1}
        />
        <ScheduleResult
          endStation={startStation}
          selectedStation={this.state.selectedStation.name}
          nextStations={getNextStations(this.state.selectedStation, stations, -1)}
          result={this.state.result2}
        />
      </div>
    );
  }

  renderLocationButton() {
    if (!navigator.geolocation) {
      return null;
    }
    if (this.state.isFetchingLocation) {
      return (
        <div className="icon">
          <CircularProgress style={{ margin: 'auto' }} size={30} />
        </div>
      );
    }
    return (
      <IconButton title="Find nearby stations" role="button" tabIndex={0} className="icon" aria-label="Search" onClick={() => this.handleOnGetNearbyStations()}>
        <i className="material-icons">location_on</i>
      </IconButton>
    );
  }

  render() {
    return (
      <div className="home">
        <h1>KTM Komuter Train Timetable</h1>
        <div className="search-textfield">
          <TextField
            id="outlined-full-width"
            label="Komuter KTM Timetable and Schedule"
            placeholder="Enter station name"
            fullWidth
            margin="normal"
            value={this.state.keywords}
            onChange={event => this.handleOnChangeKeywords(event.target.value)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {this.state.keywords.length > 0 ?
            <div title="Clear filter" role="button" tabIndex={0} className="icon" aria-label="Close" onClick={() => this.handleOnChangeKeywords('')}>
              <i className="material-icons">close</i>
            </div>
            :
            this.renderLocationButton()
          }
          {this.renderSuggestions()}
        </div>
        <div className="favorite-stations">
          <div className="stations">
            <i className="material-icons">history</i>
            {this.props.recentStations.map(e => <span key={e.id} button="true" onClick={() => this.handleOnSelectStation(e)}>{e.name}</span>)}
          </div>
        </div>
        {this.renderResult()}
      </div>
    );
  }
}

Home.propTypes = {
  timetables: PropTypes.instanceOf(Array),
  recentStations: PropTypes.instanceOf(Array),
  fetchTimeTables: PropTypes.func.isRequired,
  setSelectedStation: PropTypes.func.isRequired,
};

Home.defaultProps = {
  timetables: [],
  recentStations: [],
};

function mapStateToProps(state) {
  return {
    timetables: state.timetables,
    recentStations: state.recentStations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, { fetchTimeTables, setSelectedStation }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
