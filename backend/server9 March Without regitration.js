import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
var randomstring = require("randomstring");
import Teachers from "./models/teachers"
import Students from "./models/students"
import Posts from "./models/posts"
import Schools from "./models/school"

import mongoose from 'mongoose'

var multer          = require('multer');

// storage needed for saving images from forms
var storage         =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

// var upload = multer({ storage : storage}).array('ProfileImage',2);
var upload          = multer({ storage : storage}).fields([{ name: 'RelatedImages1', maxCount: 3 }, { name: 'uploadImage', maxCount: 1 }]);





const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
            

const app = express();



app.use(bodyParser.json())

app.use(express.static('public'))

const dbUrl ="mongodb://localhost:27017/FinalMadhu";



mongoose.connect('mongodb://localhost/FinalMadhu');
function validate(data){
		let errors = {}
		// console.log("******")
		// console.log(data)
		if(data.email === "") errors.email="Email Cant Be Empty"
		if(data.name === "") errors.name="School Name Cant Be Empty"
		if(data.password ==="") errors.password="Password Cant Be Empty"
		if(data.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
		if(data.cpassword ==="") errors.cpassword="Confirm Password Be Empty"
		if(data.cpassword !== data.password) errors.cpassword="Password and Confirm Password Should Match"	

		// this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}


function TeacherValidation(data){
		let errors={}
		if(data.temail === "") errors.temail="Email Cant Be Empty"
		if(data.tname === "") errors.tname="Name Cant Be Empty"
		if(data.tpassword ==="") errors.tpassword="Password Cant Be Empty"
		if(data.tcpassword ==="") errors.tcpassword="Password Cant Be Empty"
		if(data.tpassword !== data.tpassword) errors.tcpassword="Password And Confirm Password Should Be Same"
		if(data.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"

		// this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}

function StudentValidation(data){
		let errors={}
		if(data.semail === "") errors.temail="Email Cant Be Empty"
		if(data.sname === "") errors.tname="Name Cant Be Empty"
		if(data.spassword ==="") errors.tpassword="Password Cant Be Empty"
		if(data.scpassword ==="") errors.tcpassword="Password Cant Be Empty"
		if(data.spassword !== data.spassword) errors.tcpassword="Password And Confirm Password Should Be Same"
		if(data.spassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"

		// this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}

function validateLogin(data){
		let errors = {}
		// console.log("******")
		// console.log(data)
		if(data.email === "") errors.email="Email Cant Be Empty"
		if(data.password ==="") errors.password="Password Cant Be Empty"
		if(data.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
		// if(data.cpassword ==="") errors.cpassword="Confirm Password Be Empty"
		// if(data.cpassword !== data.password) errors.cpassword="Password and Confirm Password Should Match"	

		// this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}


function validateForgotPasswordEmail(data) {
		let errors={}
		if(data.email === "") errors.email="School Email Cant Be Empty"
		console.log(errors)

		const isValid = Object.keys(errors).length===0

		return {errors, isValid}
}
function validateTeacherChangePasswordEmail(data){

		let errors = {};

		if(data.tpassword ==="") errors.tpassword="Password Cant Be Empty"
		if(data.tcpassword ==="") errors.tcpassword="Confirm Password Be Empty"
		if(data.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
		if(data.tcpassword !== data.tpassword) errors.tcpassword="Password and Confirm Password Should Match"	

	
	console.log(errors)

	const isValid = Object.keys(errors).length===0
	return {errors, isValid}

}
function validateStudentChangePasswordEmail(data){

		let errors = {};

		if(data.spassword ==="") errors.spassword="Password Cant Be Empty"
		if(data.scpassword ==="") errors.scpassword="Confirm Password Be Empty"
		if(data.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
		if(data.scpassword !== data.spassword) errors.scpassword="Password and Confirm Password Should Match"	

	
	console.log(errors)

	const isValid = Object.keys(errors).length===0
	return {errors, isValid}

}
// validateSchoolChangePasswordEmail
function validateSchoolChangePasswordEmail(data){

		let errors = {};

		if(data.password ==="") errors.password="Password Cant Be Empty"
		if(data.cpassword ==="") errors.cpassword="Confirm Password Be Empty"
		if(data.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
		if(data.cpassword !== data.password) errors.cpassword="Password and Confirm Password Should Match"	

	
	console.log(errors)

	const isValid = Object.keys(errors).length===0
	return {errors, isValid}

}



function validateTLogin(data){
		let errors = {}
		// console.log("******")
		// console.log(data)
		if(data.temail === "") errors.temail="Email Cant Be Empty"
		if(data.tpassword ==="") errors.tpassword="Password Cant Be Empty"
		if(data.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
		// if(data.cpassword ==="") errors.cpassword="Confirm Password Be Empty"
		// if(data.cpassword !== data.password) errors.cpassword="Password and Confirm Password Should Match"	

		// this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}

function validateSLogin(data){
		let errors = {}
		// console.log("******")
		// console.log(data)
		if(data.semail === "") errors.semail="Email Cant Be Empty"
		if(data.spassword ==="") errors.spassword="Password Cant Be Empty"
		if(data.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
		// if(data.cpassword ==="") errors.cpassword="Confirm Password Be Empty"
		// if(data.cpassword !== data.password) errors.cpassword="Password and Confirm Password Should Match"	

		// this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}

function validateTeachersPost(data){

	let errors={}

	if(this.state.headline === "") errors.headline="Email Cant Be Empty"
	if(this.state.description === "") errors.description="School Name Cant Be Empty"

	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}




let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user : 'test4rvtech@gmail.com',
        pass : 'rvtechtest#123',
    },
    tls: {
        rejectUnauthorized: false
    }
});


// console.log("@@@@@@@@@@@@@@@@@@")
mongodb.MongoClient.connect(dbUrl, function(err,db){

		app.get("/api/getSchools", function(req,res){
			db.collection('schools').find({},{"email":1, "name":1}).toArray((err, schools)=>{
				console.log(schools)
				res.json({schools})
			})
		})



		app.post('/api/schools/newlogin', function(req,res){
			console.log("Successfull hit")
			// console.log(req.body)
			const {errors, isValid} =validate(req.body)
			if(isValid){
				const{email, password, name} = req.body;
				// console.log(email)
				// console.log(password)
				// console.log(name)
				// console.log("@@@@@@@@@@@@@@@@@@@@@@@")
				db.collection('schools').findOne({email:email}, function(err, oSchool){
					if (err){
						console.log("Error in /api/getSchools in *** SERVER.JS ***")
						res.json({errorMessage: "Sorry Something Went Wrong While Finding"})
					}
					if(oSchool && oSchool!=null && oSchool!=undefined && oSchool!=''){
						res.json({errorMessage:  "The User Already Exists"})
						console.log("User Already Exists")
					}
					else{
						console.log("Success")
						var hash = bcrypt.hashSync(password, salt);
						console.log(password)
						console.log(hash)
						var z= bcrypt.compareSync(password, hash);
						console.log(z)
						console.log("**************************")
						db.collection('schools').insert({email, name, "password":hash},function(err, doneSchool){
							if (err){
								console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
								res.json({errorMessage: "Sorry Something Went Wrong While Saving"})
							}
							else{
								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Rvtech 👻" <test4rvtech@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+email, // list of receivers
								    subject: 'Hello School ✔', // Subject line
								    text: 'Hello world ?', // plain text body
								    html: '<b>Hello world ?</b> Email = > ' + email+ "  </br> Name = > "+name + "  </br> Password = >"+password, // html body
								};

								// send mail with defined transport object
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log("In error of nodemailer")
                                            console.log(error);
                                        }
                                        else{
                                        	console.log('Message sent to user: ' + JSON.stringify(info));
                                        }
                                        
                                    });
								res.json({"message":"Success"})

							}
						})
					}
				})

			}
			else{
				res.status(400).json({errors})
			}
		})
		app.post('/api/schools/Logmein',function(req, res){
			console.log("45 45 45 45"+JSON.stringify(req.body))

			const {errors, isValid} =validateLogin(req.body)
			console.log(isValid)
			if(isValid){
				const{email, password} = req.body;
					db.collection('schools').findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/getSchools in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oSchool== undefined || oSchool== null || oSchool==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							var hash  = oSchool.password
							// console.log(hash)
							var pass = req.body.password
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){
								res.json({oSchool})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}

						}

					})

			}
			else{
				res.status(400).json({errors})
			}



		})

// /api/schools/PasswordRecovery"
		app.post('/api/schools/PasswordRecovery',function(req, res){
			console.log("45 45 45 45"+JSON.stringify(req.body))

			const {errors, isValid} =validateForgotPasswordEmail(req.body)                                          // validateForgotPasswordEmail 
			console.log(isValid)
			if(isValid){
				const{email, password} = req.body;
					// db.collection('schools').findOne({email:req.body.email}, function(err, oSchool){
						Schools.findOne({email:req.body.email}, function (err, oSchool){
						if (err){
							console.log("Error in /api/getSchools in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oSchool== undefined || oSchool== null || oSchool==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							console.log(oSchool)
							// var hash  = oSchool.password
							// console.log(hash)

							var password = randomstring.generate({
							  length: 8,
							  charset: 'alphanumeric '
							});
							
							// console.log(pass)
							var hash = bcrypt.hashSync(password, salt);
							oSchool.password = hash
							oSchool.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again"})
								}
								else{



								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Rvtech " <test4rvtech@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+req.body.email, // list of receivers
								    subject: 'Hello School ✔', // Subject line
								    text: 'Hello', // plain text body
								    html: '<b>Hello '+ oSchool.name+ ' .Your New Password is ' +password, // html body
								};

								// send mail with defined transport object
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log("In error of nodemailer")
                                            console.log(error);
                                        }
                                        else{
                                        	console.log('Message sent to user: ' + JSON.stringify(info));
                                        }
                                        
                                    });
								res.json({"message":"Success"})
								}

							})
						}

					})

			}
			else{
				res.status(400).json({errors})
			}



		})
