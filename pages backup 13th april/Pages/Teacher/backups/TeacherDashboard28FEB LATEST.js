import React from 'react';
import {connect} from 'react-redux';
import {FetchTheStudents} from '../../actions/TeacherActions'
import { Link } from 'react-router';
class TeacherDashBoard extends React.Component{


		constructor(props){
			super(props)
			this.state={

				temail:'',
				tname:'',
				tpassword:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				studentsList:[],

			}
			// console.log(this.state.email)
		}

componentWillMount (){
	
		 document.body.className = "green";
		if(this.props.location.state!=null)
		{
			this.setState({temail:this.props.location.state.s.temail})
			this.setState({tname:this.props.location.state.s.tname})
			this.setState({tpassword:this.props.location.state.s.tpassword})
			console.log(this.props.location.state.s)
			console.log("---------------------------------------")

		}
// 		if(this.props.location.state!=null){
// 			const {temail, tpassword, tname} = this.props.location.state.s;

// 			this.props.FetchTheStudents({temail, tpassword, tname })
// // console.log("###################1" + JSON.stringify(this.state))
// console.log("###################2 "+ JSON.stringify(this.props.students))


// 		}
}


componentDidMount(){
	// console.log("***********")
	// console.log(this.props)
			if(this.props.location.state!=null){
				const {temail, tpassword, tname} = this.props.location.state.s;

				this.props.FetchTheStudents({temail, tpassword, tname })
					.then((response)=>{this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
							if(response.teacherStudents.errorMessage && response.teacherStudents.errorMessage!==undefined && response.teacherStudents.errorMessage!==null && response.teacherStudents.errorMessage!==''){
								this.setState({errorState:true, errorMessage: response.teacherStudents.errorMessage, loading:false})
							}else{
								console.log("**********************************");
								console.log(response);
								this.setState({loading:false, done:true, shouldRedirect:true, studentsList: response.teacherStudents.studentsArray})
							; console.log("::::::::::"); console.log(this.state)
							}
						},
						(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
						)
				// console.log("###################1" + JSON.stringify(this.state))
				console.log("###################2 "+ JSON.stringify(this.props.students))
			}
}


	render(){
		const loademe=(
			<div>
					<div className="page-teacher-dash-wrap">
						<div className="container">
							{this.state.studentsList.map((student, i) => <TableRow key={i} data={student}  s={this.state}/>)}
						</div>
					</div>
			</div>
		)
		var pageContent=(
			<div>

				<br/><h2>Welcome {this.state.tname} </h2><br/> <br/> 
				<br/>
				<h1> The List Of Students's Assigned to you. </h1> <br/> 

				{this.state.studentsList && this.state.studentsList!==null && this.state.studentsList!==undefined ?loademe:""}
				
			</div>

		)


		return(

			<div>

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.temail!=="" && this.props.location.state.s.temail!==null && this.props.location.state.s.temail!==undefined ? pageContent : "werwerew"}

			</div>


		);




	}



}

class TableRow extends React.Component {
	// console.log("_-___----____-----_____------_______-_ "+this.props)
   render() {
      return (


         					<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
						  		<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>

						      	<div className="card-block">
								    <h4 className="card-title">{this.props.data.sname}</h4>
								    <p className="card-text">You can contact Student at at data</p>
							    
								    <Link to={{pathname:"/view/student/"+this.props.data.semail, state:{s:this.props.s}}}>
								    	<button className="btn btn-primary">Click To View Or Update </button>
								    </Link>

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
export default  connect(null, {FetchTheStudents})  (TeacherDashBoard)