import React from 'react';

import { FetchTeachers } from  '../../actions/SchoolActions'
import {connect} from 'react-redux';

import { Link, Redirect } from 'react-router';

class SchoolTeachersList extends React.Component{

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
				teacherss:[]

			}
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

		}
		componentDidMount(){
			const {email, password, name} = this.props.location.state.s
			this.props.FetchTeachers({email, password, name })
				.then(
					(response)=>{this.setState({done:true}) ;console.log("%%%%%%%%%%%%%%%%%%"); console.log(response);
						if(response.teachers.errorMessage && response.teachers.errorMessage!==undefined && response.teachers.errorMessage!==null && response.teachers.errorMessage!==''){
							this.setState({errorState:true, errorMessage: response.teachers.errorMessage, loading:false})
						}else{
							this.setState({loading:false, done:true, shouldRedirect:true, teacherss:response.teachers})
							console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
							console.log(this.state)
						}
				},
				(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
				)
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
						<TeacherList teachers={this.state.teacherss} main={this.state} />
					</div>




				);
			return(

					<div>


					{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined ? pageContent : <Redirect to="/" />}


					</div>

				);

	}

}



function TeacherList ({teachers, main})  {

	// console.log("***  5555555555555555555555555555555* * * * * *  ****** *" + JSON.stringify(main))

	const emptyMessage= (
		<div>
			<h3 className="active">There are no schools yet in website </h3> <br/>
		</div>
		)
	const SchoolList=(

<div className="top-school-outer">
				<div className="school-list-caption">

					<h1> Schools List </h1>
						
				</div>
				<div className="teacher-list-wrap">
							<div className="container">
							{teachers.map((teachers, i)=><TeacherRow key={i} data={teachers} teachers={teachers} main={main}/> )}

							</div>
				</div>
</div>

	)
	return(
		<div>
			{teachers.length === 0 ? emptyMessage : SchoolList}
		</div>

	);
}

function TeacherRow({ teachers, main }) {
	console.log("***  5555555555555555555555555555555* * * * * *  ****** *" + JSON.stringify(main))
      return (

							
							<div className="card Boxed" style={{width: 30+ 'rem', float:"left", "marginLeft":20+"px", marginRight:20+"px", maxHeight:500+"px"}}>
						  		<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>

						      	<div className="card-block">
								    <h4 className="card-title">{teachers.tname}</h4>
								    <p className="card-text">You can contact school at {teachers.temail}</p>
								    
								    <Link to={{pathname:"/view/teachers/"+teachers.temail, state:{s:main}}}>
								    	<button className="btn btn-primary">Click To View Or Update </button>
								    </Link>

							  	</div>
							</div>



      );

}

// function mapStateToProps(state){

// // console.log('state.SchoolActions  oooooooooooo'+JSON.stringify(state))

// 		if(state.schools[0] && state.schools[0]!==undefined &&  state.schools[0].length>0){
// // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// // console.log(state.schools[0])

// 				return{
// 					teachers: state.schools[0],

// 				}
// 		}
// 		else{
// // console.log("!!VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV!!!!!!!!!!!!!!!!!!!")

// 			return{
// 				teachers:[]
// 			}
// 		}

// }


// SchoolTeachersList.propTypes={
// 	teachers      : React.PropTypes.array.isRequired,
// 	FetchTeachers : React.PropTypes.func.isRequired, 
// }

export default connect(null, {FetchTeachers})(SchoolTeachersList);

// @connect(stores => { console.log('stores.question.question_tags '+JSON.stringify(stores.question.question_tags));
// return {
// question: stores.question,
// auth: stores.auth,
// tags_obj: [],//stores.question.question_tags,
// }
// })