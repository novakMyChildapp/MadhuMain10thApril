// MyStudentParentProfile
import React from 'react';
import classnames from 'classnames'

import {connect}  from 'react-redux';
import {Link, Redirect } from 'react-router';

import {UpdateStudentProfileDetails, FetchMySProfile, logMeOut} from '../../actions/StudentActions'

import StudentHeader from "./StudentHeader"   // Navigation bar of Admin

var Dropzone = require('react-dropzone');
class MyStudentParentProfile extends React.Component{

		constructor(props){
			super(props)
			this.state={

				semail:'',
				sname:'',
				spassword:'',
				scpassword:'',
				studentToken:'',

				RelatedImages1:[],

				slname:"",
				sclass:"",
				sGaurdianName:"",
				saddress:"",
				sParentsPhonNumber:"",

				studentImage:'',


				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				errors:{},
				OldSPpassword:'',
				successMessage:'',

				shouldRedirectError:false,

				sessionExpired:false,
				redirectMeToHomePage:false,

			}
			this.onDrop = this.onDrop.bind(this);
			this.logMeOut = this.logMeOut.bind(this)
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
				this.setState({studentToken:this.props.location.state.s.studentToken})
				
				console.log(this.props.location.state.s)
				console.log("---------------------------------------")

				const {semail, spassword, studentToken} = this.props.location.state.s

				if(studentToken===null || studentToken===undefined){
					debugger
					this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

				}
				else{

					this.props.FetchMySProfile({semail, spassword, studentToken })
								.then(
									(response)=>{this.setState({done:true}) ;console.log("%%%%%");console.log(response)
										if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
											this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
										}
									else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
										this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
									}
										else{
											debugger
											this.setState({loading:false, done:true, slname:response.theStudentParent.slname, sclass: response.theStudentParent.sclass })
											this.setState({sGaurdianName:response.theStudentParent.sGaurdianName, saddress: response.theStudentParent.saddress,sParentsPhonNumber:response.theStudentParent.sParentsPhonNumber, studentImage: response.theStudentParent.studentImage})

											// console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
											console.log(this.state)
										}
									},
									(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
								)
				}
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
debugger
		//validations
		let errors = {};


		if(this.state.slname === "") errors.slname="Last Name Can't Be Empty"
		if(this.state.sclass === "") errors.sclass="Class Can't Be Empty"

		if(this.state.sclass < 1) errors.sclass="Class Can't Be Zero"
		if(this.state.sclass <0) errors.sclass="Class Can't Have A Negative Value"
		if(parseInt(this.state.sclass).toString()!==this.state.sclass) errors.sclass="Class Can't Have A Decimal Value"

		if(this.state.sGaurdianName === "") errors.sGaurdianName="Parent's/ Gaurdian's Name Can't Be Empty"
		if(this.state.sParentsPhonNumber === "") errors.sParentsPhonNumber="Parent's/ Gaurdian's Phone Number Can't Be Empty"
		if(this.state.saddress === "") errors.saddress="Parent's / Gaurdians's Address Can't Be Empty"

		if(this.state.spassword ==="") errors.spassword="Password Can't Be Empty"
		if(this.state.scpassword ==="") errors.scpassword="Confirm Password Can't Be Empty"
		if(this.state.spassword.length<6) errors.spassword="Password Length Shouldnt Be Less Than 6"
		if(this.state.scpassword !== this.state.spassword) errors.scpassword="Password and Confirm Password Should Match"	

		this.setState({ errors })
		console.log(errors)

		const isValid = Object.keys(errors).length===0

		if(isValid){
			
			console.log("******************    NO ERROR")
			const {semail, spassword, OldSPpassword, scpassword,slname, sclass, sGaurdianName, saddress, sParentsPhonNumber, studentToken, RelatedImages1} = this.state
			this.setState({loading: true})


					var formData = new FormData();
					var data = this.state;
					Object.keys(data).forEach(( key ) => {
						if(key === 'RelatedImages1'){
							console.log(key)
							formData.append(key, data[key][0]);
						}
						else{
							if(key ==='semail' || key==='spassword' || key==='OldSPpassword' || key==='scpassword' || key==='sclass' || key==='sGaurdianName' || key==='saddress' || key==='sParentsPhonNumber'|| key==='studentToken' || key==='slname'){
								console.log(key)
								formData.append(key, data[ key ]);
							}
							
						}
					});

					console.info('POST', formData, this.state);
					// console.info('This is expected to fail:');
					 return fetch('/api/student/changePassword', {
						method: 'POST',
						body: formData,
					})
					 .then
	 					(response=>{ debugger; this.setState({done:true}) ;
							if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
								{
									this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
								}
								else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
									this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
								}
								else{
									this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Updated Profile"})
								}
							})
	 					.catch(err => console.error(err));
					 	









