import React from 'react';
import {connect} from 'react-redux';
import {FetchTheStudentsPosts, saveTeacherPostOnStudent} from '../../actions/TeacherActions'
import classnames from 'classnames'
import { Link, Redirect } from 'react-router';


class TeacherStudentTimeline extends React.Component{


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
			studentsPosts:[],
			errors:{},
			headline:"",
			description:"",

		}
		// console.log(this.state.email)
	}
	handleChange = (e)=>{
		if(!!this.state.errors[e.target.name]){
			let errors = Object.assign({}, this.state.errors)

			delete errors[e.target.name]
			this.setState({
				[e.target.name] : e.target.value,
				errors
			});
		}
		else{
			this.setState({[e.target.name]: e.target.value})
		}
	}

		handleSubmit = (e)=>{
			e.preventDefault();
// debugger
			//validations
			let errors = {};
			if(this.state.headline === "") errors.headline="Email Cant Be Empty"
			if(this.state.description === "") errors.description="School Name Cant Be Empty"
			this.setState({errors})

			console.log(errors)

			const isValid = Object.keys(errors).length===0

				if(isValid){
						console.log("******************    NO ERROR")
						const {temail, tpassword, tname, headline, description} = this.state
						const semail  =this.props.params.id
						this.setState({loading: true})
						this.props.saveTeacherPostOnStudent({temail, tpassword, tname, headline, description ,semail}).then(
							// ()=>{console.log("HEREEEE")}
							(response)=>{this.setState({done:true}) ;console.log(response) ;console.log("%$^$^$%^%$^$%^$%^$%^%$^$%$%^%$") ;if(response.teacherPostsOnStudentsTimeLine.errorMessage && response.teacherPostsOnStudentsTimeLine.errorMessage!==undefined && response.teacherPostsOnStudentsTimeLine.errorMessage!==null && response.teacherPostsOnStudentsTimeLine.errorMessage!==''){this.setState({errorState:true, errorMessage: response.teacherPostsOnStudentsTimeLine.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true,headline:"", description:""}); window.location.reload(true)}},
							(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
						)
				}

		}



	componentWillMount (){
			console.log(this)
			document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({temail:this.props.location.state.s.temail})
				this.setState({tname:this.props.location.state.s.tname})
				this.setState({tpassword:this.props.location.state.s.tpassword})
				console.log(this.props.location.state.s)
				console.log("---------------------------------------")

			}
			// if(this.props.location.state!=null){

			// 	const {temail, tpassword, tname} = this.props.location.state.s;
			// 	const semail  =this.props.params.id
			// 	console.log(this.props)
			// 	this.props.FetchTheStudentsPosts({temail, tpassword, tname,semail })
			// 	// console.log("###################1" + JSON.stringify(this.state))
			// 	console.log("###################2 "+ JSON.stringify(this.props.students))


			// }
	}
	componentDidMount(){
		// console.log(this.state)
		// console.log("*************************************")
			if(this.props.location.state!=null){

				const {temail, tpassword, tname} = this.props.location.state.s;
				const semail  =this.props.params.id
				console.log(this.props)
				this.props.FetchTheStudentsPosts({temail, tpassword, tname,semail })
				.then((response)=>{this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$");
				if(response.teacherStudentsposts.errorMessage && response.teacherStudentsposts.errorMessage!==undefined && response.teacherStudentsposts.errorMessage!==null && response.teacherStudentsposts.errorMessage!==''){
					this.setState({errorState:true, errorMessage: response.teacherStudentsposts.errorMessage, loading:false})
				}else{
					console.log("**********************************");
					console.log(response);
					this.setState({loading:false, done:true, shouldRedirect:true,studentsPosts:response.teacherStudentsposts.posts})
				; console.log("::::::::::"); console.log(this.state)
				}
			},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)




				// console.log("###################1" + JSON.stringify(this.state))
				console.log("###################2 "+ JSON.stringify(this.props.students))


			}

	}
// componentWillReceiveProps (oldp, newp){
// 		console.log("-------------------------oldp-------------------------")
// 	console.log(oldp)
// 	if(oldp && oldp!==null && oldp!==undefined && oldp.studentsposts!==null && oldp.studentsposts!==undefined && oldp.studentsposts.posts && oldp.studentsposts.posts!==null && oldp!==newp){
// 		this.setState({studentsPosts:oldp.studentsposts.posts})
// 		this.forceUpdate()
// 	}
// 	console.log("-------------------------------------------------------")
// 	console.log("-------------------------newp-------------------------")
// 	console.log(newp)
// 	console.log("-------------------------------------------------------")