// /api/Teachers/PasswordRecovery
		app.post('/api/Teachers/PasswordRecovery',function(req, res){
			console.log("45 45 45 45"+JSON.stringify(req.body))

			const {errors, isValid} =validateForgotPasswordEmail(req.body)                                          // validateForgotPasswordEmail 
			console.log(isValid)
			if(isValid){
				const{email, password} = req.body;
					// db.collection('schools').findOne({email:req.body.email}, function(err, oSchool){
						Teachers.findOne({temail:req.body.email}, function (err, oTeacher){
						if (err){
							console.log("Error in /api/getoTeacher in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oTeacher== undefined || oTeacher== null || oTeacher==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							console.log(oTeacher)
							// var hash  = oSchool.password
							// console.log(hash)

							var password = randomstring.generate({
							  length: 8,
							  charset: 'alphanumeric '
							});
							
							// console.log(pass)
							var hash = bcrypt.hashSync(password, salt);
							oTeacher.password = hash
							oTeacher.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again"})
								}
								else{



								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Rvtech " <test4rvtech@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+req.body.email, // list of receivers
								    subject: 'Hello Teacher ✔', // Subject line
								    text: 'Hello', // plain text body
								    html: '<b>Hello '+ oTeacher.tname+ ' .Your New Password is ' +password, // html body
								};

								// send mail with defined transport object
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log("In error of nodemailer")
                                            console.log(error);
                                        }
                                        else{
                                        	console.log('Message sent to user: ' + JSON.stringify(info));
                                        }
                                        
                                    });
								res.json({"message":"Success"})
								}

							})
						}

					})

			}
			else{
				res.status(400).json({errors})
			}

		})


