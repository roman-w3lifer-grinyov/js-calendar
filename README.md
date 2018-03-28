# JS Calendar

- [Installation](#installation)
  - [Composer](#composer)
  - [NPM](#npm)
- [Usage](#usage)
- [Configuration](#configuration)
- [`get()` method](#get-method)
- [Example of markup](#example-of-markup)

## Installation

### Composer

``` shell
composer require npm-asset/w3lifer--js-calendar
```

### NPM

``` shell
npm i @w3lifer/js-calendar
```

## Usage

``` js
var jsCalendar = new JsCalendar();
var jsCalendarWrapper = jsCalendar.get().wrapper;
var jsCalendarTarget = document.getElementById('js-calendar-target');
jsCalendarTarget.appendChild(jsCalendarWrapper);
```

## Configuration

``` js
// Default

var jsCalendar = new JsCalendar({
  language: 'en',
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  weekDayAbbrs: [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ],
  firstDayOfWeek: 1
});

// Custom

var jsCalendar = new JsCalendar({
  language: 'en',
  monthNames: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  weekDayAbbrs: [
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su'
  ],
  firstDayOfWeek: 7
});
```

## `get()` method

`get(numberOfMonths, timestamp)`

This method is the main public method in this class.

It returns an object that has the following public properties:

- `wrapper HTMLDivElement` — the wrapper of the calendar;
- `prevTimestamp Number` — the timestamp for the prev period;
- `nextTimestamp Number` — the timestamp for the next period.

## Example of markup

``` html
<div class="js-calendar">
  <div class="month-box" data-month-number="2">
    <table>
      <caption>
        <span class="month-title">
          <span class="month-name">February</span>
          <span class="year-name">2018</span>
        </span>
      </caption>
      <tr>
        <th>Mon
        <th>Tue
        <th>Wed
        <th>Thu
        <th>Fri
        <th>Sat
        <th>Sun
      </tr>
      <tr>
        <td data-unix-timestamp="-259200" class="other-month">
          <span class="day">29</span>
        <td data-unix-timestamp="-172800" class="other-month">
          <span class="day">30</span>
        <td data-unix-timestamp="-86400" class="other-month">
          <span class="day">31</span>
        <td data-unix-timestamp="0">
          <span class="day">1</span>
        <td data-unix-timestamp="86400">
          <span class="day">2</span>
        <td data-unix-timestamp="172800">
          <span class="day">3</span>
        <td data-unix-timestamp="259200">
          <span class="day">4</span>
      ...
    </table>
  </div>
  ...
</div>
```
