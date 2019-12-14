import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const moment = require('moment');

class ScheduleResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      now: moment.now(),
    };
    this.timer = null;
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
        var retVal = prompt("Enter your email : ", "");
        return retVal;
  }

  getConfirmation() {
        var retVal = confirm("Support us with RM0.99 and unlock this feature!");
        if( retVal == true ) {
            let email = this.getValue();
            alert("We'll send instruction to your email " + email + ". Thank you!");
            return true;
        } else {
            return false;
        }
    }

  render() {
    if (this.props.result === null) {
      return null;
    }
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
                    <div className="alert">
                    <button onClick={() => this.getConfirmation()}>Set Alert</button>
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
};

ScheduleResult.defaultProps = {
  result: null,
};

export default ScheduleResult;