// /api/teacher/changePassword
		app.post('/api/teacher/changePassword',function(req, res){
			console.log("45 45 45 45 ************************"+JSON.stringify(req.body))

			const {errors, isValid} =validateTeacherChangePasswordEmail(req.body)                                          // validateForgotPasswordEmail 
			console.log(isValid)
			if(isValid){
				const{temail, tpassword, OldTpassword, tcpassword} = req.body;
					// db.collection('schools').findOne({email:req.body.email}, function(err, oSchool){
						Teachers.findOne({temail:temail}, function (err, oTeacher){
						if (err){
							console.log("Error in /api/getoTeacher in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oTeacher== undefined || oTeacher== null || oTeacher==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							console.log(oTeacher)
							// var hash  = oSchool.password
							// console.log(hash)

							var hash  = oTeacher.password
							// console.log(hash)
							
							// console.log(OldTpassword)
							var z= bcrypt.compareSync(OldTpassword, hash);

							if(z==true){

							// console.log(pass)
							var hash = bcrypt.hashSync(tpassword, salt);
							oTeacher.password = hash
							oTeacher.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again Changing Password"})
								}
								else{

									// setup email data with unicode symbols
									let mailOptions = {
									    from: '"Rvtech " <test4rvtech@gmail.com>', // sender address
									    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
									    to: "test4rvtech@gmail.com, "+temail, // list of receivers
									    subject: 'Hello Teacher ✔', // Subject line
									    text: 'Hello', // plain text body
									    html: '<b>Hello '+ oTeacher.tname+ ' .Your New Password is ' +tpassword, // html body
									};

									// send mail with defined transport object
	                                    transporter.sendMail(mailOptions, function(error, info){
	                                        if(error){
	                                            console.log("In error of nodemailer")
	                                            console.log(error);
	                                        }
	                                        else{
	                                        	console.log('Message sent to user: ' + JSON.stringify(info));
	                                        }
	                                        
	                                    });
									res.json({"message":"Success"})
								}

							})
								// res.json({"SuccessMessage":"Success"})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}
						}

					})

			}
			else{
				res.status(400).json({errors})
			}

		})

// /api/student/changePassword
		app.post('/api/student/changePassword',function(req, res){
			console.log("45 45 45 45 ************************"+JSON.stringify(req.body))

			const {errors, isValid} =validateStudentChangePasswordEmail(req.body)                                          
			console.log(isValid)
			if(isValid){
				const{semail, spassword, OldSPpassword, scpassword} = req.body;
					// db.collection('schools').findOne({email:req.body.email}, function(err, oSchool){
						Students.findOne({semail:semail}, function (err, oStudentParent){
						if (err){
							console.log("Error in /api/getoTeacher in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oStudentParent== undefined || oStudentParent== null || oStudentParent==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							console.log(oStudentParent)
							// var hash  = oSchool.password
							// console.log(hash)

							var hash  = oStudentParent.password
							console.log(hash)
							
							console.log(OldSPpassword)
							var z= bcrypt.compareSync(OldSPpassword, hash);

							if(z==true){

							// console.log(pass)
							var hash = bcrypt.hashSync(spassword, salt);
							oStudentParent.password = hash
							oStudentParent.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again Changing Password"})
								}
								else{

									// setup email data with unicode symbols
									let mailOptions = {
									    from: '"Rvtech " <test4rvtech@gmail.com>', // sender address
									    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
									    to: "test4rvtech@gmail.com, "+semail, // list of receivers
									    subject: 'Hello Student ✔', // Subject line
									    text: 'Hello', // plain text body
									    html: '<b>Hello '+ oStudentParent.sname+ ' .Your New Password is ' +spassword, // html body
									};

									// send mail with defined transport object
	                                    transporter.sendMail(mailOptions, function(error, info){
	                                        if(error){
	                                            console.log("In error of nodemailer")
	                                            console.log(error);
	                                        }
	                                        else{
	                                        	console.log('Message sent to user: ' + JSON.stringify(info));
	                                        }
	                                        
	                                    });
									res.json({"message":"Success"})
								}

							})
								// res.json({"SuccessMessage":"Success"})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}
						}

					})

			}
			else{
				res.status(400).json({errors})
			}

		})

// /api/schools/changepassword
		app.post('/api/schools/changepassword',function(req, res){
			console.log("45 45 45 45 ************************"+JSON.stringify(req.body))

			const {errors, isValid} =validateSchoolChangePasswordEmail(req.body)                                          
			console.log(isValid)
			if(isValid){
				const{email, password, OldPassword, cpassword} = req.body;
					// db.collection('schools').findOne({email:req.body.email}, function(err, oSchool){
						Schools.findOne({email:email}, function (err, oSchool){
						if (err){
							console.log("Error in /api/getoTeacher in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oSchool== undefined || oSchool== null || oSchool==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							console.log(oSchool)
							// var hash  = oSchool.password
							// console.log(hash)

							var hash  = oSchool.password
							console.log(hash)
							
							console.log(OldPassword)
							var z= bcrypt.compareSync(OldPassword, hash);

							if(z==true){

							// console.log(pass)
							var hash = bcrypt.hashSync(password, salt);
							oSchool.password = hash
							oSchool.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again Changing Password"})
								}
								else{

									// setup email data with unicode symbols
									let mailOptions = {
									    from: '"Rvtech " <test4rvtech@gmail.com>', // sender address
									    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
									    to: "test4rvtech@gmail.com, "+email, // list of receivers
									    subject: 'Hello School ✔', // Subject line
									    text: 'Hello', // plain text body
									    html: '<b>Hello '+ oSchool.name+ ' .Your New Password is ' +password, // html body
									};

									// send mail with defined transport object
	                                    transporter.sendMail(mailOptions, function(error, info){
	                                        if(error){
	                                            console.log("In error of nodemailer")
	                                            console.log(error);
	                                        }
	                                        else{
	                                        	console.log('Message sent to user: ' + JSON.stringify(info));
	                                        }
	                                        
	                                    });
									res.json({"message":"Success"})
								}

							})
								// res.json({"SuccessMessage":"Success"})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}
						}

					})

			}
			else{
				res.status(400).json({errors})
			}

		})








