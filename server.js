var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

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

var db = require('./models');

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

// API should use snake_case (follows convention for mongoDB columns)
// https://stackoverflow.com/questions/21503430/snake-case-or-camelcase-in-node-js
app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/tinaparija/express-personal-api/README.md", 
    base_url: "https://boiling-island-18436.herokuapp.com/", // 
    endpoints: [
      {
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
      }
    ]
  }); 
}); 

// API should use snake_case (follows convention for mongoDB columns)
// https://stackoverflow.com/questions/21503430/snake-case-or-camelcase-in-node-js
app.get('/api/profile', function apiIndex(req, res) {
  res.json(
    {
      name: "Tina Parija",
      github_username: "tinaparija",
      github_link: "https://github.com/tinaparija", 
      github_profile_image: "https://avatars1.githubusercontent.com/u/14307666?s=460&v=4", 
      personal_site_link: "https://tinaparija.github.io/", 
      current_city: "San Francisco, CA", 
      my_friends: "https://scontent.fsjc1-3.fna.fbcdn.net/v/t31.0-8/16113128_10154478188495756_6066480429500902272_o.jpg?oh=0a6cad3b47d31ff1ab9e5174dbc945ab&oe=5AB4594C", 
      hobbies: [
        {
          name: "hiking", 
          time_investment: "low"
        },
        {
          name: "plant caretaking", 
          time_investment: "high"
        },
        {
          name:"writing", 
          time_investment: "high"
        }, 
        {
          name:"cooking", 
          time_investment: "medium"
        }
      ]
    }
  ); 
}); 

app.get('/api/cities', function apiIndex(req, res) {
  db.City.find({}, function(err, cities) {
      res.json(cities);
  });
}); 

app.post('/api/cities', function apiIndex(req, res){
  var newCity = db.City({
    name: req.body.name, 
    description: req.body.description
  });  
   
  newCity.save(function(err, newCity){
    if (err) {return console.log(err);}
    console.log("saved new city: ", newCity);
  });
  
  res.json(newCity);
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/')
})