// }


	render(){

const PostContainer=(
		<div className="all-post-caption">
			<h1>All Posts </h1>
			{this.state.studentsPosts.map((post, i) => <TableRow key={i} data={post} s={this.state} />)}

		</div>
	)
const NoContent=(
		<div>
		<hr />
			<h1>No Posts Yet </h1>
		</div>
	)
const pageContent=(
				<div>	
					<form id="contact" onSubmit={this.handleSubmit}>
					  <div className="containerTimeline">
					    <div className="headTimeline">
					      <h2 className="Timelineh2">Post Here</h2>
					    </div>
					    <div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>

					    <div className={classnames('form-group', {"has-error":!!this.state.errors.headline})}><input className="timelineInput" type="text" name="headline" value={this.state.headline} onChange={this.handleChange} id="headline" placeholder="Headline" /><br/><span className="errorM">{this.state.errors.headline}</span></div>
					    <div className={classnames('form-group', {"has-error":!!this.state.errors.description})}><textarea className="timelineInput" type="text" name="description" value={this.state.description} onChange={this.handleChange} id="description" placeholder="Description"></textarea><br/><span className="errorM">{this.state.errors.description}</span></div>

					    <button id="submit" type="submit">
					      Send!
					    </button>
					  </div>
					</form> 

					<div>
						{this.state.studentsPosts && this.state.studentsPosts!==null && this.state.studentsPosts!==undefined && this.state.studentsPosts.length>0 ? PostContainer : NoContent }
					</div>
				</div>
	)

		return(

			<div>
					<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
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
				                </ul>
				            </div>
				           
				        </div>
      
    				</nav>

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.temail!=="" && this.props.location.state.s.temail!==null && this.props.location.state.s.temail!==undefined && this.props.location.state.s.tpassword && this.props.location.state.s.tpassword!==null && this.props.location.state.s.tpassword!==undefined && this.props.location.state.s.tpassword!=="" ? pageContent : <Redirect to="/" />}


			</div>

			);
	}

}

// function mapStateToProps(state){

// console.log("********")
// 		if(state.schools[0] && state.schools[0]!==undefined &&  state.schools.length>0 && state.schools[0].teacherStudentsposts!==null && state.schools[0].teacherStudentsposts!==undefined){
// 			// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// 			// console.log(state.schools[0].teachers)

// 				return{
// 					studentsposts: state.schools[0].teacherStudentsposts,
// 				}
// 		}
// 		else{
// 			// console.log("!!VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV!!!!!!!!!!!!!!!!!!!")
// 			return{
// 				// teachers:[],
// 				studentsposts:[]
// 			}
// 		}

// }


class TableRow extends React.Component{

	render(){

		return(
<div className="post-des-wrap">
<div className="container">
	<div className="well">
      <div className="media">
	      	<a className="pull-left" href="#">
	    		<img className="media-object" src="http://placekitten.com/150/150" />
	  		</a>
	  		<div className="media-body">
	  			<h4 className="media-heading"><span>Student Name:</span>  {this.props.data.sname}</h4> 
	    		<h4 className="media-heading"><span>Heading : </span><Link to={{pathname:"/view/student/"+this.props.data.semail+"/viewpost/"+this.props.data._id, state:{s:this.props.s}}}> {this.props.data.posthead} </Link></h4>
	          <p><span>Teacher : </span>{this.props.data.tname}</p> 
	          <p><span>Description :</span> {this.props.data.description}</p>
	          <ul className="list-inline list-unstyled"> 
	  			<li><span><i className="glyphicon glyphicon-calendar"></i> {this.props.data.date} </span></li>
	            <li>|</li>
	            <span><i className="glyphicon glyphicon-comment"></i>{this.props.data.comments && this.props.data.comments!=null && this.props.data.comments!=undefined && this.props.data.comments.length>0? " "+this.props.data.comments.length: " 0" } Comments</span> 
	            <li>|</li>
	          </ul>
	       </div>
       </div>
      </div>
</div>
</div>


			)

	}

}
export default connect (null, {FetchTheStudentsPosts, saveTeacherPostOnStudent}) (TeacherStudentTimeline)