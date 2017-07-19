import React from 'react';
// FetchTheTeacherPost
import {connect} from 'react-redux';
import {FetchTheTeacherPost, StudentCommenting, logMeOut} from '../../actions/StudentActions'
import classnames from 'classnames'
import { Link, Redirect } from 'react-router'

import StudentHeader from "./StudentHeader"   // Navigation bar of Admin
// StudentTeacherMainPost
class TeacherStudentMainPost extends React.Component{

	constructor(props){
			super(props)
			this.state={

				semail:'',
				sname:'',
				spassword:'',
				studentToken:'',

				teacherImage:'',
				studentImage:'',

				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				post:{},
				errors:{},
				comment:"",

				sessionExpired:false,
				redirectMeToHomePage:false,

				shouldRedirectError:false,


			}
			this.logMeOut = this.logMeOut.bind(this)
			// console.log(this.state.email)
		}
		componentWillMount (){
			console.log(this.state)
			console.log("******************")
			console.log(this.props)
			console.log("***************************")
			document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({semail:this.props.location.state.s.semail})
				this.setState({sname:this.props.location.state.s.sname})
				this.setState({spassword:this.props.location.state.s.spassword})
				this.setState({studentToken:this.props.location.state.s.studentToken})

				console.log(this.props.location.state.s)
				console.log("######################")


				const {semail, spassword, studentToken} = this.props.location.state.s;
				const temail = this.props.params.id
				const postId = this.props.params.postId

				if(studentToken===null || studentToken===undefined){
					debugger
					this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

				}
				else{


					this.props.FetchTheTeacherPost({semail, spassword, postId,temail, studentToken })
						.then((response)=>{debugger ;this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
								if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
									this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
								}
								else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
									this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
								}
								else{
									console.log("**********************************");
									console.log(response);
									this.setState({loading:false, done:true, shouldRedirect:true, post: response.posts, teacherImage: response.teacherImage});
									this.setState({studentImage:response.studentImage})
									console.log("::::::::::");
									console.log(this.state)
								}
							},
							(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
							)

				}


