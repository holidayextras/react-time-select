'use strict';

var React = require('react');
var Input = require('react-bootstrap').Input;
var ReactIntl = require('react-intl');

var TimePicker = React.createClass({
  mixins: [ ReactIntl.IntlMixin ],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    start: React.PropTypes.number,
    end: React.PropTypes.number,
    step: React.PropTypes.number,
    locales: React.PropTypes.array,
    onChange: React.PropTypes.func,
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
      locales: [ 'en-GB' ],
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

  render: function() {
    return (
      <Input type="select" defaultValue={this.defaultValueFromProps()} name={this.props.name} className={this.props.className} label={this.props.label} onChange={this.onChange}>
        {this.listTimeOptions().map(function(timeData) {
          return (
            <option value={timeData.value} key={timeData.key}>
              <ReactIntl.FormattedTime value={timeData.date} format="short" />
            </option>
          );
        })}
      </Input>
    );
  }
});

module.exports = TimePicker;
