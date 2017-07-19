// import express from 'express';
// import mongodb from 'mongodb';
// import bodyParser from 'body-parser'
// import nodemailer from 'nodemailer'
// import bcrypt from 'bcryptjs'
var express	 		= require('express');
var mongodb 		= require('mongodb');
var bodyParser 		= require('body-parser')
var nodemailer 		= require('nodemailer')
var bcrypt 			= require('bcryptjs')
var randomstring  	= require("randomstring");
// import Teachers from "./models/teachers"
// import Students from "./models/students"
// import Posts from "./models/posts"
// import Schools from "./models/school"

// import mongoose from 'mongoose'

var Teachers 	=	require("./models/teachers")
var Students 	=	require("./models/students")
var Posts 		=	require("./models/posts")
var Schools 	=	require("./models/school")
var Admin 		=  	require ("./models/admin")


var mongoose =require('mongoose')

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
var upload  = multer({ storage : storage}).fields([{ name: 'RelatedImages1', maxCount: 3 }, { name: 'uploadImage', maxCount: 1 }]); //upload Midleware

const saltRounds = 10;
var salt 	= bcrypt.genSaltSync(saltRounds);
            

const app 	= express();


var jwt    	= require('jsonwebtoken'); // for setting up tokens
var confi 	= require("./configurations/config")
app.set('superSecret', confi.secret);

// app.use(bodyParser.json())

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));

app.use(express.static('public'))

const dbUrl ="mongodb://localhost:27017/FinalMadhu";       // setting mongo db name and path from here for collection querry

mongoose.connect('mongodb://localhost/FinalMadhu');         // for rest of the usage for direct mongo usage by using mongoose library

function validate(data){
		let errors = {}
		// console.log("******")
		// console.log(data)
		if(data.email === "") errors.email="Email Can't Be Empty"

		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) === false) errors.email="School Email Should Be Valid"

		if(data.name === "") errors.name="School Name Can't Be Empty"

		if(data.password ==="") errors.password="Password Can't Be Empty"
		if(data.password.length<6) errors.password="Password Length Shouldn't Be Less Than 6"

		if(data.cpassword ==="") errors.cpassword="Confirm Password Can't Be Empty"
		if(data.cpassword !== data.password) errors.cpassword="Password and Confirm Password Should Match"	

		// this.setState({ errors })
		console.log(errors)
		const isValid = Object.keys(errors).length===0

		return {errors, isValid}
}


function TeacherValidation(data){
		let errors={}
		if(data.temail === "") errors.temail="Email Can't Be Empty"
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.temail) === false) errors.temail="Teacher Email Should Be Valid"
		if(data.tname === "" || data.tname.trim()==="") errors.tname="Name Can't Be Empty"
		if(data.tlname === "" || data.tlname.trim() === "") errors.tlname="Last Name Can't Be Empty" 

		//qualifications can be empty
		if(data.tsubject === "" || data.tsubject.trim() === "") errors.tsubject="Subject/ Speciality Can't Be Empty"

		if(data.tphoneNumber < 1) errors.tphoneNumber="Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(data.tphoneNumber <0) errors.tphoneNumber="Phone Number Can't Have A Negative Value"
		// console.log("2*** "+this.state.sParentsPhonNumber <0)
		// if(parseInt(data.tphoneNumber).toString()!==data.tphoneNumber) errors.tphoneNumber="Parent's/ Gaurdian's Phone Number Can't Have A Decimal Value"

		if(data.tphoneNumber === "") errors.tphoneNumber="Phone Number Can't Be Empty"


		if(data.taddress === "" || data.taddress.trim() === "") errors.taddress="Address Can't Be Empty"


		if(data.tpassword ==="" || data.tpassword.trim() ==="") errors.tpassword="Password Can't Be Empty"
		if(data.tcpassword ==="") errors.tcpassword="Confirm Password Can't Be Empty"
		if(data.tpassword !== data.tcpassword) errors.tcpassword="Password And Confirm Password Should Be Same"
		if(data.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"

		// this.setState({ errors })
		console.log(errors)
		const isValid = Object.keys(errors).length===0

		return {errors, isValid}
}

function StudentValidation(data){
		let errors={}
		if(data.semail === "") errors.semail="Email Can't Be Empty"
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.semail) === false) errors.semail="Student Email Should Be Valid"
		if(data.sname === "" || data.sname.trim() === "") errors.sname="Name Can't Be Empty"

		if(data.slname === "" || data.slname.trim() === "") errors.slname="Last Name Can't Be Empty"

		if(data.sclass === "" ) errors.sclass="Class Can't Be Empty"
		if(data.sclass < 1) errors.sclass="Class Can't Be Zero"
		if(data.sclass <0) errors.sclass="Class Can't Have A Negative Value"
		// if(parseInt(data.sclass).toString()!==data.sclass) errors.sclass="Class Can't Have A Decimal Value"


		if(data.sGaurdianName === "" || data.sGaurdianName.trim() === "") errors.sGaurdianName="Parent's/ Gaurdian's Name Can't Be Empty"

		if(data.sParentsPhonNumber < 1) errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(data.sParentsPhonNumber <0) errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Have A Negative Value"
		if(data.sParentsPhonNumber === "") errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Be Empty"
		if(data.saddress === "" || data.saddress.trim() === "") errors.saddress="Parent's / Gaurdians's Address Can't Be Empty"

		if(data.spassword ==="" || data.spassword.trim() ==="") errors.spassword="Password Cant Be Empty"
		if(data.scpassword ==="") errors.scpassword="Confirm Password Can't Be Empty"
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
		if(data.email === "") errors.email="Email Can't Be Empty"
		if(data.password ==="") errors.password="Password Can't Be Empty"
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
		if(data.headline === "") errors.headline="Headline Cant Be Empty"
		if(data.email === "") errors.email="School Email Can't Be Empty"
		console.log(errors)

		const isValid = Object.keys(errors).length===0

		return {errors, isValid}
}
function validateTeacherChangePasswordEmail(data){

		let errors = {};

		if(data.tlname === "" || data.tlname.trim() === "") errors.tlname="Name Can't Be Empty" 
		//qualifications can be empty
		if(data.tsubject === "" || data.tsubject.trim() === "") errors.tsubject="Subject/ Speciality Can't Be Empty"

		if(data.tphoneNumber < 1) errors.tphoneNumber="Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(data.tphoneNumber <0) errors.tphoneNumber="Phone Number Can't Have A Negative Value"

		if(data.tphoneNumber === "") errors.tphoneNumber="Phone Number Can't Be Empty"


		if(data.taddress === "" || data.taddress.trim() === "") errors.taddress="Address Can't Be Empty"

		if(data.tpassword === "" || data.tpassword.trim() === "") errors.tpassword="Password Can't Be Empty"
		if(data.tcpassword ==="") errors.tcpassword="Confirm Password Can't Be Empty"
		if(data.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
		if(data.tcpassword !== data.tpassword) errors.tcpassword="Password and Confirm Password Should Match"	

		console.log(errors)

		const isValid = Object.keys(errors).length===0
		return {errors, isValid}

}
function validateStudentChangePasswordEmail(data){

		let errors = {};

		if(data.slname === "" || data.slname.trim() === "") errors.slname="Last Name Can't Be Empty"

		if(data.sclass === "" || data.sclass.trim() === "") errors.sclass="Class Can't Be Empty"
		if(data.sclass < 1) errors.sclass="Class Can't Be Zero"
		if(data.sclass <0) errors.sclass="Class Can't Have A Negative Value"

		if(data.sGaurdianName === "" || data.sGaurdianName.trim() === "") errors.sGaurdianName="Parent's/ Gaurdian's Name Can't Be Empty"

		if(data.sParentsPhonNumber === "") errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Be Empty"
		if(data.sParentsPhonNumber < 1) errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(data.sParentsPhonNumber <0) errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Have A Negative Value"

		if(data.saddress === "" || data.saddress.trim() === "") errors.saddress="Parent's / Gaurdians's Address Can't Be Empty"

		if(data.spassword === "" || data.spassword.trim() === "") errors.spassword="Password Can't Be Empty"
		if(data.scpassword ==="") errors.scpassword="Confirm Password Can't Be Empty"
		if(data.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
		if(data.scpassword !== data.spassword) errors.scpassword="Password and Confirm Password Should Match"	

	
	console.log(errors)

	const isValid = Object.keys(errors).length===0
	return {errors, isValid}

}
// validateSchoolChangePasswordEmail
function validateSchoolChangePasswordEmail(data){

		let errors = {};

		if(data.password ==="") errors.password="Password Can't Be Empty"
		if(data.cpassword ==="") errors.cpassword="Confirm Password Can't Be Empty"
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
		if(data.temail === "") errors.temail="Email Can't Be Empty"
		if(data.tpassword ==="") errors.tpassword="Password Can't Be Empty"
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
		if(data.semail === "") errors.semail="Email Can't Be Empty"
		if(data.spassword ==="") errors.spassword="Password Can't Be Empty"
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

	if(data.headline === "" || data.headline.trim() === "") errors.headline="Headline Can't Be Empty"
	if(data.description === "" || data.description.trim() === "") errors.description="Description Can't Be Empty"

	console.log(errors)

	const isValid = Object.keys(errors).length===0

	return {errors, isValid}
}



// transporter for email address
// let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user : 'test4rvtech@gmail.com',
//         //		test4rvtech@gmail.com
//         pass : 'RVtechtest#123',
//         //		RVtechtest#123
//     },
//     // tls: {
//     //     rejectUnauthorized: false
//     // }
// });

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user : 'mychildappatnovak@gmail.com',
        //		test4rvtech@gmail.com
        pass : 'Novak@123',
        //		RVtechtest#123
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});


