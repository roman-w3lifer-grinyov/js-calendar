;'use strict';

/**
 * @constructor
 *
 * @param {Object} [config={}]
 * @param {String} config.language
 * @param {Array}  config.monthNames
 * @param {Array}  config.weekDayAbbrs
 * @param {Number} config.firstDayOfWeek
 *
 * @see _language
 * @see _monthNames
 * @see _weekDayAbbrs
 * @see _firstDayOfWeek
 *
 * @see README.md Usage.
 */
function JsCalendar(config) {

  // Configuration

  if (config) {
      this._config = JSON.parse(JSON.stringify(config));
  }

  // Language

  if (this._config.language) {
      if (JsCalendar._i18n.monthNames[this._config.language]) {
        this._language = this._config.language;
      }
      delete this._config.language;
  }

  // Month names

  if (this._config.monthNames) {
    this._setMonthNames(this._config.monthNames);
    delete this._config.monthNames;
  } else {
    this._monthNames = JsCalendar._i18n.monthNames[this._language];
  }

  // Week day abbreviations

  if (this._config.weekDayAbbrs) {
    this._setWeekDayAbbrs(this._config.weekDayAbbrs);
    delete this._config.weekDayAbbrs;
  } else {
    this._weekDayAbbrs = JsCalendar._i18n.weekDayAbbrs3[this._language];
  }

  // First day of week

  if (this._config.firstDayOfWeek) {
    // noinspection JSCheckFunctionSignatures
    var firstDayOfWeek = parseInt(this._config.firstDayOfWeek);
    if (firstDayOfWeek === false) {
      throw new Error('Type of the "firstDayOfWeek" property must be integer');
    }
    this._setFirstDayOfWeek_ByWeekDayNumber(firstDayOfWeek);
    delete this._config.firstDayOfWeek;
  }

  // Check on unknown properties

  // noinspection LoopStatementThatDoesntLoopJS
  for (var property in this._config) {
    throw new Error('Setting unknown property: ' + property);
  }

}

/*
 * =============================================================================
 * PRIVATE PROPERTIES
 * =============================================================================
 */

/**
 * Translations of month names, week day names and week day abbreviations.
 * @type {Array}
 * @private
 */
