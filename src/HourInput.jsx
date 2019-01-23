'use strict';

var React = require('react');
var TimeInput = require('./TimeInput');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var HourInput = createReactClass({
  propTypes: {
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    options: PropTypes.object
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
