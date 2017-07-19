import React from 'react';
import {Link, Redirect } from 'react-router'; // add link to this place
import {FetchMyTeachers, logMeOut} from '../../actions/StudentActions'
import {connect} from 'react-redux';

import StudentHeader from "./StudentHeader"   // Navigation bar of Admin

class StudentDashboard extends React.Component{
	constructor(props){
			super(props)
			this.state={

				semail:'',
				sname:'',
				spassword:'',
				studentToken:'',

				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				teachersList:[],

				shouldRedirectError:false,

				sessionExpired:false,
				redirectMeToHomePage:false,

			}
			this.logMeOut = this.logMeOut.bind(this)
			// console.log(this.state.email)
		}
		componentWillMount (){ debugger
			document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({semail:this.props.location.state.s.semail})
				this.setState({sname:this.props.location.state.s.sname})
				this.setState({spassword:this.props.location.state.s.spassword})
				this.setState({studentToken:this.props.location.state.s.studentToken})
				console.log(this.props.location.state.s)

				console.log("I AM HERE")
				// const {semail, spassword} = this.props.location.state.s
				// // console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
				// this.props.FetchMyTeachers({semail, spassword})
				if(this.props.location.state!=null)
				{	
						const {semail, spassword, studentToken} = this.props.location.state.s

					if(studentToken===null || studentToken===undefined){
						debugger
						this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

					}
					else{

						this.props.FetchMyTeachers({semail, spassword, studentToken})
								.then((response)=>{;debugger; this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}
									else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
										this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
									}
									else{
										console.log("**********************************");
										console.log(response);
										this.setState({loading:false, done:true, shouldRedirect:true, teachersList: response.oStudent.teacherArray})
									; console.log("::::::::::"); console.log(this.state)
									}
								},
								(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
							)
					}
				}
			}
		}
		componentDidMount (){
			// debugger
			// console.log(this.state)
				// const {semail, spassword, studentToken} = this.props.location.state.s
				// console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
			// if(this.props.location.state!=null)
			// {	


			// 	if(studentToken===null || studentToken===undefined){
			// 		debugger
			// 		this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

			// 	}
			// 	else{
			// 		this.props.FetchMyTeachers({semail, spassword, studentToken})
			// 				.then((response)=>{;debugger; this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
			// 					if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
			// 						this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
			// 					}
			// 					else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!="" && response.success===false){
			// 						this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
			// 					}

			// 					else{
			// 						console.log("**********************************");
			// 						console.log(response);
			// 						this.setState({loading:false, done:true, shouldRedirect:true, teachersList: response.oStudent.teacherArray})
			// 					; console.log("::::::::::"); console.log(this.state)
			// 					}
			// 				},
			// 				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			// 				)
			// 	}

			// }
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


		// componentWillReceiveProps(oldp, newp){
		// 	if(newp && newp!==oldp && newp!==null && newp!==undefined){
		// 		console.log("THis.props")
		// 		console.log(this.props)
		// 		console.log("^^^^^^^^^^^^^^^^^^^^^OLD^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
		// 		console.log(oldp)
		// 		this.setState({teachersList: oldp.teachers})
		// 		console.log("*********************NEW***************************************")
		// 		console.log(newp)
		// 		console.log("***************************************************************")
		// 		this.setState({teachers:this.props.teachers})
		// 		this.setState({students:this.props.students})
		// 		this.forceUpdate();
		// 	}
		// }



	render(){
		debugger
		const list=(
				<div>
   					<div className="student-parent-wrap">
   						<div className="container">
							{this.state.teachersList.map((teachers, i) => <TeachersRow key={i} data={teachers} s={this.state} />)}
	           			</div>
           			</div>
				</div>
			)
		const nolist=(
				<div>
					<h2>"No Teachers Added Yet"</h2>
				</div>
			)
		const pageContent =(
				<div>
{/*					<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
				        <div className="container">
				            <div className="navbar-header page-scroll">
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
{/*				    <header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                    		<Link to={{pathname:"/studentParents", state:{s:this.state}}}>
				                        		<img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/>
				                        	</Link>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    		
											{<a className="page-scroll">{this.state.semail} </a>}
					                    	<Link to={{pathname:"/studentParents", state:{s:this.state}}}>
					                        	Home
					                    	</Link>
					                    	<Link to={{pathname:"/studentParents/completeTimeline", state:{s:this.state}}}>
					                        	Complete Timeline
					                    	</Link>
					                    	<Link to={{pathname:"/studentParents/MyProfile", state:{s:this.state}}}>
					                        	My Profile
					                    	</Link>

			                    		<button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>*/}
				    <StudentHeader states={this.state} logMeOut={this.logMeOut} />
				    <div className="welcome-list-head"><h1>Welcome "{this.state.sname}"</h1></div>
					<br/>
					<h3>List Of Teachers Assigned To You</h3>
					<br/>
					{console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")}
					{console.log(this.state)}
					{this.state.teachersList && this.state.teachersList!==null && this.state.teachersList!==undefined && this.state.teachersList.length>0? list : nolist}

				</div>
			)

		return(

			<div>
			
				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.semail!=="" && this.props.location.state.s.semail!==null && this.props.location.state.s.semail!==undefined && this.props.location.state.s.spassword && this.props.location.state.s.spassword!==null && this.props.location.state.s.spassword!==undefined && this.props.location.state.s.spassword!=="" && this.props.location.state.s.studentToken && this.props.location.state.s.studentToken!=null ? pageContent : <Redirect to={{pathname:"/", state:{s:{errorMessage:this.state.errorMessage}}}} />}
				{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{StudentParent:"Please login Again"}}} /> : "" }
				{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{StudentParent:this.state.SuccessMessage}}} />:""}
			</div>

			);
	}
}


// teachersRow
class TeachersRow extends React.Component {
   render() {
   	return(
   					<Link to={{pathname:"/studentParents/timeline/"+this.props.data.temail, state:{s:this.props.s}}}>
	   					<div className="Boxed col-md-3 col-sm-6 col-xs-12">
		   					<div className="card">
						  		{this.props.data.teacherImage && this.props.data.teacherImage!=null ?<img src={this.props.data.teacherImage} alt="TeacherProfile" />:<img className="card-img-top" src="/Dummy_Image_Man.jpg" alt="Card"/>}
						      	<div className="card-block">
								    <h4 className="card-title"> {this.props.data.tname}</h4>
								    <p className="card-text" data-toggle="tooltip" title={this.props.data.temail}>{this.props.data.temail}</p>
								    
									{/*<button className="btn Btn_common">View TimeLine</button>*/}
								</div>
							</div>
						</div>
					</Link>

    )
   }
}



// function mapStateToProps(state){
// 	console.log("___________________________")
// // debugger
// console.log(state.schools[0])

// // console.log('state.SchoolActions  oooooooooooo'+JSON.stringify(state))

// 		if(state.schools[0] && state.schools[0]!==undefined &&  state.schools.length>0 && state.schools[0].myteachers!==null && state.schools[0].myteachers!==undefined){
// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// // console.log(state.schools[0].teachers)
// console.log(state.schools[0].myteachers)

// 				return{
// 					teachers: state.schools[0].myteachers.oStudent.teacherArray,


// 				}
// 		}
// 		else{
// // console.log("!!VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV!!!!!!!!!!!!!!!!!!!")

// 			return{
// 				teachers:[],
// 			}
// 		}

// }

export default connect(null, {FetchMyTeachers, logMeOut}) (StudentDashboard)

