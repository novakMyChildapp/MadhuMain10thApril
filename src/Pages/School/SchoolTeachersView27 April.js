import React from 'react';

import { Redirect } from 'react-router';

import classnames from 'classnames'
import {FetchTheTeacher, AddStudentToTeacher, DeAssignStudentToTeacher, FetchTeacherProfile, TeacherProfileUpdation, DeleteTeacher, logMeOut} from '../../actions/SchoolActions'

import SchoolHeader from "./SchoolHeader"   // Navigation bar of Admin

import {connect} from 'react-redux';
class SchoolTeachersView extends React.Component{

		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				password:'',
				schoolToken:'',
				teachers:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				errorMessageStudent:"",
				shouldRedirect:false,
				teacherss:[],
				students:[],
				successMessage:"",
				shouldRedirectError:false,

				errors:{},

				temail:"",
				tname:"",
				tlname:"",
				tqualifications:"",
				tphoneNumber:"",
				tsubject:"",
				taddress:"",
				tpassword:"",
				tcpassword:"",

				teacherImage:'',

				sessionExpired:false,
				redirectMeToHomePage:false,
			}
			this.addStu = this.addStu.bind(this);
			this.deassignme = this.deassignme.bind(this);
			this.delTeacher = this.delTeacher.bind(this);
			this.logMeOut = this.logMeOut.bind(this)
			// console.log(this.state.email)
		}
		componentWillMount (){

			//debugger
			 document.body.className = "green";
			if(this.props.location.state!==null && this.props.location.state.s && this.props.location.state!==undefined && this.props.location.state!==null)
			{
				this.setState({email:this.props.location.state.s.email})
				this.setState({name:this.props.location.state.s.name})
				this.setState({password:this.props.location.state.s.password})
				this.setState({schoolToken:this.props.location.state.s.schoolToken})
				// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+JSON.stringify(this.props.location.state.s))
			}

			// debugger
			if(this.props.location.state!==null && this.props.location.state.s && this.props.location.state!==undefined && this.props.location.state!==null){
				const {email, password, name, schoolToken} = this.props.location.state.s
				const TId = this.props.params.id
				console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
				// debugger
				this.props.FetchTheTeacher({email, password, name, TId, schoolToken })
				.then((response)=>{ debugger ; this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$");
				if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
					this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
				}
				else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
					this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
				}else{
					console.log("**********************************");
					console.log(response);
					this.setState({loading:false, done:true, teacherss: response.teachercontent, students:response.studentcontent})
				; console.log("::::::::::"); console.log(this.state)
				}
			},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)
			}
		}
		componentDidMount(){
			//debugger
			console.log("dsf")

			const {email, password, schoolToken} = this.state
			const id = this.props.params.id
			this.setState({loading: true})
			this.props.FetchTeacherProfile({email, password, id, schoolToken }).then(
				(response)=>{/* debugger ; */ this.setState({done:true});console.log("%%%%%%%%%%%%%");console.log(response) ;
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
		//debugger
		e.preventDefault();

		//validations
		let errors={}
		if(this.state.temail === "") errors.temail="Email Can't Be Empty"

		if(this.state.tname === "" || this.state.tname.trim() === "") errors.tname="Name Can't Be Empty"

		if(this.state.tlname === "" || this.state.tlname===undefined || this.state.tlname.trim() === "") errors.tlname="Last Name Can't Be Empty" 
			// console.log(this.state.tlname)
			// qualifications can be empty
		if(this.state.tsubject === "" || this.state.tsubject===undefined || this.state.tsubject.trim() === "") errors.tsubject="Subject/ Speciality Can't Be Empty"

		if(this.state.tphoneNumber < 1) errors.tphoneNumber="Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(this.state.tphoneNumber <0) errors.tphoneNumber="Phone Number Can't Have A Negative Value"
		// console.log("2*** "+this.state.sParentsPhonNumber <0)
		// if(parseInt(this.state.tphoneNumber).toString()!==this.state.tphoneNumber) errors.tphoneNumber="Parent's/ Gaurdian's Phone Number Can't Have A Decimal Value"
		if(this.state.tphoneNumber === "" || this.state.tphoneNumber===undefined ) errors.tphoneNumber="Phone Number Can't' Be Empty"
		// if(this.state.tphoneNumber.trim() === "") errors.tphoneNumber="Phone Number Can't' Be Empty"

		if(this.state.taddress === "" || this.state.taddress===undefined || this.state.taddress.trim() === "") errors.taddress="Address Can't Be Empty"

		if(this.state.tpassword ==="" || this.state.tpassword===undefined || this.state.tpassword.trim() ==="") errors.tpassword="Password Can't Be Empty"
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
				else{ this.setState({loading:false, done:true, tlname:response.theTeacher.tlname, tqualifications:response.theTeacher.tqualifications, tsubject: response.theTeacher.tsubject, tphoneNumber:response.theTeacher.tphoneNumber, taddress:response.theTeacher.taddress, tpassword:response.theTeacher.tpassword, tcpassword:response.theTeacher.tpassword, successMessage:response.SuccessMessage})}},
				(err) => err.response.json().then(({errors})=> {console.log("rrrrrrrrrrrrrr"); this.setState({errors, loading:false})})
			)

		}
	}


		delTeacher(e){
debugger
			console.log(e.target)
			var confirmation = confirm("Do You Want to Delete The Teacher")
			if(confirmation ===true){
				console.log("yes")
				const {email, password, schoolToken} = this.props.location.state.s
				// var semail = e.target.value
				const TId = e.target.value
				// console.log(this)
				this.props.DeleteTeacher({email, password, TId, schoolToken})
							.then(
								(response)=>{ debugger;this.setState({done:true}) ;console.log("%%%%%"); console.log(response)
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}
									else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
										this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
									}else{
										this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Deleted"})
										console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
										console.log(this.state)
										window.location.reload(true)
									}
							},
							(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
							)

			}
			else{
				console.log("No")
			}
		}


		// addStu(e){
		// 	e.preventDefault()
		// 	console.log(e.target.value)
		// 	const {email, password} = this.props.location.state.s
		// 	const semail = e.target.value
		// 	const TId = this.props.params.id
		// 	this.props.AddStudentToTeacher({email, password, semail, TId})
		// }

		addStu(e){
			debugger
			e.preventDefault()
			console.log(e.target.value)
			const {email, password, schoolToken} = this.props.location.state.s
			const semailAndSname = e.target.value
			var t=  semailAndSname.split("--")
			const semail= t[0]
			const sname=t[1]
			const TId = this.props.params.id

			this.props.AddStudentToTeacher({email, password, semail, TId, sname, schoolToken})
				.then(
					(response)=>{ debugger ; this.setState({done:true}) ;console.log("%%%%%"); console.log(response)
						if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && (response.success===null || response.success===undefined)){
							this.setState({errorState:true, errorMessageStudent: response.errorMessage, loading:false})
						}
						else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
							this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
						}else{
							debugger;
							this.setState({loading:false, done:true, StudentList:response.students, successMessage:"Successfully Added"})
							console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
							console.log(this.state)
							window.location.reload(true)
						}
				},
				(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
				)
			
		}
		deassignme(e){
			debugger
			console.log(e.target)
			var confirmation = confirm("Do You Want to Un Assign This Student from The Teacher")
			if(confirmation ===true){
				console.log("yes")
				const {email, password, schoolToken} = this.props.location.state.s
				var semail = e.target.value
				if(semail===null || semail===undefined){
					this.setState({errorMessage:"Please Click Properly To Unassign Or Refresh The Page"})
					return
				}
				const TId = this.props.params.id
				// console.log(this)
				this.props.DeAssignStudentToTeacher({email, password, semail, TId, schoolToken})
							.then(
								(response)=>{this.setState({done:true}) ;console.log("%%%%%"); console.log(response)
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}
									else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
										this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
									}
									else{
										this.setState({loading:false, done:true, successMessage:"Successfully Un Assigned"})
										console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
										console.log(this.state)
										window.location.reload(true)
									}
							},
							(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
							)

			}
			else{
				console.log("No")
			}

		}

	render(){


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
					<div className="teacher-view-wrap">
						<h2 className="page_heading"> The Teacher </h2>
						<div className="TeacherM">{console.log("+++++++++++++++++++++++++++++++++")}
						{console.log(this.state)}
							{this.state.teacherss.map((teacher, i) => <One key={i} data={teacher} deassign={this.deassignme} allstates={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}  delTeacher={this.delTeacher} />)}
							<div className="added-students-list">
								{this.state.errorMessageStudent && this.state.errorMessageStudent!==null &&  this.state.errorMessageStudent!==undefined && this.state.errorMessageStudent!=="" && <div id="#warning" className="alert alert-danger">{this.state.errorMessageStudent}</div>}
								{this.state.successMessage && this.state.successMessage!==null &&  this.state.successMessage!==undefined && this.state.successMessage!=="" && <div id="#warning" className="alert alert-success">{this.state.successMessage}</div>}
								<div className="studentContainer">
									<div className="container">
										<div className="Studentsalreadyassigned">
										<h2>List of students that can be added</h2>
										{this.state.students.map((students, i) => <Stu key={i} data={students} updatethis={this.addStu} />)}</div>
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

class One extends React.Component {
   render() {
   	debugger
		const errorBox=(
				<div className="alert alert-danger">
					{this.props.data.errorMessage}
				</div>
			);

var myStudentlist=(
	<div className="Studentsalreadyassigned">
	<h2>Students already assigned </h2>

	{console.log('this.props.data.studentsArray '+this.props.data.studentsArray)}
	
	{this.props.data.studentsArray && this.props.data.studentsArray!==undefined && this.props.data.studentsArray!==null && this.props.data.studentsArray.map((mystudents,i) => { return (<div className="Boxed col-lg-3 col-md-3 col-sm-4 col-xs-12">
					  		<div className="card">
					  			{mystudents.studentImage && mystudents.studentImage!==null ?<img className="card-img-top" src={mystudents.studentImage} alt="Student Profile" />:<img style={{"max-width":70+"%"}} className="card-img-top" src="/Dummy_Image_Man.jpg" alt="Card"/>}
								<div className="deassignme" data-toggle="tooltip" title="Un Assign This Student"><button className="btn" onClick={this.props.deassign} value={mystudents.semail}>Un Assign</button></div>
						      	<div className="card-block">
								    <h4 className="card-title">{mystudents.sname}</h4>
								    <p className="card-text" data-toggle="tooltip" title={mystudents.semail}>{mystudents.semail}</p>
								    
								</div>
					  		</div>
					  		
						</div>) } )}

	</div>
	
	)
var noList=(

<div className="Studentsalreadyassigned">
	<h2>No Students assigned yet</h2>
</div>



	)


      return (
      			<div className="teacher-student-view">
      				<div className="container teacher-view-detail">
	      				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
						   		{this.props.data.teacherImage && this.props.data.teacherImage!=null ? <img src={this.props.data.teacherImage} alt="Teacher Profile" />:<img style={{width:50+"%"}} className="card-img-top" src="/Dummy_Image_Man.jpg" alt="Card"/>}

						       	<div className="card-block">
							 	    <h4 className="card-title"> {this.props.data.tname}</h4>
							 	    <p className="card-text" data-toggle="tooltip" title={this.props.data.temail}>{this.props.data.temail}</p>
							 	    <button className="btn delete" onClick={this.props.delTeacher} value={this.props.allstates.temail}><i className="fa fa-times" aria-hidden="true"></i> Delete</button>
							 	    {/*<Link to={{pathname:"/view/teachers/"+this.props.data._id+"/profile", state:{s:this.props.allstates}}} >
							 	    							 	    	<button className="btn btn-primary">View Profile</button>
							 	    							 	    </Link> */}
								    
							 	</div>
							 </div>
	       				</div>
	       							<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 Update_teacher">
										<div className="Form_tab">
											<ul className="nav nav-tabs">
												<li className="active"><a data-toggle="tab" href="#school">Update Teacher</a></li>
											</ul>

											<div className="tab-content">
												<div  className="tab-pane fade in active">
													<form onSubmit={this.props.handleSubmit}>

														{this.props.allstates.successMessage && this.props.allstates.successMessage!==undefined && this.props.allstates.successMessage!=="" ?<div className="slert alert-success">{this.props.allstates.successMessage}</div>:''}
														<div className={classnames("form-horizontal","center-block",{loader: this.props.allstates.loading})}> </div>
														{this.props.allstates.errorState===true && this.props.allstates.errorMessage ? errorBox : ""}
														{ this.props.allstates.shouldRedirect ? <Redirect to={{pathname:"/schoolUser",state:{s:this.props.allstates}}} /> : "" }
														
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.temail})}> <input readOnly type="email" className="form-control input-lg" name="temail" id="temail" value={this.props.data.temail} onChange={this.props.handleChange} placeholder="Enter email" /><span className="errorM">{this.props.allstates.errors.temail} </span></div></p></div>


															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.tname})}> <input readOnly type="text" className="form-control input-lg" name="tname" id="tname" value={this.props.allstates.tname} onChange={this.props.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.props.allstates.errors.tname} </span></div></p></div>
														</div>
														
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.tlname})}> <input type="text" className="form-control input-lg" name="tlname" id="tlname" value={this.props.allstates.tlname} onChange={this.props.handleChange} placeholder="Enter Teachers's Last Name " /><span className="errorM">{this.props.allstates.errors.tlname} </span></div></p></div>


															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group')}> <input type="text" className="form-control input-lg" name="tqualifications" id="tqualifications" value={this.props.allstates.tqualifications} onChange={this.props.handleChange} placeholder="Enter Teachers's Qualification " /></div></p></div>
														</div>	
															
														<div className="form_group child_ele">	
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.tsubject})}> <input type="text" className="form-control input-lg" name="tsubject" id="tsubject" value={this.props.allstates.tsubject} onChange={this.props.handleChange} placeholder="Enter Teachers's Subjects" /><span className="errorM">{this.props.allstates.errors.tsubject} </span></div></p></div>


															
															<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.tpassword})}> <input type="password" className="form-control input-lg" name="tpassword" id="tpassword" value={this.props.allstates.tpassword} onChange={this.props.handleChange} placeholder="Enter password" /> <span className="errorM">{this.props.allstates.errors.tpassword} </span> </div></p></div>

														</div>
														<div className="form_group child_ele">
															<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.tphoneNumber})}> <input type="number" className="form-control input-lg" name="tphoneNumber" id="tphoneNumber" value={this.props.allstates.tphoneNumber} onChange={this.props.handleChange} placeholder="Enter Teachers's Phone Number" /><span className="errorM">{this.props.allstates.errors.tphoneNumber} </span></div></p></div>
															<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.cpassword})}> <input type="password" className="form-control input-lg" name="tcpassword" id="tcpassword" value={this.props.allstates.tcpassword} onChange={this.props.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.props.allstates.errors.tcpassword} </span> </div></p></div>
														</div>
														<div className="form_group address">
															<div className="full-form"><p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.props.allstates.errors.taddress})}> <textarea type="number" className="form-control input-lg" name="taddress" id="taddress" value={this.props.allstates.taddress} onChange={this.props.handleChange} placeholder="Enter Teachers's Address"> </textarea><span className="errorM">{this.props.allstates.errors.taddress} </span></div></p></div>
														</div>
														<button className="Update"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update</button>
													</form>
												</div>
											</div>			
										</div>
																		
									</div>	
           			</div>
           			<div className="student-with-teacher">
					 		<div className="container">
					 		{this.props.data.studentsArray && this.props.data.studentsArray!==null && this.props.data.studentsArray!==undefined && this.props.data.studentsArray.length>0 ? myStudentlist:noList}
        			</div>
        			</div>


        		</div>

      );
   }
}
class Stu extends React.Component {