// console.log("@@@@@@@@@@@@@@@@@@")                                                              // Just to be sure


mongodb.MongoClient.connect(dbUrl, function(err,db){

		app.get("/api/getSchools", function(req,res){
			db.collection('schools').find({},{"email":1, "name":1, "schoolImage":1}).toArray((err, schools)=>{
				console.log(schools)
				res.json({schools})
			})
		})

		app.post("/api/upload", upload, function(req,res){


			console.log("here /api/upload")
			console.log("\n\n\n\n\n\n")
			console.log(req.body)
			console.log(req.files)
		})

// /api/schools/newlogin
		app.post('/api/schools/newlogin', function(req,res){
			// console.log("Successfull hit")
			// console.log(req.body)
			const {errors, isValid} =validate(req.body)
			if(isValid){
				// const{email, password, name} = req.body;
				var password = req.body.password
				var name = req.body.name
				var email = req.body.email
				// console.log(email)
				// console.log(password)
				// console.log(name)
				// console.log("@@@@@@@@@@@@@@@@@@@@@@@")

				email = (email.replace(/ /g,"")).toLowerCase();
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
						db.collection('schools').insert({email, name, "password":hash, approval:false},function(err, doneSchool){
							if (err){
								console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
								res.json({errorMessage: "Sorry Something Went Wrong While Saving"})
							}
							else{
								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Novak MyChildApp" <mychildappatnovak@gmail.com>', // sender address
								    to: 'test4rvtech@gmail.com, '+email, // list of receivers
								    // to: "test4rvtech@gmail.com, "+email, // list of receivers
								    subject: 'Novak - School Registration Successful', // Subject line
								    text: 'Welcome '+name+ ' to Novak Group', // plain text body
								    html: '<b>Welcome '+name +' </b>.<br/><br/> You have successfully registered. Your account will be activated once the Admin approves the request.<br/><br/>'+
								    '<b>Email </b>(id to be used for login) = > ' + email+ "  <br/><b>School Name<b/> = > '"+name + "'.  <br/><b>Password</b>(to be used while logging in) = >'"+password+"'"+
								    '<br/> <br/> Thank You<br/> Regards', // html body
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

// db.collection('teachers').insert({temail, tname, "password":hash, "schoolName":name, "schoolEmail":email, tlname:tlname, tqualifications:tqualifications, tsubject:tsubject, tphoneNumber:tphoneNumber, taddress:taddress},function(err, doneTeacher){
// /api/Admin/login

		// New Static Info input for admin //
		app.get("/api/Admin/signup", function(req,res){
			console.log("/api/Admin/signup")
			Admin.findOne({name: "Madhu"}, function(err, admin){
				if(err){
					console.log("ERROR in /api/Admin/signup")
				}
				else if(admin && admin!= null){
					console.log(admin.name+" Already Exists")

				}
				else{
					var password = "MadhuNovakAdmin#"
					var hash = bcrypt.hashSync(password, salt);

					var ad = new Admin({
						name:"Madhu",
						email:"madhu.sathiaseelan@novak.co.in",
						password:hash,
					})

					ad.save(function(err){
						if(err){
							console.log("Sorry Couldnt Save new Account")
						}
						else{
							console.log("Successfully Saved details for "+ ad.name)
						}

					})

				}
			})
		})




		// Using the admin details to login now, And creating a token
		app.post("/api/Admin/login", function(req,res){

			Admin.findOne({email: req.body.email}, function(err, admin){
				if(err){
					console.log("ERROR in /api/Admin/login")
				}
				else if(admin && admin!= null){
					console.log("User Found")
					var hash  = admin.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.password, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")


					var token = jwt.sign(admin, app.get('superSecret'), {
				      	expiresIn : 60*60*24 // expires in 24 hours
				    });

					admin.token = token;

				    admin.save(function(err){

				    	if(err){
				    		res.json({errorMessage:"Sorry Session Can Not Be Created"})
				    	}
				    	else{
				    		res.json({SuccessMessage:"Welcome", admin:admin})
				    	}

				    })

					// res.json({errorMessage:"Success"})
					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					res.json({errorMessage:"Sorry User Not Found"})

				}
			})
		})
// /api/Admin/logMeOut
		app.post("/api/Admin/logMeOut", tokenVerification, function(req,res){
console.log("here")
			Admin.findOne({email: req.body.email}, function(err, admin){
				if(err){
					console.log("ERROR in /api/Admin/login")
				}
				else if(admin && admin!= null){
					console.log("User Found")
					var hash  = admin.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.password, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")

					admin.token = "";

				    admin.save(function(err){

				    	if(err){
				    		res.json({errorMessage:"Sorry Log Out Wasn't Successfull"})
				    	}
				    	else{
				    		res.json({SuccessMessage:"Successfully Signed Out"})
				    	}

				    })

					// res.json({errorMessage:"Success"})
					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					res.json({errorMessage:"Sorry User Not Found"})

				}
			})
		})




// /api/Admin/details
		app.post("/api/Admin/details", tokenVerification, function(req,res){
			console.log(JSON.stringify(req.body))

			Admin.findOne({email: req.body.email}, function(err, admin){
				if(err){
					console.log("ERROR in /api/Admin/details")
				}
				else if(admin && admin!= null){
					console.log("User Found")
					var hash  = admin.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.password, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")
						Schools.find({approval:false}, {email:1, name:1 ,approval:1}, function(err, SchoolList){
							console.log()
							console.log(SchoolList)
							res.json({ admin:admin, schools:SchoolList})

						})
				    		

					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					res.json({errorMessage:"Sorry User Not Found"})

				}
			})
		})


// /api/Admin/approveTheSchool
		app.post("/api/Admin/approveTheSchool", tokenVerification, function(req,res){
			console.log("approveSchool")
			Admin.findOne({email: req.body.email}, function(err, admin){
				if(err){
					console.log("ERROR in /api/Admin/details")
				}
				else if(admin && admin!= null){
					console.log("User Found")
					var hash  = admin.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.password, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")
						Schools.findById(req.body.id, {email:1, name:1 ,approval:1}, function(err, school){
							console.log()
							console.log(school)

							school.approval=true;
							school.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Something Went Wrong While Approving"})
								}
								else{
									res.json({SuccessMessage: "Successfullly Approved "+school.name})
								}
							})
							// res.json({SuccessMessage:"Successfull Sign In", admin:admin, schools:school})

						})
				    		

					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					console.log("nothing found")
					res.json({errorMessage:"Sorry User Not Found"})

				}
			})
		})


// /api/Admin/disapproveTheSchool
		app.post("/api/Admin/disapproveTheSchool", tokenVerification, function(req,res){
			Admin.findOne({email: req.body.email}, function(err, admin){
				if(err){
					console.log("ERROR in /api/Admin/details")
				}
				else if(admin && admin!= null){
					console.log("User Found")
					var hash  = admin.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.password, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")
						Schools.findById(req.body.id, {email:1, name:1 ,approval:1}, function(err, school){
							console.log()
							console.log(school)
							school.remove(function(err){
								if(err){
									res.json({errorMessage:"Sorry Something Went Wrong While Deleting"})
								}
								else{
									res.json({SuccessMessage: "Successfullly Deleted "+school.name +"'s Request"})
								}
							})
							// res.json({SuccessMessage:"Successfull Sign In", admin:admin, schools:school})

						})
				    		

					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					res.json({errorMessage:"Sorry User Not Found"})

				}
			})
		})






// *********************************************************************************************************************************


		app.post('/api/schools/Logmein',function(req, res){
			console.log("45 45 45 45"+JSON.stringify(req.body))

			const {errors, isValid} =validateLogin(req.body)
			console.log(isValid)
			if(isValid){
				// const{email, password} = req.body;
				var email =req.body.email
				var password = req.body.password
					email = (email.replace(/ /g,"")).toLowerCase();
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
								if(oSchool.approval && oSchool.approval!=null && oSchool.approval!=undefined && oSchool.approval==true){


								Schools.findOne({email:email}, function(err, oSchool){
									var token = jwt.sign(oSchool, app.get('superSecret'), {
								      	expiresIn : 60*60*24 // expires in 24 hours
								    });

									oSchool.schoolToken = token;

									oSchool.save(function(err){
										if(err){
											res.json({errorMessage:"Sorry There Was Error Creating Session"})
										}
										else{
											res.json({oSchool})
											// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
											// console.log()
											// console.log(JSON.stringify(oSchool))
											// console.log()
											// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
										}



									})
								})



								

								}
								else{
									res.json({errorMessage: "Sorry You Are Not Approved Yet By The Admin "})
								}
								
							
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
								    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+req.body.email, // list of receivers
								    subject: 'Novak - School Password Recovery', // Subject line
								    text: 'Hello', // plain text body
								    html: '<b>Hello '+ oSchool.name+ '.</b><br/><br/>'+
								    'A new password has been generated successfully.<br/><br/>'+
								    '<b>Email</b> (id to be used when you log in): '+req.body.email+'.<br/>'+
								    "<b>New Password</b>(within the quotes): '" +password+"'", // html body
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
								    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+req.body.email, // list of receivers
								    subject: 'Novak - Teacher Password Recovery', // Subject line
								    text: 'Hello', // plain text body
								    // html: '<b>Hello '+ oTeacher.tname+ ' .Your New Password is ' +password, // html body

								    html: '<b>Hello '+ oTeacher.tname+ '.</b><br/><br/>'+
								    'A new password has been generated successfully.<br/><br/>'+
								    '<b>Email</b> (id to be used when you log in): '+req.body.email+'.<br/>'+
								    "<b>New Password</b>(within the quotes): '" +password+"'", // html body
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
		app.post('/api/teacher/changePassword', upload, TeacherTokenVerification,function(req, res){
			console.log("45 45 45 45 *********          teacher      ******          changePassword   *********"+JSON.stringify(req.body))

			const {errors, isValid} =validateTeacherChangePasswordEmail(req.body)                                          // validateForgotPasswordEmail 
			console.log(isValid)
			if(req.files && req.files!=null){
				console.log(req.files)
			}
			if(isValid){
				const{temail, tpassword, OldTpassword, tcpassword, tlname, tqualifications, tsubject, tphoneNumber, taddress} = req.body;
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
							oTeacher.tlname= tlname
							oTeacher.tqualifications= tqualifications
							oTeacher.tsubject= tsubject
							oTeacher.tphoneNumber= tphoneNumber
							oTeacher.taddress= taddress

							if(req.files && req.files!=null && req.files.RelatedImages1 && req.files.RelatedImages1!=null && req.files.RelatedImages1[0] && req.files.RelatedImages1[0]!=null){
								console.log(req.files)
								var path=""
								path          = req.files['RelatedImages1'][0].path;
                      			path              = path.replace('public', '');
		                        // paths.push(path)
		                        oTeacher.teacherImage=path



							}



							oTeacher.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again Changing Password"})
								}
								else{

									// setup email data with unicode symbols
									let mailOptions = {
									    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
									    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
									    to: "test4rvtech@gmail.com, "+temail, // list of receivers
									    subject: 'Novak - Teacher Profile Updated', // Subject line
									    text: 'Hello', // plain text body
									    html: '<b>Hello '+ oTeacher.tname+ '</b><br/><br/>'+
									    'Your profile details have been updated. To review the changes please log on to the website.<br/><br/>'+
									    '<b>Email</b> (id to be used when you log in): '+temail+'.<br/>'+
									    "<b>Password</b>(within the quotes): '" +tpassword+"'", // html body
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


// /api/teacher/FetchMyTProfile
		app.post('/api/teacher/FetchMyTProfile', TeacherTokenVerification, function(req, res){
			console.log("45 45 45 45 ***********       api/teacher/FetchMyTProfile                         *************"+JSON.stringify(req.body))

			// const {errors, isValid} =validateTeacherChangePasswordEmail(req.body)                                          // validateForgotPasswordEmail 

				const{temail, tpassword} = req.body;
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
							console.log()
							console.log("-------------------")
							console.log(oTeacher)
							console.log()
							console.log('--------------------')
							// var hash  = oSchool.password
							// console.log(hash)

							var hash  = oTeacher.password
							console.log(hash)
							
							console.log(tpassword)
							var z= bcrypt.compareSync(tpassword, hash);

							if(z==true){
								res.json({"theTeacher":oTeacher})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}
						}

					})

		})



// /api/student/changePassword
		app.post('/api/student/changePassword',upload, studentTokenVerification, function(req, res){
			console.log("45 45 45 45 ************************"+JSON.stringify(req.body))

			const {errors, isValid} =validateStudentChangePasswordEmail(req.body)                                          
			console.log(isValid)
			if(isValid){
				const{semail, spassword, OldSPpassword, scpassword, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber} = req.body;
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
							console.log()
							console.log("***********************")
							console.log(req.files)
							console.log('************************')
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

							oStudentParent.slname=slname
							oStudentParent.sclass=sclass
							oStudentParent.sGaurdianName=sGaurdianName
							oStudentParent.saddress=saddress
							oStudentParent.sParentsPhonNumber=sParentsPhonNumber

							if(req.files && req.files!=null && req.files.RelatedImages1 && req.files.RelatedImages1!=null && req.files.RelatedImages1[0] && req.files.RelatedImages1[0]!=null){
								console.log(req.files)
								var path=""
								path          = req.files['RelatedImages1'][0].path;
                      			path              = path.replace('public', '');
		                        // paths.push(path)
		                        oStudentParent.studentImage=path



							}




							console.log()
							console.log("SAVING HERE")

							oStudentParent.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again Changing Password"})
								}
								else{

									// setup email data with unicode symbols
									let mailOptions = {
									    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
									    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
									    to: "test4rvtech@gmail.com, "+semail, // list of receivers
									    subject: 'Novak - Student Profile Updated', // Subject line
									    text: 'Hello', // plain text body
									    html: '<b>Hello '+ oStudentParent.sname+ '.</b><br/><br/>'+
									    'Your profile details has been updated. To review the changes please log on to the website.<br/><br/>'+
									    '<b>Email</b>(id to be used when you log in): '+semail+'.<br/>'+
									    "<b>Password</b>(within the quotes):  '"+spassword+"'", // html body
									};

									// send mail with defined transport object
	                                    transporter.sendMail(mailOptions, function(error, info){
	                                        if(error){
	                                            console.log("In error of nodemailer")
	                                            console.log(error);
	                                        }
	                                        else{
                								console.log()
												console.log(JSON.stringify(oStudentParent))
												console.log()

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

// /api/schools/changepassword//
		app.post('/api/schools/changepassword', upload, SchoolTokenVerification,  function(req, res){
			console.log("45 45 45 45 ************************"+JSON.stringify(req.body))

			const {errors, isValid} =validateSchoolChangePasswordEmail(req.body)  
			console.log("********************************************")
			if(req.files){
				console.log(req.files)	
			}
			                                        
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

			                if(req.files && req.files!=null && req.files['RelatedImages1'] && req.files['RelatedImages1'] != null && req.files['RelatedImages1'].length>0 && req.files['RelatedImages1'][0].size>0){
								var path=""
// console.log("%%%%%%%%%%%%%%%")
// console.log(" ")
			                      path          = req.files['RelatedImages1'][0].path;
			                      path              = path.replace('public', '');
			                      // paths.push(path)
			                      oSchool.schoolImage=path
			                      // console.log()
			                      // console.log("^^^^^^^^^^^^^^^^^^^")
			                      // console.log(oSchool,schoolImage)
			                }
							oSchool.save(function(err){
								if(err){
									res.json({errorMessage:"Sorry Try Again Changing Password"})
								}
								else{

									// setup email data with unicode symbols
									let mailOptions = {
									    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
									    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
									    to: "test4rvtech@gmail.com, "+email, // list of receivers
									    subject: 'Novak - School Profile Updated', // Subject line
									    text: 'Hello', // plain text body
									    html: '<b>Hello '+ oSchool.name+ '.</b><br/><br/>'+
									    'Your profile details have been updated. To review the changes please log on to the website.<br/><br/>'+
									    '<b>Email</b>(id to be used when you log in): '+email+'.<br/>'+
									    "<b>Password</b>(within the quotes): '" +password+"'", // html body
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
// /api/schools/mySchoolProfilePic
		app.post('/api/schools/mySchoolProfilePic', SchoolTokenVerification,  function(req, res){
			console.log("45 45 45 45 ***********mySchoolProfilePic*************"+JSON.stringify(req.body))


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
								res.json({oSchool:oSchool})

							}

					})


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
								    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+req.body.email, // list of receivers
								    subject: 'Novak - Student/Parent Password Recovery', // Subject line
								    text: 'Hello', // plain text body
								    html: '<b>Hello '+ oStudentParent.sname+'.</b><br/><br/>'+
								    'A new password has been generated successfully.<br/>'+
								    '<b>Email</b> (id to be used when you log in): '+req.body.email+'.<br/>'+
								    "<b>New Password</b>(within the quotes): '" +password+"'", // html body
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




		app.post('/api/schools/getallteachers',SchoolTokenVerification,function(req, res){
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


app.post('/api/schools/gettheteacher', SchoolTokenVerification, function(req, res){
				const{email, password, name, TId} = req.body;
console.log("+++++++++++++++++++++++++++++++++++++++")
console.log(req.body)
					db.collection('schools').findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/gettheteacher in *** SERVER.JS ***")
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
								db.collection('teachers').find({"temail":TId},{temail:1, tname:1,schoolEmail:1, schoolName:1, studentsArray:1, teacherImage:1}).toArray(function(err, teacher){
									console.log("________________________")
									console.log(teacher)
									if(err){
										res.json({errorMessage: "Sorry Something Went Wrong."})

									}
									else if(teacher && teacher!=null && teacher!=undefined && teacher!='' && teacher.length>0){
										console.log("HERE")
// add student image from here

										db.collection('students').find({schoolEmail:email},{semail:1, sname:1,schoolEmail:1, schoolName:1, studentImage:1, sclass:1}).toArray((err, allstudents)=>{
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
												res.json({teachercontent:teacher, studentcontent: allstudents})
												// res.json({errorMessage: "Sorry There's No data yet in students"})
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
		app.post('/api/schools/teacher/addStudent', SchoolTokenVerification, function(req, res){
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
								db.collection('teachers').find({"temail":TId},{temail:1, tname:1,schoolEmail:1, schoolName:1,studentsArray:1, teacherImage:1}).toArray(function(err, teacher){
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
																	sname:sname,
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
																					// console.log()
																					// console.log()
																					// console.log(students.teacherArray)
																					// console.log(students.teacherArray!= null)
																					// console.log(students.teacherArray!=undefined)
																					// console.log(students.teacherArray.length)
																					// console.log()
																					// console.log()
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
																								tname:dta[0].tname,
																								teacherImage:dta[0].teacherImage,
																							}
																							console.log("^&^&^&^&^&^&&^&")
																							console.log(studObj)
																							students.teacherArray.push(studObj)
																							students.save(function(err){
																								if(err){
																									res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																								}
																								else{
																									console.log("$$$$$$$ %$%%%% %%%%%   $$$$")
																									var total=dta[0].studentsArray.length
																									for(var x=0; x<total;x++){
																										console.log("$$$$$$$ 9999999999999999999999")
																										console.log(semail)
																										console.log(dta[0].studentsArray[x])

																										if(dta[0].studentsArray[x].semail==semail){
																											console.log("$$$$$$$ %$%%%% %%%%%   $$$$")
																												// res.json({errorMessage: "ALREADY ADDED"})
																												dta[0].studentsArray[x].studentImage=students.studentImage
																												console.log()
																												console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^")
																												console.log(students.studentImage)
																												console.log()
																												console.log()
																												console.log(dta[0].studentsArray[x])
																												console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^")
																												dta[0].save()
																										}
																									}
																									console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
																									res.json({theteacher:dta})
																								}
																							})

																						}else{
																							console.lor("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
																							res.json({errorMessage: "Student Already Exists In This Teachers Assigned List"})

																						}
																					}
																					else{
																							var studObj={
																								temail:TId,
																								tname:dta[0].tname,
																								teacherImage:dta[0].teacherImage,
																							}
																							console.log("^&^&^&^&^&^&&^&*******************")
																							console.log(studObj)
																							students.teacherArray.push(studObj)
																							students.save(function(err){
																								if(err){
																									res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																								}
																								else{

																									for(var x=0; x<total;x++){
																										if(dta[0].studentsArray[x].semail==semail){
																												// res.json({errorMessage: "ALREADY ADDED"})
																												dta[0].studentsArray[x].studentImage=students.studentImage
																												dta[0].save()
																										}
																									}



																									console.log("#######################################")
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
																sname:sname,
																// studentImage:"",
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
																								tname:dta[0].tname,
																								teacherImage:dta[0].teacherImage,
																							}
																							console.log("^&^&^&^&^&^&&^&")
																							console.log(studObj)
																					students.teacherArray.push(studObj)
																					students.save(function(err){
																						if(err){
																							res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																						}
																						else{
console.log("#############################")
console.log("#############################")
console.log("#############################")
																									// for(var x=0; x<total;x++){
																										if(dta[0].studentsArray[0].semail==semail){
																												// res.json({errorMessage: "ALREADY ADDED"})
																												console.log("*******************************")
																												console.log("*******************************")
																												console.log("*******************************")
																												// console.log(dta[0].studentsArray[0])
																												// console.log(semail.studentImage)
																												// console.log(students.studentImage)
																												

																												dta[0].studentsArray[0].studentImage=students.studentImage
																												// console.log(dta[0].studentsArray[0])
																												// console.log("&&&&&&&&&&&&&&&")
																												dta[0].save(function(err){
																													if(err){
																														console.log("ITSSSSSS ERRROR")
																													}
																													else{
																														console.log("Not An Error")
																													}
																												})
																												console.log(dta[0].studentsArray[0])
																										}
																									// }

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
																								tname:dta[0].tname,
																								teacherImage:dta[0].teacherImage,
																							}
																					console.log("^&^&^&^&^&^&&^&")
																					console.log(studObj)
																					students.teacherArray.push(studObj)
																					students.save(function(err){
																						if(err){
																							res.json({errorMessage: "Student Added To Teacher But There's Error in Teacher Being Added To Student"})
																						}
																						else{
																									// for(var x=0; x<total;x++){
																										if(dta[0].studentsArray[0].semail==semail){
																												// res.json({errorMessage: "ALREADY ADDED"})
																												dta[0].studentsArray[0].studentImage=students.studentImage
																												dta[0].save()
																										}
																									// }

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

// /api/schools/teacher/DeassignStudent
		app.post('/api/schools/teacher/DeassignStudent', SchoolTokenVerification, function(req, res){
				const{email, password, semail, TId} = req.body;
				console.log("++++++++++++++++ de assign  @ @ @ @ @ ++++++++++++++++++++++")
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
								db.collection('teachers').find({"temail":TId},{temail:1, tname:1,schoolEmail:1, schoolName:1,studentsArray:1}).toArray(function(err, teacher){
									console.log("________________________")
									console.log(teacher)
									console.log()
									console.log()

									if(err){
										res.json({errorMessage: "Sorry Something Went Wrong."})

									}
									else if(teacher && teacher!=null && teacher!=undefined && teacher!='' && teacher.length>0){
										console.log("HERE")



										Teachers.find({"temail":TId}, function(err, dta){
											if(err){
												console.log("errrrrrrrr")
											}
											else{
console.log("teacher found 1330")
												if(dta[0].studentsArray && dta[0].studentsArray!=null && dta[0].studentsArray!=undefined && dta[0].studentsArray.length>0){
													// console.log(JSON.stringify(teacher[0]))
													// console.log("%%%%")
													var total = dta[0].studentsArray.length
													var cas
													var sliceme 
console.log()
console.log(dta[0])
console.log()

													for(var x=0; x<total;x++){
														if(dta[0].studentsArray[x].semail==semail){
															// res.json({errorMessage: "ALREADY ADDED"})
															sliceme = x
															cas=false
															console.log("FFFFOOOUUUUNNNNDDDDD")
														}
													}
													if(cas==false){
														console.log("FFOOOUUNNDD AANNDD DEELLEETTEE")
														dta[0].studentsArray.splice(sliceme,1)
														dta[0].save(function(err){
															if(err){
																res.json({errorMessage:"Error While UnAssigning"})
															}
															else{
																console.log(" saved in teacher yet to save in student" )
																Students.findOne({semail:semail}, function(err, students){
																	if(err){
																		res.json({errorMessage: "Student Added To Teacher But Teacher Couldnt Be Added To Student"})
																	}
																	if(students && students!=null && students!= undefined){
																		if(students.teacherArray && students.teacherArray!= null && students.teacherArray!=undefined && students.teacherArray.length>0){
																			var array2 = students.teacherArray;
																			var deleteme = false
																			var deletemeIndex
																			for (var nos = 0; nos<array2.length;nos++){
																				if(array2[nos].temail==TId){
																					deleteme =true
																					deletemeIndex = nos
																				}
																			} // for
																			if(deleteme==true){
																				students.teacherArray.splice(deletemeIndex,1)
																				students.save(function(err){
																						if(err){
																							res.json({errorMessage:"Student UnAssigned From Teacher But Teacher couldnt Be UnAssigned From Student"})

																						}
																						else{
																							console.log("DELETED FROM STUDENT AS WELL")
																							res.json({SuccessMessage:"Success"})
																						}
																				})


																			}
																			else{
																				res.json({errorMessage:"ffffffffff"})

																			}

																		}
																	}
																})
															}
														}) /////////////////////////


																	// res.json({errorMessage: "ALREADY ADDED"})
													}
													else{

														res.json({errorMessage: "Not ADDED"})
													}

	// res.json({errorMessage:"Working"})
												}
											}
										})

									}

								})

							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})
							}
						}
					});

				})

		app.post('/api/schools/teacher/registration',function(req, res){

			console.log(req.body)
			const {errors, isValid} =TeacherValidation(req.body)
			// console.log(isValid)
			if(isValid){

				const{ tpassword, tname, name, tlname, tqualifications, tsubject, tphoneNumber, taddress, email} = req.body;

				// res.json({errorMessage:"working"})

				var temail = req.body.temail
				temail = (temail.replace(/ /g,"")).toLowerCase()
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

						db.collection('teachers').insert({temail, tname, "password":hash, "schoolName":name, "schoolEmail":email, tlname:tlname, tqualifications:tqualifications, tsubject:tsubject, tphoneNumber:tphoneNumber, taddress:taddress},function(err, doneTeacher){
							if (err){
								console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
								res.json({errorMessage: "Sorry Something Went Wrong While Saving"})
							}
							else{
								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+temail, // list of receivers
								    subject: 'Novak- Teacher Registered By '+name , // Subject line
								    text: 'Welcome Teacher To Novak Group.', // plain text body
								    html: '<b>Welcome '+tname+' to Novak Group.</b><br/><br/>'+
								    'Your account was registered by <b>'+name+'</b> as a Teacher<br/><br/>'+
								    'Please visit <a href="http://52.172.193.107:3005/">This Link</a> to login using following credentials.<br/><br/>'+
								    '<b>Email</b> (id to be used when you log in): ' + temail+
								    "<br/><b>Password</b> (within the quotes):"+tpassword, // html body
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

// /api/schools/FetchTeacherProfile
app.post('/api/schools/FetchTeacherProfile',SchoolTokenVerification , function(req, res){
console.log("--------------------------------------------------------------------------")
console.log("--------------------------------------------------------------------------")
	console.log(req.body)


		const{name, email, password} = req.body;

		// res.json({errorMessage:"working"})



		db.collection('schools').findOne({email:email}, function(err, oSchool){
			if (err){
				console.log("Error in /api/getSchools in *** SERVER.JS ***")
				res.json({errorMessage: "Sorry Something Went Wrong While School"})
			}
			if(oSchool==null && oSchool==undefined && oSchool==''){
				res.json({errorMessage:  "The School Doesn't Exists"})
			}
			else{

				console.log("Success")
				var hash = oSchool.password
				console.log(password)
				console.log(hash)
				var z= bcrypt.compareSync(password, hash);
				console.log(z)
				console.log("**************************")


					if(z==true){
						// console.log("z is true")
						Teachers.findOne({temail:req.body.id}, function(err, teacher){
							if(err){
								console.log("--------------------------------------------------------------------------")
								console.log(err)
								console.log("Failure")
							}
							else{
								console.log("success")
								res.json({theTeacher:teacher})
							}
						})
					
					}
					else{
						// console.log("Z is false")

							res.json({errorMessage: "Sorry Password Didn't Match "})
					}
			}
		})
})
// /api/schools/TeacherProfileUpdation
app.post('/api/schools/TeacherProfileUpdation', SchoolTokenVerification,function(req, res){

	console.log(req.body)//lll

			const {errors, isValid} =TeacherValidation(req.body)
			const{temail, tpassword, tcpassword, tname, name, tlname, tqualifications, tsubject, tphoneNumber, taddress, email, password, schoolToken} = req.body;
			// console.log(isValid)
			if(isValid){

					db.collection('schools').findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/getSchools in *** SERVER.JS ***")
							res.json({errorMessage: "Sorry Something Went Wrong While School"})
						}
						if(oSchool==null && oSchool==undefined && oSchool==''){
							res.json({errorMessage:  "The School Doesn't Exists"})
						}
						else{

							console.log("Success")
							var hash = oSchool.password
							console.log(password)
							console.log(hash)
							var z= bcrypt.compareSync(password, hash);
							console.log(z)
							console.log("**************************")


							if(z==true){
								// console.log("z is true")
								Teachers.findOne({temail:temail}, function(err, teacher){
									if(err){
										console.log("Failure")
									}
									else{
										// cant and shouldnt change email
										  teacher.tname= tname;
										  teacher.tlname= tlname;
										  teacher.tqualifications=tqualifications;
										  teacher.tsubject=tsubject;
										  teacher.tphoneNumber=tphoneNumber;
										  teacher.taddress=taddress;

if(tpassword==teacher.password){
										   console.log("PASSWORD DOESNT NEED TO CHANGE")
}


else{
										  var hash = bcrypt.hashSync(tpassword, salt);
										  console.log(hash)
										  teacher.password=hash;
}
										  teacher.save(function(err){
										  	if(err){
										  		res.json({errorMessage: "Sorry Couldnt Update Teacher's Profile"})
										  	}
										  	else{
										  		res.json({theTeacher:teacher, SuccessMessage:"Teacher Details Are Updated Successfully"})
										  	}
										  })

										// console.log("success")
										// res.json({theTeacher:teacher})
									}
								})
							


							}
							else{
								// console.log("Z is false")

									res.json({errorMessage: "Sorry Password Didn't Match "})
							}
						}
					})

			}
			else{
				res.status(400).json({errors})
			}

		// res.json({errorMessage:"working"})

})

// /api/schools/FetchStudentProfile
app.post('/api/schools/FetchStudentProfile',SchoolTokenVerification,function(req, res){

	console.log(req.body)


		const{name, email, password} = req.body;

		// res.json({errorMessage:"working"})



		db.collection('schools').findOne({email:email}, function(err, oSchool){
			if (err){
				console.log("Error in /api/getSchools in *** SERVER.JS ***")
				res.json({errorMessage: "Sorry Something Went Wrong While School"})
			}
			if(oSchool==null && oSchool==undefined && oSchool==''){
				res.json({errorMessage:  "The School Doesn't Exists"})
			}
			else{

				console.log("Success")
				var hash = oSchool.password
				console.log(password)
				console.log(hash)
				var z= bcrypt.compareSync(password, hash);
				console.log(z)
				console.log("**************************")


					if(z==true){
						// console.log("z is true")
						Students.findById(req.body.id, function(err, student){
							if(err){
								console.log("Failure")
							}
							else{
								console.log("success")
								res.json({theStudent:student})
							}
						})
					


					}
					else{
						// console.log("Z is false")

							res.json({errorMessage: "Sorry Password Didn't Match "})

					}


			}


		})

})

// /api/schools/StudentProfileUpdation
app.post('/api/schools/StudentProfileUpdation',function(req, res){

	console.log(req.body)
	const {errors, isValid} =StudentValidation(req.body)
	const{semail,spassword, sname, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber, email, password, name} = req.body;
	// console.log(isValid)
	if(isValid){



		db.collection('schools').findOne({email:email}, function(err, oSchool){
			if (err){
				console.log("Error in /api/getSchools in *** SERVER.JS ***")
				res.json({errorMessage: "Sorry Something Went Wrong While School"})
			}
			if(oSchool==null && oSchool==undefined && oSchool==''){
				res.json({errorMessage:  "The School Doesn't Exists"})
			}
			else{

				console.log("Success")
				var hash = oSchool.password
				console.log(password)
				console.log(hash)
				var z= bcrypt.compareSync(password, hash);
				console.log(z)
				console.log("**************************")


					if(z==true){
						// console.log("z is true")
						Students.findOne({semail:semail}, function(err, student){
							if(err){
								console.log("Sorry There Was Error While Updating Student")
							}
							else{

								  student.slname=slname
								  student.sclass=sclass
								  student.sGaurdianName=sGaurdianName
								  student.saddress=saddress
								  student.sParentsPhonNumber=sParentsPhonNumber

if(spassword == student.password){
	console.log("PASSWORD DOESNT NEED TO CHANGE")
}
else{
								  var hash = bcrypt.hashSync(spassword, salt);
								  console.log(hash)
								  student.password=hash;
}
								  student.save(function(err){
								  	if(err){
								  		res.json({errorMessage:"Sorry The Student Profile Couldn't be Updated"})
								  	}
								  	else{
								  		res.json({theStudent:student,SuccessMessage:"Successfully Updated The Student's Profile"})
								  	}

								  })
								// console.log("success")
								// res.json({theStudent:student})
							}
						})
					}
					else{
						// console.log("Z is false")

							res.json({errorMessage: "Sorry Password Didn't Match "})

					}
			}
		})
	}
	else{
		res.status(400).json({errors})
	}
		// res.json({errorMessage:"working"})

})



// /api/schools/getallstudents
		app.post('/api/schools/getallstudents',SchoolTokenVerification,function(req, res){
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
								db.collection('students').find({schoolEmail:email}).sort( { sclass: 1 } ).toArray((err, allstudents)=>{
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

// /api/schools/deleteTheTeacher

app.post('/api/schools/deleteTheTeacher', SchoolTokenVerification ,function(req, res){

					const{email, password, name, TId} = req.body;
					console.log("+++++++++++++++++++++++++++++++++++++++")
					console.log(req.body)
					Schools.findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/schools/getallstudents in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						else if (oSchool!= undefined || oSchool!= null || oSchool!=""){
							console.log("MATCh")
							var hash  = oSchool.password
							// console.log(hash)
							var pass = req.body.password
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){



										db.collection('teachers').find({"temail":TId},{temail:1, tname:1,schoolEmail:1, schoolName:1,studentsArray:1}).toArray(function(err, teacher){
											console.log("________________________")
											console.log(teacher)
											console.log()
											console.log()

											if(err){
												res.json({errorMessage: "Sorry Something Went Wrong."})

											}
											else if(teacher && teacher!=null && teacher!=undefined && teacher!='' && teacher.length>0){
												console.log("HERE")



												Teachers.find({"temail":TId}, function(err, dta){
													if(err){
														console.log("errrrrrrrr")
													}
													else{
														console.log("teacher found 1330")
														dta[0].remove(function(err){
															if(err){
																res.json({errorMessage:"Teacher Deleted"})
															}
															else{
																res.json({SuccessMessage:"Deleted Successfully"})
															}
														})
														// if(dta[0].studentsArray && dta[0].studentsArray!=null && dta[0].studentsArray!=undefined && dta[0].studentsArray.length>0){
														// 	// console.log(JSON.stringify(teacher[0]))
														// 	// console.log("%%%%")
														// 	var total = dta[0].studentsArray.length
														// 	var cas
														// 	var sliceme 
														// 	console.log()
														// 	console.log(dta[0])
														// 	console.log()

															// for(var x=0; x<total;x++){
															// 	if(dta[0].studentsArray[x].semail==semail){
															// 		// res.json({errorMessage: "ALREADY ADDED"})
															// 		sliceme = x
															// 		cas=false
															// 		console.log("FFFFOOOUUUUNNNNDDDDD")
															// 	}
															// }
															// if(cas==false){


// dta[0].remove(function(err){
// 	if(err){
// 		res.json({errorMessage:"Teacher Deleted"})
// 	}
// 	else{
// 		res.json({SuccessMessage:"Deleted Successfully"})
// 	}
// })


																// console.log("FFOOOUUNNDD AANNDD DEELLEETTEE")
																// dta[0].studentsArray.splice(sliceme,1)
																// dta[0].save(function(err){
																// 	if(err){
																// 		res.json({errorMessage:"Error While UnAssigning"})
																// 	}
																// 	else{
																// 		console.log(" saved in teacher yet to save in student" )
																// 		Students.find({}, function(err, students){
																// 			if(err){
																// 				res.json({errorMessage: "Student Added To Teacher But Teacher Couldnt Be Added To Student"})
																// 			}
																// 			if(students && students!=null && students!= undefined){
																// 				if(students.teacherArray && students.teacherArray!= null && students.teacherArray!=undefined && students.teacherArray.length>0){
																// 					var array2 = students.teacherArray;
																// 					var deleteme = false
																// 					var deletemeIndex
																// 					for (var nos = 0; nos<array2.length;nos++){
																// 						if(array2[nos].temail==TId){
																// 							deleteme =true
																// 							deletemeIndex = nos
																// 						}
																// 					} // for
																// 					if(deleteme==true){
																// 						students.teacherArray.splice(deletemeIndex,1)
																// 						students.save(function(err){
																// 								if(err){
																// 									res.json({errorMessage:"Student UnAssigned From Teacher But Teacher couldnt Be UnAssigned From Student"})

																// 								}
																// 								else{
																// 									console.log("DELETED FROM STUDENT AS WELL")
																// 									dta[0].remove(function(err){
																// 										if (err){
																// 											res.json({errorMessage:"Successfullly Un Assigned Teacher And Student but Coulnt Delete Teacher"})
																// 										}
																// 										else{
																// 											res.json({SuccessMessage:"Success"})
																// 										}
																// 									})

																									
																// 								}
																// 						})


																// 					}
																// 					else{
																// 						res.json({errorMessage:"Student Not Found"})

																// 					}

																// 				}
																// 			}
																// 		})
																// 	}
																// }) /////////////////////////


																			// res.json({errorMessage: "ALREADY ADDED"})
															// }
															// else{

																// res.json({errorMessage: "Not ADDED"})
															// }

								// res.json({errorMessage:"Working"})
														// }
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
// /api/schools/deleteTheStudent
app.post('/api/schools/deleteTheStudent', SchoolTokenVerification,function(req, res){

					const{email, password, semail} = req.body;
					console.log("+++++++++++++++++++++++++++++++++++++++")
					console.log(req.body)
					Schools.findOne({email:email}, function(err, oSchool){
						if (err){
							console.log("Error in /api/schools/getallstudents in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						else if (oSchool!= undefined || oSchool!= null || oSchool!=""){
							console.log("MATCh")
							var hash  = oSchool.password
							// console.log(hash)
							var pass = req.body.password
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){



										db.collection('students').find({"semail":semail},{semail:1, sname:1,schoolEmail:1, schoolName:1,teacherArray:1}).toArray(function(err, student){
											console.log("________________________")
											console.log(student)
											console.log()
											console.log()

											if(err){
												res.json({errorMessage: "Sorry Something Went Wrong."})

											}
											else if(student && student!=null && student!=undefined && student!='' && student.length>0){
												console.log("HERE")



												Students.find({"semail":semail}, function(err, dta){
													if(err){
														console.log("errrrrrrrr")
													}
													else{
														console.log("student found 1330")
														dta[0].remove(function(err){
															if(err){
																res.json({errorMessage:"Teacher Deleted"})
															}
															else{
																res.json({SuccessMessage:"Deleted Successfully"})
															}
														})

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





		app.post('/api/schools/student/registration',function(req, res){

			console.log(req.body)
			const {errors, isValid} =StudentValidation(req.body)
			console.log(isValid)
			if(isValid){

				const{ spassword,sname, name, email, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber} = req.body;

				// res.json({errorMessage:"working"})

				var semail= req.body.semail
				 semail = (semail.replace(/ /g,"")).toLowerCase()
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

						db.collection('students').insert({semail, sname, "password":hash, "schoolName":name, "schoolEmail":email, slname:slname, sclass:sclass, sGaurdianName:sGaurdianName, saddress:saddress, sParentsPhonNumber:sParentsPhonNumber},function(err, doneTeacher){
							if (err){
								console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
								res.json({errorMessage: "Sorry Something Went Wrong While Saving"})
							}
							else{
								// setup email data with unicode symbols
								let mailOptions = {
								    from: '"Novak MyChildApp " <mychildappatnovak@gmail.com>', // sender address
								    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								    to: "test4rvtech@gmail.com, "+semail, // list of receivers
								    subject: 'Novak- Student Registered By '+name , // Subject line
								    text: 'Welcome Student To Novak Group.', // plain text body
 // html: '<b>Hello world ?</b> Email = > ' + semail+ "  </br> Name = > "+sname + "  </br> Password = >"+spassword+". "+name+ " added you to there school group", // html body

								    html: '<b>Welcome '+sname+' to Novak Group.</b><br/><br/>'+
								    "Your account was registered by <b>'"+name+"'</b> as a Student's Parent<br/><br/>"+
								    'Please visit <a href="http://52.172.193.107:3005/">This Link</a> to login using following credentials.<br/><br/>'+
								    '<b>Email</b> (id to be used when you log in): ' + semail+
								    "<br/><b>Password</b> (within the quotes):"+spassword, // html body
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



// /api/schools/logMeOut
		app.post("/api/schools/logMeOut", SchoolTokenVerification, function(req,res){
			console.log("here /api/schools/logMeOut")
			Schools.findOne({email: req.body.email}, function(err, school){
				if(err){
					console.log("ERROR in /api/schools/logMeOut")
				}
				else if(school && school!= null){
					console.log("User Found")
					var hash  = school.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.password, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")

					school.schoolToken = "";

				    school.save(function(err){

				    	if(err){
				    		res.json({errorMessage:"Sorry Log Out Wasn't Successfull"})
				    	}
				    	else{
				    		res.json({SuccessMessage:"Successfully Signed Out"})
				    	}

				    })

					// res.json({errorMessage:"Success"})
					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					res.json({errorMessage:"Sorry User Not Found"})

				}
			})
		})





		// *************************************************************************************************************************************************
		// *************************************************************************************************************************************************
		// *************************************************************************************************************************************************

		// TEACHERS

		app.post('/api/teacher/logmein', function(req, res){
			console.log("45 45 45 45"+JSON.stringify(req.body))

			const {errors, isValid} =validateTLogin(req.body)
			console.log(isValid)
			if(isValid){
				const{ tpassword} = req.body;
				var temail = req.body.temail
				// var tpassword = req.body.tpassword
				temail = (temail.replace(/ /g,"")).toLowerCase()
					Teachers.findOne({temail:temail}, function(err, oTeacher){
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
								console.log("Password Matched")

								var token = jwt.sign({temail:oTeacher.temail}, app.get('superSecret'), {
							      	expiresIn : 60*60*24 // expires in 24 hours
							    });

								oTeacher.teacherToken = token;
								console.log(oTeacher)

								oTeacher.save(function(err){
									if(err){
										res.json({errorMessage:"Sorry There Was Error Creating Session"})
									}
									else{
										res.json({oTeacher})
									}
								})

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

		app.post('/api/teacher/getallstudents', TeacherTokenVerification,function(req, res){
			console.log('/api/teacher/getallstudents')
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

		app.post('/api/teacher/getallstudentposts', TeacherTokenVerification, function(req, res){

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

						Posts.find({temail:temail, semail:semail}).sort({date: -1}). exec( function(err,posts){
							if(err){
								res.json({errorMessage:"Sorry SomethingWent Wrong"})
							}
							else{
								res.json({posts:posts, teacherImage: teacher.teacherImage})
							}
						})

						// res.json(teacher)
					}
					else{
						res.json({errorMessage: "Sorry Teacher Password Didnt Match"})
					}
				}
				else{
					res.json({errorMessage: "Sorry Teacher Doesn't Exist "})
				}

			})

		})

// /api/teacher/postonstudentstimeline


		app.post('/api/teacher/postonstudentstimeline', upload, TeacherTokenVerification,function(req, res){
			console.log("yuyyyyyyyyyyyyyyyy")
			console.log("77777777777777777777777777777777777777777777")
			console.log(req.body)

			const {errors, isValid} =validateTeachersPost(req.body)
			console.log(isValid)
			if(isValid){
				console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ TRUE")
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
									postOb.teacherImage=teacher.teacherImage
									postOb.studentImage=student.studentImage
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

					                if(req.files && req.files!=null && req.files['RelatedImages1'] && req.files['RelatedImages1'] != null && req.files['RelatedImages1']!= undefined && req.files['RelatedImages1'][0] !='' && req.files['RelatedImages1'].length>0 && req.files['RelatedImages1'][0].size>0){
										var path=""
										console.log("^^^^^^")
					                    if(req.files['RelatedImages1'][0].size>0)  
					                    {
					                      console.log("$$$$")
					                      console.log("RELATED IMAGE")
					                      path          = req.files['RelatedImages1'][0].path;
					                      path              = path.replace('public', '');
					                      // paths.push(path)
					                      postOb.paths=path

					                    }
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
					                }
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
						res.json({errorMessage: "Sorry Teacher Doesn't Exist "})
					}

				})

			}
			else{
				console.log("HERE   -----------------------")
				console.log(JSON.stringify(errors))
				// res.json({errors})
				// res.json({"message":"HI"})
				res.json({errorMessage: "Sorry Teacher Doesn't Exist "})
			}
		})
// /api/teacher/getthepost

		app.post('/api/teacher/getthepost', TeacherTokenVerification , function(req, res){

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

								Students.findOne({semail:semail}, function(err, student){

									res.json({post:post, teacherImage:teacher.teacherImage, studentImage:student.studentImage})

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
		// /api/teacher/post/comment
		app.post('/api/teacher/post/comment',TeacherTokenVerification,function(req, res){

			const{temail, tpassword, semail, postId, comment} = req.body;
			console.log(req.body)
			if(comment!="" && comment.trim()!=""){
				
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
						res.json({errorMessage: "Sorry Teacher Doesn't Exist "})
					}

				})
			}
			else{
					console.log("HERE IN ERROR")
					res.status(400).json({errors:{comment:"Comment cant be empty"}})
			}

		})

////////////////////
		app.post("/api/teacher/logMeOut", TeacherTokenVerification, function(req,res){
			console.log("here /api/teacher/logMeOut")
			console.log(req.body)
			Teachers.findOne({temail: req.body.temail}, function(err, teacher){
				if(err){
					console.log("ERROR in /api/teacher/logMeOut")
				}
				else if(teacher && teacher!= null){
					console.log("User Found")
					var hash  = teacher.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.tpassword, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")

						teacher.teacherToken = "";

					    teacher.save(function(err){

					    	if(err){
					    		res.json({errorMessage:"Sorry Log Out Wasn't Successfull"})
					    	}
					    	else{
					    		res.json({SuccessMessage:"Successfully Signed Out"})
					    	}

					    })

					// res.json({errorMessage:"Success"})
					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					res.json({errorMessage:"Sorry User Not Found"})

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
				const{ spassword} = req.body;
					var semail = req.body.semail
					var semail = (semail.replace(/ /g,"")).toLowerCase()
					Students.findOne({semail:semail}, function(err, oStudent){
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
							console.log(semail)
							console.log(oStudent)
							var hash  = oStudent.password
							// console.log(hash)
							var pass = req.body.spassword
							// console.log(pass)
							var z= bcrypt.compareSync(pass, hash);

							if(z==true){


									var token = jwt.sign({semail: oStudent.semail +oStudent._id}, app.get('superSecret'), {
								      	expiresIn : 60*60*24 // expires in 24 hours
								    });

									oStudent.studentToken = token;

									oStudent.save(function(err){
										if(err){
											res.json({errorMessage:"Sorry There Was Error Creating Session"})
										}
										else{
											console.log("****************")
											console.log(oStudent)
											console.log("*****************")
											res.json({oStudent})
										}
									})
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
		app.post('/api/student/fetchmyteachers',studentTokenVerification,function(req, res){
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

// /api/student/fetchStduentProfile
		app.post('/api/student/fetchStduentProfile', studentTokenVerification, function(req, res){
			console.log("45 45 45 45 ************************"+JSON.stringify(req.body))

			// const {errors, isValid} =validateTeacherChangePasswordEmail(req.body)                                          // validateForgotPasswordEmail 

				const{semail, spassword} = req.body;
					// db.collection('schools').findOne({email:req.body.email}, function(err, oSchool){
						Students.findOne({semail:semail}, function (err, oStudent){
						if (err){
							console.log("Error in /api/getoTeacher in *** SERVER.JS ***")
							res.json({errorMessage:  "Sorry Something Went Wrong While Finding"})
						}
						if (oStudent== undefined || oStudent== null || oStudent==""){
							console.log("No Match Found")
							res.json({errorMessage: "Sorry No Match Found"})
						}
						else{
							console.log("Matched")
							console.log()
							console.log("-------------------")
							console.log(oStudent)
							console.log()
							console.log('-------------------')
							// var hash  = oSchool.password
							// console.log(hash)

							var hash  = oStudent.password
							console.log(hash)
							
							console.log(spassword)
							var z= bcrypt.compareSync(spassword, hash);

							if(z==true){

								// // console.log(pass)
								// var hash = bcrypt.hashSync(tpassword, salt);
								// oTeacher.password = hash
								// oTeacher.save(function(err){
								// 	if(err){
								// 		res.json({errorMessage:"Sorry Try Again Changing Password"})
								// 	}
								// 	else{

								// 		// setup email data with unicode symbols
								// 		let mailOptions = {
								// 		    from: '"Rvtech " <test4rvtech@gmail.com>', // sender address
								// 		    // to: 'sukhpreet_singh@rvtechnologies.co.in, '+email, // list of receivers
								// 		    to: "test4rvtech@gmail.com, "+temail, // list of receivers
								// 		    subject: 'Hello Teacher ✔', // Subject line
								// 		    text: 'Hello', // plain text body
								// 		    html: '<b>Hello '+ oTeacher.tname+ ' .Your New Password is ' +tpassword, // html body
								// 		};

								// 		// send mail with defined transport object
		      //                               transporter.sendMail(mailOptions, function(error, info){
		      //                                   if(error){
		      //                                       console.log("In error of nodemailer")
		      //                                       console.log(error);
		      //                                   }
		      //                                   else{
		      //                                   	console.log('Message sent to user: ' + JSON.stringify(info));
		      //                                   }
		                                        
		      //                               });
								// 		res.json({"message":"Success"})
								// 	}

								// })
								res.json({"theStudentParent":oStudent})
							}
							else{
								res.json({errorMessage: "Sorry Password Didn't Match "})

							}
						}

					})

		})



// /api/student/FetchMyPosts
		app.post('/api/student/FetchMyPosts', studentTokenVerification,function(req, res){
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
							Posts.find({semail:semail,temail:TId}).sort({date: -1}). exec(function(err, posts){
								if(err){
									res.json({errorMessage:  "Sorry Something Went Wrong While Finding Posts"})
								}
								else{
									Teachers.findOne({temail:TId}, function(err, teacher){
										res.json({posts:posts, teacherImage:teacher.teacherImage})

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

// /api/student/FetchAllOfMyPosts
		app.post('/api/student/FetchAllOfMyPosts', studentTokenVerification, function(req, res){
			console.log("51 51 51 51"+JSON.stringify(req.body))


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
							Posts.find({semail:semail}).sort({date: -1}). exec(function(err, posts){
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
		app.post('/api/student/FetchMyParticularPost',studentTokenVerification,function(req, res){
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

									Teachers.findOne({temail:temail}, function(err, teacher){

										res.json({posts: posts, teacherImage:teacher.teacherImage, studentImage:oStudent.studentImage})
									})
									// res.json({posts})

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
		app.post('/api/student/comment', studentTokenVerification, function(req, res){
			console.log("51 51 51 51"+JSON.stringify(req.body))


				const{semail, spassword, temail, postId, comment} = req.body;
				console.log(comment!="")
				console.log(comment.trim()!="")
				if(comment!="" && comment.trim()!=""){
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
										postedBy:oStudent.sname
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
				}
				else{
					console.log("HERE IN ERROR")
					res.status(400).json({errors:{comment:"Comment cant be empty"}})

				}


		})


// /api/student/logMeOut
		app.post("/api/student/logMeOut", studentTokenVerification, function(req,res){
			console.log("here")
			Students.findOne({semail: req.body.semail}, function(err, student){
				if(err){
					console.log("ERROR in /api/studnt/login")
				}
				else if(student && student!= null){
					console.log("User Found")
					var hash  = student.password
					// console.log(hash)
					
					// console.log(OldTpassword)
					var z= bcrypt.compareSync(req.body.spassword, hash);
					if(z==true){
						console.log("MATCHED AND AUTHENTICATED")

					student.studentToken = "";

				    student.save(function(err){

				    	if(err){
				    		res.json({errorMessage:"Sorry Log Out Wasn't Successfull"})
				    	}
				    	else{
				    		res.json({SuccessMessage:"Successfully Signed Out"})
				    	}

				    })

					// res.json({errorMessage:"Success"})
					}
					else{
						console.log("MATCHED BUT NOT AUTHENTICATED")
						res.json({errorMessage:"Sorry User Password Didn't Match"})

					}
				}
				else{
					res.json({errorMessage:"Sorry User Not Found"})

				}
			})
		})

// **********************************************************************************************************************


		// /api/schools/verifyme
		app.post('/api/schools/verifyme',SchoolTokenVerification,function(req, res){
			console.log("HERE")
			res.json({success:true})
		})

		app.use(function(req,res){
			console.log("SERVER 404")
			res.status(404).json({
				errors:{
					global: "Still Working On It.Please Try Again Later"
				}
			})
		})




		app.listen(3001, ()=> console.log("Server Running at 3001"))



		function tokenVerification(req, res, next) {
			  Admin.findOne({email:req.body.email}, function(err, adminuser){
				  	if(err){
				  		res.json({errorMessage:"Sorry There Was Error"})
				  	}
				  	if(adminuser && adminuser!=null){
				  		console.log("1")
				  		if(adminuser.token && adminuser.token!=null && adminuser.token!=undefined){
				  			console.log("2")
				  			if(adminuser.token == req.body.token){
							    // verifies secret and checks exp
							    console.log("3")
							    jwt.verify(req.body.token, app.get('superSecret'), function(err, decoded) {      
							      if (err) {
							        return res.json({ errorMessage: 'Failed to authenticate token.', success:false });    
							      } else {
							      	console.log("4")
							        // if everything is good, save to request for use in other routes
							        req.decoded = decoded;    
							        next();
							      }
							    });
				  			}
				  			else{
				  				res.json({errorMessage:"Please Login Again.", success:false})
				  			}

				  		}
				  		else{
				  			adminuser.token=""
				  			adminuser.save()
				  			res.json({errorMessage:"Please Login Again", success:false})
				  		}
				  	}
				 	else{
				 		res.json({errorMessage:"Please Login Again", success:false})
 				    }
			  })
		}


//  School Token Verification
		function SchoolTokenVerification(req, res, next) {
			// console.log(req.body)
			// console.log("%%%%%%%%%%%%%%%%%%%%%")
			// console.log()
			  Schools.findOne({email:req.body.email}, function(err, schooluser){
				  	if(err){
				  		res.json({errorMessage:"Sorry There Was Error"})
				  	}
				  	if(schooluser && schooluser!=null){
				  		console.log("1")
				  		console.log(JSON.stringify(schooluser))
				  		if(schooluser.schoolToken && schooluser.schoolToken!=null && schooluser.schoolToken!=undefined){
				  			console.log("2")
				  			if(schooluser.schoolToken == req.body.schoolToken){
							    // verifies secret and checks exp
							    console.log("3")
							    jwt.verify(req.body.schoolToken, app.get('superSecret'), function(err, decoded) {      
							      if (err) {
							        return res.json({ errorMessage: 'Failed to authenticate token.', success:false });    
							      } else {
							      	console.log("4")
							        // if everything is good, save to request for use in other routes
							        req.decoded = decoded;    
							        next();
							      }
							    });
				  			}
				  			else{
					  			schooluser.schoolToken=""
					  			schooluser.save()
				  				res.json({errorMessage:"Please Login Again.", success:false})
				  			}

				  		}
				  		else{
				  			schooluser.schoolToken=""
				  			schooluser.save()
				  			res.json({errorMessage:"Please Login Again", success:false})
				  		}
				  	}
				 	else{
				 		res.json({errorMessage:"Please Login Again", success:false})
 				    }

			  })



		}

		// TeacherTokenVerification
		function TeacherTokenVerification(req, res, next) {
			console.log(req.body)
			console.log("%%%%%%%%%%%%%%%%%%%%%")
			// console.log()
			  Teachers.findOne({temail:req.body.temail}, function(err, dteacher){
				  	if(err){
				  		res.json({errorMessage:"Sorry There Was Error"})
				  	}
				  	if(dteacher && dteacher!=null){
				  		console.log("1")
				  		console.log(JSON.stringify(dteacher))
				  		if(dteacher.teacherToken && dteacher.teacherToken!=null && dteacher.teacherToken!=undefined){
				  			console.log("2")
				  			console.log(dteacher.teacherToken)
				  			console.log(req.body.teacherToken)
				  			if(dteacher.teacherToken == req.body.teacherToken){
							    // verifies secret and checks exp
							    console.log("3")
							    jwt.verify(req.body.teacherToken, app.get('superSecret'), function(err, decoded) {      
							      if (err) {
							        return res.json({ errorMessage: 'Failed to authenticate token.', success:false });    
							      } else {
							      	console.log("4")
							        // if everything is good, save to request for use in other routes
							        req.decoded = decoded;    
							        next();
							      }
							    });
				  			}
				  			else{
				  				console.log("token undefined or null ")
					  			dteacher.teacherToken=""
					  			dteacher.save()
				  				res.json({errorMessage:"Please Login Again Teacher. Not A Valid Session", success:false})
				  			}
				  		}
				  		else{
				  			dteacher.teacherToken=""
				  			dteacher.save()
				  			res.json({errorMessage:"Please Login Again Teacher", success:false})
				  		}
				  	}
				 	else{
				 		res.json({errorMessage:"Not A Valid Login", success:false})
 				    }
			  })
		}


		// TeacherTokenVerification
		function studentTokenVerification(req, res, next) {
			console.log(req.body)
			console.log("%%%%%%%%%%%%%%%%%%%%%")
			// console.log()
			  Students.findOne({semail:req.body.semail}, function(err, dstudent){
				  	if(err){
				  		res.json({errorMessage:"Sorry There Was Error"})
				  	}
				  	if(dstudent && dstudent!=null){
				  		console.log("1")
				  		console.log(JSON.stringify(dstudent))
				  		if(dstudent.studentToken && dstudent.studentToken!=null && dstudent.studentToken!=undefined){
				  			console.log("2")
				  			console.log(dstudent.studentToken)
				  			console.log(req.body.studentToken)
				  			if(dstudent.studentToken == req.body.studentToken){
							    // verifies secret and checks exp
							    console.log("3")
							    jwt.verify(req.body.studentToken, app.get('superSecret'), function(err, decoded) {      
							      if (err) {
							        return res.json({ errorMessage: 'Failed to authenticate token.', success:false });    
							      } else {
							      	console.log("4")
							        // if everything is good, save to request for use in other routes
							        req.decoded = decoded;    
							        next();
							      }
							    });
				  			}
				  			else{
				  				console.log("token undefined or null ")
					  			dstudent.studentToken=""
					  			dstudent.save()
				  				res.json({errorMessage:"Please Login Again Parent. Not A Valid Session", success:false})
				  			}
				  		}
				  		else{
				  			dstudent.studentToken=""
				  			dstudent.save()
				  			res.json({errorMessage:"Please Login Again Parent", success:false})
				  		}
				  	}
				 	else{
				 		res.json({errorMessage:"Not A Valid Login", success:false})
 				    }
			  })
		}



})


