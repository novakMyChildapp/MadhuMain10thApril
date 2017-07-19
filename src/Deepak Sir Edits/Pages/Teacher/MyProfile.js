import React from 'react';
import classnames from 'classnames'

import {connect}  from 'react-redux';
import {Link, Redirect } from 'react-router';

import {UpdateTeacherProfileDetails, FetchMyTProfile} from '../../actions/TeacherActions'

class MyTeacherProfile extends React.Component{

		constructor(props){
			super(props)
			this.state={

				temail:'',
				tname:'',

				tlname:"",
				tqualifications:"",
				tphoneNumber:"",
				tsubject:"",
				taddress:"",

				tpassword:'',
				tcpassword:'',

				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				studentsList:[],
				errors:{},
				OldTpassword:'',
				successMessage:''

			}
			// console.log(this.state.email)
		}

		componentWillMount (){

		 	document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({temail:this.props.location.state.s.temail})
				this.setState({tname:this.props.location.state.s.tname})
				this.setState({tpassword:this.props.location.state.s.tpassword})
				this.setState({tcpassword:this.props.location.state.s.tpassword})
				this.setState({OldTpassword:this.props.location.state.s.tpassword})
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
		debugger
		e.preventDefault();

		//validations
		let errors = {};


		if(this.state.tlname === "") errors.tlname="Name Cant Be Empty" 
			//qualifications can be empty
		if(this.state.tsubject === "") errors.tsubject="Subject/ Speciality Cant Be Empty"
		if(this.state.tphoneNumber === "") errors.tphoneNumber="Phone Number Cant Be Empty"
		if(this.state.taddress === "") errors.taddress="Address Cant Be Empty"


		if(this.state.tpassword ==="") errors.tpassword="Password Cant Be Empty"
		if(this.state.tcpassword ==="") errors.tcpassword="Confirm Password Be Empty"
		if(this.state.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
		if(this.state.tcpassword !== this.state.tpassword) errors.tcpassword="Password and Confirm Password Should Match"	

		this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	if(isValid){
		
		console.log("******************    NO ERROR")
		const {temail, tpassword, OldTpassword, tcpassword,tlname,tqualifications, tsubject, tphoneNumber, taddress} = this.state
		this.setState({loading: true})
		this.props.UpdateTeacherProfileDetails({temail, tpassword, OldTpassword, tcpassword, tlname,tqualifications, tsubject, tphoneNumber, taddress}).then(
			(response)=>{this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Updated Profile"})}},
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

				const {temail, tpassword} = this.props.location.state.s
				this.props.FetchMyTProfile({temail, tpassword })
							.then(
								(response)=>{this.setState({done:true}) ;console.log("%%%%%");console.log(response)
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}else{
										debugger
										this.setState({loading:false, done:true, tlname:response.theTeacher.tlname, tqualifications: response.theTeacher.tqualifications, tphoneNumber:response.theTeacher.tphoneNumber, tsubject: response.theTeacher.tsubject,taddress:response.theTeacher.taddress })
										// console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
										console.log(this.state)
									}
								},
								(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
							)
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
					<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
				        <div className="container">
				            <div className="navbar-header page-scroll">
				                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
				                    <span className="sr-only">Toggle navigation</span>
				                    <span className="icon-bar"></span>
				                    <span className="icon-bar"></span>
				                    <span className="icon-bar"></span>
				                </button>
				                <a className="navbar-brand page-scroll" href="#page-top">
				                <img src="/images/logo.png" alt="Main Logo" className="img-responsive"/>
				                </a>
				            </div>

				            
				            <div className="collapse navbar-collapse navbar-ex1-collapse">
				                <ul className="nav navbar-nav">
				                    <li >
				                    	<Link to={{pathname:"/schoolTeacher", state:{s:this.state}}}>
				                        	Home
				                    	</Link>
				                    </li>
				                    <li >
				                    	<Link to={{pathname:"/schoolTeacher/myprofile", state:{s:this.state}}}>
				                        	My Profile
				                    	</Link>
				                    </li>
				                    <li>
				                        <a className="page-scroll">{this.state.temail}</a>
				                    </li>
				                </ul>
				            </div>
				           
				        </div>
      
    				</nav>
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
				                                    { this.state.shouldRedirect ? <Redirect to={{pathname:"/", state:{teacher:"Successfully Updated Profile"}}} /> : "" }
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.temail})}> <input readOnly type="email" className="form-control input-lg" name="temail" id="temail" value={this.state.temail} onChange={this.handleChange} placeholder="Enter email"  /><span className="errorM">{this.state.errors.temail} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tname})}> <input readOnly type="text" className="form-control input-lg" name="tname" id="tname" value={this.state.tname} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.tname} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tlname})}> <input type="text" className="form-control input-lg" name="tlname" id="tlname" value={this.state.tlname} onChange={this.handleChange} placeholder="Enter Teachers's Last Name " /><span className="errorM">{this.state.errors.tlname} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group')}> <input type="text" className="form-control input-lg" name="tqualifications" id="tqualifications" value={this.state.tqualifications} onChange={this.handleChange} placeholder="Enter Teachers's Qualification " /></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tsubject})}> <input type="text" className="form-control input-lg" name="tsubject" id="tsubject" value={this.state.tsubject} onChange={this.handleChange} placeholder="Enter Teachers's Subjects" /><span className="errorM">{this.state.errors.tsubject} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tphoneNumber})}> <input type="number" className="form-control input-lg" name="tphoneNumber" id="tphoneNumber" value={this.state.tphoneNumber} onChange={this.handleChange} placeholder="Enter Teachers's Phone Number" /><span className="errorM">{this.state.errors.tphoneNumber} </span></div></p>
				                                    <p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.taddress})}> <textarea type="number" className="form-control input-lg" name="taddress" id="taddress" value={this.state.taddress} onChange={this.handleChange} placeholder="Enter Teachers's Address"> </textarea><span className="errorM">{this.state.errors.taddress} </span></div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tpassword})}> <input type="password" className="form-control input-lg" name="tpassword" id="tpassword" value={this.state.tpassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.tpassword} </span> </div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tcpassword})}> <input type="password" className="form-control input-lg" name="tcpassword" id="tcpassword" value={this.state.tcpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.tcpassword} </span> </div></p>
				                                    
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Change Profile Details</button>

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

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.temail!=="" && this.props.location.state.s.temail!==null && this.props.location.state.s.temail!==undefined && this.props.location.state.s.tpassword && this.props.location.state.s.tpassword!==null && this.props.location.state.s.tpassword!==undefined && this.props.location.state.s.tpassword!=="" ? pageContent : <Redirect to="/" />}
			</div>

		);
}


}
export default  connect(null, {UpdateTeacherProfileDetails, FetchMyTProfile}) (MyTeacherProfile)
// UpdateTeacherProfileDetails