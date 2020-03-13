import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeadLine extends PureComponent {
  constructor(props) {
    super(props);
    const news = this.props.appMetadata.news.filter(e => e.lines.includes(props.line)).map(e => e.text);
    this.state = {
      current: 0,
      news,
    };
  }

  componentDidMount() {
    const numberNews = this.state.news.length;
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

  componentWillReceiveProps(props) {
    if (props.line !== this.props.line) {
      const news = props.appMetadata.news.filter(e => e.lines.includes(props.line)).map(e => e.text);
      this.setState({
        current: 0,
        news,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (this.state.news.length === 0) {
      return null;
    }
    return (
      <div className="news">
        <i className="fas fa-bullhorn" />
        <span className="warning">{this.state.news[this.state.current]}</span>
      </div>
    );
  }
}

HeadLine.propTypes = {
  line: PropTypes.number.isRequired,
  appMetadata: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    appMetadata: state.appMetadata,
  };
}

export default connect(mapStateToProps, null)(HeadLine);
