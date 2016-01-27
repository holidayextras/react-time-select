# react-time-select

[React](https://facebook.github.io/react/) Component to render a [React Bootstrap](https://react-bootstrap.github.io/) dropdown list pre-filled with localizable times formatted by [ReactIntl](http://formatjs.io/react/). Requires react v0.14.2.

```
var TimeSelect = require('react-time-select');
React.render(<TimeSelect label="Choose time" />, document.getElementById('container'));
```

## Options

- __className__ - `class` attribute to be applied to element. Default "input-sm".
- __label__ - Label for field. Default "Time".
- __name__ - Name for field. Default "Time".
- __value__ - JS Date instance representing the time to be displayed.
- __onChange__ - Event handler for when a time is selected. It will be passed a date instance set to that time, with years/months/days to match the date you provided as __value__, or today's date if it was not present.
- __start__ - Time to start from when generating range, for example `start={1230}`. Default is {30} (00:30).
- __end__ - Time to stop generating range. Default is {2359}. Will not be listed as an option if your "step" value overruns it.
- __step__ - Number of minutes between each option. Default is {30}.
- __locale__ - Locales ReactIntl should attempt to use for formatting. Default is 'en-GB'

## Developing

Clone the repo and `npm install`.

`npm start` will create and watchify an example which you can open in your browser, at `doc/example.html`

`npm test` for the unit tests.

`npm run coverage` gets coverage with istanbul, report is output to the `coverage` directory. It will exit nonzero if any metric is below 95%

`npm run lint` checks the code against our [guidelines](https://github.com/holidayextras/culture/blob/master/.eslintrc)
