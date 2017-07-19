import React from 'react';
import { Link, Redirect } from 'react-router';
import {connect}  from 'react-redux';
import {VerifySchool, logMeOut} from '../../actions/SchoolActions'
import SchoolHeader from "./SchoolHeader"   // Navigation bar of Admin

// VerifySchool
class SchoolDashBoard extends React.Component{

		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				schoolToken:'',
				password:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				shouldRedirectError:false,

				sessionExpired:false,
				redirectMeToHomePage:false,

			}
			this.logMeOut = this.logMeOut.bind(this)
			// console.log(this.state.email)
		}
		componentWillMount (){
			// debugger
				 document.body.className = "green";
				if(this.props.location.state!=null)
				{
					this.setState({email:this.props.location.state.s.email})
					this.setState({name:this.props.location.state.s.name})
					this.setState({password:this.props.location.state.s.password})
					this.setState({schoolToken:this.props.location.state.s.schoolToken})
					console.log(this.props.location.state.s)

				}
		}

		componentDidMount(){
			debugger
			const {email, schoolToken} = this.state
			this.props.VerifySchool({email, schoolToken})
			.then(
				(response)=>{
					if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
						this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
					}
					else{
						console.log("AUTHORIZED")
					}
				}
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

	render(){

debugger




// ********************************************************************************************************************************************************
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
					{/*<h3>Welcome {this.state.email}/{this.state.name}  </h3> <br/> <br/>*/}
					<div className="Page_heading">
						<div className="container-inner-teacher">
							{/*<h2>Welcome {this.state.email}/{this.state.name}</h2>*/}
							<h2>Welcome {this.state.name}</h2>
						</div>
					</div>

					<div className="outside-contain">
					<div className="container-inner-teacher">
						<div className="cardcontainer">
							<div className="mainteacherCard" >
								<div className="card Boxed card-inverse card-primary mb-6 text-center" style={{width: 50+ 'rem',  maxHeight:500+"px", minHeight:450+"px"}}>
							  		<div className="main_img_div">
							  			<img className="Profile_pic_in_item" style={{marginTop:0+"px"}} src="/startup-photos.jpg" alt="Card"/>
							  			<Link className="View_All" to={{pathname:"/view/teachers", state:{s:this.state}}}>
									    	All Teachers
									    </Link>
							  		</div>
							      	<div className="card-block">
									    <h4 className="card-title">Teachers</h4>
									    {/*<p className="card-text">Click Here to view all teachers</p>*/}
								  	</div>
								</div>
								<Link to={{pathname:"/register/teacher", state:{s:this.state}}}>
									<button className="Add-A-Teacher" style={{width:100+"%", height:50+"px"}}>
										Add A Teacher
									</button>
								</Link>

							</div>
							<div className="mainStudentCard">
								<div className="card Boxed card-inverse card-success mb-6 text-center" style={{width: 50+ 'rem', maxHeight:500+"px", minHeight:450+"px"}}>
							  		<div className="main_img_div">
							  			<img className="Profile_pic_in_item" style={{marginTop:0+"px"}} src="/pexels-photo-238366.jpeg" alt="Card"/>
							  			<Link className="View_All" to={{pathname:"/view/students", state:{s: this.state}}}>
									    	All Students
									    </Link>
							  		</div>
							      	<div className="card-block">
									    <h4 className="card-title">Students</h4>
									    {/*<p className="card-text">Click Here to view all teachers</p>*/}
								  	</div>
								</div>
									<Link to={{pathname:"/register/student", state:{s:this.state}}}>
										<button className="Add-A-Student" style={{width:100+"%", height:50+"px"}}>
											Add A Student
										</button>
									</Link>
							</div>
						</div>
					</div>
					</div>	

				</div>

			)

		return(

<div >
	{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!=="" && this.props.location.state.s.schoolToken && this.props.location.state.s.schoolToken!==null && this.props.location.state.s.schoolToken!==undefined && this.props.location.state.s.schoolToken!=="" ? pageContent : <Redirect to="/" />}
	{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{school:"Please login Again"}}} /> : "" }
	{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{school:this.state.SuccessMessage}}} />:""}
</div>


			);
	}

}

export default  connect(null, {VerifySchool, logMeOut}) (SchoolDashBoard)