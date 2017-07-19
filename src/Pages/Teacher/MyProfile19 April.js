import React from 'react';
import classnames from 'classnames'

import {connect}  from 'react-redux';
import { Redirect } from 'react-router';

import {UpdateTeacherProfileDetails, FetchMyTProfile, logMeOut} from '../../actions/TeacherActions'

import TeacherHeader from "./TeacherHeader"   // Navigation bar of Teacher


var Dropzone = require('react-dropzone');

class MyTeacherProfile extends React.Component{

		constructor(props){
			super(props)
			this.state={

				temail:'',
				tname:'',
				teacherToken:'',

				tlname:"",
				tqualifications:"",
				tphoneNumber:"",
				tsubject:"",
				taddress:"",
				teacherImage:'',

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
				successMessage:'',

				RelatedImages1:[],

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
				this.setState({temail:this.props.location.state.s.temail})
				this.setState({tname:this.props.location.state.s.tname})
				this.setState({tpassword:this.props.location.state.s.tpassword})
				this.setState({tcpassword:this.props.location.state.s.tpassword})
				this.setState({OldTpassword:this.props.location.state.s.tpassword})
				this.setState({teacherToken:this.props.location.state.s.teacherToken})
				console.log(this.props.location.state.s)
				console.log("---------------------------------------")




					const {temail, tpassword, teacherToken} = this.props.location.state.s


				if(teacherToken===null || teacherToken===undefined){
					debugger
					this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

				}
				else{

					this.props.FetchMyTProfile({temail, tpassword, teacherToken })
								.then(
									(response)=>{ debugger;this.setState({done:true}) ;console.log("%%%%%");console.log(response)
										if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
											this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
										}
										else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
											this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
										}

										else{
											debugger
											this.setState({loading:false, done:true, tlname:response.theTeacher.tlname, tqualifications: response.theTeacher.tqualifications, tphoneNumber:response.theTeacher.tphoneNumber, tsubject: response.theTeacher.tsubject,taddress:response.theTeacher.taddress , teacherImage:response.theTeacher.teacherImage})
											// console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
											console.log(this.state)
										}
									},
									(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
								)

				}
			}
		}

		logMeOut(e){
			debugger
			console.log(e.target.value)
			const {temail, tpassword, teacherToken} =this.state
				this.props.logMeOut({temail, tpassword, teacherToken}).then(
					(response)=>{debugger; this.setState({done:true}) ;
						if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
							{
								this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
							}
						else
							{
								this.setState({loading:false, done:true, sessionExpired:true,redirectMeToHomePage:true, SuccessMessage:response.SuccessMessage})
							}
						},
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
		debugger
		e.preventDefault();

		//validations
		let errors = {};


		if(this.state.tlname === "" || this.state.tlname.trim()=== "") errors.tlname="Name Can't Be Empty" 
			//qualifications can be empty
		if(this.state.tsubject === "" || this.state.tsubject.trim()=== "") errors.tsubject="Subject/ Speciality Can't Be Empty"

		if(this.state.tphoneNumber < 1) errors.tphoneNumber="Phone Number Can't Be Zero"
		// console.log("1*** "+this.state.sParentsPhonNumber < 1)
		if(this.state.tphoneNumber <0) errors.tphoneNumber="Phone Number Can't Have A Negative Value"
		// console.log("2*** "+this.state.sParentsPhonNumber <0)
		// if(parseInt(this.state.tphoneNumber).toString()!==this.state.tphoneNumber) errors.tphoneNumber="Parent's/ Gaurdian's Phone Number Can't Have A Decimal Value"

		if(this.state.tphoneNumber === "") errors.tphoneNumber="Phone Number Can't Be Empty"


		if(this.state.taddress === "" || this.state.taddress.trim()=== "") errors.taddress="Address Can't Be Empty"


		if(this.state.tpassword ==="" || this.state.tpassword.trim() ==="") errors.tpassword="Password Can't Be Empty"
		if(this.state.tcpassword ==="") errors.tcpassword="Confirm Password Can't Be Empty"
		if(this.state.tpassword.length<6) errors.tpassword="Password Length Shouldnt Be Less Than 6"
		if(this.state.tcpassword !== this.state.tpassword) errors.tcpassword="Password and Confirm Password Should Match"	

		this.setState({ errors })
	console.log(errors)

	const isValid = Object.keys(errors).length===0

	if(isValid){
		
		console.log("******************    NO ERROR")
		const {temail, tpassword, OldTpassword, tcpassword,tlname,tqualifications, tsubject, tphoneNumber, taddress, teacherToken, RelatedImages1} = this.state
		this.setState({loading: true})

					var formData = new FormData();
					var data = this.state;
					Object.keys(data).forEach(( key ) => {
						if(key === 'RelatedImages1'){
							console.log(key)
							formData.append(key, data[key][0]);
						}
						else{
							if(key ==='temail' || key==='tpassword' || key==='OldTpassword' || key==='tcpassword' || key==='teacherToken' || key==='tlname' || key==='tqualifications' || key==='tsubject'|| key==='tphoneNumber' || key==='taddress'){
								console.log(key)
								formData.append(key, data[ key ]);
							}
							
						}
					});

					console.info('POST', formData, this.state);
					// console.info('This is expected to fail:');
					 return fetch('/api/teacher/changepassword', {
						method: 'POST',
						body: formData,
					})
					.then(response=>{ debugger ;this.setState({done:true}) ;
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



		// this.props.UpdateTeacherProfileDetails({temail, tpassword, OldTpassword, tcpassword, tlname,tqualifications, tsubject, tphoneNumber, taddress, teacherToken}).then(
		// 	(response)=>{ debugger ;this.setState({done:true}) ;
		// 		if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
		// 		{
		// 			this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
		// 		}
		// 		else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
		// 			this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
		// 		}
		// 		else{
		// 		 	this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Updated Profile"})
		// 		 }
		// 	},
		// 	(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
		// )

	}

	}

componentDidMount(){
				// 	const {temail, tpassword, teacherToken} = this.props.location.state.s
				// if(teacherToken===null || teacherToken===undefined){
				// 	debugger
				// 	this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

				// }
				// else{


				// 	this.props.FetchMyTProfile({temail, tpassword,teacherToken })
				// 				.then(
				// 					(response)=>{ debugger;this.setState({done:true}) ;console.log("%%%%%");console.log(response)
				// 						if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
				// 							this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
				// 						}
				// 						else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!="" && response.success===false){
				// 							this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
				// 						}

				// 						else{
				// 							debugger
				// 							this.setState({loading:false, done:true, tlname:response.theTeacher.tlname, tqualifications: response.theTeacher.tqualifications, tphoneNumber:response.theTeacher.tphoneNumber, tsubject: response.theTeacher.tsubject,taddress:response.theTeacher.taddress })
				// 							// console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
				// 							console.log(this.state)
				// 						}
				// 					},
				// 					(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
				// 				)
				// }
}

    onDrop(acceptedFiles) {
    	console.log(acceptedFiles)
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
				                    <button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
				                </ul>
				            </div>
				           
				        </div>
      
    				</nav>*/}

{/*								<header>
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
							                    	<a className="page-scroll">{this.state.temail}</a>
							                    	<Link to={{pathname:"/schoolTeacher", state:{s:this.state}}}>
							                        	Home
							                    	</Link>
							                    	<Link to={{pathname:"/schoolTeacher/myprofile", state:{s:this.state}}}>
							                        	My Profile
							                    	</Link>
							                    	<button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
							                    
							                    </div>
							                </div>
							            </div>
							        </div>
							    </header>*/}
							    <TeacherHeader states={this.state} logMeOut={this.logMeOut} />
<div className="welcome-list-head">
	<h1> Change Your Details From Here</h1>
</div>

				    <div className="form_detail My_profile">
				        <div className="container">
				            <div className="row">                
				                <div className="col-md-12">
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
				                                    <div className="Uploaded_img col-md-3">
				                                    {this.state.teacherImage && this.state.teacherImage!==null?<img src={this.state.teacherImage} alt=""/> : <img src="/Dummy_Image_Man.jpg" alt="" />}
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
														<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.temail})}> <input readOnly type="email" className="form-control input-lg" name="temail" id="temail" value={this.state.temail} onChange={this.handleChange} placeholder="Enter email"  /><span className="errorM">{this.state.errors.temail} </span></div></p></div>
														<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tname})}> <input readOnly type="text" className="form-control input-lg" name="tname" id="tname" value={this.state.tname} onChange={this.handleChange} placeholder="Enter Teachers's Name " /><span className="errorM">{this.state.errors.tname} </span></div></p></div>
													</div>
													<div className="form_group child_ele">
														<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tlname})}> <input type="text" className="form-control input-lg" name="tlname" id="tlname" value={this.state.tlname} onChange={this.handleChange} placeholder="Enter Teachers's Last Name " /><span className="errorM">{this.state.errors.tlname} </span></div></p></div>
														<div className="half"><p className="fa fa-user"> <div className={classnames('form-group')}> <input type="text" className="form-control input-lg" name="tqualifications" id="tqualifications" value={this.state.tqualifications} onChange={this.handleChange} placeholder="Enter Teachers's Qualification " /></div></p></div>
													</div>
													<div className="form_group child_ele">
														<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tsubject})}> <input type="text" className="form-control input-lg" name="tsubject" id="tsubject" value={this.state.tsubject} onChange={this.handleChange} placeholder="Enter Teachers's Subjects" /><span className="errorM">{this.state.errors.tsubject} </span></div></p></div>
														<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tpassword})}> <input type="password" className="form-control input-lg" name="tpassword" id="tpassword" value={this.state.tpassword} onChange={this.handleChange} placeholder="Enter password" /> <span className="errorM">{this.state.errors.tpassword} </span> </div></p></div>
													</div>
													<div className="form_group child_ele">
														<div className="half"><p className="fa fa-user"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tphoneNumber})}> <input type="number" className="form-control input-lg" name="tphoneNumber" id="tphoneNumber" value={this.state.tphoneNumber} onChange={this.handleChange} placeholder="Enter Teachers's Phone Number" /><span className="errorM">{this.state.errors.tphoneNumber} </span></div></p></div>
														<div className="half"><p className="fa fa-star"> <div className={classnames('form-group', {"has-error":!!this.state.errors.tcpassword})}> <input type="password" className="form-control input-lg" name="tcpassword" id="tcpassword" value={this.state.tcpassword} onChange={this.handleChange} placeholder="Confirm password" /> <span className="errorM">{this.state.errors.tcpassword} </span> </div></p></div>
													</div>
													<div className="col-md-12"><p className="fa fa-user textarea-wrap"> <div className={classnames('form-group', {"has-error":!!this.state.errors.taddress})}> <textarea type="number" className="form-control input-lg" name="taddress" id="taddress" value={this.state.taddress} onChange={this.handleChange} placeholder="Enter Teachers's Address"> </textarea><span className="errorM">{this.state.errors.taddress} </span></div></p></div>
													</div>

							            <div className="upload_footer">
							                <Dropzone accept="image/*" ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
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
				
				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.temail!=="" && this.props.location.state.s.temail!==null && this.props.location.state.s.temail!==undefined && this.props.location.state.s.tpassword && this.props.location.state.s.tpassword!==null && this.props.location.state.s.tpassword!==undefined && this.props.location.state.s.tpassword!=="" && this.props.location.state.s.teacherToken && this.props.location.state.s.teacherToken!==null && this.props.location.state.s.teacherToken!==undefined && this.props.location.state.s.teacherToken!=="" ? pageContent : <Redirect to="/" />}
				{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{teacher:"Please login Again"}}} /> : "" }
				{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{teacher:this.state.SuccessMessage}}} />:""}
			</div>

		);
}


}
export default  connect(null, {UpdateTeacherProfileDetails, FetchMyTProfile, logMeOut}) (MyTeacherProfile)
// UpdateTeacherProfileDetails