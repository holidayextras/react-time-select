'use strict';

var React = require('react');
var Input = require('react-bootstrap').Input;
var ReactIntl = require('react-intl');

var TimePicker = React.createClass({
  mixins: [ ReactIntl.IntlMixin ],

  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    start: React.PropTypes.number,
    end: React.PropTypes.number,
    time: React.PropTypes.object,
    step: React.PropTypes.number,
    locale: React.PropTypes.string,
    onChange: React.PropTypes.func,
    minutesHoursChanged: React.PropTypes.func,
    seperateHourMins: React.PropTypes.bool,
    formats: React.PropTypes.shape({
      time: React.PropTypes.shape({
        short: React.PropTypes.object
      })
    })
  },

  getDefaultProps: function() {
    return {
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
  },

  onChange: function(e) {
    if (this.props.onChange) {
      this.props.onChange(this.generateDateAtTime(e.target.value));
    }
  },

  listTimeOptions: function() {
    var self = this;

    return this.generateTimeRange().map(function(unformattedTime) {
      var formattedTime = self.generateFormattedTime(unformattedTime);

      return {
        key: unformattedTime,
        value: formattedTime,
        date: self.generateDateAtTime(formattedTime)
      };
    });
  },

  generateFormattedTime: function(unformattedTime) {
    var formattedTime = '' + unformattedTime;

    while (formattedTime.length < 4) {
      formattedTime = '0' + formattedTime;
    }

    return formattedTime.replace(/(.{2})(.{2})/, '$1:$2');
  },

  generateDateAtTime: function(formattedTime) {
    var hoursMins = formattedTime.split(':');
    var newDate = new Date(this.props.value || new Date());
    newDate.setHours(hoursMins[0], hoursMins[1], 0, 0);
    return newDate;
  },

  generateHours: function() {
    var hours = [];

    for (var hour = 0; hour < 24; hour++) {
      if (hour < 10) {
        hours.push('0' + hour);
      } else {
        hours.push(hour.toString());
      }
    }
    return hours;
  },

  generateMinutes: function() {
    var minutes = [];

    for (var minute = 0; minute <= 60 - this.props.step; minute += this.props.step) {
      if (minute < 10) {
        minutes.push('0' + minute);
      } else {
        minutes.push(minute.toString());
      }
    }

    return minutes;
  },

  generateTimeRange: function() {
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
  },

  defaultValueFromProps: function() {
    if (!this.props.value) return undefined;

    return this.generateFormattedTime((this.props.value.getHours() * 100) + this.props.value.getMinutes());
  },

  hoursChanged: function(e) {
    this.props.minutesHoursChanged({ hours: e.target.value });
  },

  minutesChanged: function(e) {
    this.props.minutesHoursChanged({ minutes: e.target.value });
  },

  generateTimeInput: function(timeUnit) {
    var timeValues;
    var label;
    var currentTime;
    var changeFunction;

    if (timeUnit === 'minutes') {
      timeValues = this.generateMinutes();
      label = 'Minutes';
      currentTime = this.props.time.minutes;
      changeFunction = this.minutesChanged;
    }

    if (timeUnit === 'hours') {
      timeValues = this.generateHours();
      label = 'Hours';
      currentTime = this.props.time.hours;
      changeFunction = this.hoursChanged;
    }

    return (
      <div className="col-xs-6">
        <Input
          type="select"
          value={currentTime}
          name={this.props.name}
          className={this.props.className}
          label={label}
          onChange={changeFunction}
          id={this.props.id}
        >
          {timeValues.map(timeData => {
            return (
              <option value={timeData}>{timeData}</option>
            );
          })}
        </Input>
      </div>
    );
  },

  render: function() {
    var timeInput = <span />;

    if (this.props.seperateHourMins) {
      timeInput = (
        <div className="row">
          {this.generateTimeInput('hours')}
          {this.generateTimeInput('minutes')}
        </div>
      );
    } else {
      timeInput = (
        <Input
          type="select"
          value={this.defaultValueFromProps()}
          name={this.props.name}
          className={this.props.className}
          label={this.props.label}
          onChange={this.onChange}
          id={this.props.id}
        >
          {this.listTimeOptions().map(timeData => {
            return (
              <ReactIntl.FormattedTime key={timeData.key} value={timeData.date} {...this.props.formats.time.short}>
                {time => (
                  <option value={timeData.value}>{time}</option>
                )}
              </ReactIntl.FormattedTime>
            );
          })}
        </Input>
      );
    }

    return (
      <ReactIntl.IntlProvider locale={this.props.locale}>
        {timeInput}
      </ReactIntl.IntlProvider>
    );
  }
});

module.exports = TimePicker;
