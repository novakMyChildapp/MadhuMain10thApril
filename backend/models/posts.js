var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
  posthead: String,
  description: String,
  tname:String,
  temail:String,
  teacherImage:String,
  sname:String,
  semail: String,
  studentImage:String,
  schoolEmail: String,
  date:String,
  comments:[{
		  	comment:String,
		  	cdate:String,
     	  	postedBy:String,
  }],
  paths:Array,

});
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// the schema is useless so far
// we need to create a model using it
var Posts = mongoose.model('posts', postSchema);

// make this available to our users in our Node applications
module.exports = Posts;