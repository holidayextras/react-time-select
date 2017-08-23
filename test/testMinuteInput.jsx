'use strict';

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('chai')
  .use(require('dirty-chai')).expect;

var assert = require('assert');
var { shallow } = require('enzyme');

var MinuteInput = require('../src/MinuteInput');
var TimeInput = require('../src/TimeInput');

describe('MinuteInput', function() {
  var props;

  beforeEach(function() {
    props = {
      className: 'input-sm',
      options: ['5', '10', '15'],
      value: new Date()
    };
  });

  it('is an element', function() {
    assert(TestUtils.isElement(<MinuteInput />));
  });

  describe('render', function() {
    it('should render an TimeInput field', function() {
      var minuteInput = shallow(<MinuteInput {...props} />);
      expect(minuteInput.find(TimeInput)).to.have.length(1);
    });

    it('should render an TimeInput field with label hours', function() {
      var minuteInput = shallow(<MinuteInput {...props} />);
      expect(minuteInput.find(TimeInput).props().label).to.equal('Minutes');
    });

    it('should render an TimeInput field with a className prop', function() {
      var minuteInput = shallow(<MinuteInput {...props} />);
      expect(minuteInput.find(TimeInput).props().className).to.equal(props.className);
    });

    it('should render an TimeInput field with a value prop', function() {
      var minuteInput = shallow(<MinuteInput {...props} />);
      expect(minuteInput.find(TimeInput).props().value).to.equal(props.value);
    });

    it('should render an TimeInput field with a value prop', function() {
      var minuteInput = shallow(<MinuteInput {...props} />);
      expect(minuteInput.find(TimeInput).props().options).to.equal(props.options);
    });
  });
});
