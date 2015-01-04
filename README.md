percentage-js
=============

#####Convert numbers, dates, times, filesize, mass and lengths, to percentage.

####`Percentage.num(n1, n2, [decimal]);`

    var p = Percentage.num(28, 87);
    // p = 32.18

    var p = Percentage.num(28, 87, 10);
    // p = 32.183908046


####`Percentage.dates(date, start, end, [decimal]);`

    var p = Percentage.dates("2013-04-05", "2013", "2014");
    // p = 25.80

    var p = Percentage.dates("2013-04-05 18:36:32", "2013-01-31", "2014-01-01 12:00");
    // p = 19.29

Support others formatting options from Date object.

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

####`Percentage.lengths(length1, length2, [decimal]);`

    var p = Percentage.lengths("0.8km", "1800yd")
    // p = 48.60

    var p = Percentage.lengths("326.25 m", "5 km");
    // p = 6.53

    var p = Percentage.lengths("60in", "10m");
    // p = 15.24

Length tokens:

- `mm`  > millimeter,
- `cm`  > centimeter,
- `dm`  > decimeter,
- `m`   > meter,
- `km`  > kilometer,
- `ft`  > feet,
- `in`  > inches,
- `yd`  > yard


####`Percentage.mass(mass1, mass2, [decimal]);`

    var p = Percentage.mass("1000g", "1kg");
    // p = 100

    var p = Percentage.mass("1320lb", "1800kg");
    // p = 33.26

Mass tokens:

- `mg`  > milligram,
- `g`   > gram,
- `kg`  > kilogram,
- `lb`  > pound,
- `oz`  > ounce,


####Changing default decimal numbers (2 by default)

    Percentage.DEFAULT_DEMIMAL = 4


####License

percentage-js is licensed under MIT public license.


#%
