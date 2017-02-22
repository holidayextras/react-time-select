'use strict';

var React = require('react');
var Input = require('react-bootstrap').Input;

var TimeInput = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    containerClassName: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    options: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  render: function() {
    return (
      <div className={this.props.containerClassName}>
        <Input
          type="select"
          value={this.props.value}
          name={this.props.name}
          className={this.props.className}
          label={this.props.label}
          onChange={this.props.onChange}
          id={this.props.id}
        >
          {this.props.options.map(option => {
            return (
              <option value={option}>{option}</option>
            );
          })}
        </Input>
      </div>
    );
  }
});

module.exports = TimeInput;
