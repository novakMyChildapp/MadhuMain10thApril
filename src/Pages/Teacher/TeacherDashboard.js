import React from 'react';
import {connect} from 'react-redux';
import {FetchTheStudents, logMeOut} from '../../actions/TeacherActions'
import { Link, Redirect } from 'react-router';


import TeacherHeader from "./TeacherHeader"   // Navigation bar of Teacher

class TeacherDashBoard extends React.Component{


		constructor(props){
			super(props)
			this.state={

				temail:'',
				tname:'',
				tpassword:'',

				teacherToken:'',

				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				studentsList:[],

				shouldRedirectError:false,

				sessionExpired:false,
				redirectMeToHomePage:false,


			}
			this.logMeOut = this.logMeOut.bind(this)
			// console.log(this.state.email)
		}

componentWillMount (){
	debugger
	
		 document.body.className = "green";
		if(this.props.location.state!=null)
		{
			this.setState({temail:this.props.location.state.s.temail})
			this.setState({tname:this.props.location.state.s.tname})
			this.setState({tpassword:this.props.location.state.s.tpassword})
			this.setState({teacherToken:this.props.location.state.s.teacherToken})
			console.log(this.props.location.state.s)
			console.log("---------------------------------------")

				const {temail, tpassword, tname, teacherToken} = this.props.location.state.s;

				if(teacherToken===null || teacherToken===undefined){
					debugger
					this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

				}
				else{

				this.props.FetchTheStudents({temail, tpassword, tname, teacherToken })
					.then((response)=>{debugger ; this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
							if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
								this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
							}
							else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
								this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
							}
							else{
								console.log("**********************************");
								console.log(response);
								this.setState({loading:false, done:true, shouldRedirect:true, studentsList: response.studentsArray})
							; console.log("::::::::::"); console.log(this.state)
							}
						},
						(err) => err.response.json().then(({errors})=> {debugger ; console.log("here"); this.setState({errors, loading:false})})
						)
				// console.log("###################1" + JSON.stringify(this.state))
				console.log("###################2 "+ JSON.stringify(this.props.students))
			}

		}
// 		if(this.props.location.state!=null){
// 			const {temail, tpassword, tname} = this.props.location.state.s;

// 			this.props.FetchTheStudents({temail, tpassword, tname })
// // console.log("###################1" + JSON.stringify(this.state))
// console.log("###################2 "+ JSON.stringify(this.props.students))


// 		}

	// debugger




}


componentDidMount(){
	// console.log("***********")
	// console.log(this.props)

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
	render(){
		debugger
		const loademe=(
			<div>
					<div className="page-teacher-dash-wrap">
						<div className="container">
							{this.state.studentsList.map((student, i) => <TableRow key={i} data={student}  s={this.state}/>)}
						</div>
					</div>
			</div>
		)
		const loademe2=(
			<div>
					<div className="page-teacher-dash-wrap">
						Currently There are no students assigned to you.
					</div>
			</div>
		)
		var pageContent=(
			<div>
				<div className="welcome-list-head">
					<h1>Welcome {this.state.tname}</h1>
				</div>
				 <br/> 
				<h3> The List Of Students's Assigned to you. </h3>
				<br/>

				{this.state.studentsList && this.state.studentsList!==null && this.state.studentsList!==undefined ?loademe:loademe2}
				
			</div>

		)


		return(

			<div>
					{/*<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
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
							                    	{<a >{this.state.email} </a>}
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
    				
				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.temail!=="" && this.props.location.state.s.temail!==null && this.props.location.state.s.temail!==undefined && this.props.location.state.s.tpassword && this.props.location.state.s.tpassword!==null && this.props.location.state.s.tpassword!==undefined && this.props.location.state.s.tpassword!=="" && this.props.location.state.s.teacherToken && this.props.location.state.s.teacherToken!==null && this.props.location.state.s.teacherToken!==undefined && this.props.location.state.s.teacherToken!=="" ? pageContent : <Redirect to="/" />}
				{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{teacher:"Please login Again"}}} /> : "" }
				{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{teacher:this.state.SuccessMessage}}} />:""}
			</div>


		);


	}



}

class TableRow extends React.Component {
	// console.log("_-___----____-----_____------_______-_ "+this.props)
   render() {
      return (


				<div className="Boxed col-md-3 col-sm-4 col-xs-12">
					<div className="card">
				  		{this.props.data.studentImage && this.props.data.studentImage!==null ? <img src={this.props.data.studentImage} alt="Student Profile"/>:<img className="card-img-top" src="/Dummy_Image_Man.jpg" alt="Card"/>}
				      	<div className="card-block">
						    <h4 className="card-title">{this.props.data.sname}</h4>
						    <p className="card-text" data-toggle="tooltip" title={this.props.data.semail}>{this.props.data.semail}</p>
						    <Link to={{pathname:"/view/student/"+this.props.data.semail, state:{s:this.props.s}}}>
						    	<button className="btn Btn_common">Student Timeline </button>
						    </Link>

					  	</div>
					</div>
				</div>

      );
   }
}

// function mapStateToProps(state){
// 	console.log(state)
// 	console.log("____________________________")

// 		if(state.schools[0] && state.schools[0]!==undefined &&  state.schools.length>0 && state.schools[0].teacherStudents!==null && state.schools[0].teacherStudents!==undefined){
// 			// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// 			// console.log(state.schools[0].teachers)

// 				return{
// 					students: state.schools[0].teacherStudents,
// 				}
// 		}
// 		else{
// 			// console.log("!!VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV!!!!!!!!!!!!!!!!!!!")
// 			return{
// 				// teachers:[],
// 				students:[]
// 			}
// 		}

// }
export default  connect(null, {FetchTheStudents, logMeOut})  (TeacherDashBoard)