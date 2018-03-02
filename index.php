<?php

// http://js-calendar.loc

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Calendar</title>
    <script src="js-calendar.js?v=<?= filemtime(__DIR__ . '/js-calendar.js') ?>"></script>
    <script>
      window.addEventListener('DOMContentLoaded', function () {

        var jsCalendarWrapper, jsCalendarTarget;

        var jsCalendarCustom = new JsCalendar({
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

        jsCalendarWrapper = jsCalendarCustom.get().wrapper;
        jsCalendarTarget = document.getElementById('js-calendar-target-custom');
        jsCalendarTarget.appendChild(jsCalendarWrapper);

        var jsCalendarDefault = new JsCalendar();

        jsCalendarWrapper = jsCalendarDefault.get().wrapper;
        jsCalendarTarget = document.getElementById('js-calendar-target-default');
        jsCalendarTarget.appendChild(jsCalendarWrapper);

      });
    </script>
    <style>
        .js-calendar-target {
            float: left;
            margin-right: 100px;
        }
    </style>
</head>
<body>
    <div class="js-calendar-target" id="js-calendar-target-custom"></div>
    <div class="js-calendar-target" id="js-calendar-target-default"></div>
</body>
</html>
