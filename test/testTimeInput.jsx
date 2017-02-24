'use strict';

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('chai')
  .use(require('dirty-chai')).expect;

var Input = require('react-bootstrap').Input;

var assert = require('assert');
var { shallow } = require('enzyme');

var TimeInput = require('../src/TimeInput');

describe('TimeInput', function() {
  var props;

  beforeEach(function() {
    props = {
      className: 'input-sm',
      label: 'Time',
      options: ['1', '2', '3'],
      value: new Date()
    };
  });

  it('is an element', function() {
    assert(TestUtils.isElement(<TimeInput />));
  });

  describe('render', function() {
    it('should render an Input field', function() {
      var timeInput = shallow(<TimeInput {...props} />);
      expect(timeInput.find(Input)).to.have.length(1);
    });

    it('should render an Input field with type select', function() {
      var timeInput = shallow(<TimeInput {...props} />);
      expect(timeInput.find(Input).props().type).to.equal('select');
    });

    it('should render an Input field with a className prop', function() {
      var timeSelect = shallow(<TimeInput {...props} />);
      expect(timeSelect.find(Input).props().className).to.equal(props.className);
    });

    it('should render an Input field with a value prop', function() {
      var timeSelect = shallow(<TimeInput {...props} />);
      expect(timeSelect.find(Input).props().value).to.equal(props.value);
    });

    it('fills the select box with a range of times', function() {
      var timeSelect = shallow(<TimeInput {...props} />);
      expect(timeSelect.find(Input).children()).to.have.length(props.options.length);
    });
  });
});
