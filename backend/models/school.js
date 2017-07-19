var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var schoolSchema = new Schema({
  email: String,
  password: String,
  name:String,
  approval: Boolean,
  schoolToken:String,
  schoolImage:String,
});
console.log("!!!!!!!!! School !!!!!!!!!!!!!!")
// the schema is useless so far
// we need to create a model using it
var Schools = mongoose.model('schools', schoolSchema);

// make this available to our users in our Node applications
module.exports = Schools;