'use strict';

var React = require('react');
var TestUtils = require('react-dom/test-utils');
var expect = require('chai')
.use(require('dirty-chai')).expect;

var FormControl = require('react-bootstrap').FormControl;

var ReactIntl = require('react-intl');

var assert = require('assert');
var sinon = require('sinon');
var { shallow, mount, configure } = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

var TimeSelect = require('../src/TimeSelect');
var HourInput = require('../src/HourInput');
var MinuteInput = require('../src/MinuteInput');

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
        seperateHourMins: false,
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
        name: 'Time',
        className: 'input-sm',
        label: 'Time'
      };
    });

    it('should render the reactIntl', function() {
      var timeSelect = shallow(<TimeSelect />);
      expect(timeSelect.find(ReactIntl.IntlProvider)).to.have.length(1);
    });

    it('can be provided a default value as a Date instance', function() {
      var date = new Date(2015, 1, 1, 15, 30);
      var timeSelect = shallow(<TimeSelect value={date}/>);
      expect(timeSelect.find(FormControl).props().value).to.equal('15:30');
    });

    it('should render the FormControl field', function() {
      var timeSelect = shallow(<TimeSelect />);
      expect(timeSelect.find(FormControl)).to.have.length(1);
    });

    it('should render the FormControl field with a componentClass prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(FormControl).props().componentClass).to.equal('select');
    });

    it('should render the FormControl field with a name prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(FormControl).props().name).to.equal(props.name);
    });

    it('should render the FormControl field with a className prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(FormControl).props().className).to.equal(props.className);
    });

    it('should render the FormControl field with a value prop', function() {
      var timeSelect = shallow(<TimeSelect {...props}/>);
      expect(timeSelect.find(FormControl).props().value).to.equal(props.value);
    });

    it('fills the select box with a range of times', function() {
      var timeSelect = shallow(<TimeSelect/>);
      expect(timeSelect.find(FormControl).children()).to.have.length(47);
    });

    it('can adjust the range with start, end and step', function() {
      var timeSelect = shallow(<TimeSelect start={1000} end={1130} step={15} />);
      expect(timeSelect.find(FormControl).children()).to.have.length(6);
    });

    it('will not generate broken times if given strings for start, end and step', function() {
      // Will print warnings in development though, of course
      var timeSelect = shallow(<TimeSelect start={'1000'} end={'1130'} step={'15'} />);
      expect(timeSelect.find(FormControl).children()).to.have.length(6);
    });

    it('the time can be formatted', function() {
      var timeSelect = shallow(<TimeSelect start={1000} end={1130} step={15} locale="en-US"/>);
      expect(timeSelect.find(ReactIntl.FormattedTime)).to.have.length(6);
    });

    it('can be localised to a US format', function() {
      var timeSelect = mount(<TimeSelect start={1000} end={1030} step={30} locale="en-US"/>);
      expect(timeSelect.find(ReactIntl.FormattedTime).text()).to.contain('10:00');
    });

    it('passes an id prop to the FormControl component', function() {
      var timeSelect = shallow(<TimeSelect {...props} id="timeSelect"/>);
      expect(timeSelect.find(FormControl).prop('id')).to.equal('timeSelect');
    });

    context('seperateHourMins', function() {
      beforeEach(function() {
        props = {
          time: {
            hours: '10',
            minutes: '5'
          },
          seperateHourMins: true
        };
      });

      it('should have a hours input', function() {
        var timeSelect = mount(<TimeSelect {...props}/>);
        expect(timeSelect.find(HourInput));
      });

      it('should have a minutes input', function() {
        var timeSelect = shallow(<TimeSelect {...props}/>);
        expect(timeSelect.find(MinuteInput));
      });

      it('should use current time as value', function() {
        var timeSelect = shallow(<TimeSelect {...props}/>);
        expect(timeSelect.find(HourInput).props().value).to.equal(props.time.hours);
        expect(timeSelect.find(MinuteInput).props().value).to.equal(props.time.minutes);
      });

      it('fills the hours select box with 24 hours', function() {
        var timeSelect = mount(<TimeSelect {...props}/>);
        expect(timeSelect.find(HourInput).props().options).to.have.length(24);
      });

      it('fills the minutes select box with range from steps prop', function() {
        props.step = 5;
        var timeSelect = mount(<TimeSelect {...props}/>);
        expect(timeSelect.find(MinuteInput).props().options).to.have.length(12);
      });
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

    it('will emit a time up if an option is chosen', function() {
      var handler = sinon.stub();
      var doc = TestUtils.renderIntoDocument(<TimeSelect onChange={handler} />);
      var node = TestUtils.findRenderedDOMComponentWithTag(doc, 'select');

      TestUtils.Simulate.change(node, {
        target: {
          value: '11:30'
        }
      });

      sinon.assert.calledWith(handler, { hours: '11', minutes: '30' });
    });

    context('seperateHourMins', function() {
      var time;

      beforeEach(function() {
        time = {
          hours: '11',
          minutes: '55'
        };
      });

      context('hours', function() {
        it('will emit hours up if an option is chosen', function() {
          var handler = sinon.stub();
          var doc = TestUtils.renderIntoDocument(<TimeSelect seperateHourMins={true} time={time} onChange={handler} />);
          var node = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'select')[0];

          TestUtils.Simulate.change(node, {
            target: {
              value: '14'
            }
          });

          sinon.assert.calledWith(handler, { hours: '14', minutes: '55' });
        });
      });

      context('minutes', function() {
        it('will emit minutes up if an option is chosen', function() {
          var handler = sinon.stub();
          var doc = TestUtils.renderIntoDocument(<TimeSelect seperateHourMins={true} time={time} onChange={handler} />);
          var node = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'select')[1];

          TestUtils.Simulate.change(node, {
            target: {
              value: '50'
            }
          });

          sinon.assert.calledWith(handler, { hours: '11', minutes: '50' });
        });
      });
    });
  });
});
