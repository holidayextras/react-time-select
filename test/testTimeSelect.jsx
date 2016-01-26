'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('chai')
.use(require('dirty-chai')).expect;

var Input = require('react-bootstrap').Input;
var ReactIntl = require('react-intl');

var assert = require('assert');
var sinon = require('sinon');
var shallow = require('enzyme').shallow;

var TimeSelect = require('../src/TimeSelect');

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
        label: 'Time',
        locale: 'en-GB',
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
    var props;
    beforeEach(function() {
      props = {
        type: 'select',
        name: 'Time',
        className: 'input-sm',
        label: 'Time'
      };
    });

    it('should render the reactIntl', function() {
      var timeSelect = shallow(<TimeSelect />);
      expect(timeSelect.find(ReactIntl.IntlProvider)).to.have.length(1);
    });

    it('should render the Input field', function() {
      var timeSelect = shallow(<TimeSelect />);
      expect(timeSelect.find(Input)).to.have.length(1);
    });

    it('should render the Input field with a type prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(Input).props().type).to.equal(props.type);
    });

    it('should render the Input field with a name prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(Input).props().name).to.equal(props.name);
    });

    it('should render the Input field with a className prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(Input).props().className).to.equal(props.className);
    });

    it('should render the Input field with a value prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(Input).props().value).to.equal(props.value);
    });

    it('fills the select box with a range of times', function() {
      var timeSelect = shallow(<TimeSelect/>);
      expect(timeSelect.find(Input).children()).to.have.length(47);
    });

    it('can adjust the range with start, end and step', function() {
      var timeSelect = shallow(<TimeSelect start={1000} end={1130} step={15} />);
      expect(timeSelect.find(Input).children()).to.have.length(6);
    });

    it('will not generate broken times if given strings for start, end and step', function() {
      // Will print warnings in development though, of course
      var timeSelect = shallow(<TimeSelect start={'1000'} end={'1130'} step={'15'} />);
      expect(timeSelect.find(Input).children()).to.have.length(6);
    });

    it('can be localised', function() {
      var timeSelect = shallow(<TimeSelect start={1000} end={1130} step={15} locale="en-US"/>);
      expect(timeSelect.find(ReactIntl.FormattedTime)).to.have.length(6);
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
        React.addons.TestUtils.Simulate.change(node, {
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

      React.addons.TestUtils.Simulate.change(node, {
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

      React.addons.TestUtils.Simulate.change(node, {
        target: {
          value: '14:30'
        }
      });

      sinon.assert.calledWith(handler, new Date(2016, 7, 8, 14, 30, 0, 0));
    });
  });
});
