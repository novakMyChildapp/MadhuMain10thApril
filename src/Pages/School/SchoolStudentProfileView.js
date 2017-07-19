import React from 'react';

import classnames from 'classnames'


import {connect}  from 'react-redux';
import { Redirect } from 'react-router';

import SchoolHeader from "./SchoolHeader"   // Navigation bar of Admin

import {FetchStudentProfile, StudentProfileUpdation, logMeOut} from '../../actions/SchoolActions'
class SchoolStudentProfileView extends React.Component{
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

			semail:"",
			sname:"",
			slname:"",
			sclass:"",
			spassword:"",
			scpassword:"",
			sGaurdianName:"",
			saddress:"",
			sParentsPhonNumber:"",
			successMessage:"",
			studentImage:"",

			shouldRedirectError:false,

			sessionExpired:false,
			redirectMeToHomePage:false,

		}
		this.open_ThePopup = this.open_ThePopup.bind(this)
		this.logMeOut = this.logMeOut.bind(this)
	}
	componentWillMount (){
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
		// debugger
		const {email, password, schoolToken} = this.state
		const id = this.props.params.id
		this.setState({loading: true})
		this.props.FetchStudentProfile({email, password, id, schoolToken}).then(
			(response)=>{this.setState({done:true});console.log("%%%%%%%%%%%%%");console.log(response) ;
			 if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
			 	{
			 		this.setState({errorState:true, errorMessage: response.errorMessage, loading:false});console.log("here")
			 	}
				else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
					this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
				}
				else{ this.setState({loading:false, done:true, sname:response.theStudent.sname, semail:response.theStudent.semail, slname:response.theStudent.slname, sGaurdianName:response.theStudent.sGaurdianName, sclass:response.theStudent.sclass, sParentsPhonNumber:response.theStudent.sParentsPhonNumber, saddress:response.theStudent.saddress, spassword:response.theStudent.password, scpassword:response.theStudent.password, studentImage:response.theStudent.studentImage})}},
				(err) => err.response.json().then(({errors})=> {console.log("rrrrrrrrrrrrrr"); this.setState({errors, loading:false})})
		)
		console.log(this.state)

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
	open_ThePopup(){
		console.log("HI")
	    var x = document.body;
	    if (x.className=="green") {
	        x.className = 'green open_popup';
	    } else {
	        x.className = 'green';
	    }
	}

		handleSubmit = (e)=>{
		e.preventDefault();

		//validations
		let errors={}
		if(this.state.semail === "") errors.semail="Email Can't Be Empty"
		if(this.state.sname === "") errors.sname="Name Can't Be Empty"

		if(this.state.slname === "" || this.state.slname === undefined || this.state.slname.trim() === "") errors.slname="Last Name Can't Be Empty"

		if(this.state.sclass === "" || this.state.sclass === undefined ) errors.sclass="Class Can't Be Empty"
		if(this.state.sclass < 1) errors.sclass="Class Can't Be Zero"
		if(this.state.sclass <0) errors.sclass="Class Can't Have A Negative Value"
		// if(parseInt(this.state.sclass).toString()!==this.state.sclass) errors.sclass="Class Can't Have A Decimal Value"

		if(this.state.sGaurdianName === ""|| this.state.sGaurdianName === undefined || this.state.sGaurdianName.trim() === "") errors.sGaurdianName="Parent's/ Gaurdian's Name Can't Be Empty"

		if(this.state.sParentsPhonNumber < 1) errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(this.state.sParentsPhonNumber <0) errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Have A Negative Value"
		// console.log("2*** "+this.state.sParentsPhonNumber <0)
		// if(parseInt(this.state.sParentsPhonNumber).toString()!==this.state.sParentsPhonNumber) errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Have A Decimal Value"
		if(this.state.sParentsPhonNumber === ""|| this.state.sParentsPhonNumber === undefined || this.state.sParentsPhonNumber.trim() === "") errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Be Empty"


		if(this.state.saddress === ""|| this.state.saddress === undefined || this.state.saddress.trim() === "") errors.saddress="Parent's / Gaurdians's Address Can't Be Empty"
			
		if(this.state.spassword ==="" || this.state.spassword.trim() ==="") errors.spassword="Password Can't Be Empty"
		if(this.state.scpassword ==="") errors.scpassword="Confirm Password Cant Be Empty"
		if(this.state.spassword !== this.state.scpassword) errors.scpassword="Password And Confirm Password Should Be Same"
		if(this.state.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
			this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			// console.log("******************    NO ERROR")
			// debugger
			const {semail, spassword, sname, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber, name, email, password} = this.state
			this.setState({loading: true})
			this.props.StudentProfileUpdation({semail,spassword, sname, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber, email, password, name }).then(
				(response)=>{this.setState({done:true}) ; console.log("$$#%#$%$#%$#%$#%$#%$#%#     "+JSON.stringify(response));if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}
							else{
								this.setState({loading:false, done:true, sname:response.theStudent.sname, semail:response.theStudent.semail, slname:response.theStudent.slname, sGaurdianName:response.theStudent.sGaurdianName, sclass:response.theStudent.sclass, sParentsPhonNumber:response.theStudent.sParentsPhonNumber, saddress:response.theStudent.saddress, spassword:response.theStudent.password, scpassword:response.theStudent.password, successMessage:response.SuccessMessage});
								// debugger;
								// document.getElementsByTagName("body").classList.remove('open_popup');
								// window.jQuery('body').removeClass('open_popup')
								document.body.className = "";
								document.body.className = "green";
							}},
				(err) => err.response.json().then(({errors})=> { this.setState({errors, loading:false})})
			)

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
		
				{/*	<header>
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
				                    
										<h2>Update Your Student From Here!</h2>
										{this.state.successMessage && this.state.successMessage!==undefined && this.state.successMessage!=="" ?<div className="slert alert-success">{this.state.successMessage}</div>:''}

										<div className="my_profile_main">
										<div className="profile_pic">
											{this.state.studentImage && this.state.studentImage!=null ?<img src={this.state.studentImage} alt="Student Profile" />:<img src="/Dummy_Image_Man.jpg" alt="Parent" />}
										</div>
											<div className="profile_data">
												<ul>
													<li><label>Email</label> :<span>{this.state.semail} </span></li>
													<li><label>First Name</label> :<span>{this.state.sname} </span></li>
													<li><label>Last Name</label> :<span>{this.state.slname} </span></li>
													<li><label>Gaurdian Bame</label> :<span>{this.state.sGaurdianName} </span></li>
													<li><label>Student Class</label> :<span>{this.state.sclass} </span></li>
													<li><label>Parent Number</label> :<span>{this.state.sParentsPhonNumber} </span></li>
													<li><label>Parent Address</label> :<span>{this.state.saddress} </span></li>
												</ul>
												<button className="popup_o btn Btn_common" onClick={this.open_ThePopup}><i className="fa fa-pencil-square-o" aria-hidden="true" ></i> Edit</button>
											</div>
										</div>
										<div className="overlay"></div>
										<div className="Form_tab edit_profile">
											<ul className="nav nav-tabs">
												<li className="active"><a data-toggle="tab" href="#school">Update Student</a></li>
												<a className="remove_popup"><i className="fa fa-times" aria-hidden="true"></i></a>
											</ul>

											<div className="tab-content">
												<div  className="tab-pane fade in active">
													<form onSubmit={this.handleSubmit}>
													{/*this.state.successMessage && this.state.successMessage!==undefined && this.state.successMessage!=="" ?<div className="slert alert-success">{this.state.successMessage}</div>:'' */}
														<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
														{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
														{ this.state.shouldRedirect ? <Redirect to={{pathname:"/schoolUser",state:{s:this.state}}} /> : "" }
														
														<div className="col-md-6 col-sm-6 col-xs-12">	
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.semail})}> <input readOnly type="email" className="form-control input-lg" name="semail" id="semail" value={this.state.semail} onChange={this.handleChange} placeholder="Enter Students email" /><span className="errorM">{this.state.errors.semail} </span></div></p>
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sname})}> <input readOnly type="text" className="form-control input-lg" name="sname" id="sname" value={this.state.sname} onChange={this.handleChange} placeholder="Enter Student's Name " /><span className="errorM">{this.state.errors.sname} </span></div></p>
														</div>
														
														<div className="col-md-6 col-sm-6 col-xs-12">
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.slname})}> <input type="text" className="form-control input-lg" name="slname" id="slname" value={this.state.slname} onChange={this.handleChange} placeholder="Enter Student's Last Name " /><span className="errorM">{this.state.errors.slname} </span></div></p>
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sGaurdianName})}> <input type="text" className="form-control input-lg" name="sGaurdianName" id="sGaurdianName" value={this.state.sGaurdianName} onChange={this.handleChange} placeholder="Enter Student's Parent/Gaurdian Name " /><span className="errorM">{this.state.errors.sGaurdianName} </span></div></p>
														</div>
														
														<div className="col-md-6 col-sm-6 col-xs-12">
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sclass})}> <input type="number" className="form-control input-lg" name="sclass" id="sclass" value={this.state.sclass} onChange={this.handleChange} placeholder="Enter Student's Class" /><span className="errorM">{this.state.errors.sclass} </span></div></p>
															<p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.spassword})}> <input type="password" className="form-control input-lg" name="spassword" id="spassword" value={this.state.spassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.spassword} </span> </div></p>
															
														</div>
														
														<div className="col-md-6 col-sm-6 col-xs-12">	
															<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sParentsPhonNumber})}> <input type="number" className="form-control input-lg" name="sParentsPhonNumber" id="sParentsPhonNumber" value={this.state.sParentsPhonNumber} onChange={this.handleChange} placeholder="Enter Students's parents/Gaurdian Phone Number" /><span className="errorM">{this.state.errors.sParentsPhonNumber} </span></div></p>
															<p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.scpassword})}> <input type="password" className="form-control input-lg" name="scpassword" id="scpassword" value={this.state.scpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.scpassword} </span> </div></p>
														</div>	

														<div className="col-md-12 col-sm-12 col-xs-12">
															<div className="full-form"><p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.saddress})}> <textarea type="number" className="form-control input-lg" name="saddress" id="saddress" value={this.state.saddress} onChange={this.handleChange} placeholder="Enter Parents's/Gaurdian's Address"> </textarea><span className="errorM">{this.state.errors.saddress} </span></div></p></div>
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
export default connect(null ,{FetchStudentProfile, StudentProfileUpdation, logMeOut})  (SchoolStudentProfileView)