import React from 'react';

import classnames from 'classnames';


import {connect} from 'react-redux'
import { Redirect } from 'react-router';

import {AdminLogins} from '../../actions/AdminActions'




class AdminLoginPage extends React.Component{

	constructor(props){
		super(props)
		this.state={
			email:"",
			password:"",
			token:"",

			errors:{},
			loading:false,
			done:false,
			errorState:false,

			errorMessage:"",
			SuccessMessage:"",


			shouldRedirect:false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
		componentWillMount(){
			debugger
			// console.log(this.props.location.state)
			if(this.props.location.state && this.props.location.state!==null && this.props.location.state.SuccessMessage && this.props.location.state.SuccessMessage!==null && this.props.location.state.SuccessMessage!==undefined && this.props.location.state.SuccessMessage!=="")
			{

				this.setState({SuccessMessage:this.props.location.state.SuccessMessage})
			}
			if(this.props.location.state && this.props.location.state!==null && this.props.location.state.errorMessage && this.props.location.state.errorMessage!==null && this.props.location.state.errorMessage!==undefined && this.props.location.state.errorMessage!=="")
			{

				this.setState({errorMessage:this.props.location.state.errorMessage})
			}
			// 	console.log("hereeeeee")
			// 	this.setState({errorState:true, errorMessage:this.props.location.state.school})
			// }
			// if(this.props.location.state && this.props.location.state!=null && this.props.location.state.teacher && this.props.location.state.teacher!=null && this.props.location.state.teacher!=undefined && this.props.location.state.teacher!="")
			// {
			// 	console.log("hereeeee2222222222e")
			// 	this.setState({errorState:true, errorMessageT:this.props.location.state.teacher})
			// }
			// if(this.props.location.state && this.props.location.state!=null && this.props.location.state.StudentParent && this.props.location.state.StudentParent!=null && this.props.location.state.StudentParent!=undefined && this.props.location.state.StudentParent!="")
			// {
			// 	console.log("hereeeee2222222222e")
			// 	this.setState({errorState:true, errorMessageS:this.props.location.state.StudentParent})
			// }
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
		e.preventDefault();
		debugger
		//validations
		let errors={}
		if(this.state.email === "") errors.email="Admin Email Cant Be Empty"
		if(this.state.password ==="") errors.password="Admin Password Cant Be Empty"
		if(this.state.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
		this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {email, password} = this.state
			this.setState({loading: true})
			this.props.AdminLogins({email, password }).then(
				(response)=>{this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true, token: response.admin.token, SuccessMessage:"Welcome"})}},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)

		}
	}

// 	handleSubmitTeacher = (e)=>{
// 		e.preventDefault();
// console.log("%%%%")

// 		//validations
// 		let errors={}
// 		if(this.state.temail === "") errors.temail="Teacher Email Cant Be Empty"
// 		if(this.state.tpassword ==="") errors.tpassword="Password Cant Be Empty"
// 		if(this.state.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
// 			this.setState({errors})


// 		const isValid = Object.keys(errors).length===0

// 		if(isValid){
// 			console.log("******************    NO ERROR")
// 			const {temail, tpassword} = this.state
// 			this.setState({loading: true})
// 			this.props.TeacherLogins({temail,tpassword }).then(
// 				(response)=>{this.setState({done:true}) ; console.log("*****************************");console.log(JSON.stringify(response.teacher)); if(response.teacher.errorMessage && response.teacher.errorMessage!==undefined && response.teacher.errorMessage!==null && response.teacher.errorMessage!==''){this.setState({errorState:true, errorMessageT: response.teacher.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirectT:true, tname: response.teacher.oTeacher.tname})}},
// 				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
// 			)

// 		}
// 	}

// 	handleSubmitStudent = (e)=>{
// 		e.preventDefault();
// 		console.log("%%%%")
// 		// debugger
// 		//validations
// 		let errors={}
// 		if(this.state.semail === "") errors.semail="Student Email Cant Be Empty"
// 		if(this.state.spassword ==="") errors.spassword="Password Cant Be Empty"
// 		if(this.state.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
// 			this.setState({errors})


// 		const isValid = Object.keys(errors).length===0

// 		if(isValid){
// 			console.log("******************    NO ERROR")
// 			const {semail, spassword} = this.state
// 			this.setState({loading: true})
// 			this.props.StudentLogins({semail,spassword }).then(
// 				(response)=>{this.setState({done:true}) ;console.log("^^^^^^^^^^^  ") ; console.log(JSON.stringify(response)); if(response.student.errorMessage && response.student.errorMessage!==undefined && response.student.errorMessage!==null && response.student.errorMessage!==''){console.log("yeeess");this.setState({errorState:true, errorMessageS: response.student.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirectS:true, sname: response.student.oStudent.sname})}},
// 				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
// 			)

// 		}
// 	}

	render(){
		const errorBox=(
				<div className="alert alert-danger">
					{this.state.errorMessage}
				</div>
			);
		const successBox=(
				<div className="alert alert-success">
					{this.state.SuccessMessage}
				</div>
			);

		// const errorBoxS=(
		// 		<div className="alert alert-danger">
		// 			{this.state.errorMessageS}
		// 		</div>
		// 	);
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
				    	<div className="header-top admin-h">
				    	<div className="container-fluid">
				        	<div className="container">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                        	
				                        	<a href="/"><img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/></a>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    	<a href="/register"><i className="fa fa-sign-in" aria-hidden="true"></i> Register</a>
				                    </div>
				                </div>
				            </div>
				        </div>
				         </div>
				    </header>
				    

				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                

				                <div className="col-md-8 col-md-offset-2 col-lg-7 col-lg-offset-3 form_register">
				                    <h2>Main Login Page For Admin</h2>
				                    <div className="Form_tab">
				                        <ul className="nav nav-tabs">
				                            <li className="active"><a data-toggle="tab" href="#school">Admin Login</a></li>
				                        </ul>

				                        <div className="tab-content">
				                            <div id="school" className="tab-pane fade in active">
				                                <form onSubmit={this.handleSubmit}>
				                                	<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                	{/* this.state.errorState===true && this.state.errorMessage ? errorBox : "" */}
				                                	{this.state.errorMessage && this.state.errorMessage!==null && this.state.errorMessage!=="" ? errorBox:""}
				                                	{this.state.SuccessMessage && this.state.SuccessMessage!=="" && this.state.SuccessMessage!==null ? successBox : ""}
													{ this.state.shouldRedirect ? <Redirect to={{pathname:"/novak/AdminPanel",state:{s:this.state} }} /> : "" }

				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input type="email" className="form-control input-lg" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.email} </span></div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input type="password" className="form-control input-lg" name="password" id="pwd" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.password} </span> </div></p>
				                                    <a href="/school/forgotpassword">Forget School Password?</a>
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
export default connect(null, {AdminLogins})( AdminLoginPage)