'use strict';

var React = require('react');
var TimeInput = require('./TimeInput');

var HourInput = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
    options: React.PropTypes.object
  },

  render: function() {
    return (
      <TimeInput
        id={this.props.id}
        value={this.props.value}
        className={this.props.className}
        containerClassName="col-xs-6"
        label="Hours"
        options={this.props.options}
        onChange={this.props.onChange} />
    );
  }
});

module.exports = HourInput;
