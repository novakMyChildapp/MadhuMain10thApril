import React from 'react';

import { Redirect } from 'react-router';
import {FetchTheTeacher, AddStudentToTeacher} from '../../actions/SchoolActions'

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

			}
			this.addStu = this.addStu.bind(this);
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

		addStu(e){
			e.preventDefault()
			console.log(e.target.value)
			const {email, password} = this.props.location.state.s
			const semail = e.target.value
			const TId = this.props.params.id
			this.props.AddStudentToTeacher({email, password, semail, TId})
		}



	render(){


const pageContent=(

					<div className="teacher-view-wrap">
						<div className="TeacherM">{console.log("+++++++++++++++++++++++++++++++++")}
						{console.log(this.state)}
							{this.state.teacherss.map((teacher, i) => <One key={i} data={teacher} />)}
							<div className="added-students-list">
							<h1>list of students that can be added</h1>
						
							<div className="studentContainer">
							<div className="container">
								{this.state.students.map((students, i) => <Stu key={i} data={students} updatethis={this.addStu} />)}
							</div>
							</div>
							</div>
						</div>


					</div>

	)




		return(

				<div>

					{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined ? pageContent : <Redirect to="/" />}

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

					      	<div className="card-block">
							    <h4 className="card-title"></h4>
							    <p className="card-text">You can contact school at  {mystudents}</p>
							    
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
							    <button className="btn btn-primary" value={this.props.data.semail} onClick={this.props.updatethis}>Click To View Or Update </button>
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
export default connect(null, {FetchTheTeacher, AddStudentToTeacher})(SchoolTeachersView)



// {this.props.students.map((students, i) => <Stu key={i} data={students} updatethis={this.addStu} />)}  // 106th line



