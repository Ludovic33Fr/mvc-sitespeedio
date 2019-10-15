'use strict';

const moment = require('moment');

function getFormatTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 

    var result = year+'-'+month+'-'+day+'-'+hour+'-'+minute+'-'+second;    

    var now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD');
    
    var dateStringWithTime = moment(now).format('YYYY-MM-DD-HH-mm-ss');

    return dateStringWithTime;
  }


module.exports = {
    getFormatTime
}