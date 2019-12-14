import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import i18n from '../i18n/i18n';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openConfirmDialog: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  async handleOnClick(e) {
    if (this.props.isProcessing || this.props.disabled) {
      return;
    }
    if (this.props.confirmMessage) {
      if (this.state.openConfirmDialog === false) {
        this.setState({ openConfirmDialog: true });
        return;
      }
      this.setState({ openConfirmDialog: false });
    }
    await this.props.onClick(e);
    if (this.props.link && this.props.history !== null) {
      this.props.history.push(this.props.link);
    }
  }

  renderButtonContent(style = {}) {
    return (
      <div style={style}>
        {this.props.icon && (
          <FontIcon
            className={this.props.icon}
            style={{ fontSize: 14, marginRight: 10, color: 'inherit' }}
          />
        )}
        <span>{this.props.buttonText}</span>
      </div>
    );
  }

  render() {
    let className = 'ngager-button';
    if (!this.props.rounded) {
      className = `${className} no-rounded`;
    }
    const iconStyle = !this.props.icon
      ? { fontSize: 14, marginRight: '5px' }
      : { fontSize: 14, color: 'inherit' };
    const backgroundColor =
      this.props.theme && this.props.theme.backgroundColor
        ? this.props.theme.backgroundColor
        : '#36425A';
    const style = Object.assign(
      {},
      { backgroundColor: backgroundColor, borderColor: backgroundColor },
      this.props.style,
    );
    if (this.props.isProcessing === true) {
      return (
        <button style={style} className={`${className} disabled`}>
          <FontIcon className="fa fa-circle-o-notch faa-spin animated" style={iconStyle} />
          {!this.props.icon && this.props.processingText}
        </button>
      );
    }
    if (this.props.disabled === true) {
      return (
        <button style={style} className={`${className} disabled`}>
          {this.renderButtonContent()}
        </button>
      );
    }
    if (this.props.link !== '' && this.props.link !== null && this.props.history === null) {
      return (
        <Link style={style} className={className} to={this.props.link} onClick={this.handleOnClick}>
          {this.renderButtonContent({ display: 'inline-block' })}
        </Link>
      );
    }
    return (
      <button onClick={this.handleOnClick} style={style} className={className}>
        {this.renderButtonContent()}
      </button>
    );
  }
}

Button.propTypes = {
  history: PropTypes.instanceOf(Object),
  confirmMessage: PropTypes.string,
  rounded: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  buttonText: PropTypes.string,
  processingText: PropTypes.string,
  // iconColor: PropTypes.string,
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
  isProcessing: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.string,
};

Button.defaultProps = {
  history: null,
  confirmMessage: null,
  rounded: true,
  icon: null,
  style: {},
  buttonText: '',
  iconColor: 'rgb(119, 128, 145)',
  processingText: i18n.t('processing'),
  theme: {
    backgroundColor: '',
  },
  disabled: false,
  isProcessing: false,
  onClick: () => null,
  link: null,
};

export default Button;
