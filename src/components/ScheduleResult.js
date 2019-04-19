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
      <Stepper className="schedule-result" alternativeLabel nonLinear>
        <Step key={1} completed>
          <StepLabel icon={<i className="material-icons" style={{ color: 'green' }}>tram</i>}>{this.props.startStation}</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel icon={<i className="material-icons">tram</i>}>
            <p className="station-name">{this.props.selectedStation}</p>
            {this.props.result.map((e, index) => (
              <div key={index}>
                <p className={`time item-${index}`}>
                  <i className="material-icons">timer</i>
                  {e.fromNow} ({e.time})
                </p>
              </div>
            ))}
          </StepLabel>
        </Step>
        <Step key={3}><StepLabel icon={<i className="material-icons">tram</i>}>{this.props.endStation}</StepLabel></Step>
      </Stepper>
    );
  }
}

ScheduleResult.propTypes = {
  startStation: PropTypes.string.isRequired,
  endStation: PropTypes.string.isRequired,
  selectedStation: PropTypes.string.isRequired,
  result: PropTypes.instanceOf(Array),
};

ScheduleResult.defaultProps = {
  result: null,
};

export default ScheduleResult;
