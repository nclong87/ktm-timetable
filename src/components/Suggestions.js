import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getLineName } from '../data/stations';

class Suggestions extends PureComponent {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClickOutside();
      // alert('You clicked outside of me!');
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef} className="suggestions">
        <div>
          <List component="nav">
            {this.props.suggestions.map((e) => {
              const lineName = getLineName(e.line);
              return (
                <ListItem key={e.id} button onClick={() => this.props.onSelectStation(e)}>
                  <ListItemText>
                    <span className="station-name">{e.name}</span>
                  </ListItemText>
                  {lineName &&
                    <span className="line-name">
                      <i className="fas fa-subway"></i>
                      {lineName}
                    </span>
                  }
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}

Suggestions.propTypes = {
  suggestions: PropTypes.instanceOf(Array).isRequired,
  onSelectStation: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

export default Suggestions;
