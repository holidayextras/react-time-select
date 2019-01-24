'use strict';

var React = require('react');
var FormControl = require('react-bootstrap').FormControl;
var PropTypes = require('prop-types');
var HourInput = require('./HourInput');
var MinuteInput = require('./MinuteInput');
var ReactIntl = require('react-intl');

class TimePicker extends React.Component {
  constructor(props) {
    super(props)
    this.listTimeOptions = this.listTimeOptions.bind(this)
    this.generateFormattedTime = this.generateFormattedTime.bind(this)
    this.generateDateAtTime = this.generateDateAtTime.bind(this)
    this.generateHours = this.generateHours.bind(this)
    this.generateMinutes = this.generateMinutes.bind(this)
    this.generateTimeRange = this.generateTimeRange.bind(this)
    this.defaultValueFromProps = this.defaultValueFromProps.bind(this)
    this.changeCombinedTime = this.changeCombinedTime.bind(this)
    this.changeHours = this.changeHours.bind(this)
    this.changeMinutes = this.changeMinutes.bind(this)
  }
  listTimeOptions () {
    var self = this;

    return this.generateTimeRange().map(function(unformattedTime) {
      var formattedTime = self.generateFormattedTime(unformattedTime);

      return {
        key: unformattedTime,
        value: formattedTime,
        date: self.generateDateAtTime(formattedTime)
      };
    });
  }

  generateFormattedTime (unformattedTime) {
    var formattedTime = '' + unformattedTime;

    while (formattedTime.length < 4) {
      formattedTime = '0' + formattedTime;
    }

    return formattedTime.replace(/(.{2})(.{2})/, '$1:$2');
  }

  generateDateAtTime (formattedTime) {
    var hoursMins = formattedTime.split(':');
    var newDate = new Date(this.props.value || new Date());
    if (!this.props.seperateHourMins) newDate.setHours(hoursMins[0], hoursMins[1], 0, 0);
    return newDate;
  }

  generateHours () {
    var hours = [];

    for (var hour = 0; hour < 24; hour++) {
      if (hour < 10) {
        hours.push('0' + hour);
      } else {
        hours.push(hour.toString());
      }
    }
    return hours;
  }

  generateMinutes () {
    var minutes = [];

    for (var minute = 0; minute <= 60 - this.props.step; minute += this.props.step) {
      if (minute < 10) {
        minutes.push('0' + minute);
      } else {
        minutes.push(minute.toString());
      }
    }

    return minutes;
  }

  generateTimeRange () {
    var times = [];

    var start = parseInt(this.props.start, 10);
    var end = parseInt(this.props.end, 10);
    var step = parseInt(this.props.step, 10);

    for (var i = start; i < end; i += step) {
      var minutes = i % 100;

      if (minutes > 59) {
        i -= minutes;
        i += 100;
      }

      times.push(i);
    }

    return times;
  }

  defaultValueFromProps () {
    if (!this.props.value) return undefined;

    return this.generateFormattedTime((this.props.value.getHours() * 100) + this.props.value.getMinutes());
  }

  changeCombinedTime (e) {
    if (this.props.onChange) {
      var hourMins = e.target.value.split(':');
      this.props.onChange({
        hours: hourMins[0],
        minutes: hourMins[1]
      });
    }
  }

  changeHours (e) {
    this.props.onChange({
      hours: e.target.value,
      minutes: this.props.time.minutes
    });
  }

  changeMinutes (e) {
    this.props.onChange({
      hours: this.props.time.hours,
      minutes: e.target.value
    });
  }

  render () {
    var timeInput;

    if (this.props.seperateHourMins) {
      timeInput = (
        <div className="row">
          <HourInput
            id={this.props.id}
            className={this.props.className}
            value={this.props.time.hours}
            name="hours"
            onChange={this.changeHours}
            options={this.generateHours()} />

          <MinuteInput
            id={this.props.id}
            className={this.props.className}
            value={this.props.time.minutes}
            name="minutes"
            onChange={this.changeMinutes}
            options={this.generateMinutes()} />
        </div>
      );
    } else {
      timeInput = (
        <FormControl
          componentClass="select"
          placeholder="select"
          value={this.defaultValueFromProps()}
          name={this.props.name}
          className={this.props.className}
          label={this.props.label}
          onChange={this.changeCombinedTime}
          id={this.props.id} >
          {this.listTimeOptions().map(timeData => {
            return (
              <ReactIntl.FormattedTime key={timeData.key} value={timeData.date} {...this.props.formats.time.short}>
                {time => (
                  <option value={timeData.value}>{time}</option>
                )}
              </ReactIntl.FormattedTime>
            );
          })}
        </FormControl>
      );
    }

    return (
      <ReactIntl.IntlProvider locale={this.props.locale}>
        <div>{timeInput}</div>
      </ReactIntl.IntlProvider>
    );
  }
};

TimePicker.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  start: PropTypes.number,
  end: PropTypes.number,
  time: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string
  }),
  step: PropTypes.number,
  locale: PropTypes.string,
  onChange: PropTypes.func,
  seperateHourMins: PropTypes.bool,
  formats: PropTypes.shape({
    time: PropTypes.shape({
      short: PropTypes.object
    })
  })
};

TimePicker.defaultProps = {
  className: 'input-sm',
  label: 'Time',
  name: 'Time',
  // 00:30, 0030 is octal literal 24 & disallowed in strict mode.
  start: 30,
  end: 2359,
  step: 30,
  locale: 'en-GB',
  seperateHourMins: false,
  formats: {
    time: {
      short: {
        hour: '2-digit',
        minute: '2-digit'
      }
    }
  }
};

module.exports = TimePicker;
