'use strict'

var React = require('react');
var Input = require('react-bootstrap').Input;
var ReactIntl = require('react-intl');

var TimePicker = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    start: React.PropTypes.number,
    end: React.PropTypes.number,
    step: React.PropTypes.number,
    formats: React.PropTypes.shape({
      time: React.PropTypes.shape({
        optionTime: React.PropTypes.object
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

  listTimeOptions: function() {
    var times = [];

    var start = parseInt(this.props.start, 10);
    var end = parseInt(this.props.end, 10);
    var step = parseInt(this.props.step, 10);

    for(var i = this.props.start; i < this.props.end; i += step) {
      var minutes = i % 100;

      if(minutes > 59) {
        i -= minutes;
        i += 100;
      }

      times.push(i);
    }

    return times;
  },

  render: function() {
    var self = this;
    return (
      <Input type="select" name={this.props.name} className="form-control" label={this.props.label}>
        {this.listTimeOptions().map(function(time) {
          return (
            <option value={time} key={time}>
              <ReactIntl.FormattedTime value={time} format="short" />
            </option>
          );
        })}
      </Input>
    );
  }
});

module.exports = TimePicker;
