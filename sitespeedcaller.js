const sitespeed = require('sitespeed.io/lib/sitespeed');

module.exports = function (query) { 
    //const dir = new tmp.Dir();
    /*
    const options = this.options({
      
      url: query.url
    });
    */

   let options = {}
    if (query.mobile == "mobile") {
        options = {
            urls: query.urls,
            mobile: query.mobile,
            browsertime: {
             connectivity: {
                 profile: "3gfast"
             },
             browser: "chrome",
             chrome: {
                    mobileEmulation: {
                        deviceName: "iPhone 6"
                    }
                } 
            } 
        };
    } else {
        options = {
            urls: query.urls,
            browsertime: {
                connectivity: {
                    iterations: 1
                }
            }
        };
    }
    console.log(query.url);

    sitespeed.run(options).then((result) => {
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
      });
};