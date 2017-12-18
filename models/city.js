var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CitySchema = new Schema({
	name: String, 
	description: String
});

var City = mongoose.model('City', CitySchema);
module.exports = City;
