const sitespeed = require('sitespeed.io/lib/sitespeed');
const util = require('./util');
const fs = require('fs');

module.exports = function (query) { 

  if (query.nbIteration == null) {
    query.nbIteration = 1;
  }

  let profile = (query.mobile == "mobile") ? "3gfast" : "native";

  let chromeContent =  (query.mobile == "mobile") ? {mobileEmulation: {deviceName: "iPhone 6"}} : {};

  //Compute the budget rules
  let budgetContent;
  if (query.budgetPath != null) {
    console.log(query.budgetPath);
    let rawdata = fs.readFileSync(query.budgetPath, 'utf8'); 
    budgetContent = JSON.parse(JSON.stringify(rawdata));
  } else if (query.budget != null) {
    budgetContent = JSON.parse(JSON.stringify(query.budget));
  } else {
    budgetContent = "";
  }
  
  let optionsTmp = {
      urls: query.urls,
      mobile: query.mobile,
      browsertime: {
      connectivity: {
          profile: profile,
          iterations: query.nbIteration
      },
      browser: "chrome",
      chrome: chromeContent, 
      budget: {}
    } 
  };

  if (budgetContent != "") {
    optionsTmp.budget = budgetContent;
  }

  if (query.mobile == "desktop") {
    optionsTmp.mobile = null;
  }
  
  console.log(optionsTmp);
  let recDate = util.getFormatTime();
  let computeUrl = util.getResultUrl(recDate, query.urls);

  sitespeed.run(optionsTmp).then((result) => {
      if (result.errors.length > 0) {
        //done(false);
        console.log(false);
      } else if (result.budgetResult) {
        const isFailing = false; //budget.checkBudget(result.budgetResult, grunt);
        if (isFailing) {
          // we got failing!!
          //done(false);
          console.log(false);
        } else {
          //done();
          console.log(true);
        }
      } else {
        //done();
        console.log(true);
      }

      console.log(result);
    });

    let resTest = {
      resultUrl: computeUrl,
      recordDate: recDate
    }

    return resTest;
};