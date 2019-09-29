// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();

// Import routes
let sscaller = require("./sitespeedcaller")

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Set test API
router.post('/test', function(request, response){
    sscaller(request.body);
    //console.log(request.body);      // your JSON
    response.send(request.body);    // echo the result back
  });

// Export API routes
module.exports = router;