var db = require('./models');

var cities_list = [
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
  }
];

db.City.remove({}, function(err, cities){
  console.log("all cities removed");

  db.City.create(cities_list, function(err, cities){
    if (err) { console.log('ERROR: ', err); }
    console.log("all cities: ", cities);
    console.log("created ", cities.length, " cities");
    process.exit();
  });
});