<?php

// http://js-calendar.loc

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Calendar</title>
    <script src="calendar.js?v=<?= filemtime(__DIR__ . '/calendar.js') ?>"></script>
    <script>
      window.addEventListener('DOMContentLoaded', function () {
        var jsCalendar = new JsCalendar();
        var jsCalendarMarkup = jsCalendar.get().markup;
        var jsCalendarTarget = document.getElementById('js-calendar-target');
        jsCalendarTarget.appendChild(jsCalendarMarkup);
      });
    </script>
</head>
<body>
    <div id="js-calendar-target"></div>
</body>
</html>
