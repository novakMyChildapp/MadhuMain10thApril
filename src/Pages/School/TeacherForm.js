import React from 'react';

import classnames from 'classnames'


import {connect}  from 'react-redux';
import { Redirect } from 'react-router';

import {TeacherRegistration, logMeOut} from '../../actions/SchoolActions'

import SchoolHeader from "./SchoolHeader"   // Navigation bar of Admin

class TeacherForm extends React.Component{
	constructor(props){
		super(props)
		this.state={
			email:"",
			name:"",
			password:"",
			cpassword:"",
			schoolToken:'',

			errors:{},

			loading:false,
			done:false,
			errorState:false,
			errorMessage:"",
			shouldRedirect:false,

			temail:"",
			tname:"",
			tlname:"",
			tqualifications:"",
			tphoneNumber:"",
			tsubject:"",
			taddress:"",
			tpassword:"",
			tcpassword:"",

			shouldRedirectError:false,

			sessionExpired:false,
			redirectMeToHomePage:false,

		}
		this.logMeOut = this.logMeOut.bind(this)
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

		//validations
		let errors={}
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.temail) === false) errors.temail="Teacher Email Should Be Valid"
		if(this.state.temail === "") errors.temail="Email Can't Be Empty"
		if(this.state.tname === "" || this.state.tname.trim() === "" ) errors.tname="Name Can't Be Empty"

		if(this.state.tlname === "" || this.state.tlname.trim() ==="") errors.tlname="Last Name Can't Be Empty" 
			//qualifications can be empty
		if(this.state.tsubject === "" || this.state.tsubject.trim() === "") errors.tsubject="Subject/ Speciality Can't Be Empty"



		if(this.state.tphoneNumber < 1) errors.tphoneNumber="Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(this.state.tphoneNumber <0) errors.tphoneNumber="Phone Number Can't Have A Negative Value"
		// console.log("2*** "+this.state.sParentsPhonNumber <0)
		// if(parseInt(this.state.tphoneNumber).toString()!==this.state.tphoneNumber) errors.tphoneNumber="Parent's/ Gaurdian's Phone Number Can't Have A Decimal Value"
		if(this.state.tphoneNumber === "" || this.state.tphoneNumber.trim() === "" ) errors.tphoneNumber="Phone Number Can't Be Empty"




		if(this.state.taddress === "" || this.state.taddress.trim() === "") errors.taddress="Address Can't Be Empty"

		if(this.state.tpassword ==="" || this.state.tpassword.trim() ==="") errors.tpassword="Password Can't Be Empty"
		if(this.state.tcpassword ==="") errors.tcpassword="Confirm Password Can't Be Empty"
		if(this.state.tpassword !== this.state.tcpassword) errors.tcpassword="Password And Confirm Password Should Be Same"
		if(this.state.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
		this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			// console.log("******************    NO ERROR")
			const {temail, tpassword, tcpassword, email, password, tname, tlname, name, tqualifications, tsubject, tphoneNumber, taddress, schoolToken} = this.state
			this.setState({loading: true})
			this.props.TeacherRegistration({temail,tpassword, tcpassword, tname, tlname, tqualifications, tsubject, tphoneNumber, taddress, email, password, name, schoolToken }).then(
				(response)=>{this.setState({done:true}) ;
				    	if(response.teacher.errorMessage && response.teacher.errorMessage!==undefined && response.teacher.errorMessage!==null && response.teacher.errorMessage!=='' && response.success===null)
				    	{
				    		this.setState({errorState:true, errorMessage: response.teacher.errorMessage, loading:false})
				    	}
						else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
							this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
						}
				    	else{ this.setState({loading:false, done:true, shouldRedirect:true})}
				    },
				(err) => err.response.json().then(({errors})=> { this.setState({errors, loading:false})})
			)

		}
	}



