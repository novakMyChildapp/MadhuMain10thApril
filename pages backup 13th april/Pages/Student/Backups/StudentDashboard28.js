import React from 'react';
import {Link, Redirect } from 'react-router'; // add link to this place
import {FetchMyTeachers} from '../../actions/StudentActions'
import {connect} from 'react-redux';

class StudentDashboard extends React.Component{
	constructor(props){
			super(props)
			this.state={

				semail:'',
				sname:'',
				spassword:'',
				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				teachersList:[],

			}
			// console.log(this.state.email)
		}
		componentWillMount (){
			document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({semail:this.props.location.state.s.semail})
				this.setState({sname:this.props.location.state.s.sname})
				this.setState({spassword:this.props.location.state.s.spassword})
				console.log(this.props.location.state.s)

				console.log("I AM HERE")
				// const {semail, spassword} = this.props.location.state.s
				// // console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
				// this.props.FetchMyTeachers({semail, spassword})


			}
		}
		componentDidMount (){
			console.log(this.state)
				const {semail, spassword} = this.props.location.state.s
				// console.log("66666666666"+email+ " "+ password + "%%%%%%%%%%%%%%%%")
			if(this.props.location.state!=null)
			{	
				this.props.FetchMyTeachers({semail, spassword})
						.then((response)=>{this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
							if(response.myteachers.errorMessage && response.myteachers.errorMessage!==undefined && response.myteachers.errorMessage!==null && response.myteachers.errorMessage!==''){
								this.setState({errorState:true, errorMessage: response.myteachers.errorMessage, loading:false})
							}else{
								console.log("**********************************");
								console.log(response);
								this.setState({loading:false, done:true, shouldRedirect:true, teachersList: response.myteachers.oStudent.teacherArray})
							; console.log("::::::::::"); console.log(this.state)
							}
						},
						(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
						)
			}
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
		const list=(
				<div>
					{this.state.teachersList.map((teachers, i) => <TeachersRow key={i} data={teachers} s={this.state} />)}
				</div>
			)
		const nolist=(
				<div>
					<h2>"No Teachers Added Yet"</h2>
				</div>
			)
		const pageContent =(
				<div>

					<h2>Welcom to "{this.state.sname}'s" DashBoard</h2>
					{console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")}
					{console.log(this.state)}
					{this.state.teachersList && this.state.teachersList!==null && this.state.teachersList!==undefined && this.state.teachersList.length>0? list : nolist}

				</div>
			)

		return(

			<div>
				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.semail!=="" && this.props.location.state.s.semail!==null && this.props.location.state.s.semail!==undefined ? pageContent : <Redirect to="/" />}

			</div>



			);



	}


}


// teachersRow
class TeachersRow extends React.Component {
   render() {
   	return(
   					<div className="student-parent-wrap">
   					<div className="container">
   					<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
					  		<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>

					      	<div className="card-block">
							    <h4 className="card-title"> {this.props.data.tname}</h4>
							    <p className="card-text">You can contact school at  {this.props.data.temail}</p>
							    <Link to={{pathname:"/studentParents/timeline/"+this.props.data, state:{s:this.props.s}}}>
									    	<div className="btn btn-info">View TimeLine</div>
								</Link>
							    
							</div>
							</div>
           			</div>
           			</div>
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

export default connect(null, {FetchMyTeachers}) (StudentDashboard)