   render() {
// debugger
      return (
      				
						<div className="Boxed col-lg-3 col-md-3 col-sm-4 col-xs-12">
					  		<div className="card">
					  		{this.props.data.studentImage && this.props.data.studentImage!=null? <img className="card-img-top" src={this.props.data.studentImage} alt="Student Profile" />:<img style={{"max-width":70+"%"}} className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>}

					      	<div className="card-block">
					      		
							    <h4 className="card-title"> {this.props.data.sname} <span data-toggle="tooltip" title="Student Class">({this.props.data.sclass})</span></h4>
							    <p className="card-text" data-toggle="tooltip" title={this.props.data.semail}>{this.props.data.semail}</p>
							    <button className="btn btn-primary" value={this.props.data.semail+"--"+this.props.data.sname} onClick={this.props.updatethis}>Click To Add </button>
						  	</div>
						  	</div>
						</div>
           			


      );
   }
}
// class addedStudents extends React.Component {
//    render() {
//    	let {data} = this.props
// 	console.log('data '+data)
// // debugger
//       return (
// <div>
// 	hhhhhhhhhhhhhhhhhhhh

// </div>
//       	);
// 	}

// }


// function mapStateToProps(state){
// // 	console.log("___________________________")
// // debugger
// // console.log(state.schools[0])
// // console.log('state.SchoolActions  oooooooooooo'+JSON.stringify(state))

// 		if(state.schools[0] && state.schools[0]!==undefined &&  state.schools.length>0 && state.schools[0].teachers!==null && state.schools[0].teachers!==undefined){
// // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// // console.log(state.schools[0].teachers)


// 				return{
// 					teachers: state.schools[0].teachers.teachercontent,
// 					students: state.schools[0].teachers.studentcontent,

// 				}
// 		}
// 		else{
// // // console.log("!!VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV!!!!!!!!!!!!!!!!!!!")

// 			return{
// 				teachers:[],
// 				students:[]
// 			}
// 		}

// }



// SchoolTeachersView.propTypes={
// 	// teachers      : React.PropTypes.array.isRequired,
// 	FetchTheTeacher : React.PropTypes.func.isRequired, 
// }
export default connect(null, {FetchTheTeacher, AddStudentToTeacher, DeAssignStudentToTeacher, FetchTeacherProfile, TeacherProfileUpdation, DeleteTeacher, logMeOut})(SchoolTeachersView)



// {this.props.students.map((students, i) => <Stu key={i} data={students} updatethis={this.addStu} />)}  // 106th line