				// console.log("I AM HERE")
				// console.log(this)
			}
		}
		componentDidMount(){
					// console.log("HERE66666666666666")



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
		console.log("^^^^^^^^^")
		e.preventDefault();
// debugger
		//validations
		let errors={}
		// if(this.state.comment === "") errors.comment="Comment Can't Be Empty"
		if(this.state.comment === "" ||this.state.comment.trim() === "") errors.comment="Comment Can't Be Empty"
		this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {semail, spassword, comment, studentToken} = this.state
			const postId = this.props.params.postId
			const temail = this.props.params.id
			this.setState({loading: true})
			this.props.StudentCommenting({semail, spassword, temail, postId, comment, studentToken }).then(
				(response)=>{ debugger ; this.setState({done:true}) ;console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
					if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
					 	{
					 		this.setState({errorState:true, errorMessage: response.errorMessage, loading:false}); console.log("ERROR DETECTED")
					 	}
						else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
							this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
						}
					 	else{
					 		this.setState({loading:false, done:true, shouldRedirect:true, name: response.post.tname, comment:""}); window.location.reload(true)
					 	}
					},
				(err) => err.response.json().then(({errors})=> {debugger; console.log("here"); this.setState({errors, loading:false})})
			)

		}
	}
	logMeOut(e){
		debugger
		console.log(e.target.value)
		const {semail, spassword, studentToken} =this.state
			this.props.logMeOut({semail, spassword, studentToken}).then(
				(response)=>{debugger; this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
					{this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}
				else{ this.setState({loading:false, done:true, sessionExpired:true,redirectMeToHomePage:true, SuccessMessage:response.SuccessMessage})}},

				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)

	}
	render(){
		debugger
			function reloadme(){
				console.log("************* here *******************")
					window.location.reload(true)
				}
			const errorBox=(
				<div className="alert alert-danger">
					{this.state.errorMessage}
				</div>
			);

const comm=(
				<div className="StudentMainPostArea">
					{this.state.post.comments && this.state.post.comments.length>0 && this.state.post.comments.map((comment, i) => <CommentBlock key={i} data={comment} />)}
				</div>

			



	)
const nocomm=(

		<div>
			<h3>No Comments Posted yet</h3>
		</div>
	)	
			const loadPost=(
					<div>
					
					<div className="post-main-wrap">
						<div className="container">
							<div className="posts-in">
								<div className="teacher-sec">
									<div className="teacher-pro">
										
										 {this.state.teacherImage && this.state.teacherImage!=null?<img src={this.state.teacherImage} alt="Tacher Profile" className="img-responsive" />:<img src="/Dummy_Image_Man.jpg" alt="Main" className="img-responsive"/>}
									</div>
									<div className="teacher-detail">
											<div className="posts-single-inner"><label>Date: </label>{this.state.post.date}</div>
											<div className="posts-single-inner"><label>Teacher : </label>{this.state.post.tname}</div>

											<div className="posts-single-inner"><label>Mail : </label>{this.state.post.temail}</div>
									</div>
								</div>

								<div className="student-sec">
									<div className="student-pro">
										{this.state.studentImage && this.state.studentImage!=null ?<img src={this.state.studentImage} alt="Student Profile" />:<img src="/Dummy_Image_Man.jpg" alt="Main" className="img-responsive"/>}
									</div>
									<div className="student-detail">
										<div className="posts-single-inner"><label>Student : </label>{this.state.post.sname}</div>
									</div>
								</div>
					
								<div className="head-descr">
									<div className="posts-single-inner"><label>Heading :</label>{this.state.post.posthead} </div>
									<div className="posts-single-inner"><label>Description : </label>{this.state.post.description}</div>
								</div>
							</div>
							
							{this.state.post.paths && this.state.post.paths!=null && this.state.post.paths.length>0?<div className="img-posts">
																					{console.log(this.state.post.paths)}
																					<img src={this.state.post.paths} alt="http://139.59.7.53:3001/student.jpg" className="img-responsive"/>
																				  </div>:""}


						</div>

								<form id="contact" onSubmit={this.handleSubmit}>

			                	{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
								{ this.state.shouldRedirect ? reloadme:"" }

								  <div className="containerTimeline">
								    <div className="headTimeline">
								      <h2 className="Timelineh2">Post Here</h2>
								    </div>
								    <div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>

									<div className={classnames('form-group', {"has-error":!!this.state.errors.comment})}><textarea className="timelineInput" type="text" name="comment" value={this.state.comment} onChange={this.handleChange} id="comment" placeholder="Comment here"></textarea><br/><span className="errorM">{this.state.errors.comment}</span></div>					   

								    <button id="submit" type="submit">
								      Submit Comment
								    </button>
								  </div>
								</form> 
						</div>
						

{/*						<div className="CommentsSection">*/}
							<div style={{"align":"center"}}>
								{this.state.post.comments && this.state.post.comments!==null && this.state.post.comments!==undefined && this.state.post.comments.length>0 ? comm : nocomm}
							</div>
						{/*</div>*/}

					</div>
				)
			const whatshappening=(
				<div>
					There Are No New Posts Yet
				</div>
			)



			const pageContent=(
					<div>
{/*						<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
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
					                    	<Link to={{pathname:"/studentParents", state:{s:this.state}}}>
					                        	Home
					                    	</Link>
					                    </li>
				                    <li >
				                    	<Link to={{pathname:"/studentParents/completeTimeline", state:{s:this.state}}}>
				                        	Complete Timeline
				                    	</Link>
				                    </li>
				                    <li >
				                    	<Link to={{pathname:"/studentParents/MyProfile", state:{s:this.state}}}>
				                        	My Profile
				                    	</Link>
				                    </li>
				                    <li>
				                        <a className="page-scroll">{this.state.semail}</a>
				                    </li>
				                    <button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
					                </ul>
					            </div>
					           
					        </div>
	      
	    				</nav>*/}
<StudentHeader states={this.state} logMeOut={this.logMeOut} />
						<br/>
						<br/>
						{this.state.post && this.state.post!==null && this.state.post!==undefined? loadPost: whatshappening}

					</div>
			)
			return(
				<div>
					{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.semail!=="" && this.props.location.state.s.semail!==null && this.props.location.state.s.semail!==undefined && this.props.location.state.s.spassword && this.props.location.state.s.spassword!==null && this.props.location.state.s.spassword!==undefined && this.props.location.state.s.spassword!=="" && this.props.location.state.s.studentToken && this.props.location.state.s.studentToken!=null  ? pageContent : <Redirect to="/" />}
					{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{StudentParent:"Please login Again"}}} /> : "" }
					{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{StudentParent:this.state.SuccessMessage}}} />:""}
				</div>
				);
	}


	}

class CommentBlock extends React.Component {
	// console.log("_-___----____-----_____------_______-_ "+this.props)
   render() {
      return (

         					<div className="comment">
{/*         						<div className="CommentDate" >
         							<span>Date Posted On :</span> {this.props.data.cdate}
         						</div>
         						<div>
         								<span>Posted By :</span> {this.props.data.postedBy}
         						</div>
         						<div>
         								<span>Comment : </span>{this.props.data.comment}
         						</div>
*/}
         						<div className="Commentpost">
         							{/*<div className="c_pic"><a herf=""><img className="media-object" alt="Profile" src="/Dummy_Image_Man.jpg" /></a></div>*/}
         							<div className="C_name"><a href="">{this.props.data.postedBy}</a></div>
         							<div className="Comment_content">{this.props.data.comment}</div>
         							<div className="C_date">{this.props.data.cdate}</div>
         						</div>
         					</div>
      );
   }
}

export default connect(null, {FetchTheTeacherPost, StudentCommenting, logMeOut}) (TeacherStudentMainPost)



						/// 82