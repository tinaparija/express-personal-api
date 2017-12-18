// require express and other modules
var express = require('express'),
    app = express();
var db = require('./models');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/tinaparija/express-personal-api/README.md", 
    baseUrl: "https://boiling-island-18436.herokuapp.com/", // 
    endpoints: [{
          method: "GET",
          path: "/api",
          description: "describes all endpoints"
        },
        {
          method: "GET",
          path: "/api/profile",
          description: "who I am"
        },
        {
          method: "GET",
          path: "api/cities",
          description: "places I've been"
        },
        {
          method: "POST",
          path: "/api/cities",
          description: "adds new cities"
        }]
      }); 
  }); 

app.get('/api/profile', function apiIndex(req, res) {
  res.json(
    {
      name: "Tina Parija",
      githubUsername: "tinaparija",
      githubLink: "https://github.com/tinaparija",
      githubProfileImage: "https://avatars1.githubusercontent.com/u/14307666?s=460&v=4", 
      personalSiteLink: "https://tinaparija.github.io/", 
      currentCity: "San Francisco, CA", 
      Hobbies: [{name: "hiking", time_investment: "low"},{name: "plant caretaking", time_investment: "high"},{name:"writing", time_investment: "high"}, {name:"cooking", timeInvestment: "medium"}]
    },
  ); 
}); 

app.get('/api/cities', function apiIndex(req, res) {
  res.json([
{
  name: "New Delhi, India",
  description: "I grew up here before immigrating."
}, 
{
  name: "Indianapolis, Indiana",
  description: "This is the first place I lived in America."
}, 
{
  name: "Solon, Ohio",
  description: "I graduated high school here."
}, 
{
  name: "San Francisco, California",
  description: "I live here now."
}],
); 
}); 

app.post('/api/cities', function apiIndex(req, res){
  var newCity = {}; 
  newCity.name = req.body.name; 
  newCity.description = req.body.description
  res.json(newCity);
}); 




/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/')
})