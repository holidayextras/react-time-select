'use strict';

var React = require('react');
var TestUtils = require('react-addons-test-utils');

var Input = require('react-bootstrap').Input;
var ReactIntl = require('react-intl');

var assert = require('assert');
var sinon = require('sinon');
var shallowRender = require('react-shallow-render');

var TimeSelect = require('../src/TimeSelect');

var valuesOfOptions = function(component) {
  return component.props.children.map(function(option) {
    return option.props.value;
  });
};

describe('TimeSelect', function() {
  it('is an element', function() {
    assert(TestUtils.isElement(<TimeSelect />));
  });

  describe('props', function() {
    it('has default values for many props', function() {
      var element = <TimeSelect />;

      assert.deepEqual(element.props, {
        className: 'input-sm',
        start: 30,
        step: 30,
        end: 2359,
        name: 'Time',
        label: 'Time'
      });
    });
  });

  describe('render', function() {
    it('creates a react-bootstrap select input', function() {
      var renderOutput = shallowRender(<TimeSelect />);
      assert.equal(renderOutput.type, ReactIntl.IntlProvider);
      assert.equal(renderOutput.props.children.type, Input);
      assert.equal(renderOutput.props.children.props.type, 'select');
    });

    it('can be provided a default value as a Date instance', function() {
      var date = new Date(2015, 1, 1, 15, 30);
      var renderOutput = shallowRender(<TimeSelect value={date} />);
      assert.equal(renderOutput.props.children.value, '15:30');
    });

    it('passes through name, label and className', function() {
      var renderOutput = shallowRender(<TimeSelect name="foo" label="bar" className="baz" />);

      assert.equal(renderOutput.props.name, 'foo');
      assert.equal(renderOutput.props.className, 'baz');
      assert.equal(renderOutput.props.label, 'bar');
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

      // All options contain a FormattedTime child node from the react-intl library
      renderOutput.props.children.forEach(function(option) {
        assert.equal(option.props.children.type, ReactIntl.FormattedTime);
      });

      // FormattedTimes expect date instances as a starting point to be formatted
      assert.deepEqual(renderOutput.props.children.map(function(option) {
        var date = option.props.children.props.value;
        return [ date.getHours(), date.getMinutes() ];
      }), [ [10, 0], [10, 15], [10, 30], [10, 45], [11, 0], [11, 15] ]);
    });
  });

  describe('events', function() {
    var clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers(new Date(2015, 5, 6).valueOf());
    });

    afterEach(function() {
      clock.restore();
    });

    it('will not throw if a change handler is not supplied', function() {
      var doc = TestUtils.renderIntoDocument(<TimeSelect />);
      var node = TestUtils.findRenderedDOMComponentWithTag(doc, 'select');

      assert.doesNotThrow(function() {
        TestUtils.Simulate.change(node, {
          target: {
            value: '11:30'
          }
        });
      });
    });

    it('will emit a date up if an option is chosen', function() {
      var handler = sinon.stub();
      var doc = TestUtils.renderIntoDocument(<TimeSelect onChange={handler} />);
      var node = TestUtils.findRenderedDOMComponentWithTag(doc, 'select');

      TestUtils.Simulate.change(node, {
        target: {
          value: '11:30'
        }
      });

      sinon.assert.calledWith(handler, new Date(2015, 5, 6, 11, 30, 0, 0));
    });

    it('will use a passed in date for the values of days/months/years', function() {
      var handler = sinon.stub();
      var date = new Date(2016, 7, 8);
      var doc = TestUtils.renderIntoDocument(<TimeSelect onChange={handler} value={date} />);
      var node = TestUtils.findRenderedDOMComponentWithTag(doc, 'select');

      TestUtils.Simulate.change(node, {
        target: {
          value: '14:30'
        }
      });

      sinon.assert.calledWith(handler, new Date(2016, 7, 8, 14, 30, 0, 0));
    });
  });
});
