percentage-js
=============

Convert numbers, dates, times, filesize to percentage.

####`Percentage.num(n1, n2, [decimal]);`

    var p = Percentage.num(28, 87);
    // p = 32.18

    var p = Percentage.num(28, 87, 10);
    // p = 32.183908046


####`Percentage.dates(date, start, end, [decimal]);`

    var p = Percentage.dates("2013-04-05", "2013", "2014");
    // p = 25.75

    var p = Percentage.dates("2013-04-05 18:15:05", "2013-01-31", "2015-01-01 12:00");
    // p = 9.27


####`Percentage.times(time1, time2, [decimal]);`

    var p = Percentage.times("1h", "1d");
    // p = 4.17

    var p = Percentage.times("3h2min30sec", "1d12h")
    // p = 8.45

    var p = Percentage.times("5:35:22", "10:00:00");
    // p = 55.89

Time tokens:
- `ms`  > millisecond,
- `sec` > second,
- `min` > minute,
- `h`   > hour,
- `d`   > day,
- `w`   > week (7 days),
- `m`   > month (based on 365days/12month = 30.41 days),
- `y`   > year (based on 365days)

Alternative syntax:
`[hour(s)]:[minute(s)]:[second(s)].[millisecond(s)]`


####`Percentage.filesize(size1, size2, [decimal]);`

    var p = Percentage.filesize("11.15 mb", "15 mb");
    // p = 74.33

    var p = Percentage.filesize("300mb", "1gb");
    // p = 29.3

Symbol supported: B,KB,MB,GB,TB,PB,EB,ZB,YB (case insensitive).

If no symbol specified, number will be treat as bytes number.


####Changing default decimal numbers (2 by default)

    Percentage.DEFAULT_DEMIMAL = 4