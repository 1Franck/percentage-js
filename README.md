percentage-js
=============

####`Percentage.num(n1, n2, [decimal]);`

    var p = Percentage.dates(28, 87);
    // p = 32.18

    var p = Percentage.dates(28, 87, 10);
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

    var p = Percentage.times("3h2min30sec", "1d12h")
    // p = 8.12

####Changing default decimal numbers (2 by default)

    `Percentage.DEFAULT_DEMIMAL = 4`