import React from 'react';

import classnames from 'classnames'

import {connect}  from 'react-redux';
import { Redirect } from 'react-router';

import {saveSchoolLogin} from '../actions/actions'


class SchoolForm extends React.Component{
	state={
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
		successMessage:"",
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
		let errors = {};
		if(this.state.email === "") errors.email="Email Cant Be Empty"
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) === false) errors.email="School Email Should Be Valid"
		if(this.state.name === "") errors.name="School Name Cant Be Empty"
		if(this.state.password ==="") errors.password="Password Cant Be Empty"
		if(this.state.cpassword ==="") errors.cpassword="Confirm Password Can't Be Empty"
		if(this.state.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
		if(this.state.cpassword !== this.state.password) errors.cpassword="Password and Confirm Password Should Match"	

		this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	if(isValid){
		console.log("******************    NO ERROR")
		const {email, name, password, cpassword} = this.state
		this.setState({loading: true})
		this.props.saveSchoolLogin({email, name, password,cpassword }).then(
			(response)=>{this.setState({done:true}) ; if(response.school.errorMessage && response.school.errorMessage!==undefined && response.school.errorMessage!==null && response.school.errorMessage!==''){this.setState({errorState:true, errorMessage: response.school.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, successMessage:"Successfully Registered. Approval From Admin Pending Yet.", email:"", name:"", password:"",cpassword:""})}},
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
			const form = (

			    <div >
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
				                    	<a href="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>
				    

				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                

				                <div className="col-md-7 col-md-offset-3 form_register">
				                    <h2>Register your school and digitize your students dairy!</h2>
				                    <div className="Form_tab register-cls">
				                        <ul className="nav nav-tabs">
				                            <li className="active"><a data-toggle="tab" href="#school">School Registration</a></li>
				                        </ul>

				                        <div className="tab-content">
				                            <div  className="tab-pane fade in active">
				                                <form onSubmit={this.handleSubmit}>
													<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                	{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
													{ this.state.shouldRedirect ? <Redirect to="/schoolUser" /> : "" }
													{this.state.successMessage && this.state.successMessage!=="" ? <div className="alert alert-success">{this.state.successMessage}</div>:"" }
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input type="email" className="form-control input-lg" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" /><span className="errorM">{this.state.errors.email} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.name})}> <input type="text" className="form-control input-lg" name="name" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter School " /><span className="errorM">{this.state.errors.name} </span></div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.password})}> <input type="password" className="form-control input-lg" name="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.password} </span> </div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.cpassword})}> <input type="password" className="form-control input-lg" name="cpassword" id="cpassword" value={this.state.cpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.cpassword} </span> </div></p>
				                                    {/*<a href="#">Forget password?</a>*/}
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i>Register</button>

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


		return(
				<div>
					{ this.state.shouldRedirect ? <Redirect to="/schools" />  : form }
				</div>
			);
	}
}
export default connect(null, {saveSchoolLogin})(SchoolForm);

				// <div>
				// 	{ this.state.done ? <Redirect to="/schools" />  : form }
				// </div>