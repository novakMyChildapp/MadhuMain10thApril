import React from 'react';
import { Link, Redirect } from 'react-router';
class SchoolDashBoard extends React.Component{

		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				password:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false

			}
			// console.log(this.state.email)
		}
componentWillMount (){
		 document.body.className = "green";
		if(this.props.location.state!=null)
		{
			this.setState({email:this.props.location.state.s.email})
			this.setState({name:this.props.location.state.s.name})
			this.setState({password:this.props.location.state.s.password})
			console.log(this.props.location.state.s)

		}
}

	render(){






// ********************************************************************************************************************************************************
		const pageContent=(

				<div>
				    <header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                        	<a href="index.html"><img src="http://139.59.7.53:3001/NOVAK-2.png" alt="Main Logo" className="img-responsive"/></a>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    	{/*<a >{this.state.email} </a>*/}
				                    	<Link to={{pathname:"/schoolUser", state:{s:this.state}}} >
				                    		Home
				                    	</Link>
				                    	<Link to={{pathname:"/schooluser/myschoolprofile", state:{s:this.state}}} >
				                    		My Profile
				                    	</Link>
				                    	<Link to={{pathname:"/", state:{}}} >
				                    		<i className="fa fa-sign-in" aria-hidden="true"></i>Logout
				                    	</Link>
				                    
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>
					{/*<h3>Welcome {this.state.email}/{this.state.name}  </h3> <br/> <br/>*/}
					<div className="Page_heading">
						<div className="container-inner-teacher">
							<h2>Welcome {this.state.email}/{this.state.name}</h2>
						</div>
					</div>

					<div className="outside-contain">
					<div className="container-inner-teacher">
						<div className="cardcontainer">
							<div className="mainteacherCard" >
								<div className="card Boxed card-inverse card-primary mb-6 text-center" style={{width: 50+ 'rem',  maxHeight:500+"px", minHeight:450+"px"}}>
							  		<div className="main_img_div">
							  			<img className="Profile_pic_in_item" style={{marginTop:0+"px"}} src="https://static.pexels.com/photos/7369/startup-photos.jpg" alt="Card"/>
							  			<Link className="View_All" to={{pathname:"/view/teachers", state:{s:this.state}}}>
									    	All Teachers
									    </Link>
							  		</div>
							      	<div className="card-block">
									    <h4 className="card-title">Teachers</h4>
									    {/*<p className="card-text">Click Here to view all teachers</p>*/}
								  	</div>
								</div>
							</div>
							<div className="mainStudentCard">
								<div className="card Boxed card-inverse card-success mb-6 text-center" style={{width: 50+ 'rem', maxHeight:500+"px", minHeight:450+"px"}}>
							  		<div className="main_img_div">
							  			<img className="Profile_pic_in_item" style={{marginTop:0+"px"}} src="https://static.pexels.com/photos/238366/pexels-photo-238366.jpeg" alt="Card"/>
							  			<Link className="View_All" to={{pathname:"/view/students", state:{s: this.state}}}>
									    	All Students
									    </Link>
							  		</div>
							      	<div className="card-block">
									    <h4 className="card-title">Students</h4>
									    {/*<p className="card-text">Click Here to view all teachers</p>*/}
								  	</div>
								</div>
							</div>
						</div>
						<div className="cardcontainer">
							<div className="mainteacherCard" >
								<Link to={{pathname:"/register/teacher", state:{s:this.state}}}>
									<button className="Add-A-Teacher" style={{width:100+"%", height:50+"px"}}>
										Add A Teacher
									</button>
								</Link>
							</div>
							<div className="mainStudentCard" >
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
{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!="" ? pageContent : <Redirect to="/" />}

</div>


			);
	}

}
export default  SchoolDashBoard