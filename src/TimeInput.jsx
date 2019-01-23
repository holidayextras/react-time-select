'use strict';

var React = require('react');
var Input = require('react-bootstrap').Input;
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var TimeInput = createReactClass({
  propTypes: {
    id: PropTypes.string,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.instanceOf(Date),
    options: PropTypes.object,
    onChange: PropTypes.func
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
