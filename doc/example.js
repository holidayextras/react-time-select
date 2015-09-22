var React = require('react');
var TimeSelect = require('../index.js');

React.render(
  <div>
    <h1>Defaults</h1>
    <TimeSelect />

    <h1>With options</h1>
    <TimeSelect label="Choose a time" name="TheTime" start={330} end={2130} step={15} />

    <h1>With locale</h1>
    <TimeSelect locales="" />
  </div>
  ,
  document.getElementById('container')
);
