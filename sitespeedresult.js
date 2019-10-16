'use strict';

const util = require('./util');
const folderResult = "./sitespeed-result/";

function ListAllTests(domain) {

  return util.dirs(folderResult + domain);

}

function ListAllDomain() {

  return util.dirs(folderResult);

}

function RetrieveATest(domain, testHour){

  if (CheckATest(domain, testHour)) {
    return util.getContent(folderResult + domain + "/" + testHour + "/index.html");
  } else {
    return "Test not available"
  }

}

function CheckATest(domain, testHour){

  return util.ifExist(folderResult + domain + "/" + testHour + "/index.html");

}

function GetAbsolutePath(domain, testHour) {
  
  if (CheckATest(domain, testHour)) {
    return util.toAbsolutePath(folderResult + domain + "/" + testHour + "/");
  } else {
    return "Test not available"
  }

}

module.exports = {
  ListAllTests,
  ListAllDomain,
  RetrieveATest,
  CheckATest,
  GetAbsolutePath
}