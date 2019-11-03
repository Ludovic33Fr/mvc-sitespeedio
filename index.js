// Import express
let express = require('express')
// Import routes
let apiRoutes = require("./api-routes")

// Initialize the app
let bodyParser     =        require("body-parser");
let app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const args = process.argv;
console.log(args);

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});