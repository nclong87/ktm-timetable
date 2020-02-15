import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { isEkspresTrain } from '../data/stations';
import './TrainSchedules.less';

const moment = require('moment');

class TrainSchedules extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      now: moment.now(),
    };
    this.timer = null;
    // console.log('dsda');
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({ now: moment.now() });
    }, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  renderTrainSchedule(train) {
    const { from, to } = this.props;
    const { trainId, times } = train;
    const departTime = times[from.id];
    const momentDepartTime = moment(departTime, 'HH:mm');
    const now = this.state.now;
    return (
      <div className="train-schedule" key={trainId}>
        <Stepper className="steps" alternativeLabel nonLinear>
          <Step completed>
            <StepLabel classes={{ label: 'step-label' }} icon={<i className="fas fa-subway" />}>
              <p>{trainId}</p>
              {isEkspresTrain(trainId) && <p className="express">Ekspres</p>}
            </StepLabel>
          </Step>
          <Step>
            <StepLabel classes={{ label: 'step-label' }} icon={<i className="fas fa-map-marker-alt departure" />}>
              <p>{from.name}</p>
              <p className="time">{departTime}</p>
              {momentDepartTime.isAfter(now) && <p className="fromnow">({momentDepartTime.from(now)})</p>}
            </StepLabel>
          </Step>
          <Step>
            <StepLabel classes={{ label: 'step-label' }} icon={<i className="fas fa-map-marker-alt arrival" />}>
              <p>{to.name}</p>
              <p className="time">{times[to.id]}</p>
            </StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
  render() {
    return (
      <div className="train-schedules">
        {this.props.trains.map(train => this.renderTrainSchedule(train))}
      </div>
    );
  }
}

TrainSchedules.propTypes = {
  from: PropTypes.instanceOf(Object).isRequired,
  to: PropTypes.instanceOf(Object).isRequired,
  trains: PropTypes.instanceOf(Array).isRequired,
};

export default TrainSchedules;
