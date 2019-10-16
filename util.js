'use strict';

const moment = require('moment');

const { readdirSync, statSync, existsSync, readFileSync } = require('fs')
const { join, resolve } = require('path')

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())

const ifExist = p => existsSync(p)

const getContent = p => readFileSync(p, 'utf8');

const toAbsolutePath = p => resolve(p)

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
    getFormatTime, dirs, ifExist, getContent, toAbsolutePath
}