'use strict';

var React = require('react');
var FormControl = require('react-bootstrap').FormControl;
var PropTypes = require('prop-types');

class TimeInput extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className={this.props.containerClassName}>
        <FormControl
          componentClass="select"
          value={this.props.value}
          name={this.props.name}
          className={this.props.className}
          label={this.props.label}
          onChange={this.props.onChange}
          id={this.props.id}
        >
          {this.props.options.map(option => {
            return (
              <option key={option} value={option}>{option}</option>
            );
          })}
        </FormControl>
      </div>
    );
  }
};

TimeInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  options: PropTypes.object,
  onChange: PropTypes.func
};

module.exports = TimeInput;
