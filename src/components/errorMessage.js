import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NoResultsImage from '../images/error-icon.png';

class ErrorMessage extends PureComponent {
  render() {
    return (
      <div className="page-not-found">
        <img alt="No result" src={NoResultsImage} />
        {this.props.messages.map((m, i) => <p key={i}>{m}</p>)}
        <p>{}</p>
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  messages: PropTypes.instanceOf(Array),
};

ErrorMessage.defaultProps = {
  messages: ['Oops! Something went wrong!', 'Please try to reload page.'],
};

export default ErrorMessage;
