import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import _trim from 'lodash/trim';
import _get from 'lodash/get';
import { searchByKeywords, getNearbyStations } from '../utils/index';
import Suggestions from './Suggestions';

class StationPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      suggestions: [],
      isFetchingLocation: false,
    };
    this.textInput = React.createRef();
  }

  componentWillReceiveProps(newProps) {
    if (_get(this.props.selectedStation, 'id', null) !== _get(newProps.selectedStation, 'id', null)) {
      this.setState({ keywords: _get(newProps.selectedStation, 'name', '') });
    }
  }

  handleOnChangeKeywords = (keywords) => {
    const trimedKeywors = _trim(keywords);
    // console.log(keywords);
    const suggestions = trimedKeywors.length === 0 ? [] : this.props.stations.filter(e => searchByKeywords(e.name, trimedKeywors));
    this.setState({ keywords, suggestions }, () => this.props.onChange(null));
  }

  handleOnClickClear = () => {
    this.handleOnChangeKeywords('');
    this.textInput.current.focus();
  }

  handleOnGetNearbyStations = () => {
    if (navigator.geolocation) {
      this.setState({ isFetchingLocation: true, keywords: '' }, () => {
        this.props.onChange(null);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log('handleOnGetNearbyStations', position);
            this.setState({ isFetchingLocation: false });
            const { latitude, longitude } = position.coords;
            const nearbyStations = getNearbyStations(latitude, longitude, this.props.stations);
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

  handleOnSelectStation = (station) => {
    this.setState({ suggestions: [], keywords: station.name }, () => this.props.onChange(station));
  }

  renderLocationButton() {
    if (!this.props.nearby || !navigator.geolocation) {
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
        <i className="fas fa-map-marker-alt"></i>
      </IconButton>
    );
  }

  renderSuggestions() {
    if (this.state.suggestions.length === 0) {
      return null;
    }
    return (
      <Suggestions
        suggestions={this.state.suggestions}
        onSelectStation={this.handleOnSelectStation}
        onClickOutside={() => this.setState({ suggestions: [] })}
      />
    );
  }

  render() {
    return (
      <div className="search-textfield">
        <TextField
          inputRef={this.textInput}
          autoComplete="off"
          InputProps={{ classes: { input: this.props.classes.input } }}
          id="outlined-full-width"
          label={this.props.label}
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
          <div title="Clear filter" role="button" tabIndex={0} className="icon" aria-label="Close" onClick={() => this.handleOnClickClear('')}>
            <i className="fas fa-times"></i>
          </div>
          :
          this.renderLocationButton()
        }
        {this.renderSuggestions()}
      </div>
    );
  }
}

StationPicker.propTypes = {
  label: PropTypes.string.isRequired,
  nearby: PropTypes.bool,
  selectedStation: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object).isRequired,
  stations: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
};

StationPicker.defaultProps = {
  selectedStation: null,
  nearby: false,
};

const StyleStationPicker = withStyles({
  input: {
    height: 10,
    fontSize: 13,
  },
})(StationPicker);

export default StyleStationPicker;