// /api/StudentParent/PasswordRecovery
		app.post('/api/StudentParent/PasswordRecovery',function(req, res){
			console.log("Password Recovery for StudentParent "+JSON.stringify(req.body))

			const {errors, isValid} =validateForgotPasswordEmail(req.body)                                          // validateForgotPasswordEmail 
			console.log(isValid)
			if(isValid){
				const{email, password} = req.body;
					// db.collection('schools').findOne({email:req.body.email}, function(err, oSchool){
						Students.findOne({semail:req.body.email}, function (err, oStudentParent){
						if (err){
							console.log("Error in /api/getoTeacher in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oStudentParent== undefined || oStudentParent== null || oStudentParent==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							console.log(oStudentParent)
							// var hash  = oSchool.password
							// console.log(hash)

							var password = randomstring.generate({
							  length: 8,
							  charset: 'alphanumeric '
							});
							
							// console.log(pass)
							var hash = bcrypt.hashSync(password, salt);
							oStudentParent.password = hash
							oStudentParent.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again"})
								}
								else{



								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Rvtech " <test4rvtech@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+req.body.email, // list of receivers
								    subject: 'Hello Student ✔', // Subject line
								    text: 'Hello', // plain text body
								    html: '<b>Hello '+ oStudentParent.sname+ ' .Your New Password is ' +password, // html body
								};

								// send mail with defined transport object
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log("In error of nodemailer")
                                            console.log(error);
                                        }
                                        else{
                                        	console.log('Message sent to user: ' + JSON.stringify(info));
                                        }
                                        
                                    });
								res.json({"message":"Success"})
								}

							})
						}

					})

			}
			else{
				res.status(400).json({errors})
			}

		})




		app.post('/api/schools/getallteachers',function(req, res){
				const{email, password, name} = req.body;
console.log("+++++++++++++++++++++++++++++++++++++++")
console.log(req.body)
					db.collection('schools').findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/getSchools in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						else if (oSchool== undefined || oSchool== null || oSchool==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("MATCh")
							var hash  = oSchool.password
							// console.log(hash)
							var pass = req.body.password
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){
								// res.json({oSchool})
								console.log(oSchool)
//								db.collection('schools').find({},{"email":1, "name":1}).toArray((err, schools)=>{ // ***************************************
								db.collection('teachers').find({schoolEmail:email}).toArray((err, allteachers)=>{ // ***************************************
									console.log("________________________")
									console.log(allteachers)
									if(err){
										res.json({errorMessage: "Sorry Something Went Wrong."})

									}
									else if(allteachers && allteachers!=null && allteachers!=undefined && allteachers!='' && allteachers.length>0){
										console.log("HERE")
										res.json({allteachers})

									}
									else{
										res.json({errorMessage: "Sorry There's No data yet"})
									}
								})

							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}

						}

					})
//

		});


app.post('/api/schools/gettheteacher',function(req, res){
				const{email, password, name, TId} = req.body;
console.log("+++++++++++++++++++++++++++++++++++++++")
console.log(req.body)
					db.collection('schools').findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/getSchools in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						else if (oSchool== undefined || oSchool== null || oSchool==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("MATCh")
							var hash  = oSchool.password
							// console.log(hash)
							var pass = req.body.password
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){
// 								// res.json({oSchool})
// 								console.log(oSchool)
// //								db.collection('schools').find({},{"email":1, "name":1}).toArray((err, schools)=>{
	console.log(TId)
								db.collection('teachers').find({"temail":TId},{temail:1, tname:1,schoolEmail:1, schoolName:1, studentsArray:1}).toArray(function(err, teacher){
									console.log("________________________")
									console.log(teacher)
									if(err){
										res.json({errorMessage: "Sorry Something Went Wrong."})

									}
									else if(teacher && teacher!=null && teacher!=undefined && teacher!='' && teacher.length>0){
										console.log("HERE")


										db.collection('students').find({schoolEmail:email},{semail:1, sname:1,schoolEmail:1, schoolName:1}).toArray((err, allstudents)=>{
											console.log("________________________")
											console.log(allstudents)
											if(err){
												res.json({errorMessage: "Sorry Something Went Wrong."})

											}
											else if(allstudents && allstudents!=null && allstudents!=undefined && allstudents!='' && allstudents.length>0){
												console.log("HERE")
												res.json({teachercontent:teacher, studentcontent: allstudents})

											}
											else{
												res.json({errorMessage: "Sorry There's No data yet in students"})
											}
										})




										// res.json({teacher})

									}
									else{
										res.json({errorMessage: "Sorry There's No data yet"})
									}
								})

							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}

						}

					})
//

		});

//

