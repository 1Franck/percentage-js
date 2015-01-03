/**
 * Dates
 */
QUnit.test("dates", function(assert) {

    var test = Percentage.dates("2013-04-05", "2013", "2014");
    assert.strictEqual(test, 25.75, "First date test: 2013-04-05 | start: 2013 | end: 2014 > result: " + test);
});

/**
 * Times
 */
QUnit.test("times", function(assert) {

    var test = Percentage.times("1h", "1d");
    assert.strictEqual(test, 4.17, "1h of 1d > result: " + test);
});

