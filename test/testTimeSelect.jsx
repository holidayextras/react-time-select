var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assert = require('assert');
var TimeSelect = require('../');

describe('TimeSelect', function() {
  it('is an element', function() {
    assert(TestUtils.isElement(<TimeSelect />));
  });

  describe('props', function() {
    it('has default values for many props', function() {

    });
  });
});