// /api/schools/teacher/addStudent
		app.post('/api/schools/teacher/addStudent',function(req, res){
				const{email, password, semail, TId, sname} = req.body;
console.log("++++++++++++++++ addd  @ @ @ @ @ ++++++++++++++++++++++")
console.log(req.body)
					db.collection('schools').findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/getSchools in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						else if (oSchool== undefined || oSchool== null || oSchool==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("MATCh")
							var hash  = oSchool.password
							// console.log(hash)
							var pass = req.body.password
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){
// 								// res.json({oSchool})
// 								console.log(oSchool)
// //								db.collection('schools').find({},{"email":1, "name":1}).toArray((err, schools)=>{
								console.log(TId)
								db.collection('teachers').find({"temail":TId},{temail:1, tname:1,schoolEmail:1, schoolName:1,studentsArray:1}).toArray(function(err, teacher){
									console.log("________________________")
									console.log(teacher)
									console.log(sname)
									if(err){
										res.json({errorMessage: "Sorry Something Went Wrong."})

									}
									else if(teacher && teacher!=null && teacher!=undefined && teacher!='' && teacher.length>0){
										console.log("HERE")

												if(teacher[0].studentsArray && teacher[0].studentsArray!=null && teacher[0].studentsArray!=undefined && teacher[0].studentsArray.length>0){
													var arr=[];
													var arr = teacher[0].studentsArray

													Teachers.find({"temail":TId}, function(err, dta){
														if(err){
															console.log("errrrrrrrr")
														}
														else{
															console.log("88888888888")
															dta[0].studentsArray=arr;
															console.log(dta[0].studentsArray)
															var total = dta[0].studentsArray.length
															console.log(total)
															var cas=true;


															for(var x=0; x<total;x++){
																if(dta[0].studentsArray[x].semail==semail){
																		// res.json({errorMessage: "ALREADY ADDED"})
																		cas=false
																}
															}
															if(cas==false){
																res.json({errorMessage: "ALREADY ADDED"})
															}
															else{
																console.log("HERE2")
																var theObj= {
																	semail:semail,
																	sname:sname
																}
																	dta[0].studentsArray.push(theObj)
																	console.log(dta[0])
																	dta[0].save(function(err){
																		if (err){
																			res.json({errorMessage: "Sorry Something Went Wrong."})
																		}
																		else{
																			Students.findOne({semail:semail}, function(err, students){
																				if(err){
																					res.json({errorMessage: "Student Added To Teacher But Teacher Couldnt Be Added To Student"})
																				}
																				if(students && students!=null && students!= undefined){
																					if(students.teacherArray && students.teacherArray!= null && students.teacherArray!=undefined && students.teacherArray.length>0){
																						var array2 = students.teacherArray;
																						var createme = true
																						for (var nos = 0; nos<array2.length;nos++){
																							if(array2[nos].temail==TId){
																								createme =false
																							}
																						}
																						if(createme == true){
																							var studObj={
																								temail:TId,
																								tname:dta[0].tname
																							}
																							console.log("^&^&^&^&^&^&&^&")
																							console.log(studObj)
																							students.teacherArray.push(studObj)
																							students.save(function(err){
																								if(err){
																									res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																								}
																								else{
																									res.json({theteacher:dta})
																								}
																							})

																						}else{
																							res.json({errorMessage: "Student Already Exists In This Teachers Assigned List"})

																						}
																					}
																					else{
																							var studObj={
																								temail:TId,
																								tname:dta[0].tname
																							}
																							console.log("^&^&^&^&^&^&&^&")
																							console.log(studObj)
																							students.teacherArray.push(studObj)
																							students.save(function(err){
																								if(err){
																									res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																								}
																								else{
																									res.json({theteacher:dta})
																								}
																							})

																					}
																					
																				}

																			})

																		}
																	})
															}

															
														}
													})

												}
												else{

													console.log("&&&&&&&&&&&&&&&&&&&&")
													Teachers.find({"temail":TId}, function(err, dta){
														if(err){
															console.log("errrrrrrrr")
														}
														else{
															console.log(JSON.stringify(dta))
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
															var theObj= {
																semail:semail,
																sname:sname
															}
															dta[0].studentsArray.push(theObj);
															
															dta[0].save(function(err){
																if (err){
																	res.json({errorMessage: "Sorry Something Went Wrong."})
																}
																else{
																	
																	Students.findOne({semail:semail}, function(err, students){
																		if(err){
																			res.json({errorMessage: "Student Added To Teacher But Teacher Couldnt Be Added To Student"})

																		}
																		if(students && students!=null && students!= undefined){
																			if(students.teacherArray && students.teacherArray!= null && students.teacherArray!=undefined && students.teacherArray.length>0){
																				var array2 = students.teacherArray;
																				var createme = true
																				for (var nos = 0; nos<array2.length;nos++){
																					if(array2[nos]==TId){
																						createme =false
																					}
																				}
																				if(createme == true){

																						var studObj={
																								temail:TId,
																								tname:dta[0].tname
																							}
																							console.log("^&^&^&^&^&^&&^&")
																							console.log(studObj)
																					students.teacherArray.push(studObj)
																					students.save(function(err){
																						if(err){
																							res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																						}
																						else{
																							res.json({theteacher:dta})
																						}
																					})

																				}else{
																					res.json({errorMessage: "Student Already Exists In This Teachers Assigned List"})

																				}
																			}
																			else{
																				var studObj={
																								temail:TId,
																								tname:dta[0].tname
																							}
																					console.log("^&^&^&^&^&^&&^&")
																					console.log(studObj)
																					students.teacherArray.push(studObj)
																					students.save(function(err){
																						if(err){
																							res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																						}
																						else{
																							res.json({theteacher:dta})
																						}
																					})

																			}
																			
																		}

																	})

																}
															})
														}
													}) 
			
												}
												// db.collection('students').find({schoolEmail:email},{semail:1, sname:1,schoolEmail:1, schoolName:1}).toArray((err, allstudents)=>{
												// 	console.log("________________________")
												// 	console.log(allstudents)
												// 	if(err){
												// 		res.json({errorMessage: "Sorry Something Went Wrong."})

												// 	}
												// 	else if(allstudents && allstudents!=null && allstudents!=undefined && allstudents!='' && allstudents.length>0){
												// 		console.log("HERE")
												// 		res.json({teachercontent:teacher, studentcontent: allstudents})

												// 	}
												// 	else{
												// 		res.json({errorMessage: "Sorry There's No data yet in students"})
												// 	}
												// })

// res.json({errorMessage: "Working "})


										// res.json({teacher})

									}
									else{
										res.json({errorMessage: "Sorry There's No data yet"})
									}
								})

							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}

						}

					})
//

		});

























		app.post('/api/schools/teacher/registration',function(req, res){

			console.log(req.body)
			const {errors, isValid} =TeacherValidation(req.body)
			// console.log(isValid)
			if(isValid){

				const{temail, tpassword, tname, name, email} = req.body;

				// res.json({errorMessage:"working"})



				db.collection('teachers').findOne({temail:temail}, function(err, oTeacher){
					if (err){
						console.log("Error in /api/getSchools in *** SERVER.JS ***")
						res.json({errorMessage: "Sorry Something Went Wrong While Finding"})
					}
					if(oTeacher && oTeacher!=null && oTeacher!=undefined && oTeacher!=''){
						res.json({errorMessage:  "The Teacher Already Exists"})
						console.log("User Already Exists")
					}
					else{

						console.log("Success")
						var hash = bcrypt.hashSync(tpassword, salt);
						console.log(tpassword)
						console.log(hash)
						var z= bcrypt.compareSync(tpassword, hash);
						console.log(z)
						console.log("**************************")

						db.collection('teachers').insert({temail, tname, "password":hash, "schoolName":name, "schoolEmail":email},function(err, doneTeacher){
							if (err){
								console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
								res.json({errorMessage: "Sorry Something Went Wrong While Saving"})
							}
							else{
								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Rvtech 👻" <test4rvtech@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+temail, // list of receivers
								    subject: 'Hello  Teacher✔', // Subject line
								    text: 'Hello world ?', // plain text body
								    html: '<b>Hello world ?</b> Email = > ' + temail+ "  </br> Name = > "+tname + "  </br> Password = >"+tpassword+". "+name+ " added you to there school group", // html body
								};

								// send mail with defined transport object
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log("In error of nodemailer")
                                            console.log(error);
                                        }
                                        else{
                                        	console.log('Message sent to user: ' + JSON.stringify(info));
                                        }
                                        
                                    });
								res.json({"message":"Success"})

							}

						})
					}
				})
			}
			else{
				res.status(400).json({errors})
			}
		})








