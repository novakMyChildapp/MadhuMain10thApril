import React from 'react';

import classnames from 'classnames';


import {connect} from 'react-redux'
import { Redirect } from 'react-router';

import {SchoolLogins} from '../actions/actions'

import {TeacherLogins} from "../actions/TeacherActions"

import {StudentLogins}  from "../actions/StudentActions"

// var validator = require("email-validator")

class SchoolLogin extends React.Component{

	constructor(props){
		super(props)
		this.state={
			email:"",
			password:"",
			schoolToken:"",

			temail:"",
			tpassword:"",
			teacherToken:'',

			semail:"",
			spassword:"",
			studentToken:'',
			
			errors:{},
			loading:false,
			done:false,
			errorState:false,

			errorMessage:"",
			errorMessageT:"",
			errorMessageS:"",

			shouldRedirect:false,
			shouldRedirectT:false,
			shouldRedirectS:false,
			name:"",
			tname:"",
			sname:"",
		}
	}
		componentWillMount(){
			debugger
			console.log(this.props.location.state)
			if(this.props.location.state && this.props.location.state!==null && this.props.location.state.school && this.props.location.state.school!==null && this.props.location.state.school!==undefined && this.props.location.state.school!=="")
			{
				console.log("hereeeeee")
				this.setState({errorState:true, errorMessage:this.props.location.state.school})
			}
			if(this.props.location.state && this.props.location.state!==null && this.props.location.state.teacher && this.props.location.state.teacher!==null && this.props.location.state.teacher!==undefined && this.props.location.state.teacher!=="")
			{
				console.log("hereeeee2222222222e")
				this.setState({errorState:true, errorMessageT:this.props.location.state.teacher})
			}
			if(this.props.location.state && this.props.location.state!==null && this.props.location.state.StudentParent && this.props.location.state.StudentParent!==null && this.props.location.state.StudentParent!==undefined && this.props.location.state.StudentParent!=="")
			{
				console.log("hereeeee2222222222e")
				this.setState({errorState:true, errorMessageS:this.props.location.state.StudentParent})
			}
	}


