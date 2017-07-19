// MySchoolProfile
import React from 'react';
import classnames from 'classnames'

import {connect}  from 'react-redux';
import { Redirect } from 'react-router';

import SchoolHeader from "./SchoolHeader"   // Navigation bar of Admin

import {UpdateSchoolProfileDetails, logMeOut, mySchoolProfilePic} from '../../actions/SchoolActions'

var Dropzone = require('react-dropzone');
class MySchoolProfile extends React.Component{

		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				Profileimage:'',

				password:'',

				schoolToken:'',
				cpassword:'',


				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				shouldRedirectError:false,
				studentsList:[],
				errors:{},
				OldPassword:'',
				successMessage:'',

				RelatedImages1:[],

				sessionExpired:false,
				redirectMeToHomePage:false,

			}
			this.onDrop = this.onDrop.bind(this);
			this.logMeOut = this.logMeOut.bind(this)
			// console.log(this.state.email)
		}

		componentWillMount (){
			debugger

		 	document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({email:this.props.location.state.s.email})
				this.setState({name:this.props.location.state.s.name})
				this.setState({password:this.props.location.state.s.password})
				this.setState({schoolToken: this.props.location.state.s.schoolToken})
				this.setState({cpassword:this.props.location.state.s.password})
				this.setState({OldPassword:this.props.location.state.s.password})
				console.log(this.props.location.state.s)
				console.log("---------------------------------------")

				const {email, password, schoolToken} = this.props.location.state.s
				this.props.mySchoolProfilePic({email, password, schoolToken })
				.then(
						(response)=>{debugger;
							if(response.errorMessage && response.errorMessage!=null){
								this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
							}
							else{
								if(response.oSchool.schoolImage && response.oSchool.schoolImage!=null && response.oSchool.schoolImage.length>0)
								{
									this.setState({Profileimage:response.oSchool.schoolImage})
								}
								else{
									this.setState({Profileimage:"https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg"})
								}
							}
						},
						(err)=>{ console.log(err)}

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
		debugger
		e.preventDefault();

		//validations
		let errors = {};

		if(this.state.password ==="") errors.password="Password Can't Be Empty"
		if(this.state.cpassword ==="") errors.cpassword="Confirm Password Cant't Be Empty"
		if(this.state.password.length<6) errors.password="Password Length Shouldnt Be Less Than 6"
		if(this.state.cpassword !== this.state.password) errors.cpassword="Password and Confirm Password Should Match"	

		this.setState({ errors })
		console.log(errors)

		const isValid = Object.keys(errors).length===0

		if(isValid){

			console.log("******************    NO ERROR")
			const {email, password, OldPassword, cpassword, schoolToken, RelatedImages1} = this.state
			this.setState({loading: true})


					var formData = new FormData();
					var data = this.state;
					Object.keys(data).forEach(( key ) => {
						if(key === 'RelatedImages1'){
							console.log(key)
							formData.append(key, data[key][0]);
						}
						else{
							if(key ==='email' || key==='password' || key==='OldPassword' || key==='cpassword' || key==='schoolToken'){
								console.log(key)
								formData.append(key, data[ key ]);
							}
							
						}
					});

					console.info('POST', formData, this.state);
					// console.info('This is expected to fail:');
					 return fetch('/api/schools/changepassword', {
						method: 'POST',
						body: formData,
					})
					.then(response => { debugger ;this.setState({done:true}) ;
					 	if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
					 		{
					 			this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
					 		}
					 		else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false)
					 				{
					 					this.setState({loading:false, done:true, shouldRedirectError:true, errorMessage:"Please Login Again"})
					 				}
					 				else
					 					{
					 						console.log(response.errorMessage===undefined); console.log(response.oSchool===null); console.log(response.students=== null); console.log(response.students===undefined);   this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Changed The Details"})
					 					}
					 			})
					.catch(err => console.error(err));






			// console.log("******************    NO ERROR")
			// const {email, password, OldPassword, cpassword, schoolToken} = this.state
			// this.setState({loading: true})
			// this.props.UpdateSchoolProfileDetails({email, password, OldPassword, cpassword, schoolToken}).then(
			// 	(response)=>{ debugger;this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})} else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){this.setState({loading:false, done:true, shouldRedirectError:true, errorMessage:"Please Login Again"})}  else{ console.log(response.errorMessage===undefined); console.log(response.oSchool===null); console.log(response.students=== null); console.log(response.students===undefined);   this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Changed The Password"})}},
			// 	(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			// )

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
// debugger



}
    onDrop(acceptedFiles) {
      this.setState({
        RelatedImages1: acceptedFiles
      });
    }

render(){
	debugger
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
				    <div className="form_detail">
				        <div className="container">
				            <div className="row">                
				                <div className="My_profile_details">
				                    <h2>Change Your Details and Profile Picture From Here</h2>
				                    <br/>
				                    <div className="Form_tab">
				                        <ul className="nav nav-tabs">
				                            <li className="active"><a data-toggle="tab" href="#school">Change My Details</a></li>
				                        </ul>
				                        <div className="tab-content">
				                            <div  className="tab-pane fade in active">
				                                <form onSubmit={this.handleSubmit.bind(this)}>
													<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
				                                	{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
													{this.state.successMessage && this.state.successMessage!==null && this.state.successMessage!==undefined && this.state.successMessage!==""? successM:""}
				                                    { this.state.shouldRedirect ? <Redirect to={{pathname:"/", state:{school:"Successfully Updated Password"}}} /> : "" }
				                                    { this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{school:"Please login Again"}}} /> : "" }
				                                    <div className="Uploaded_img">{this.state.Profileimage  && this.state.Profileimage !==null ? <img id="schoolCurrentProfile" src={this.state.Profileimage} alt="Profile Set" />: <img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>}</div>
				                                    <div id="schoolTimeline_img_preview" className="timeline_img_preview" style={{"display":"none"}}>
										            	{this.state.RelatedImages1.length > 0 ?
									            		<div className="img_preview_main">
									            			{this.state.RelatedImages1.map((file,id) => <div className='img_preview' key={id}>
									            			<img src={file.preview} alt="Preview Not Available" /*width={100}*//>
									            			{/*<div>{file.name + ' : ' + file.size + ' bytes.'}</div>*/}
									            			</div> )}
									            		</div> : null}
									            		{this.state.RelatedImages1 && this.state.RelatedImages1!==null && this.state.RelatedImages1!=="" && this.state.RelatedImages1.length > 0 ? document.getElementById("schoolTimeline_img_preview").removeAttribute('style'):""}
												        {this.state.RelatedImages1 && this.state.RelatedImages1!==null && this.state.RelatedImages1!=="" && this.state.RelatedImages1.length > 0 ? document.getElementById("schoolCurrentProfile").style.display='none':""}
											        </div>
											        
				                                    <div className="My_pro_form">
				                                    <div className="col-md-6"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.email})}> <input readOnly type="email" className="form-control input-lg" name="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email"  /><span className="errorM">{this.state.errors.email} </span></div></p></div>
				                                    <div className="col-md-6"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.name})}> <input readOnly type="text" className="form-control input-lg" name="name" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.name} </span></div></p></div>
				                                    <div className="col-md-6"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.password})}> <input type="password" className="form-control input-lg" name="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.password} </span> </div></p></div>
				                                    <div className="col-md-6"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.cpassword})}> <input type="password" className="form-control input-lg" name="cpassword" id="cpassword" value={this.state.cpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.cpassword} </span> </div></p></div>
				  	                               	<div className="col-md-12">
				  	                               	<div className="upload_footer">
										                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
										                	<i className="fa fa-camera sfsdfs"></i>
										                    {/*<div>Try dropping some files here, or click to select files to upload.</div>*/}
										                </Dropzone>
											            
														{/*<button id="submit" type="submit"> Send! </button>*/}
														<button><i className="fa fa-paper-plane-o" aria-hidden="true"></i>Update Details</button>
											        </div>
											        </div>
				                                    </div>
								        

				                                   {/* <button><i className="fa fa-paper-plane-o" aria-hidden="true"></i>Update Details</button>
*/}
				                                </form>
											</div>
				                        </div>
				                    </div>
				                </div>
{/*				                <div className="col-md-5">
									<form id="contact" onSubmit={this.handleSubmit.bind(this)}>
							            <div className="upload_footer">
							                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
							                	<i className="fa fa-camera"></i>
							                    
							                </Dropzone>
								            
											<button id="submit" type="submit"> Send! </button>
								        </div>
									</form>
				                </div>*/}
				                
				            </div>
				        </div>
				     </div>

				</div>


		)


	return(
			<div>

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!=="" && this.props.location.state.s.schoolToken && this.props.location.state.s.schoolToken!==null && this.props.location.state.s.schoolToken!==undefined && this.props.location.state.s.schoolToken!=="" ? pageContent : <Redirect to="/" />}
				{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{school:this.state.SuccessMessage}}} />:""}
			</div>

		);
}


}
export default  connect(null, {UpdateSchoolProfileDetails, logMeOut, mySchoolProfilePic}) (MySchoolProfile)
// UpdateTeacherProfileDetails