/* eslint no-alert: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withTranslation } from 'react-i18next';

const moment = require('moment');

const eventCategory = 'Set Alert';

class ScheduleResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      now: moment.now(),
    };
    this.timer = null;
    this.handleClickGetConfirmation = this.handleClickGetConfirmation.bind(this);
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({ now: moment.now() });
    }, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  getValue() {
    const { t } = this.props;
    const retVal = prompt(`${t('Enter your email')} : `, '');
    return retVal;
  }

  handleClickGetConfirmation() {
    const { t } = this.props;
    gtag('event', 'click', {
      event_category: eventCategory,
    });
    const retVal = confirm(t('Support us with RM0.99 and unlock this feature!'));
    if (retVal === true) {
      const email = this.getValue();
      if (email) {
        alert(t('We\'ll send alerts to your email {{email}}. Thank you!'), { email });
      }
      gtag('event', 'confirm', {
        event_category: eventCategory,
        event_label: email,
      });
    } else {
      gtag('event', 'cancel', {
        event_category: eventCategory,
      });
    }
  }

  render() {
    if (this.props.result === null) {
      return null;
    }
    const { t } = this.props;
    const now = this.state.now;
    return (
      <div className="schedule-result">
        <Stepper className="steps" alternativeLabel nonLinear>
          <Step key={0} completed>
            <StepLabel icon={<i className="fas fa-subway" style={{ color: 'green' }} />}>{this.props.selectedStation}</StepLabel>
          </Step>
          {this.props.nextStations.map(e => (
            <Step key={e.id}><StepLabel icon={<i className="fas fa-subway" />}>{e.name}</StepLabel></Step>
          ))}
          <Step key={999}>
            <StepLabel icon={<i className="fas fa-subway" />}>{this.props.endStation}</StepLabel></Step>
        </Stepper>
        <div className="times">
          {this.props.result.map((e, index) => (
            <div key={index}>
              <p className={`time item-${index}`}>
                <i className="far fa-clock"></i>
                {e.time} {e.m.isBefore(now) ? '' : `(${e.m.from(now)})`}
                {(e.trainNo === 2602 || e.trainNo === 2603) && <span className="notes">(Ekspres)</span>}
              </p>
              <div role="button" tabIndex={0} className="button" onClick={this.handleClickGetConfirmation}>
                <i className="fas fa-bell" aria-hidden="true"></i>
                <span>
                  {t('Set Alert')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ScheduleResult.propTypes = {
  // startStation: PropTypes.string.isRequired,
  nextStations: PropTypes.instanceOf(Array).isRequired,
  endStation: PropTypes.string.isRequired,
  selectedStation: PropTypes.string.isRequired,
  result: PropTypes.instanceOf(Array),
  t: PropTypes.func.isRequired,
};

ScheduleResult.defaultProps = {
  result: null,
};

export default withTranslation()(ScheduleResult);
