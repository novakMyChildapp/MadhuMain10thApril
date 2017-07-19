var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var teacherSchema = new Schema({
  tname: String,
  password: String,
  temail:String,
  schoolEmail: String,
  schoolName: String,
  studentsArray:Array,
});
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// the schema is useless so far
// we need to create a model using it
var Teachers = mongoose.model('teachers', teacherSchema);

// make this available to our users in our Node applications
module.exports = Teachers;