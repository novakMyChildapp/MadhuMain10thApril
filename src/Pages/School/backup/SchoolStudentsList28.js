import React from 'react';

import { FetchStudents } from  '../../actions/SchoolActions'
import {connect} from 'react-redux';

import {  Redirect } from 'react-router';

class SchoolStudentsList extends React.Component{

		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				password:'',
				teachers:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				StudentList:[],

			}
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
				// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+JSON.stringify(this.props.location.state.s))
			}




		}
		componentDidMount(){
			if(this.props.location.state!=null){
							const {email, password, name} = this.props.location.state.s
						// console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
						this.props.FetchStudents({email, password, name })
										.then(
								(response)=>{this.setState({done:true}) ;console.log("%%%%%")
									if(response.students.errorMessage && response.students.errorMessage!==undefined && response.students.errorMessage!==null && response.students.errorMessage!==''){
										this.setState({errorState:true, errorMessage: response.students.errorMessage, loading:false})
									}else{
										this.setState({loading:false, done:true, shouldRedirect:true, StudentList:response.students})
										console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
										console.log(this.state)
									}
							},
							(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
							)
			}


		}



	render(){
			// let {teachers} = this.props
			// console.log('eeeeeeeeeeeeeeee teachers '+JSON.stringify( this.props));
			var pageContent=(

						<div>
							    <header>
							    	<div className="header-top">
							        	<div className="container">
							            	<div className="row">
							                	<div className="col-xs-5">
							                    	<div className="logo">
							                        	<a href="index.html"><img src="/images/logo.png" alt="Main Logo" className="img-responsive"/></a>
							                        </div>
							                    </div>
							                    <div className="col-xs-7 text-right register">
							                    	<a >{this.state.email} </a>
							                    	<a className=" button disabled"><i className="fa fa-sign-in" aria-hidden="true"></i>Logout </a>
							                    </div>
							                </div>
							            </div>
							        </div>
							    </header>
							  <div className="welcome-list-head">  	
							<h1> Welcome To schools List Page</h1>
							</div>
						    <StudentList students={this.state.StudentList} />
						</div>




				);
			return(

					<div>


					{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined ? pageContent : <Redirect to="/" />}


					</div>

				);

	}

}



function StudentList ({students})  {

	// console.log("***  5555555555555555555555555555555* * * * * *  ****** *" + students)

	const emptyMessage= (
		<div>
			<h3 className="active">There are no schools yet in website </h3> <br/>
		</div>
		)
	const SchoolList=(

		<div className="school-inner-wrap">
				<div className="school-list-cap">

					<h1> Schools List </h1>
				</div>
						<div className="school-inner-box">
						<div className="container">
						{students.map((students, i)=><StudentRow key={i} data={students} students={students} /> )}
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

function StudentRow({ students }) {

      return (

							<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
						  		<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>

						      	<div className="card-block">
								    <h4 className="card-title">{students.sname}</h4>
								    <p className="card-text">You can contact school at {students.semail}</p>
								    <a href="#" className="btn btn-primary">Click To See Or Update</a>
							  	</div>
							</div>


      );

}


export default connect(null, {FetchStudents})(SchoolStudentsList);

							