// 
		app.post('/api/schools/getallstudents',function(req, res){
					const{email, password, name} = req.body;
					console.log("+++++++++++++++++++++++++++++++++++++++")
					console.log(req.body)
					db.collection('schools').findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/schools/getallstudents in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						else if (oSchool== undefined || oSchool== null || oSchool==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("MATCh")
							var hash  = oSchool.password
							// console.log(hash)
							var pass = req.body.password
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){
								// res.json({oSchool})
								console.log(oSchool)
//								db.collection('schools').find({},{"email":1, "name":1}).toArray((err, schools)=>{
								db.collection('students').find({schoolEmail:email}).toArray((err, allstudents)=>{
									console.log("________________________")
									console.log(allstudents)
									if(err){
										res.json({errorMessage: "Sorry Something Went Wrong."})

									}
									else if(allstudents && allstudents!=null && allstudents!=undefined && allstudents!='' && allstudents.length>0){
										console.log("HERE")
										res.json({allstudents})

									}
									else{
										res.json({errorMessage: "Sorry There's No data yet"})
									}
								})

							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}

						}

					})
//

		});


		app.post('/api/schools/student/registration',function(req, res){

			console.log(req.body)
			const {errors, isValid} =StudentValidation(req.body)
			console.log(isValid)
			if(isValid){

				const{semail, spassword,sname, name, email} = req.body;

				// res.json({errorMessage:"working"})



				db.collection('students').findOne({semail:semail}, function(err, student){
					if (err){
						console.log("Error in /api/schools/student/registration in *** SERVER.JS ***")
						res.json({errorMessage: "Sorry Something Went Wrong While Finding"})
					}
					if(student && student!=null && student!=undefined && student!=''){
						res.json({errorMessage:  "The Student Already Exists"})
						console.log("User Already Exists")
					}
					else{

						console.log("Success")
						var hash = bcrypt.hashSync(spassword, salt);
						console.log(spassword)
						console.log(hash)
						var z= bcrypt.compareSync(spassword, hash);
						console.log(z)
						console.log("**************************")

						db.collection('students').insert({semail, sname, "password":hash, "schoolName":name, "schoolEmail":email},function(err, doneTeacher){
							if (err){
								console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
								res.json({errorMessage: "Sorry Something Went Wrong While Saving"})
							}
							else{
								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Rvtech 👻" <test4rvtech@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+semail, // list of receivers
								    subject: 'Hello  Student '+sname, // Subject line
								    text: 'Hello world ?', // plain text body
								    html: '<b>Hello world ?</b> Email = > ' + semail+ "  </br> Name = > "+sname + "  </br> Password = >"+spassword+". "+name+ " added you to there school group", // html body
								};

								// send mail with defined transport object
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            console.log("In error of nodemailer")
                                            console.log(error);
                                        }
                                        else{
                                        	console.log('Message sent to user: ' + JSON.stringify(info));
                                        }
                                        
                                    });
								res.json({"message":"Success"})

							}

						})
					}
				})
			}
			else{
				res.status(400).json({errors})
			}
		})

		// *************************************************************************************************************************************************
		// *************************************************************************************************************************************************
		// *************************************************************************************************************************************************

		// TEACHERS

		app.post('/api/teacher/logmein',function(req, res){
			console.log("45 45 45 45"+JSON.stringify(req.body))

			const {errors, isValid} =validateTLogin(req.body)
			console.log(isValid)
			if(isValid){
				const{temail, tpassword} = req.body;
					db.collection('teachers').findOne({temail:temail}, function(err, oTeacher){
						if (err){
							console.log("Error in /api/getSchools in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oTeacher== undefined || oTeacher== null || oTeacher==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							var hash  = oTeacher.password
							// console.log(hash)
							var pass = req.body.tpassword
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){
								res.json({oTeacher})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}

						}

					})

			}
			else{
				res.status(400).json({errors})
			}

		})


// api/teacher/getallstudents

		app.post('/api/teacher/getallstudents',function(req, res){

			const{temail, tpassword} = req.body;
			console.log(req.body)

			Teachers.findOne({temail:temail},function(err, teacher){
				if(err){
					res.json({errorMessage: "Sorry Something Went Wrong "})
				}
				else if(teacher && teacher!=null && teacher!=undefined){
					var hash  = teacher.password

					var z= bcrypt.compareSync(tpassword, hash);

					if(z==true){
						res.json(teacher)
					}
					else{
						res.json({errorMessage: "Sorry Teacher Password Didnt Match"})
					}
				}
				else{
					res.json({errorMessage: "Sorry Teacher Doesn;t Exist "})
				}

			})

		})

		app.post('/api/teacher/getallstudentposts',function(req, res){

			const{temail, tpassword, semail} = req.body;
			console.log(req.body)

			Teachers.findOne({temail:temail},function(err, teacher){
				if(err){
					res.json({errorMessage: "Sorry Something Went Wrong "})
				}
				else if(teacher && teacher!=null && teacher!=undefined){
					var hash  = teacher.password

					var z= bcrypt.compareSync(tpassword, hash);

					if(z==true){
						console.log("Match")

						Posts.find({temail:temail, semail:semail}, function(err,posts){
							if(err){
								res.json({errorMessage:"Sorry SomethingWent Wrong"})
							}
							else{
								res.json({posts})
							}
						})

						// res.json(teacher)
					}
					else{
						res.json({errorMessage: "Sorry Teacher Password Didnt Match"})
					}
				}
				else{
					res.json({errorMessage: "Sorry Teacher Doesn;t Exist "})
				}

			})

		})

