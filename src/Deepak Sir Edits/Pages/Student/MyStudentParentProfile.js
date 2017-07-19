// MyStudentParentProfile
import React from 'react';
import classnames from 'classnames'

import {connect}  from 'react-redux';
import {Link, Redirect } from 'react-router';

import {UpdateStudentProfileDetails, FetchMySProfile} from '../../actions/StudentActions'

class MyStudentParentProfile extends React.Component{

		constructor(props){
			super(props)
			this.state={

				semail:'',
				sname:'',
				spassword:'',
				scpassword:'',

				slname:"",
				sclass:"",
				sGaurdianName:"",
				saddress:"",
				sParentsPhonNumber:"",


				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				errors:{},
				OldSPpassword:'',
				successMessage:'',


			}
			// console.log(this.state.email)
		}

		componentWillMount (){
			

		 	document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({semail:this.props.location.state.s.semail})
				this.setState({sname:this.props.location.state.s.sname})
				this.setState({spassword:this.props.location.state.s.spassword})
				this.setState({scpassword:this.props.location.state.s.spassword})
				this.setState({OldSPpassword:this.props.location.state.s.spassword})
				console.log(this.props.location.state.s)
				console.log("---------------------------------------")

				const {semail, spassword} = this.props.location.state.s
				this.props.FetchMySProfile({semail, spassword })
							.then(
								(response)=>{this.setState({done:true}) ;console.log("%%%%%");console.log(response)
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}else{
										debugger
										this.setState({loading:false, done:true, slname:response.theStudentParent.slname, sclass: response.theStudentParent.sclass })
										this.setState({sGaurdianName:response.theStudentParent.sGaurdianName, saddress: response.theStudentParent.saddress,sParentsPhonNumber:response.theStudentParent.sParentsPhonNumber})

										// console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
										console.log(this.state)
									}
								},
								(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
							)




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


		if(this.state.slname === "") errors.slname="Last Name Cant Be Empty"
		if(this.state.sclass === "") errors.sclass="Class Cant Be Empty"
		if(this.state.sGaurdianName === "") errors.sGaurdianName="Parent's/ Gaurdian's Name Cant Be Empty"
		if(this.state.sParentsPhonNumber === "") errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Cant Be Empty"
		if(this.state.saddress === "") errors.saddress="Parent's / Gaurdians's Address Cant Be Empty"

		if(this.state.spassword ==="") errors.spassword="Password Cant Be Empty"
		if(this.state.scpassword ==="") errors.scpassword="Confirm Password Be Empty"
		if(this.state.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
		if(this.state.scpassword !== this.state.spassword) errors.scpassword="Password and Confirm Password Should Match"	

		this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	if(isValid){
		
		console.log("******************    NO ERROR")
		const {semail, spassword, OldSPpassword, scpassword,slname, sclass, sGaurdianName, saddress, sParentsPhonNumber} = this.state
		this.setState({loading: true})
		this.props.UpdateStudentProfileDetails({semail, spassword, OldSPpassword, scpassword, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber}).then(
			(response)=>{this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Updated Profile"})}},
			(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
		)

	}

	}

componentDidMount(){
	// console.log("***********")
	
	console.log(this.state)
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
				                    	<Link to={{pathname:"/studentParents", state:{s:this.state}}}>
				                        	Home
				                    	</Link>
				                    </li>
				                    <li >
				                    	<Link to={{pathname:"/studentParents/MyProfile", state:{s:this.state}}}>
				                        	My Profile
				                    	</Link>
				                    </li>
				                    <li>
				                        <a className="page-scroll">{this.state.semail}</a>
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
				                                    { this.state.shouldRedirect ? <Redirect to={{pathname:"/", state:{StudentParent:"Successfully Updated Profile"}}} /> : "" }

				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.semail})}> <input readOnly type="email" className="form-control input-lg" name="semail" id="semail" value={this.state.semail} onChange={this.handleChange} placeholder="Enter email"  /><span className="errorM">{this.state.errors.semail} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sname})}> <input readOnly type="text" className="form-control input-lg" name="sname" id="sname" value={this.state.sname} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.sname} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.slname})}> <input type="text" className="form-control input-lg" name="slname" id="slname" value={this.state.slname} onChange={this.handleChange} placeholder="Enter Student's Last Name " /><span className="errorM">{this.state.errors.slname} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sGaurdianName})}> <input type="text" className="form-control input-lg" name="sGaurdianName" id="sGaurdianName" value={this.state.sGaurdianName} onChange={this.handleChange} placeholder="Enter Student's Parent/Gaurdian Name " /><span className="errorM">{this.state.errors.sGaurdianName} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sclass})}> <input type="text" className="form-control input-lg" name="sclass" id="sclass" value={this.state.sclass} onChange={this.handleChange} placeholder="Enter Student's Class" /><span className="errorM">{this.state.errors.sclass} </span></div></p>
				                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sParentsPhonNumber})}> <input type="number" className="form-control input-lg" name="sParentsPhonNumber" id="sParentsPhonNumber" value={this.state.sParentsPhonNumber} onChange={this.handleChange} placeholder="Enter Students's parents/Gaurdian Phone Number" /><span className="errorM">{this.state.errors.sParentsPhonNumber} </span></div></p>
				                                    <p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.saddress})}> <textarea type="number" className="form-control input-lg" name="saddress" id="saddress" value={this.state.saddress} onChange={this.handleChange} placeholder="Enter Parents's/Gaurdian's Address"> </textarea><span className="errorM">{this.state.errors.saddress} </span></div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.spassword})}> <input type="password" className="form-control input-lg" name="spassword" id="spassword" value={this.state.spassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.spassword} </span> </div></p>
				                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.scpassword})}> <input type="password" className="form-control input-lg" name="scpassword" id="scpassword" value={this.state.scpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.scpassword} </span> </div></p>
				                                    
				                                    <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Change Password</button>

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

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.semail!=="" && this.props.location.state.s.semail!==null && this.props.location.state.s.semail!==undefined && this.props.location.state.s.spassword && this.props.location.state.s.spassword!=null && this.props.location.state.s.spassword!=undefined && this.props.location.state.s.spassword!="" ? pageContent : <Redirect to="/" />}
			</div>

		);
}


}
export default  connect(null, {UpdateStudentProfileDetails, FetchMySProfile}) (MyStudentParentProfile)
// UpdateTeacherProfileDetails