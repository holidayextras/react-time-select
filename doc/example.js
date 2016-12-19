'use strict';
/* eslint-disable no-alert */

var React = require('react');
var ReactDOM = require('react-dom');
var TimeSelect = require('../src/TimeSelect.jsx');

var myDate = new Date('2015-05-05T09:00');
var outputDate = function(dateInstance) {
  myDate = dateInstance;
  alert('selected date (with time) is ' + dateInstance);
};

ReactDOM.render(
  <div>
    <h1>Defaults</h1>
    <TimeSelect />

    <h1>With options</h1>
    <TimeSelect label="Choose a time" name="TheTime" start={330} end={2130} step={15} id="timeSelectWithOptions"/>

    <h1>With small step</h1>
    <TimeSelect step={5} id="timeSelectWithSmallStep"/>

    <h1>With locale</h1>
    <TimeSelect locale="en-US" id="timeSelectWithLocale"/>

    <h1>With default value</h1>
    <TimeSelect label="9 AM" value={myDate} id="timeSelectWithDefaultValue"/>

    <h1>With behaviour</h1>
    <TimeSelect label="Alert this time" onChange={outputDate} id="timeSelectWithBehaviour"/>
  </div>
  ,
  document.getElementById('container')
);
