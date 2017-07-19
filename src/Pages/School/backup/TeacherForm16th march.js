import React from 'react';

import classnames from 'classnames'


import {connect}  from 'react-redux';
import {Link,  Redirect } from 'react-router';

import {TeacherRegistration} from '../../actions/SchoolActions'


class TeacherForm extends React.Component{
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

			temail:"",
			tname:"",
			tlname:"",
			tqualifications:"",
			tphoneNumber:"",
			tsubject:"",
			taddress:"",
			tpassword:"",
			tcpassword:"",

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
		if(this.state.temail === "") errors.temail="Email Cant Be Empty"
		if(this.state.tname === "") errors.tname="Name Cant Be Empty"

		if(this.state.tlname === "") errors.tlname="Last Name Cant Be Empty" 
			//qualifications can be empty
		if(this.state.tsubject === "") errors.tsubject="Subject/ Speciality Cant Be Empty"
		if(this.state.tphoneNumber === "") errors.tphoneNumber="Phone Number Cant Be Empty"
		if(this.state.taddress === "") errors.taddress="Address Cant Be Empty"

		if(this.state.tpassword ==="") errors.tpassword="Password Cant Be Empty"
		if(this.state.tcpassword ==="") errors.tcpassword="Password Cant Be Empty"
		if(this.state.tpassword !== this.state.tpassword) errors.tcpassword="Password And Confirm Password Should Be Same"
		if(this.state.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
			this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			// console.log("******************    NO ERROR")
			const {temail, tpassword, email, password, tname, tlname, name, tqualifications, tsubject, tphoneNumber, taddress} = this.state
			this.setState({loading: true})
			this.props.TeacherRegistration({temail,tpassword, tname, tlname, tqualifications, tsubject, tphoneNumber, taddress, email, password, name }).then(
				(response)=>{this.setState({done:true}) ; if(response.teacher.errorMessage && response.teacher.errorMessage!==undefined && response.teacher.errorMessage!==null && response.teacher.errorMessage!==''){this.setState({errorState:true, errorMessage: response.teacher.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true})}},
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
		// console.log(this.props.location.state.s)
		// console.log("***********")

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
				        	<div className="container">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                        	<a href="index.html"><img src="/images/logo.png" alt="Main Logo" className="img-responsive"/></a>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    	<a >{this.state.email} </a>
				                    	<Link to={{pathname:"/schoolUser", state:{s:this.state}}} >
				                    		Home
				                    	</Link>
				                    	<Link to={{pathname:"/schoolUser/myschoolprofile", state:{s:this.state}}} >
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

				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                
				                <div className="col-md-7 form_register">
				                    <h2>Add Your Teacher From Here!</h2>
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
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.temail})}> <input type="email" className="form-control input-lg" name="temail" id="temail" value={this.state.temail} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.temail} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tname})}> <input type="text" className="form-control input-lg" name="tname" id="tname" value={this.state.tname} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.tname} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tlname})}> <input type="text" className="form-control input-lg" name="tlname" id="tlname" value={this.state.tlname} onChange={this.handleChange} placeholder="Enter Teachers's Last Name " /><span className="errorM">{this.state.errors.tlname} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group')}> <input type="text" className="form-control input-lg" name="tqualifications" id="tqualifications" value={this.state.tqualifications} onChange={this.handleChange} placeholder="Enter Teachers's Qualification " /></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tsubject})}> <input type="text" className="form-control input-lg" name="tsubject" id="tsubject" value={this.state.tsubject} onChange={this.handleChange} placeholder="Enter Teachers's Subjects" /><span className="errorM">{this.state.errors.tsubject} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tphoneNumber})}> <input type="number" className="form-control input-lg" name="tphoneNumber" id="tphoneNumber" value={this.state.tphoneNumber} onChange={this.handleChange} placeholder="Enter Teachers's Phone Number" /><span className="errorM">{this.state.errors.tphoneNumber} </span></div></p>
				                                    <p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.taddress})}> <textarea type="number" className="form-control input-lg" name="taddress" id="taddress" value={this.state.taddress} onChange={this.handleChange} placeholder="Enter Teachers's Address"> </textarea><span className="errorM">{this.state.errors.taddress} </span></div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tpassword})}> <input type="password" className="form-control input-lg" name="tpassword" id="tpassword" value={this.state.tpassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.tpassword} </span> </div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.cpassword})}> <input type="password" className="form-control input-lg" name="tcpassword" id="tcpassword" value={this.state.tcpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.tcpassword} </span> </div></p>
				                                    
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i>Add</button>

				                                </form>

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
export default connect(null ,{TeacherRegistration})  (TeacherForm)