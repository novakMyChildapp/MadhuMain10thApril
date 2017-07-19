// ForgotTeacherPassword
import React from 'react';

import classnames from 'classnames';

import {connect} from 'react-redux'
import { Redirect } from 'react-router';

import {TeacherPasswordForgotRecovery} from '../actions/actions'


class ForgotTeacherPassword extends React.Component{
	state={
		email:"",
		
		errors:{},
		loading:false,
		done:false,
		errorState:false,

		errorMessage:"",
		successMessage:"",

		shouldRedirect:false,

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
// debugger
		//validations
		let errors={}
		if(this.state.email === "") errors.email="School Email Cant Be Empty"
		this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {email} = this.state
			this.setState({loading: true})
			this.props.TeacherPasswordForgotRecovery({email}).then(
				(response)=>{this.setState({done:true}) ;console.log(response); if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Sent You New Password"})}},
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
		return(
			<div>
			    <header>
			    	<div className="header-top">
			        	<div className="container">
			            	<div className="row">
			                	<div className="col-xs-5">
			                    	<div className="logo">
			                        	<a href="index.html"><img src="/images/logo.png" alt="main Logo" className="img-responsive"/></a>
			                        </div>
			                    </div>
			                    <div className="col-xs-7 text-right register">
			                    	<a href="/register"><i className="fa fa-sign-in" aria-hidden="true"></i> Register</a>

			                    	<a href="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </header>

				<br/><h1> Welcome To School Password Recovery Page</h1><br/>
				<br/>
				<br/>
				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                

				                <div className="col-md-7 col-md-offset-3 form_register">
				                    <h2>Fill Your Email And We Will Send You A Randomized Password On Your Email</h2>
				                    <div className="Form_tab">
				                        <ul className="nav nav-tabs">
				                            <li className="active"><a data-toggle="tab" href="#school">School Password Recovery</a></li>
				                        </ul>

				                        <div className="tab-content">
				                            <div  className="tab-pane fade in active">
				                                <form onSubmit={this.handleSubmit}>
													<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                	{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
													{ this.state.shouldRedirect ? <Redirect to={{pathname:"/", state:{teacher:this.state.successMessage}}} /> : "" }
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input type="email" className="form-control input-lg" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" /><br/><span className="errorM">{this.state.errors.email} </span></div></p>
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i>Send Me A New Password</button>

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
export default connect(null, {TeacherPasswordForgotRecovery}) (ForgotTeacherPassword)