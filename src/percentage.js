/**
 * Percentage JS
 */

"use strict";

var Percentage = (function(){

    var p = {};
    var time_suffix = { // in seconds
            ms  : 0.0001,
            sec : 1,
            min : 60,
            h   : 3600,
            d   : 86400,   // day
            w   : 604800,  // week (4.3 week)
            m   : 2600640, // month
            y   : 31536000, // year
    };

    /**
     * Calc percentage
     * 
     * @param  integer n1
     * @param  integer n2
     * @param  integer dec
     * 
     * @return 
     */
    function perc(n1, n2, dec) {
        dec = dec || perc.DEFAULT_DEMIMAL;
        var r = (n1/n2)*100;
        return r.toFixed(dec)*1;
    }

    /**
     * Percentage of date
     * 
     * @param  string d     
     * @param  string start 
     * @param  string end  
     * @param  mixed  dec
     * @return integer
     */
    function dates(d, start, end, dec) {

        var d     = new Date(d).getTime(),
            start = new Date(start).getTime(),
            end   = new Date(end).getTime(),
            d1    = d - start,
            d2    = end - start;

        return perc(d1,d2,dec);
    }

    /**
     * Times
     * 
     * @param  mixed t1
     * @param  mixed t2
     * @param  mixed dec
     * @return integer
     */
    function times(t1, t2, dec) {
        t1 = regexDateTime(t1);
        t2 = regexDateTime(t2);

        return perc(t1,t2,dec);
    }

    /**
     * Transform time string to ms
     * 
     * @param  string  str [description]
     * @return integer
     */
    function regexDateTime(str) {

        var regex = /([0-9]+)(h|min|sec|ms|y|d|m|w)/gi; 
        var m, match = [], r = 0;
        
        // get match(es)
        while ((m = regex.exec(str)) != null) {
            match.push(m);
        }

        // transform to matches to millisecond
        for(var i=0;i<match.length;++i) {
            var num = match[i][1];
            var str = match[i][2];

            r += (num * (time_suffix[str] * 1000));
        }

        return r;
    }


    /**
     * Public stuff
     */
    perc.DEFAULT_DEMIMAL = 2,
    perc.dates = dates;
    perc.times = times;
    perc.num   = perc;

    return perc;

})();