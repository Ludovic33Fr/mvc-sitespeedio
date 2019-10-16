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

// Set test API
router.get('/result', function(request, response){
    var res = ssresult.ListAllDomain();
    
    response.json(res);
  });
router.get('/result/:domain', function(request, response){
    var res = ssresult.ListAllTests(request.params.domain);
    
    response.json(res);
  });
router.get('/result/:domain/:testHour/:fileName*', function(request, response){
    
    var dirname = ssresult.GetAbsolutePath(request.params.domain, request.params.testHour);
    var filename = request.params.fileName
    if (filename == null) {
        response.sendFile(dirname + '/index.html');
    } else {
        response.sendFile(dirname + "/" + filename);
    }
  });

  router.get('/result/:domain/:testHour', function(request, response){
    
    var dirname = ssresult.GetAbsolutePath(request.params.domain, request.params.testHour);
    response.sendFile(dirname + '/index.html');
  });

  

// Set result API
router.post('/test', function(request, response){
    sscaller(request.body);
    
    response.send(request.body);
  });

// Export API routes
module.exports = router;