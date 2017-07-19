var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var adminSchema = new Schema({
  name: String,
  password: String,
  email:String,
  token:String,

});
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// the schema is useless so far
// we need to create a model using it
var Admins = mongoose.model('admins', adminSchema);

// make this available to our users in our Node applications
module.exports = Admins;