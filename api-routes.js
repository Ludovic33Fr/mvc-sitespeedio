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
router.post('/test', function(request, response){
    ssresult(request.body);
    
    response.send(request.body);
  });

// Set result API
router.post('/result', function(request, response){
    sscaller(request.body);
    
    response.send(request.body);
  });

// Export API routes
module.exports = router;