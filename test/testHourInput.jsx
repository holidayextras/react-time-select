'use strict';

var React = require('react');
var TestUtils = require('react-dom/test-utils');
var expect = require('chai')
  .use(require('dirty-chai')).expect;

var assert = require('assert');
var { shallow, configure} = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

var HourInput = require('../src/HourInput');
var TimeInput = require('../src/TimeInput');

describe('HourInput', function() {
  var props;

  beforeEach(function() {
    props = {
      className: 'input-sm',
      options: ['1', '2', '3'],
      value: new Date()
    };
  });

  it('is an element', function() {
    assert(TestUtils.isElement(<HourInput />));
  });

  describe('render', function() {
    it('should render an TimeInput field', function() {
      var hourInput = shallow(<HourInput {...props} />);
      expect(hourInput.find(TimeInput)).to.have.length(1);
    });

    it('should render an TimeInput field with label hours', function() {
      var hourInput = shallow(<HourInput {...props} />);
      expect(hourInput.find(TimeInput).props().label).to.equal('Hours');
    });

    it('should render an TimeInput field with a className prop', function() {
      var hourInput = shallow(<HourInput {...props} />);
      expect(hourInput.find(TimeInput).props().className).to.equal(props.className);
    });

    it('should render an TimeInput field with a value prop', function() {
      var hourInput = shallow(<HourInput {...props} />);
      expect(hourInput.find(TimeInput).props().value).to.equal(props.value);
    });

    it('should render an TimeInput field with a value prop', function() {
      var hourInput = shallow(<HourInput {...props} />);
      expect(hourInput.find(TimeInput).props().options).to.equal(props.options);
    });
  });
});
