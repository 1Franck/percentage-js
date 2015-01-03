/**
 * Numbers
 */
QUnit.test("numbers", function(assert) {

    var p = Percentage.num(28, 87);
    assert.strictEqual(p, 32.18, "Percentage.num(28, 87) > result: " + p);

    var p = Percentage.num(28, 87, 10);
    assert.strictEqual(p, 32.183908046, "Percentage.num(28, 87, 10) > result: " + p);
});

/**
 * Dates
 */
QUnit.test("dates", function(assert) {

    var p = Percentage.dates("2013-04-05", "2013", "2014");
    assert.strictEqual(p, 25.75, 'Percentage.dates("2013-04-05", "2013", "2014") > result: ' + p);

    var p = Percentage.dates("2013-04-05 18:15:05", "2013-01-31", "2015-01-01 12:00");
    assert.strictEqual(p, 9.27, 'Percentage.dates("2013-04-05 18:15:05", "2013-01-31", "2015-01-01 12:00") > result: ' + p);
});

/**
 * Times
 */
QUnit.test("times", function(assert) {

    var p = Percentage.times("1h", "1d");
    assert.strictEqual(p, 4.17, 'Percentage.times("1h", "1d") > result: ' + p);

    var p = Percentage.times("3h2min30sec", "1d12h");
    assert.strictEqual(p, 8.45, 'Percentage.times("3h2min30sec", "1d12h") > result: ' + p);

    var p = Percentage.times("1d", "1w");
    assert.strictEqual(p, 14.29, 'Percentage.times("1d", "1w") > result: ' + p);

    var p = Percentage.times("2:00", "12:00");
    assert.strictEqual(p, 16.67, 'Percentage.times("2:00", "12:00") > result: ' + p);

    var p = Percentage.times("5:35:22", "10:00:00");
    assert.strictEqual(p, 55.89, 'Percentage.times("5:35:22", "10:00:00") > result: ' + p);

});

