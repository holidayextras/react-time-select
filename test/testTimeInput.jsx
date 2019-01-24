'use strict';

var React = require('react');
var TestUtils = require('react-dom/test-utils');
var expect = require('chai')
  .use(require('dirty-chai')).expect;

var FormControl = require('react-bootstrap').FormControl;

var assert = require('assert');
var { shallow, configure } = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

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
    it('should render a FormControl field', function() {
      var timeInput = shallow(<TimeInput {...props} />);
      expect(timeInput.find(FormControl)).to.have.length(1);
    });

    it('should render an FormControl field with componentClass select', function() {
      var timeInput = shallow(<TimeInput {...props} />);
      expect(timeInput.find(FormControl).props().componentClass).to.equal('select');
    });

    it('should render an FormControl field with a className prop', function() {
      var timeSelect = shallow(<TimeInput {...props} />);
      expect(timeSelect.find(FormControl).props().className).to.equal(props.className);
    });

    it('should render an FormControl field with a value prop', function() {
      var timeSelect = shallow(<TimeInput {...props} />);
      expect(timeSelect.find(FormControl).props().value).to.equal(props.value);
    });

    it('fills the select box with a range of times', function() {
      var timeSelect = shallow(<TimeInput {...props} />);
      expect(timeSelect.find(FormControl).children()).to.have.length(props.options.length);
    });
  });
});