// /api/teacher/postonstudentstimeline


		app.post('/api/teacher/postonstudentstimeline',upload,function(req, res){
			console.log("yuyyyyyyyyyyyyyyyy")
			console.log(req.body)

			const {errors, isValid} =validateTLogin(req.body)
			console.log(isValid)
			if(isValid){
			const{temail, tpassword, semail, tname, headline, description} = req.body;

				Teachers.findOne({temail:temail},function(err, teacher){
					if(err){
						res.json({errorMessage: "Sorry Something Went Wrong "})
					}
					else if(teacher && teacher!=null && teacher!=undefined){
						var hash  = teacher.password

						var z= bcrypt.compareSync(tpassword, hash);

						if(z==true){
							console.log("Match")



							Students.findOne({semail:semail}, function(err, student){
								if(err){

								}
								else if(student && student!=null && student!=undefined){
									var postOb = new Posts();

									postOb.posthead = headline
									postOb.description= description
									postOb.tname=tname
									postOb.temail=temail
									postOb.sname=student.sname
									postOb.semail= semail
									postOb.schoolEmail= student.schoolEmail
									postOb.comments=[]
									var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

									postOb.date=date

// //  image uploads
// var path=""
// var path1=""
// var path2=""
// var paths=[]
console.log("-------------------------------------------------")
console.log(JSON.stringify(req.files))
if(req.files && req.files!=null && req.files!=undefined && req.files['RelatedImages1'] && req.files['RelatedImages1'] != null && req.files['RelatedImages1']!= undefined && req.files['RelatedImages1'][0] !='' && req.files['RelatedImages1'].length>0 && req.files['RelatedImages1'][0].size>0){

console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

console.log(JSON.stringify(req.files['RelatedImages1']))

console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

}
else{
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")

console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")


}
//                 if(req.files['RelatedImage'] && req.files['RelatedImage'] != null && req.files['RelatedImage']!= undefined && req.files['RelatedImage'][0] !='' && req.files['RelatedImage'].length>0 && req.files['RelatedImage'][0].size>0){


//                     if(req.files['RelatedImage'][0].size>0)  
//                     {
//                       console.log("RELATED IMAGE")
//                       path          = req.files['RelatedImage'][0].path;
//                       path              = path.replace('public', '');
//                       paths.push(path)
//                     }
//                     if(req.files['RelatedImage'][1].size>0)  
//                     {
//                       console.log("RELATED IMAGE")
//                       path1          = req.files['RelatedImage'][1].path;
//                       path1              = path.replace('public', '');
//                       paths.push(path1)
//                     }
//                     if(req.files['RelatedImage'][2].size>0)  
//                     {
//                       console.log("RELATED IMAGE")
//                       path2          = req.files['RelatedImage'][2].path;
//                       path2              = path.replace('public', '');
//                       paths.push(path2)
//                     }
//                 }
//                 					postOb.paths=paths




									postOb.save(function(err){
										if(err){
											res.json({errorMessage: "Sorry Something Went Wrong While Saving The Post"})
										}
										else{
											console.log(postOb)
											console.log("888888888888888")
											console.log(postOb.comments)
											res.json({postOb})
										}
									})
								}
								else{

								}



							})


							// res.json(teacher)
						}
						else{
							res.json({errorMessage: "Sorry Teacher Password Didnt Match"})
						}
					}
					else{
						res.json({errorMessage: "Sorry Teacher Doesn;t Exist "})
					}

				})

			}
			else{
				res.status(400).json({errors})
			}
		})
// /api/teacher/getthepost

		app.post('/api/teacher/getthepost',function(req, res){

			const{temail, tpassword, semail, postId} = req.body;
			console.log(req.body)

			Teachers.findOne({temail:temail},function(err, teacher){
				if(err){
					res.json({errorMessage: "Sorry Something Went Wrong "})
				}
				else if(teacher && teacher!=null && teacher!=undefined){
					var hash  = teacher.password

					var z= bcrypt.compareSync(tpassword, hash);

					if(z==true){
						console.log("Match")

						Posts.findOne({temail:temail, semail:semail, _id:postId}, function(err,post){
							if(err){
								res.json({errorMessage:"Sorry SomethingWent Wrong"})
							}
							else{
								res.json({post})
							}
						})
// res.json({errorMessage:"Working"})
						// res.json(teacher)
					}
					else{
						res.json({errorMessage: "Sorry Teacher Password Didnt Match"})
					}
				}
				else{
					res.json({errorMessage: "Sorry Teacher Doesn;t Exist "})
				}

			})

		})
		// /api/teacher/post/comment
		app.post('/api/teacher/post/comment',function(req, res){

			const{temail, tpassword, semail, postId, comment} = req.body;
			console.log(req.body)

			Teachers.findOne({temail:temail},function(err, teacher){
				if(err){
					res.json({errorMessage: "Sorry Something Went Wrong "})
				}
				else if(teacher && teacher!=null && teacher!=undefined){
					var hash  = teacher.password

					var z= bcrypt.compareSync(tpassword, hash);

					if(z==true){
						console.log("Match")

						Posts.findOne({temail:temail, semail:semail, _id:postId}, function(err,post){
							if(err){
								res.json({errorMessage:"Sorry SomethingWent Wrong"})
							}
							else{
								var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
								var c={
									comment:comment,
									cdate:date,
									postedBy:teacher.tname
								}
								// post.comments.comment= comment;
								// var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
								// post.comments.cdate= date

								post.comments.push(c)

								post.save(function(err){
									if (err){
										res.json({errorMessage:"Sorry, There Was ErroWhile Saving Comment"})
									}
									else{
										res.json({post})
									}

								})

								
							}
						})
// res.json({errorMessage:"Working"})
						// res.json(teacher)
					}
					else{
						res.json({errorMessage: "Sorry Teacher Password Didnt Match"})
					}
				}
				else{
					res.json({errorMessage: "Sorry Teacher Doesn;t Exist "})
				}

			})

		})




		// *************************************************************************************************************************************************
		// *************************************************************************************************************************************************
		// *************************************************************************************************************************************************

		// Students
		app.post('/api/student/logmein',function(req, res){
			console.log("45 45 45 45"+JSON.stringify(req.body))

			const {errors, isValid} =validateSLogin(req.body)
			console.log(isValid)
			if(isValid){
				const{semail, spassword} = req.body;
					db.collection('students').findOne({semail:semail}, function(err, oStudent){
						if (err){
							console.log("Error in /api/student logmein in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oStudent== undefined || oStudent== null || oStudent==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							var hash  = oStudent.password
							// console.log(hash)
							var pass = req.body.spassword
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){
								res.json({oStudent})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}

						}

					})

			}
			else{
				res.status(400).json({errors})
			}

		})

		// /api/student/fetchmyteachers
		app.post('/api/student/fetchmyteachers',function(req, res){
			console.log("50 50 50 50"+JSON.stringify(req.body))


				const{semail, spassword} = req.body;
				db.collection('students').findOne({semail:semail}, function(err, oStudent){
					if (err){
						console.log("Error in /api/student logmein in *** SERVER.JS ***")
						res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
					}
					if (oStudent== undefined || oStudent== null || oStudent==""){
						console.log("No Match Found")
						res.json({errorMessage: "Sorry No Match Found"})
					}
					else{
						console.log("Matched")
						var hash  = oStudent.password
						// console.log(hash)
						var pass = req.body.spassword
						// console.log(pass)
						var z= bcrypt.compareSync(pass, hash);

						if(z==true){
							res.json({oStudent})
						}
						else{
							res.json({errorMessage: "Sorry Password Didn't Match "})

						}

					}

				})

		})
