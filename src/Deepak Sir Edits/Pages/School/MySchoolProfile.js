// MySchoolProfile
import React from 'react';
import classnames from 'classnames'

import {connect}  from 'react-redux';
import {Link, Redirect } from 'react-router';

import {UpdateSchoolProfileDetails} from '../../actions/SchoolActions'

class MySchoolProfile extends React.Component{

		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				password:'',
				cpassword:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				studentsList:[],
				errors:{},
				OldPassword:'',
				successMessage:''

			}
			// console.log(this.state.email)
		}

		componentWillMount (){


		 	document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({email:this.props.location.state.s.email})
				this.setState({name:this.props.location.state.s.name})
				this.setState({password:this.props.location.state.s.password})
				this.setState({cpassword:this.props.location.state.s.password})
				this.setState({OldPassword:this.props.location.state.s.password})
				console.log(this.props.location.state.s)
				console.log("---------------------------------------")

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
		let errors = {};

		if(this.state.password ==="") errors.password="Password Cant Be Empty"
		if(this.state.cpassword ==="") errors.cpassword="Confirm Password Be Empty"
		if(this.state.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
		if(this.state.cpassword !== this.state.password) errors.cpassword="Password and Confirm Password Should Match"	

		this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	if(isValid){

		console.log("******************    NO ERROR")
		const {email, password, OldPassword, cpassword} = this.state
		this.setState({loading: true})
		this.props.UpdateSchoolProfileDetails({email, password, OldPassword, cpassword}).then(
			(response)=>{this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Changed The Password"})}},
			(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
		)

	}

	}

componentDidMount(){
	// console.log("***********")
	// console.log(this.props)
			// if(this.props.location.state!=null){
			// 	const {temail, tpassword} = this.props.location.state.s;
			// 	const tcpassword = tpassword

			// 	this.props.UpdateTeacherProfileDetails({temail, tpassword, tcpassword })
			// 		.then((response)=>{this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
			// 				if(response.teacherStudents.errorMessage && response.teacherStudents.errorMessage!==undefined && response.teacherStudents.errorMessage!==null && response.teacherStudents.errorMessage!==''){
			// 					this.setState({errorState:true, errorMessage: response.teacherStudents.errorMessage, loading:false})
			// 				}else{
			// 					console.log("**********************************");
			// 					console.log(response);
			// 					this.setState({loading:false, done:true, shouldRedirect:true, studentsList: response.teacherStudents.studentsArray})
			// 				; console.log("::::::::::"); console.log(this.state)
			// 				}
			// 			},
			// 			(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			// 			)
			// 	console.log("###################1" + JSON.stringify(this.state))
			// 	console.log("###################2 "+ JSON.stringify(this.props.students))
			// }
}

render(){
			const errorBox=(
				<div className="alert alert-danger">
					{this.state.errorMessage}
				</div>
			);
			const successM=(
				<div className="alert alert-success">
					{this.state.successMessage}
				</div>
				)
	const pageContent=(

			    <div >
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
				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                
				                <div className="col-md-7 form_register">
				                    <h2>Change Your Password From Here</h2>
				                    <div className="Form_tab">
				                        <ul className="nav nav-tabs">
				                            <li className="active"><a data-toggle="tab" href="#school">Change My Details</a></li>
				                        </ul>
				                        <div className="tab-content">
				                            <div  className="tab-pane fade in active">
				                                <form onSubmit={this.handleSubmit}>
													<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                	{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
													{this.state.successMessage && this.state.successMessage!==null && this.state.successMessage!==undefined && this.state.successMessage!==""? successM:""}
				                                    { this.state.shouldRedirect ? <Redirect to={{pathname:"/", state:{school:"Successfully Updated Password"}}} /> : "" }
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input readOnly type="email" className="form-control input-lg" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email"  /><span className="errorM">{this.state.errors.email} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.name})}> <input readOnly type="text" className="form-control input-lg" name="name" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.name} </span></div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.password})}> <input type="password" className="form-control input-lg" name="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.password} </span> </div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.cpassword})}> <input type="password" className="form-control input-lg" name="cpassword" id="cpassword" value={this.state.cpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.cpassword} </span> </div></p>
				                                    
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i>Update Details</button>

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
export default  connect(null, {UpdateSchoolProfileDetails}) (MySchoolProfile)
// UpdateTeacherProfileDetails