			// this.props.UpdateStudentProfileDetails({semail, spassword, OldSPpassword, scpassword, slname, sclass, sGaurdianName, saddress, sParentsPhonNumber, studentToken}).then(
			// 	(response)=>{this.setState({done:true}) ;
			// 		if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
			// 			{
			// 				this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
			// 			}
			// 			else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
			// 				this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
			// 			}
			// 			else{
			// 				this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Updated Profile"})
			// 			}
			// 		},
			// 	(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			// )

		}

	}
	logMeOut(e){
		debugger
		console.log(e.target.value)
		const {semail, spassword, studentToken} =this.state
			this.props.logMeOut({semail, spassword, studentToken}).then(
				(response)=>{debugger; this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
					{this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}
				else{ this.setState({loading:false, done:true, sessionExpired:true,redirectMeToHomePage:true, SuccessMessage:response.SuccessMessage})}},

				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)

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
    onDrop(acceptedFiles) {
    	console.log(acceptedFiles)
      this.setState({
        RelatedImages1: acceptedFiles
      });
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
{/*					<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
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
				                    	<Link to={{pathname:"/studentParents/completeTimeline", state:{s:this.state}}}>
				                        	Complete Timeline
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
				                    <button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
				                </ul>
				            </div>
				           
				        </div>
    				</nav>*/}
<StudentHeader states={this.state} logMeOut={this.logMeOut} />
<div className="welcome-list-head"><h1> Change Your Details From Here</h1></div>

				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                
				                <div className="col-md-12 studentParents_profile">
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
				                                    <div className="profile_img_left_st_pr col-md-3">
				                                    	{this.state.studentImage && this.state.studentImage!==null ? <img src={this.state.studentImage} alt="Student Profile" />: <img src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="No Profile Image" />}
				                                    	<div className="timeline_img_preview">
											            	{this.state.RelatedImages1.length > 0 ?
										            		<div className="img_preview_main">
										            			{this.state.RelatedImages1.map((file,id) => <div className='img_preview' key={id}>
										            			<img src={file.preview} alt="Preview Not Available" /*width={100}*//>
										            			{/*<div>{file.name + ' : ' + file.size + ' bytes.'}</div>*/}
										            			</div> )}
										            		</div> : null}
												        </div>
				                                    </div>
				                                    <div className="col-md-9">
				                                    	<div className="form_group child_ele">
					                                    	<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.semail})}> <input readOnly type="email" className="form-control input-lg" name="semail" id="semail" value={this.state.semail} onChange={this.handleChange} placeholder="Enter email"  /><span className="errorM">{this.state.errors.semail} </span></div></p>
						                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sname})}> <input readOnly type="text" className="form-control input-lg" name="sname" id="sname" value={this.state.sname} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.sname} </span></div></p>
					                                    </div>
				                                    	<div className="form_group child_ele">
					                                    	<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.slname})}> <input type="text" className="form-control input-lg" name="slname" id="slname" value={this.state.slname} onChange={this.handleChange} placeholder="Enter Student's Last Name " /><span className="errorM">{this.state.errors.slname} </span></div></p>
						                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sGaurdianName})}> <input type="text" className="form-control input-lg" name="sGaurdianName" id="sGaurdianName" value={this.state.sGaurdianName} onChange={this.handleChange} placeholder="Enter Student's Parent/Gaurdian Name " /><span className="errorM">{this.state.errors.sGaurdianName} </span></div></p>
					                                    </div>
				                                    	<div className="form_group child_ele">
					                                    	<p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sclass})}> <input type="text" className="form-control input-lg" name="sclass" id="sclass" value={this.state.sclass} onChange={this.handleChange} placeholder="Enter Student's Class" /><span className="errorM">{this.state.errors.sclass} </span></div></p>
						                                    <p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.sParentsPhonNumber})}> <input type="number" className="form-control input-lg" name="sParentsPhonNumber" id="sParentsPhonNumber" value={this.state.sParentsPhonNumber} onChange={this.handleChange} placeholder="Enter Students's parents/Gaurdian Phone Number" /><span className="errorM">{this.state.errors.sParentsPhonNumber} </span></div></p>
					                                    </div>
				                                    	<div className="form_group child_ele">
					                                    	<p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.spassword})}> <input type="password" className="form-control input-lg" name="spassword" id="spassword" value={this.state.spassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.spassword} </span> </div></p>
						                                    <p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.scpassword})}> <input type="password" className="form-control input-lg" name="scpassword" id="scpassword" value={this.state.scpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.scpassword} </span> </div></p>
					                                    </div>
				                                    	<div className="col-md-12">
				                                    		<p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.saddress})}> <textarea type="number" className="form-control input-lg" name="saddress" id="saddress" value={this.state.saddress} onChange={this.handleChange} placeholder="Enter Parents's/Gaurdian's Address"> </textarea><span className="errorM">{this.state.errors.saddress} </span></div></p>
				                                    	</div>
					                                    
										            </div>
										            <div className="upload_footer">
										                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
										                	<i className="fa fa-camera"></i>
										                    {/*<div>Try dropping some files here, or click to select files to upload.</div>*/}
										                </Dropzone>
											            
														{/*<button id="submit" type="submit"> Send! </button>*/}
														<button className="btn Btn_common" style={{'padding-top': 15+"px", 'padding-bottom': 15+"px"}}><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Change Profile Details</button>
											        </div>
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

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.semail!=="" && this.props.location.state.s.semail!==null && this.props.location.state.s.semail!==undefined && this.props.location.state.s.spassword && this.props.location.state.s.spassword!==null && this.props.location.state.s.spassword!==undefined && this.props.location.state.s.spassword!=="" && this.props.location.state.s.studentToken && this.props.location.state.s.studentToken!==null ? pageContent : <Redirect to="/" />}
				{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{StudentParent:"Please login Again"}}} /> : "" }
				{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{StudentParent:this.state.SuccessMessage}}} />:""}
			</div>

		);
}


}
export default  connect(null, {UpdateStudentProfileDetails, FetchMySProfile, logMeOut}) (MyStudentParentProfile)
// UpdateTeacherProfileDetails
				                                    