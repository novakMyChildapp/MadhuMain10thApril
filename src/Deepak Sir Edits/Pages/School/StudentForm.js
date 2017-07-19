import React from 'react';

import classnames from 'classnames'


import {connect}  from 'react-redux';
import { Link, Redirect } from 'react-router';

import {StudentRegistration} from '../../actions/SchoolActions'

class StudentForm extends React.Component{


	constructor(props){
		super(props)
		this.state={
			email:"",
			name:"",
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

		}
	}


	componentWillMount (){
		// debugger
		// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
	 	document.body.className = "green";
		if(this.props.location.state!=null)
		{
			this.setState({email:this.props.location.state.s.email})
			this.setState({name:this.props.location.state.s.name})
			this.setState({password:this.props.location.state.s.password})
			// console.log(this.props.location.state.s)
			// console.log("***********")

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
		e.preventDefault();

		//validations
		let errors={}
		if(this.state.semail === "") errors.semail="Email Cant Be Empty"
		if(this.state.sname === "") errors.sname="Name Cant Be Empty"

		if(this.state.slname === "") errors.slname="Last Name Cant Be Empty"
		if(this.state.sclass === "") errors.sclass="Class Cant Be Empty"
		if(this.state.sGaurdianName === "") errors.sGaurdianName="Parent's/ Gaurdian's Name Cant Be Empty"
		if(this.state.sParentsPhonNumber === "") errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Cant Be Empty"
		if(this.state.saddress === "") errors.saddress="Parent's / Gaurdians's Address Cant Be Empty"
			
		if(this.state.spassword ==="") errors.spassword="Password Cant Be Empty"
		if(this.state.scpassword ==="") errors.scpassword="Password Cant Be Empty"
		if(this.state.spassword !== this.state.scpassword) errors.scpassword="Password And Confirm Password Should Be Same"
		if(this.state.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
			this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			// console.log("******************    NO ERROR")
			// debugger
			const {semail, spassword, email, password, sname, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber, name} = this.state
			this.setState({loading: true})
			this.props.StudentRegistration({semail,spassword, sname, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber, email, password, name }).then(
				(response)=>{this.setState({done:true}) ; console.log("$$#%#$%$#%$#%$#%$#%$#%#     "+JSON.stringify(response));if(response.student.errorMessage && response.student.errorMessage!==undefined && response.student.errorMessage!==null && response.student.errorMessage!==''){this.setState({errorState:true, errorMessage: response.student.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true})}},
				(err) => err.response.json().then(({errors})=> { this.setState({errors, loading:false})})
			)

		}
	}

		render(){


		const errorBox=(
				<div className="alert alert-danger">
					{this.state.errorMessage}
				</div>
			);

const pageContent=(

	<div>
		
				    <header>
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
				                    	<Link to={{pathname:"/", state:{}}} >
				                    		<i className="fa fa-sign-in" aria-hidden="true"></i>Logout
				                    	</Link>
				                    
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>


				    <div className="form_detail teacher_form_stru">
				        <div className="container">
				            <div className="row">                
				                <div className="col-md-12 form_register">
	
									<div className="form_main_stru2">
				                    
										<h2> <i className="fa fa-pencil" aria-hidden="true"></i>Add Your Student From Here!</h2>
										<div className="Form_tab">
											<ul className="nav nav-tabs">
												<li className="active"><a data-toggle="tab" href="#school">Add Student</a></li>
											</ul>

											<div className="tab-content">
												<div  className="tab-pane fade in active">
													<form onSubmit={this.handleSubmit}>
														<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
														{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
														{ this.state.shouldRedirect ? <Redirect to={{pathname:"/schoolUser",state:{s:this.state}}} /> : "" }
														
														<div className="form_group child_ele">	
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.semail})}> <input type="email" className="form-control input-lg" name="semail" id="semail" value={this.state.semail} onChange={this.handleChange} placeholder="Enter Students email" /><span className="errorM">{this.state.errors.semail} </span></div></p></div>

															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sname})}> <input type="text" className="form-control input-lg" name="sname" id="sname" value={this.state.sname} onChange={this.handleChange} placeholder="Enter Student's Name " /><span className="errorM">{this.state.errors.sname} </span></div></p></div>
														</div>
														
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.slname})}> <input type="text" className="form-control input-lg" name="slname" id="slname" value={this.state.slname} onChange={this.handleChange} placeholder="Enter Student's Last Name " /><span className="errorM">{this.state.errors.slname} </span></div></p></div>

															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sGaurdianName})}> <input type="text" className="form-control input-lg" name="sGaurdianName" id="sGaurdianName" value={this.state.sGaurdianName} onChange={this.handleChange} placeholder="Enter Student's Parent/Gaurdian Name " /><span className="errorM">{this.state.errors.sGaurdianName} </span></div></p></div>
														</div>
														
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sclass})}> <input type="number" className="form-control input-lg" name="sclass" id="sclass" value={this.state.sclass} onChange={this.handleChange} placeholder="Enter Student's Class" /><span className="errorM">{this.state.errors.sclass} </span></div></p></div>

															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sParentsPhonNumber})}> <input type="number" className="form-control input-lg" name="sParentsPhonNumber" id="sParentsPhonNumber" value={this.state.sParentsPhonNumber} onChange={this.handleChange} placeholder="Enter Students's parents/Gaurdian Phone Number" /><span className="errorM">{this.state.errors.sParentsPhonNumber} </span></div></p></div>
														</div>
														
														<div className="form_group">
															<div className="full-form"><p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.saddress})}> <textarea type="number" className="form-control input-lg" name="saddress" id="saddress" value={this.state.saddress} onChange={this.handleChange} placeholder="Enter Parents's/Gaurdian's Address"> </textarea><span className="errorM">{this.state.errors.saddress} </span></div></p></div>
														</div>
															
														<div className="form_group child_ele">	
															<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.spassword})}> <input type="password" className="form-control input-lg" name="spassword" id="spassword" value={this.state.spassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.spassword} </span> </div></p></div>
															
															<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.scpassword})}> <input type="password" className="form-control input-lg" name="scpassword" id="scpassword" value={this.state.scpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.scpassword} </span> </div></p></div>
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
{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!="" ? pageContent : <Redirect to="/" />}

					</div>



				);
		}



}


export default connect(null ,{StudentRegistration})  (StudentForm)