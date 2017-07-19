import React from 'react';

import { FetchStudents, DeleteStudent, logMeOut } from  '../../actions/SchoolActions'
import {connect} from 'react-redux';

import SchoolHeader from "./SchoolHeader"   // Navigation bar of Admin
import { Link,  Redirect } from 'react-router';

class SchoolStudentsList extends React.Component{

		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				schoolToken:'',
				password:'',
				teachers:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				StudentList:[],
				shouldRedirectError:false,


				sessionExpired:false,
				redirectMeToHomePage:false,


			}
			this.delStudent = this.delStudent.bind(this);
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
				this.setState({schoolToken:this.props.location.state.s.schoolToken})
				// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+JSON.stringify(this.props.location.state.s))
			}

		}
		componentDidMount(){
			debugger
			if(this.props.location.state!=null){
							const {email, password, name, schoolToken} = this.props.location.state.s
						// console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
						this.props.FetchStudents({email, password, name, schoolToken })
							.then(
								(response)=>{debugger ;this.setState({done:true}) ;console.log("%%%%%")
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}
									else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
										this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
										}
									else{
										this.setState({loading:false, done:true, shouldRedirect:true, StudentList:response.allstudents})
										console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
										console.log(this.state)
									}
								},
								(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
							)
			}


		}

		delStudent(e){
debugger
			console.log(e.target)
			var confirmation = confirm("Do You Want to Delete The Student")
			if(confirmation ===true){
				console.log("yes")
				const {email, password, schoolToken} = this.props.location.state.s
				var semail = e.target.value
				// // console.log(this)
				this.props.DeleteStudent({email, password, semail, schoolToken})
							.then(
								(response)=>{debugger ; this.setState({done:true}) ;console.log("%%%%%"); console.log(response)
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}
									else if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===false){
										this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
									}
									else{
										this.setState({loading:false, done:true, shouldRedirect:true, successMessage:"Successfully Un Assigned"})
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

	render(){
		// debugger
			// let {teachers} = this.props
			// console.log('eeeeeeeeeeeeeeee teachers '+JSON.stringify( this.props));
			var pageContent=(

						<div>
{/*							    <header>
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
							  <div className="welcome-list-head">  	
							<h1> Welcome To School's Student's List Page</h1>
							</div>
						    <StudentList students={this.state.StudentList} delStud={this.delStudent} state={this.state} />
						</div>




				);
			return(

					<div>

						{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!=="" && this.props.location.state.s.schoolToken && this.props.location.state.s.schoolToken!==null && this.props.location.state.s.schoolToken!==undefined && this.props.location.state.s.schoolToken!=="" ? pageContent : <Redirect to="/" />}
						{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{school:"Please login Again"}}} /> : "" }
						{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{school:this.state.SuccessMessage}}} />:""}
					</div>

				);

	}

}



function StudentList ({students, delStud, state})  {
// debugger
	// console.log("***  5555555555555555555555555555555* * * * * *  ****** *" + students)

	const emptyMessage= (
		<div>
		<br/>
			<h3 >There Are No Students Added Yet In Your School.</h3> <br/>
		</div>
		)
	const SchoolList=(

		<div className="school-inner-wrap">
				<div className="school-list-cap">

					<br/><h1> Students List </h1><br/>
				</div>
						<div className="school-inner-box">
						<div className="container">
						{students.map((students, i)=><StudentRow key={i} data={students} students={students} deleteThisStudent={delStud} states={state} /> )}
						</div>
						</div>
				</div>

		)
	return(
		<div>
			{students.length === 0 ? emptyMessage : SchoolList}
		</div>

	);
}

function StudentRow({ students, deleteThisStudent, states }) {
console.log("$#%#$%#$%#$%#$%#$%#$%#$%$#%$%4")
console.log(students)
      return (

							<div className="Boxed col-md-3 col-sm-6 col-xs-12">
						  		<div className="Boxed_inner">
						  			{students.studentImage && students.studentImage!=null ?<img src={students.studentImage} />:<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>}
							      	<div className="card-block">
									    <h4 className="card-title">{students.sname}</h4>
									    <p className="card-text" data-toggle="tooltip" title={students.semail}>{students.semail}</p>
									    <button className="btn Btn_common" onClick={deleteThisStudent} value={students.semail}> Delete </button>
								 	    <Link to={{pathname:"/view/students/"+students._id+"/profile", state:{s:states}}} >
								 	    	<button className="btn Btn_common">View Profile</button>
								 	    </Link>
								  	</div>
						  		</div>
							</div>
      );

}


export default connect(null, {FetchStudents, DeleteStudent, logMeOut})(SchoolStudentsList);

							