JsCalendar._i18n = {
  monthNames: {
    be:['Студзень','Люты','Сакавік','Красавік','Травень (Май)','Чэрвень','Ліпень','Жнівень','Верасень','Кастрычнік','Лістапад','Снежань'],
    en:['January','February','March','April','May','June','July','August','September','October','November','December'],
    ru:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
  },
  weekDayNames: {
    be:['Панядзелак','Аўторак','Серада','Чацвер','Пятніца','Субота','Нядзеля'],
    en:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    ru:['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']
  },
  weekDayAbbrs2: {
    be:['Пн','Аў','Ср','Чц','Пт','Сб','Нд'],
    en:['Mo','Tu','We','Th','Fr','Sa','Su'],
    ru:['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
  },
  weekDayAbbrs3: {
    be:['Пнд','Аўт','Сер','Чцв','Пят','Суб','Няд'],
    en:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    ru:['Пнд','Втр','Срд','Чтв','Птн','Сбт','Вск']
  }
};

/**
 * @type {Object}
 * @private
 */
JsCalendar.prototype._config = {};

/**
 * Two-letter lowercase language code according to ISO-639-1.
 * @type {String}
 * @private
 * @see https://loc.gov/standards/iso639-2/php/code_list.php
 */
JsCalendar.prototype._language = 'en';

/**
 * Month names: 12 elements.
 * @type {Array}
 * @private
 */
JsCalendar.prototype._monthNames = [];

/**
 * Week day abbreviations: 7 elements.
 * @type {Array}
 * @private
 */
JsCalendar.prototype._weekDayAbbrs = [];

/**
 * First day of week: 1 (Monday) - 7 (Sunday).
 * @type {Number}
 * @private
 */
JsCalendar.prototype._firstDayOfWeek = 1;

/**
 * Current Unix timestamp.
 * @type {Number}
 * @private
 */
JsCalendar.prototype._today = null;

/*
 * =============================================================================
 * METHODS
 * =============================================================================
 */

/**
 * Sets month names.
 * @param {Array} monthNames January (0) - December (11).
 * @throws Error
 * @private
 */
JsCalendar.prototype._setMonthNames = function (monthNames) {
  if (monthNames.length !== 12) {
    throw new Error('The number of month names must be 12');
  }
  this._monthNames = monthNames;
};

/**
 * Sets week day abbreviations.
 * @param {Array} weekDayAbbrs Monday (0) - Sunday (6).
 * @throws Error
 * @private
 */
JsCalendar.prototype._setWeekDayAbbrs = function (weekDayAbbrs) {
  if (weekDayAbbrs.length !== 7) {
    throw new Error('The number of week day abbreviations must be 7');
  }
  this._weekDayAbbrs =  weekDayAbbrs;
};

/**
 * Sets number of the first day of week by week day number.
 * @param {Number} weekDayNumber Week day number (1-7).
 * @throws Error
 * @private
 */
JsCalendar.prototype._setFirstDayOfWeek_ByWeekDayNumber =
  function (weekDayNumber) {
    if (weekDayNumber < 1 || weekDayNumber > 7) {
      throw new Error(
        'The week day number must be in range from 1 to 7 inclusively'
      );
    }
    this._firstDayOfWeek = weekDayNumber;
    this._shiftWeekDayAbbrs();
  };

/**
 * Shifts week day abbreviations by number of the first day of week.
 * @private
 */
JsCalendar.prototype._shiftWeekDayAbbrs = function () {
  for (var i = 1; i < this._firstDayOfWeek; i++) {
    this._weekDayAbbrs.push(this._weekDayAbbrs.shift());
  }
};

// noinspection JSUnusedGlobalSymbols
/**
 * For more details see DocBlock of the class itself.
 * @param {Number} [numberOfMonths=6]
 * @param {Number} [timestamp=new Date()]
 * @return {Object} Properties: wrapper, prevTimestamp, nextTimestamp.
 */
JsCalendar.prototype.get = function (numberOfMonths, timestamp) {

  this._setToday();

  numberOfMonths = numberOfMonths || 6;

  var date = timestamp ? new Date(timestamp) : new Date();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;

  var calendar = '';

  for (var i = 1; i <= numberOfMonths; i++) {
    calendar += this._getMonthMarkup(year, month);
    month++;
    if (month === 13) {
      year++;
      month = 1;
    }
  }

  var prevTimestamp = new Date(year, month - 1 - numberOfMonths * 2).getTime();
  var nextTimestamp = new Date(year, month - 1).getTime();

  var wrapper = document.createElement('div');
  wrapper.classList.add('js-calendar');
  wrapper.innerHTML = calendar;

  return {
    wrapper: wrapper,
    prevTimestamp: prevTimestamp,
    nextTimestamp: nextTimestamp
  };

};

/**
 * Sets current Unix timestamp to the `_today` property.
 * @private
 */
JsCalendar.prototype._setToday = function () {
  var now = new Date();
  now.setHours(0, 0, 0, 0); // Therefore, Date.now() can not be used [!]
  this._today = now.getTime();
};

/**
 * Returns month table as HTML string.
 * @param {Number} year
 * @param {Number} month 1-12 [!]
 * @return {String}
 * @private
 */
JsCalendar.prototype._getMonthMarkup = function (year, month) {

  var matrix = this._getMonthMatrix(year, month);

  var table =
    '<div class="month-box" data-month-number="' + month + '">' +
      '<table>' +
        '<caption>' +
          '<span class="month-title">' +
            '<span class="month-name">' +
              this._monthNames[month - 1] +
            '</span>' +
            '<span class="year-name">' +
              year +
            '</span>' +
          '</span>' +
        '</caption>' +
        '<tr><th>' + this._weekDayAbbrs.join('<th>') +
        '<tr>';

  var now = new Date;

  for (var i = 0; i < matrix.length; i++) {

    now.setTime(matrix[i]);

    var day = now.getDate();
    day =
      matrix[i] === this._today
        ?
          '<span class="day today">' +
            day +
          '</span>'
        : '<span class="day">' + day + '</span>';

    var td = '<td data-unix-timestamp="' + (matrix[i] / 1000) + '"';

    if ((i + 1) % 7 === 0 && i !== (matrix.length - 1)) {
      table += td + '>' + day + '<tr>';
    } else {
      td +=
        now.getMonth() + 1 !== month
          ? ' class="other-month">'
          : '>';
      table += td + day;
    }

  }

  table += '</table></div>';

  return table;

};

/**
 * Returns array of Unix timestamps, which represents month days.
 * @param {Number} year
 * @param {Number} month 1-12 [!]
 * @return {Array}
 * @private
 */
JsCalendar.prototype._getMonthMatrix = function (year, month) {

  // Initial data

  var i;
  var now = new Date(year, month - 1);
  var matrix = [];

  // First "row"

  var interval = JsCalendar.getWeekDayNumber(now) - this._firstDayOfWeek;
  if (interval < 0) {
    interval += 7;
  }
  now.setDate(1 - interval);
  while (now.getMonth() + 1 !== month) {
    matrix.push(now.getTime());
    now.setDate(now.getDate() + 1);
  }

  // Days

  var daysInMonth = JsCalendar.getDaysInMonth(year, month);
  for (i = 1; i <= daysInMonth; i++) {
    matrix.push(now.getTime());
    now.setDate(i + 1);
  }

  // Last "row"

  interval = this._firstDayOfWeek - JsCalendar.getWeekDayNumber(now);
  if (interval < 0) {
    interval += 7;
  }
  for (i = 1; i <= interval; i++) {
    matrix.push(now.getTime());
    now.setDate(i + 1);
  }

  // Return

  return matrix;

};

/**
 * @param {Object} date
 * @return {Number} 1-7 [!]
 */
JsCalendar.getWeekDayNumber = function (date) {
  return date.getDay() === 0 ? 7 : date.getDay();
};

/**
 * @param {Number} year
 * @param {Number} month 1-12 [!]
 * @return {Number}
 */
JsCalendar.getDaysInMonth = function (year, month) {
  return new Date(year, month, 0).getDate();
};
