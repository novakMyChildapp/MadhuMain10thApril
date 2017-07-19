import React from 'react';

import {Link, Redirect } from 'react-router';
import {FetchTheTeacher, AddStudentToTeacher, DeAssignStudentToTeacher} from '../../actions/SchoolActions'

import {connect} from 'react-redux';
class SchoolTeachersView extends React.Component{

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
				teacherss:[],
				students:[],
				successMessage:""

			}
			this.addStu = this.addStu.bind(this);
			this.deassignme = this.deassignme.bind(this);
			// console.log(this.state.email)
		}
		componentWillMount (){

			// debugger
			 document.body.className = "green";
			if(this.props.location.state!==null && this.props.location.state.s && this.props.location.state!==undefined && this.props.location.state!==null)
			{
				this.setState({email:this.props.location.state.s.email})
				this.setState({name:this.props.location.state.s.name})
				this.setState({password:this.props.location.state.s.password})
				// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+JSON.stringify(this.props.location.state.s))
			}

			// debugger
			if(this.props.location.state!==null && this.props.location.state.s && this.props.location.state!==undefined && this.props.location.state!==null){
				const {email, password, name} = this.props.location.state.s
				const TId = this.props.params.id
				console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
				// debugger
				this.props.FetchTheTeacher({email, password, name, TId })
				.then((response)=>{this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$");
				if(response.teachers.errorMessage && response.teachers.errorMessage!==undefined && response.teachers.errorMessage!==null && response.teachers.errorMessage!==''){
					this.setState({errorState:true, errorMessage: response.teachers.errorMessage, loading:false})
				}else{
					console.log("**********************************");
					console.log(response);
					this.setState({loading:false, done:true, shouldRedirect:true, teacherss: response.teachers.teachercontent, students:response.teachers.studentcontent})
				; console.log("::::::::::"); console.log(this.state)
				}
			},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)
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
			// debugger
			e.preventDefault()
			console.log(e.target.value)
			const {email, password} = this.props.location.state.s
			const semailAndSname = e.target.value
			var t=  semailAndSname.split("--")
			const semail= t[0]
			const sname=t[1]
			const TId = this.props.params.id

			this.props.AddStudentToTeacher({email, password, semail, TId, sname})
							.then(
								(response)=>{this.setState({done:true}) ;console.log("%%%%%"); console.log(response.addStu)
									if(response.addStu.errorMessage && response.addStu.errorMessage!==undefined && response.addStu.errorMessage!==null && response.addStu.errorMessage!==''){
										this.setState({errorState:true, errorMessage: response.addStu.errorMessage, loading:false})
									}else{
										this.setState({loading:false, done:true, shouldRedirect:true, StudentList:response.students, successMessage:"Successfully Added"})
										console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
										console.log(this.state)
										window.location.reload(true)
									}
							},
							(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
							)
			
		}
		deassignme(e){
			console.log(e.target)
			var confirmation = confirm("Do You Want to Deassign This Student from The Teacher")
			if(confirmation ==true){
				console.log("yes")
				const {email, password} = this.props.location.state.s
				var semail = e.target.value
				const TId = this.props.params.id
				// console.log(this)
				this.props.DeAssignStudentToTeacher({email, password, semail, TId})
							.then(
								(response)=>{this.setState({done:true}) ;console.log("%%%%%"); console.log(response)
									if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!==''){
										this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
									}else{
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

	render(){


const pageContent=(

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
				                    	<Link to={{pathname:"/schoolUser", state:{s:this.state}}} >
				                    		Home
				                    	</Link>
				                    	<Link to={{pathname:"/", state:{}}} >
				                    		<i className="fa fa-sign-in" aria-hidden="true"></i>Logout
				                    	</Link>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>
					<div className="teacher-view-wrap">
						<h2> The Teacher </h2>
						<div className="TeacherM">{console.log("+++++++++++++++++++++++++++++++++")}
						{console.log(this.state)}
							{this.state.teacherss.map((teacher, i) => <One key={i} data={teacher} deassign={this.deassignme} allstates={this.state}/>)}
							<div className="added-students-list">
							<h1>List of students that can be added</h1>
						{this.state.errorMessage && this.state.errorMessage!=null &&  this.state.errorMessage!=undefined && this.state.errorMessage!="" && <div id="#warning" className="alert alert-danger">{this.state.errorMessage}</div>}
						{this.state.successMessage && this.state.successMessage!=null &&  this.state.successMessage!=undefined && this.state.successMessage!="" && <div id="#warning" className="alert alert-success">{this.state.successMessage}</div>}
							<div className="studentContainer">
							<div className="container">
								{this.state.students.map((students, i) => <Stu key={i} data={students} updatethis={this.addStu} />)}
							</div>
							</div>
							</div>
						</div>


					</div>
			</div>

	)




		return(

				<div>

{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!="" ? pageContent : <Redirect to="/" />}

				</div>


			);

	}

}

class One extends React.Component {
   render() {


var myStudentlist=(
	<div className="Studentsalreadyassigned">
	<h2>Students already assigned </h2>

	{console.log('this.props.data.studentsArray '+this.props.data.studentsArray)}
	
	{this.props.data.studentsArray && this.props.data.studentsArray!==undefined && this.props.data.studentsArray!==null && this.props.data.studentsArray.map((mystudents,i) => { return (<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
					  		<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>
							<div className="deassignme" data-toggle="tooltip" title="Deassign This Student"><button className="btn" onClick={this.props.deassign} value={mystudents.semail}><i className="fa fa-chain-broken" aria-hidden="true"></i></button></div>
					      	<div className="card-block">
							    <h4 className="card-title">{mystudents.sname}</h4>
							    <p className="card-text">You can contact school at  {mystudents.semail}</p>
							    
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
      				<div className="teacher-view-detail">
      				<div className="container">
						<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
					   		<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>

					       	<div className="card-block">
						 	    <h4 className="card-title"> {this.props.data.tname}</h4>
						 	    <p className="card-text">You can contact school at  {this.props.data.temail}</p>
						 	    <Link to={{pathname:"/view/teachers/"+this.props.data._id+"/profile", state:{s:this.props.allstates}}} >
						 	    	<button className="btn btn-primary">View Profile</button>
						 	    </Link>
							    
						 	</div>
						 </div>
       					</div>
           			</div>
           			<div className="student-with-teacher">
					 		<div className="container">
					 		{this.props.data.studentsArray && this.props.data.studentsArray!==null && this.props.data.studentsArray!==undefined ? myStudentlist:noList}
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
      				
						<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
					  		<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>

					      	<div className="card-block">
					      		
							    <h4 className="card-title"> {this.props.data.sname}</h4>
							    <p className="card-text">You can contact school at  {this.props.data.semail}</p>
							    <button className="btn btn-primary" value={this.props.data.semail} onClick={this.props.updatethis}>Click To Add </button>
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


function mapStateToProps(state){
// 	console.log("___________________________")
// debugger
// console.log(state.schools[0])
// console.log('state.SchoolActions  oooooooooooo'+JSON.stringify(state))

		if(state.schools[0] && state.schools[0]!==undefined &&  state.schools.length>0 && state.schools[0].teachers!==null && state.schools[0].teachers!==undefined){
// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// console.log(state.schools[0].teachers)


				return{
					teachers: state.schools[0].teachers.teachercontent,
					students: state.schools[0].teachers.studentcontent,

				}
		}
		else{
// // console.log("!!VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV!!!!!!!!!!!!!!!!!!!")

			return{
				teachers:[],
				students:[]
			}
		}

}



// SchoolTeachersView.propTypes={
// 	// teachers      : React.PropTypes.array.isRequired,
// 	FetchTheTeacher : React.PropTypes.func.isRequired, 
// }
export default connect(null, {FetchTheTeacher, AddStudentToTeacher, DeAssignStudentToTeacher})(SchoolTeachersView)



// {this.props.students.map((students, i) => <Stu key={i} data={students} updatethis={this.addStu} />)}  // 106th line



