/**
 * Percentage JS
 */

"use strict";

var Percentage = (function(){

    var p = {},
        time_suffix = { // in seconds
            ms  : 0.0001,
            sec : 1,
            min : 60,
            h   : 3600,
            d   : 86400,    // day
            w   : 604800,   // week  (7 days)
            m   : 2628000,  // month (based on 365days/12months = 30.41days)
            y   : 31536000, // year  (based on 365days)
        },
        filesize_suffix = {
            b   : 1,
            kb  : 10,
            mb  : 20,
            gb  : 30,
            tb  : 40,
            pb  : 50,
            eb  : 60,
            zb  : 70,
            yb  : 80,
        },
        length = {
            mm: 3,
            cm: 2,
            dm: 1,
            m : 1,
            ft: 1,
            in: 1,

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
        return r.toFixed(dec);
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

        //firefox dont like '-', ie fail with space
        //so we replace '-'' by '/''
        d = d.replace(/-/g, '/');
        start = start.replace(/-/g, '/');
        end = end.replace(/-/g, '/');

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
        t1 = regexTimeTokens(t1) || regexTimeTokens2(t1);
        t2 = regexTimeTokens(t2) || regexTimeTokens2(t2);
        return perc(t1,t2,dec);
    }

    /**
     * File size (in bytes)
     * 
     * @param  str     s1  
     * @param  str     s2  
     * @param  integer dec 
     * @return integer     
     */
    function filesize(s1, s2, dec) {
        s1 = regexFileSize(s1) || s1;
        s2 = regexFileSize(s2) || s2;
        return perc(s1,s2,dec);
    }

    /**
     * Regex time tokens (ex: 1d22min38sec)
     * 
     * @param  string  str
     * @return integer
     */
    function regexTimeTokens(str) {

        var regex  = /([0-9]+)(h|min|sec|ms|y|d|m|w)/gi; 
        var match = getMatches(regex, str), r = 0;

        if(match.length < 1) return false;


        
        // transform to matches to millisecond
        for(var i=0;i<match.length;++i) {
            var num = match[i][1];
            var str = match[i][2];
            r += (num * (time_suffix[str] * 1000));
        }

        return r;
    }

    /**
     * Regex time tokens (ex: 111:32:21.1553)
     * 
     * @param  string str
     * @return integer    
     */
    function regexTimeTokens2(str) {

        var regex = /:?([0-9]+)|(.[0-9]+)/gi;
        var match = getMatches(regex, str), 
            r = 0, ms = 0, 
            l = match.length;

        if(l > 0) {

            //millisecond
            if(match[l-1][2] !== undefined) {
                ms = match[l-1][2];
                match = match.slice(0,l-1);
                --l;
            }

            if(l == 3) {
                r = r + match[2][1]*1000;
                r = r + match[1][1]*60*1000;
                r = r + match[0][1]*60*60*1000;
            }
            else if(l == 2) {
                r = r + match[1][1]*1000;
                r = r + match[0][1]*60*1000;
            }
            else {
                r = r + match[0][1]*1000;
            }
        }

        return r*1 + ms*1;
    }

    /**
     * Regex for file size
     * 
     * @param  string str
     * @return integer   
     */
    function regexFileSize(str) {

        var regex  = /([0-9]*\.?[0-9]+)\s?(b|kb|mb|gb|tb|pb|eb|zb|yb)/gi; 
        var match = getMatches(regex, str), r = 0;

        if(match.length < 1) return false;

        return match[0][1] * Math.pow(2, filesize_suffix[match[0][2].toLowerCase()]);
    }

    /**
     * Get matches
     * 
     * @param  string regex 
     * @param  string str 
     * @return array     
     */
    function getMatches(regex, str) {
        var m, match = [];

        while ((m = regex.exec(str)) != null) {
            match.push(m);
        }

        return match;
    }



    /**
     * Public stuff
     */
    perc.DEFAULT_DEMIMAL = 2,
    perc.dates    = dates;
    perc.times    = times;
    perc.num      = perc;
    perc.filesize = filesize;

    return perc;

})();