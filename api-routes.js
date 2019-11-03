// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();

// Import routes
let sscaller = require("./sitespeedcaller");
let ssresult = require("./sitespeedresult");

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Run a test
router.post('/test', function(request, response){
    var res = sscaller(request.body);
    response.send(res);
})

// Set test API
router.get('/result', function(request, response){
    var res = ssresult.ListAllDomain();
    
    response.json(res);
  });

  // List all the results available for one domain
  router.get('/result/:domain', function(request, response){
    var res = ssresult.ListAllTests(request.params.domain);
    
    response.json(res);
  });

  // Send the result report for one test
router.get('/result/:domain/:testHour', function(request, response){
    
    var dirname = ssresult.GetAbsolutePath(request.params.domain, request.params.testHour);
    response.sendFile(dirname + '/index.html');
  });

// Send ressources html, js , css needed to display a report
router.get('/result/:domain/:testHour/*', function(request, response){
    
    var domain = request.params.domain;
    var testHour =  request.params.testHour

    var dirname = ssresult.GetAbsolutePath(domain, testHour);
    var oldPath = "/result/" + domain + "/" + testHour;
    var path = request.url.replace(oldPath, dirname);
    response.sendFile(path);
  });

// Export API routes
module.exports = router;