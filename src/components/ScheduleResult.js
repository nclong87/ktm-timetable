import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

class ScheduleResult extends PureComponent {
  render() {
    if (this.props.result === null) {
      return null;
    }
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
                {e.time} {e.fromNow}
              </p>
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