	handleChange = (e)=>{
		if(!!this.state.errors[e.target.name]){
			let errors = Object.assign({}, this.state.errors)

			delete errors[e.target.name]
			this.setState({
				[e.target.name] : e.target.value,
				errors
			});
		}
		else{
			this.setState({[e.target.name]: e.target.value})
		}
	}
	handleSubmit = (e)=>{
		console.log(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
		e.preventDefault();
// debugger
		//validations
		console.log(e.target)
		let errors={}
		if(this.state.email === "") errors.email="School Email Cant Be Empty"
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) === false) errors.email="School Email Should Be Valid"
		if(this.state.password ==="") errors.password="Password Cant Be Empty"
		if(this.state.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
			this.setState({errors})
	var mail = ((this.state.email).replace(/ /g,"")).toLowerCase()
		this.setState({email:mail})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {email, password} = this.state
			this.setState({loading: true})
			this.props.SchoolLogins({email,password }).then(
				(response)=>{this.setState({done:true}) ; if(response.school.errorMessage && response.school.errorMessage!==undefined && response.school.errorMessage!==null && response.school.errorMessage!==''){this.setState({errorState:true, errorMessage: response.school.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true, name: response.school.oSchool.name, schoolToken: response.school.oSchool.schoolToken})}},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)

		}
	}

	handleSubmitTeacher = (e)=>{
		e.preventDefault();
		console.log("%%%%")

		//validations
		let errors={}
		if(this.state.temail === "") errors.temail="Teacher Email Cant Be Empty"
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.temail) === false) errors.temail="teacher Email Should Be Valid"
		if(this.state.tpassword ==="") errors.tpassword="Password Cant Be Empty"
		if(this.state.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
			this.setState({errors})
	var tmail = ((this.state.temail).replace(/ /g,"")).toLowerCase()
		this.setState({temail:tmail})

		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {temail, tpassword, teacherToken} = this.state
			this.setState({loading: true})
			this.props.TeacherLogins({temail,tpassword, teacherToken }).then(
				(response)=>{ debugger ;this.setState({done:true}) ; console.log("*****************************");console.log(JSON.stringify(response));
				if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
					{
						this.setState({errorState:true, errorMessageT: response.errorMessage, loading:false})
					}
					else{
					 	this.setState({loading:false, done:true, shouldRedirectT:true, tname: response.oTeacher.tname, teacherToken:response.oTeacher.teacherToken})
					}
				},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)

		}
	}

	handleSubmitStudent = (e)=>{
		e.preventDefault();
		console.log("%%%%")
		// debugger
		//validations
		let errors={}
		if(this.state.semail === "") errors.semail="Student Email Cant Be Empty"
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.semail) === false) errors.semail="Student Email Should Be Valid"
		if(this.state.spassword ==="") errors.spassword="Password Cant Be Empty"
		if(this.state.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
			this.setState({errors})
	// debugger
	var smail = ((this.state.semail).replace(/ /g,"")).toLowerCase()
		this.setState({semail:smail})

		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {semail, spassword} = this.state
			this.setState({loading: true})
			this.props.StudentLogins({semail,spassword }).then(
				(response)=>{this.setState({done:true}) ;console.log("^^^^^^^^^^^  ") ; console.log(JSON.stringify(response)); if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){console.log("yeeess");this.setState({errorState:true, errorMessageS: response.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirectS:true, sname: response.oStudent.sname, studentToken:response.oStudent.studentToken})}},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)

		}
	}

	render(){
		const errorBox=(
				<div className="alert alert-danger">
					{this.state.errorMessage}
				</div>
			);
		const errorBoxT=(
				<div className="alert alert-danger">
					{this.state.errorMessageT}
				</div>
			);

		const errorBoxS=(
				<div className="alert alert-danger">
					{this.state.errorMessageS}
				</div>
			);
		// const successredirection=() =>(
		// console.log(this),
		// console.log(this.props),
		// console.log(this.props.location),
		// 		this.props.router.push({
		// 		     pathname: '/schoolUser',
		// 		     state: {email: this.state.email}  
		// 		 })

		// );

		return(
				<div>

				    <header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                        	<a href="/"><img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/></a>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    	<a href="/register"><i className="fa fa-sign-in" aria-hidden="true"></i>Register School</a>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>

				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                

				                <div className="col-md-8 col-md-offset-2 col-lg-7 col-lg-offset-3 form_register">
				                    <h2>Register your school and digitize your students dairy!</h2>
				                    <div className="Form_tab">
				                        <ul className="nav nav-tabs">
				                            <li className="active"><a data-toggle="tab" href="#school">School Login</a></li>
				                            <li><a data-toggle="tab" href="#teacher">Teacher Login</a></li>
				                            <li><a data-toggle="tab" href="#parent">Parent Login</a></li>
				                        </ul>

				                        <div className="tab-content">
				                            <div id="school" className="tab-pane fade in active">
				                                <form onSubmit={this.handleSubmit}>
				                                	<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                	{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
													{ this.state.shouldRedirect ? <Redirect to={{pathname:"/schoolUser",state:{s:this.state} }} /> : "" }

				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input type="email" className="form-control input-lg" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.email} </span></div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input type="password" className="form-control input-lg" name="password" id="pwd" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.password} </span> </div></p>
				                                    <a href="/school/forgotpassword">Forget School Password?</a>
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Sign In</button>

				                                </form>
				                            </div>

				                            <div id="teacher" className="tab-pane fade">
				                                <form onSubmit={this.handleSubmitTeacher}>
				                                	<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                    
													{this.state.errorState===true && this.state.errorMessageT ? errorBoxT : ""}
													{ this.state.shouldRedirectT ? <Redirect to={{pathname:"/schoolTeacher",state:{s:this.state} }} /> : "" }

				                                    <p className="fa fa-user"><div className={classnames('form-group', {"has-error":!!this.state.errors.temail})}> <input type="email" className="form-control input-lg" name="temail" id="temail" value={this.state.temail} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.temail} </span></div></p>
				                                    <p className="fa fa-star"><div className={classnames('form-group', {"has-error":!!this.state.errors.tpassword})}> <input type="password" className="form-control input-lg" name="tpassword" id="tpassword" value={this.state.tpassword} onChange={this.handleChange} placeholder="Enter Password" /><span className="errorM">{this.state.errors.tpassword} </span></div></p>
				                                    <a href="/teacher/forgotpassword">Forget Teacher Password?</a>
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Sign In</button>
				                                </form>
				                            </div>

				                            <div id="parent" className="tab-pane fade">
				                                <form onSubmit={this.handleSubmitStudent}>

                             						<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                    
													{this.state.errorState===true && this.state.errorMessageS ? errorBoxS : ""}
													{ this.state.shouldRedirectS ? <Redirect to={{pathname:"/studentParents",state:{s:this.state} }} /> : "" }
				                                    <p className="fa fa-user"><div className={classnames('form-group', {"has-error":!!this.state.errors.semail})}> <input type="email" className="form-control input-lg" name="semail" id="semail" value={this.state.semail} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.semail} </span></div></p>
				                                    <p className="fa fa-star"><div className={classnames('form-group', {"has-error":!!this.state.errors.spassword})}> <input type="password" className="form-control input-lg" name="spassword" id="spassword" value={this.state.spassword} onChange={this.handleChange} placeholder="Enter Password" /><span className="errorM">{this.state.errors.spassword} </span></div></p>
				                                    <a href="/studentParent/forgotpassword">Forget Student Password?</a>
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Sign In</button>
				                                </form>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				                
				            </div>
				        </div>
				     </div>




				</div>


			);
	}
}
export default connect(null, {TeacherLogins, SchoolLogins, StudentLogins})( SchoolLogin)