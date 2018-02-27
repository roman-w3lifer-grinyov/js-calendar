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
        var jsCalendar = new JsCalendar();
        var jsCalendarWrapper = jsCalendar.get().wrapper;
        var jsCalendarTarget = document.getElementById('js-calendar-target');
        jsCalendarTarget.appendChild(jsCalendarWrapper);
      });
    </script>
</head>
<body>
    <div id="js-calendar-target"></div>
</body>
</html>
