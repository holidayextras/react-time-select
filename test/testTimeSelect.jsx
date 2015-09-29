'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var assert = require('assert');
var sinon = require('sinon');

var TimeSelect = require('../');

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

});
