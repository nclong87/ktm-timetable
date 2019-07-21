import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeadLine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentDidMount() {
    const numberNews = this.props.appMetadata.news.length;
    if (numberNews > 1) {
      this.timer = setInterval(() => {
        let current = this.state.current + 1;
        if (current >= numberNews) {
          current = 0;
        }
        this.setState({ current });
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (this.props.appMetadata.news.length === 0) {
      return null;
    }
    return (
      <div className="news">
        <i className="fas fa-bullhorn" />
        <span className="warning">{this.props.appMetadata.news[this.state.current]}</span>
      </div>
    );
  }
}

HeadLine.propTypes = {
  appMetadata: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    appMetadata: state.appMetadata,
  };
}

export default connect(mapStateToProps, null)(HeadLine);
