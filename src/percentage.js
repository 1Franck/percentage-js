/**
 * Percentage JS
 */

"use strict";

var Percentage = (function(){

    var p = {},
        regex = {
            time1    : /([0-9]+)\s?(h|min|sec|ms|y|d|m|w)/gi,
            time2    : /:?([0-9]+)|(.[0-9]+)/gi,
            filesize : /([0-9]*\.?[0-9]+)\s?(b|kb|mb|gb|tb|pb|eb|zb|yb)/gi,
            length   : /([0-9]*\.?[0-9]+)\s?(mm|cm|dm|km|m|ft|in|yd)/gi,
            mass     : /([0-9]*\.?[0-9]+)\s?(mg|kg|g|lb|oz)/gi
        },
        time_suffix = { // based on 1 second
            ms  : 0.0001,
            sec : 1,
            min : 60,
            h   : 3600,
            d   : 86400,    // day
            w   : 604800,   // week  (7 days)
            m   : 2628000,  // month (based on 365days/12months = 30.41days)
            y   : 31536000, // year  (based on 365days)
        },
        filesize_suffix = { // binary measurement
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
        length_suffix = { // based on 1 meter
            mm: 0.001,
            cm: 0.01,
            dm: 0.1,
            m : 1,
            km: 1000,
            ft: 3.28084,
            in: 39.3701,
            yd: 1.0936 
        },
        mass_suffix = { // based on 1 gram
            mg: 0.001,
            g:  1,
            kg: 1000,
            lb: 0.0022046,
            oz: 0.035274
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
        dec = (dec !== undefined) ? dec : perc.DEFAULT_DEMIMAL;
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
     * Lengths
     * 
     * @param  str     l1  
     * @param  str     l2  
     * @param  integer dec 
     * @return integer     
     */
    function lengths(l1, l2, dec) {
        l1 = regexLengths(l1) || l1;
        l2 = regexLengths(l2) || l2;
        return perc(l1,l2,dec);
    }

    /**
     * Mass
     * 
     * @param  str     m1  
     * @param  str     m2  
     * @param  integer dec 
     * @return integer     
     */
    function mass(m1, m2, dec) {
        m1 = regexMass(m1) || m1;
        m2 = regexMass(m2) || m2;
        return perc(m1,m2,dec);
    }

    /**
     * Regex time tokens (ex: 1d22min38sec)
     * 
     * @param  string  str
     * @return integer
     */
    function regexTimeTokens(str) {

        var match = getMatches(regex.time1, str), r = 0;

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

        var match = getMatches(regex.time2, str), 
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

        var match = getMatches(regex.filesize, str), r = 0;

        if(match.length < 1) return false;

        return match[0][1] * Math.pow(2, filesize_suffix[match[0][2].toLowerCase()]);
    }

    /**
     * Regex length (ex: 15km, 34cm, ...)
     * 
     * @param  string  str
     * @return integer
     */
    function regexLengths(str) {

        var match = getMatches(regex.length, str), r = 0;

        if(match.length < 1) return false;
  
        // transform to matches to meters
        for(var i=0;i<match.length;++i) {
            var num = match[i][1];
            var str = match[i][2];
            if(str == "yd" || str == "ft" || str == "in") {
                r += (num / length_suffix[str]);
            }
            else {
                r += (num * length_suffix[str]);
            }
        }

        return r;
    }

    /**
     * Regex mass (ex: 15kg, 34lb, ...)
     * 
     * @param  string  str
     * @return integer
     */
    function regexMass(str) {

        var match = getMatches(regex.mass, str), r = 0;

        if(match.length < 1) return false;
  
        // transform to matches to gram
        for(var i=0;i<match.length;++i) {
            var num = match[i][1];
            var str = match[i][2];
            if(str == "lb" || str == "oz") {
                r += (num / mass_suffix[str]);
            }
            else {
                r += (num * mass_suffix[str]);
            }
        }

        return r;
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
    perc.lengths  = lengths;
    perc.mass     = mass;

    return perc;

})();