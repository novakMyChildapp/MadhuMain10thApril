var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
  sname: String,
  password: String,
  semail:String,
  schoolEmail: String,
  schoolName: String,
  teacherArray:Array,
});
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// the schema is useless so far
// we need to create a model using it
var Students = mongoose.model('students', studentSchema);

// make this available to our users in our Node applications
module.exports = Students;