const sitespeed = require('sitespeed.io/lib/sitespeed');
const util = require('./util');

module.exports = function (query) { 

  if (query.nbIteration == null) {
    query.nbIteration = 1;
  }

  let profile = (query.mobile == "mobile") ? "3gfast" : "native";

  let chromeContent =  (query.mobile == "mobile") ? {mobileEmulation: {deviceName: "iPhone 6"}} : {};

  let budgetContent = {
    config: {
      "budget": {
         "timings": {
           "SpeedIndex":1000
         }
      }
     }
  };

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
      budget: budgetContent
    } 
  };

  if (query.mobile == "desktop") {
    optionsTmp.mobile = null;
  }
    //console.log(optionsTmp);
    console.log(util.getFormatTime());

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
};