componentWillMount (){
	 document.body.className = "green";
	if(this.props.location.state!=null)
	{
		this.setState({email:this.props.location.state.s.email})
		this.setState({name:this.props.location.state.s.name})
		this.setState({password:this.props.location.state.s.password})
		this.setState({schoolToken:this.props.location.state.s.schoolToken})
		// console.log(this.props.location.state.s)
		// console.log("***********")

	}
}
		logMeOut(e){
			debugger
			console.log(e.target.value)
			const {email, password, schoolToken} =this.state
				this.props.logMeOut({email, password, schoolToken}).then(
					(response)=>{debugger; this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
						{this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}
					else{ this.setState({loading:false, done:true, schoolsList: response.schools, sessionExpired:true,redirectMeToHomePage:true, SuccessMessage:response.SuccessMessage})}},

					(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
				)

		}
	render(){

		const errorBox=(
				<div className="alert alert-danger">
					{this.state.errorMessage}
				</div>
			);

const pageContent=(

	<div>
		
				    {/*<header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                        	<a href="index.html"><img src="http://139.59.7.53:3001/NOVAK-2.png" alt="Main Logo" className="img-responsive"/></a>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    	<a >{this.state.email} </a>
				                    	<Link to={{pathname:"/schoolUser", state:{s:this.state}}} >
				                    		Home
				                    	</Link>
				                    	<Link to={{pathname:"/schooluser/myschoolprofile", state:{s:this.state}}} >
				                    		My Profile
				                    	</Link>
				                    	<button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
				                    
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>*/}
				    <SchoolHeader states={this.state} logMeOut={this.logMeOut} />
				    <div className="form_detail teacher_form_stru">
				        <div className="container">
				            <div className="row">                
				                <div className="col-md-12 form_register">
				                    
									
									<div className="form_main_stru2">
										<h2><i className="fa fa-pencil" aria-hidden="true"></i> Add Your Teacher From Here!</h2>
										<div className="Form_tab">
											<ul className="nav nav-tabs">
												<li className="active"><a data-toggle="tab" href="#school">Add Teacher</a></li>
											</ul>

											<div className="tab-content">
												<div  className="tab-pane fade in active">
													<form onSubmit={this.handleSubmit}>
														<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
														{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
														{ this.state.shouldRedirect ? <Redirect to={{pathname:"/schoolUser",state:{s:this.state}}} /> : "" }
														
														<div className="form_group child_ele">
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.temail})}> <input type="email" className="form-control input-lg" name="temail" id="temail" value={this.state.temail} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.temail} </span></div></p>
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tname})}> <input type="text" className="form-control input-lg" name="tname" id="tname" value={this.state.tname} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.tname} </span></div></p>
														</div>
														
														<div className="form_group child_ele">
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tlname})}> <input type="text" className="form-control input-lg" name="tlname" id="tlname" value={this.state.tlname} onChange={this.handleChange} placeholder="Enter Teachers's Last Name " /><span className="errorM">{this.state.errors.tlname} </span></div></p>
															<p className="fa fa-user"> <div className={classnames('form-group')}> <input type="text" className="form-control input-lg" name="tqualifications" id="tqualifications" value={this.state.tqualifications} onChange={this.handleChange} placeholder="Enter Teachers's Qualification " /></div></p>
														</div>	
															
														<div className="form_group child_ele">	
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tsubject})}> <input type="text" className="form-control input-lg" name="tsubject" id="tsubject" value={this.state.tsubject} onChange={this.handleChange} placeholder="Enter Teachers's Subjects" /><span className="errorM">{this.state.errors.tsubject} </span></div></p>
															<p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tpassword})}> <input type="password" className="form-control input-lg" name="tpassword" id="tpassword" value={this.state.tpassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.tpassword} </span> </div></p>
														</div>
														<div className="form_group child_ele">
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tphoneNumber})}> <input type="number" className="form-control input-lg" name="tphoneNumber" id="tphoneNumber" value={this.state.tphoneNumber} onChange={this.handleChange} placeholder="Enter Teachers's Phone Number" /><span className="errorM">{this.state.errors.tphoneNumber} </span></div></p>
															
															<p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.cpassword})}> <input type="password" className="form-control input-lg" name="tcpassword" id="tcpassword" value={this.state.tcpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.tcpassword} </span> </div></p>
														</div>
														<div className="col-md-12">
															<div><p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.taddress})}> <textarea type="number" className="form-control input-lg" name="taddress" id="taddress" value={this.state.taddress} onChange={this.handleChange} placeholder="Enter Teachers's Address"> </textarea><span className="errorM">{this.state.errors.taddress} </span></div></p></div>
														</div>
														<button><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
													</form>
												</div>
											</div>			
										</div>
																		
									</div>			
												
													
				                </div>
				                
				            </div>
				        </div>
				     </div>
			    	
	</div>


	)
	
	
		return(
				<div>
						{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!=="" && this.props.location.state.s.schoolToken && this.props.location.state.s.schoolToken!==null && this.props.location.state.s.schoolToken!==undefined && this.props.location.state.s.schoolToken!=="" ? pageContent : <Redirect to="/" />}
						{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{school:"Please login Again"}}} /> : "" }
						{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{school:this.state.SuccessMessage}}} />:""}
				</div>
			);
	}
}
export default connect(null ,{TeacherRegistration, logMeOut})  (TeacherForm)