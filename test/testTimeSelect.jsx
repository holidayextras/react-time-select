'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Input = require('react-bootstrap').Input;
var ReactIntl = require('react-intl');

var assert = require('assert');
var sinon = require('sinon');

var TimeSelect = require('../');

var valuesOfOptions = function(component) {
  return component.props.children.map(function(option) {
    return option.props.value;
  });
};

var shallowRender = function(jsx) {
  var shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(jsx);
  return shallowRenderer.getRenderOutput();
};

describe('TimeSelect', function() {
  it('is an element', function() {
    assert(TestUtils.isElement(<TimeSelect />));
  });

  describe('props', function() {
    it('has default values for many props', function() {
      var element = <TimeSelect />

      assert.deepEqual(element.props, {
        className: 'input-sm',
        start: 30,
        step: 30,
        end: 2359,
        name: 'Time',
        label: 'Time',
        locales: [ 'en-GB' ],
        formats: {
          time: {
            short: {
              hour: '2-digit',
              minute: '2-digit'
            }
          }
        }
      });
    });
  });

  describe('render', function() {
    it('creates a react-bootstrap select input', function() {
      var renderOutput = shallowRender(<TimeSelect />);
      assert.equal(renderOutput.type, Input);
      assert.equal(renderOutput.props.type, 'select');
    });

    it('fills the select box with a range of times', function() {
      var renderOutput = shallowRender(<TimeSelect />);
      assert.deepEqual(valuesOfOptions(renderOutput), [
        '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00',
        '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00',
        '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
        '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
        '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
        '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
      ]);
    });

    it('can adjust the range with start, end and step', function() {
      var renderOutput = shallowRender(<TimeSelect start={1000} end={1130} step={15} />);
      assert.deepEqual(valuesOfOptions(renderOutput), [
        '10:00', '10:15', '10:30', '10:45', '11:00', '11:15'
      ]);
    });

    it('will not generate broken times if given strings for start, end and step', function() {
      // Will print warnings in development though, of course
      var renderOutput = shallowRender(<TimeSelect start="1000" end="1130" step="15" />);
      assert.deepEqual(valuesOfOptions(renderOutput), [
        '10:00', '10:15', '10:30', '10:45', '11:00', '11:15'
      ]);
    });

    it('can be localised', function() {
      var renderOutput = shallowRender(<TimeSelect start={1000} end={1130} step={15} locales={['en-US']} />);
      console.log(renderOutput.props.formats)
      React.renderToString(renderOutput);
      return;
      renderOutput.props.children.forEach(function(option) {
        assert.equal(option.props.children.type, ReactIntl.FormattedTime);
        console.log(React.renderToString(option.props.children))
        console.log(option.props.children);
      });
    });
  });

  describe('events', function() {

  });
});
