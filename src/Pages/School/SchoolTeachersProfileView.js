import React from 'react';

import classnames from 'classnames'


import {connect}  from 'react-redux';
import { Redirect } from 'react-router';

import {FetchTeacherProfile, TeacherProfileUpdation, logMeOut} from '../../actions/SchoolActions'
import SchoolHeader from "./SchoolHeader"   // Navigation bar of Admin


class SchoolTeachersProfileView extends React.Component{
	constructor(props){
		super(props)
		this.state={
			email:"",
			name:"",
			schoolToken:'',
			password:"",
			cpassword:"",

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
			successMessage:"",
			teacherImage:'',

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
		debugger
		e.preventDefault();

		//validations
		let errors={}
		if(this.state.temail === "") errors.temail="Email Can't Be Empty"

		if(this.state.tname === "") errors.tname="Name Can't Be Empty"

		if(this.state.tlname === "" || this.state.tlname===undefined) errors.tlname="Last Name Can't Be Empty" 
			// console.log(this.state.tlname)
			// qualifications can be empty
		if(this.state.tsubject === "" || this.state.tsubject===undefined) errors.tsubject="Subject/ Speciality Can't Be Empty"
		if(this.state.tphoneNumber === "" || this.state.tphoneNumber===undefined) errors.tphoneNumber="Phone Number Can't' Be Empty"
		if(this.state.taddress === "" || this.state.taddress===undefined) errors.taddress="Address Can't Be Empty"

		if(this.state.tpassword ==="" || this.state.tpassword===undefined) errors.tpassword="Password Can't Be Empty"
		if(this.state.tcpassword ==="" || this.state.tcpassword===undefined) errors.tcpassword="Confirm Password Can't Be Empty"
		if(this.state.tpassword !== this.state.tcpassword) errors.tcpassword="Password And Confirm Password Should Be Same"
		if(this.state.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
			this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			// console.log("******************    NO ERROR")
			const {temail, tpassword,tcpassword, email, password, tname, tlname, name, tqualifications, tsubject, tphoneNumber, taddress, schoolToken} = this.state
			this.setState({loading: true})
			this.props.TeacherProfileUpdation({temail,tpassword, tcpassword ,tname, tlname, tqualifications, tsubject, tphoneNumber, taddress, email, password, name, schoolToken }).then(
				(response)=>{debugger;this.setState({done:true});console.log("%%%%%%%%%%%%%");console.log(response) ;
				if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success==null)
					{
						this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
					}
				else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
					this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
				}
				else{ this.setState({loading:false, done:true, tlname:response.theTeacher.tlname, tqualifications:response.theTeacher.tqualifications, tsubject: response.theTeacher.tsubject, tphoneNumber:response.theTeacher.tphoneNumber, taddress:response.theTeacher.taddress, tpassword:response.theTeacher.tpassword, tcpassword:response.theTeacher.tpassword, successMessage:response.SuccessMessage, teacherImage:response.teacherImage})}},
				(err) => err.response.json().then(({errors})=> {console.log("rrrrrrrrrrrrrr"); this.setState({errors, loading:false})})
			)

		}
	}

	componentWillMount (){
		debugger
		 document.body.className = "green";
		 console.log("&&&&&&&&&&&&&")
		 console.log(this)
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
	componentDidMount(){
		debugger
		const {email, password, schoolToken} = this.state
		const id = this.props.params.id
		this.setState({loading: true})
		this.props.FetchTeacherProfile({email, password, id, schoolToken }).then(
			(response)=>{ debugger ; this.setState({done:true});console.log("%%%%%%%%%%%%%");console.log(response) ;
				if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
					{
						this.setState({errorState:true, errorMessage: response.errorMessage, loading:false});console.log("here")
					}
				else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
					this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
				}
				else{ this.setState({loading:false, done:true, tlname:response.theTeacher.tlname, tqualifications: response.theTeacher.tqualifications, tphoneNumber:response.theTeacher.tphoneNumber, tsubject: response.theTeacher.tsubject,taddress:response.theTeacher.taddress, temail:response.theTeacher.temail, tname:response.theTeacher.tname,tpassword:response.theTeacher.password, tcpassword:response.theTeacher.password})}},
				(err) => err.response.json().then(({errors})=> {console.log("rrrrrrrrrrrrrr"); this.setState({errors, loading:false})})
		)
		console.log(this.state)

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
		
{/*				    <header>
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
										<h2>Update Your Teacher From Here!</h2>
										<div className="Form_tab">
											<ul className="nav nav-tabs">
												<li className="active"><a data-toggle="tab" href="#school">Update Teacher</a></li>
											</ul>

											<div className="tab-content">
												<div  className="tab-pane fade in active">
													<form onSubmit={this.handleSubmit}>

														{this.state.successMessage && this.state.successMessage!==undefined && this.state.successMessage!=="" ?<div className="slert alert-success">{this.state.successMessage}</div>:''}
														<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
														{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
														{ this.state.shouldRedirect ? <Redirect to={{pathname:"/schoolUser",state:{s:this.state}}} /> : "" }
														
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.temail})}> <input readOnly type="email" className="form-control input-lg" name="temail" id="temail" value={this.state.temail} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.temail} </span></div></p></div>
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tname})}> <input readOnly type="text" className="form-control input-lg" name="tname" id="tname" value={this.state.tname} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.tname} </span></div></p></div>
														</div>
														
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tlname})}> <input type="text" className="form-control input-lg" name="tlname" id="tlname" value={this.state.tlname} onChange={this.handleChange} placeholder="Enter Teachers's Last Name " /><span className="errorM">{this.state.errors.tlname} </span></div></p></div>
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group')}> <input type="text" className="form-control input-lg" name="tqualifications" id="tqualifications" value={this.state.tqualifications} onChange={this.handleChange} placeholder="Enter Teachers's Qualification " /></div></p></div>
														</div>	
															
														<div className="form_group child_ele">	
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tsubject})}> <input type="text" className="form-control input-lg" name="tsubject" id="tsubject" value={this.state.tsubject} onChange={this.handleChange} placeholder="Enter Teachers's Subjects" /><span className="errorM">{this.state.errors.tsubject} </span></div></p></div>
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tphoneNumber})}> <input type="number" className="form-control input-lg" name="tphoneNumber" id="tphoneNumber" value={this.state.tphoneNumber} onChange={this.handleChange} placeholder="Enter Teachers's Phone Number" /><span className="errorM">{this.state.errors.tphoneNumber} </span></div></p></div>
														</div>
														
														<div className="form_group">
															<div className="full-form"><p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.taddress})}> <textarea type="number" className="form-control input-lg" name="taddress" id="taddress" value={this.state.taddress} onChange={this.handleChange} placeholder="Enter Teachers's Address"> </textarea><span className="errorM">{this.state.errors.taddress} </span></div></p></div>
														</div>
														
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tpassword})}> <input type="password" className="form-control input-lg" name="tpassword" id="tpassword" value={this.state.tpassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.tpassword} </span> </div></p></div>


															<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.cpassword})}> <input type="password" className="form-control input-lg" name="tcpassword" id="tcpassword" value={this.state.tcpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.tcpassword} </span> </div></p></div>
														</div>
														
														<button><i className="fa fa-paper-plane-o" aria-hidden="true"></i>Update</button>
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
						{ this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{school:"Please login Again"}}} /> : "" }
						{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{school:this.state.SuccessMessage}}} />:""}
				</div>



			);

	}



}
// SchoolTeachersProfileView
export default connect(null ,{FetchTeacherProfile, TeacherProfileUpdation, logMeOut})  (SchoolTeachersProfileView)