// /api/student/FetchMyPosts
		app.post('/api/student/FetchMyPosts',function(req, res){
			console.log("51 51 51 51"+JSON.stringify(req.body))


				const{semail, spassword, TId} = req.body;
				db.collection('students').findOne({semail:semail}, function(err, oStudent){
					if (err){
						console.log("Error in /api/student logmein in *** SERVER.JS ***")
						res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
					}
					if (oStudent== undefined || oStudent== null || oStudent==""){
						console.log("No Match Found")
						res.json({errorMessage: "Sorry No Match Found"})
					}
					else{
						console.log("Matched")
						var hash  = oStudent.password
						// console.log(hash)
						var pass = req.body.spassword
						// console.log(pass)
						var z= bcrypt.compareSync(pass, hash);

						if(z==true){
							Posts.find({semail:semail,temail:TId}, function(err, posts){
								if(err){
									res.json({errorMessage:  "Sorry Something Went Wrong While Finding Posts"})
								}
								else{
									res.json({posts})
								}

							})
							
						}
						else{
							res.json({errorMessage: "Sorry Password Didn't Match "})

						}

					}

				})

		})
// /api/student/FetchMyParticularPost
		app.post('/api/student/FetchMyParticularPost',function(req, res){
			console.log("51 51 51 51"+JSON.stringify(req.body))


				const{semail, spassword, temail, postId} = req.body;
				db.collection('students').findOne({semail:semail}, function(err, oStudent){
					if (err){
						console.log("Error in /api/student logmein in *** SERVER.JS ***")
						res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
					}
					if (oStudent== undefined || oStudent== null || oStudent==""){
						console.log("No Match Found")
						res.json({errorMessage: "Sorry No Match Found"})
					}
					else{
						console.log("Matched")
						var hash  = oStudent.password
						// console.log(hash)
						var pass = req.body.spassword
						// console.log(pass)
						var z= bcrypt.compareSync(pass, hash);

						if(z==true){
							Posts.findOne({semail:semail,temail:temail, _id:postId}, function(err, posts){
								if(err){
									res.json({errorMessage:  "Sorry Something Went Wrong While Finding Posts"})
								}
								else{
									res.json({posts})
								}

							})
							
						}
						else{
							res.json({errorMessage: "Sorry Password Didn't Match "})

						}

					}

				})

		})

//  /api/student/comment
		app.post('/api/student/comment',function(req, res){
			console.log("51 51 51 51"+JSON.stringify(req.body))


				const{semail, spassword, temail, postId, comment} = req.body;
				db.collection('students').findOne({semail:semail}, function(err, oStudent){
					if (err){
						console.log("Error in /api/student logmein in *** SERVER.JS ***")
						res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
					}
					if (oStudent== undefined || oStudent== null || oStudent==""){
						console.log("No Match Found")
						res.json({errorMessage: "Sorry No Match Found"})
					}
					else{
						console.log("Matched")
						var hash  = oStudent.password
						// console.log(hash)
						var pass = req.body.spassword
						// console.log(pass)
						var z= bcrypt.compareSync(pass, hash);

						if(z==true){
							Posts.findOne({semail:semail,temail:temail, _id:postId}, function(err, post){
								if(err){
									res.json({errorMessage:  "Sorry Something Went Wrong While Finding Posts"})
								}
								else{
									// res.json({posts})
								var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
								var c={
									comment:comment,
									cdate:date,
									postedBy:oStudent.tname
								}
								// post.comments.comment= comment;
								// var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
								// post.comments.cdate= date

								post.comments.push(c)

								post.save(function(err){
									if (err){
										res.json({errorMessage:"Sorry, There Was Error While Saving Comment"})
									}
									else{
										res.json({post})
									}

								})
								}

							})
							
						}
						else{
							res.json({errorMessage: "Sorry Password Didn't Match "})

						}

					}

				})

		})




		app.use(function(req,res){
			console.log("SERVER 404")
			res.status(404).json({
				errors:{
					global: "Still Working On It.Please Try Again Later"
				}
			})
		})




		app.listen(3001, ()=> console.log("Server Running at 8080"))

})

