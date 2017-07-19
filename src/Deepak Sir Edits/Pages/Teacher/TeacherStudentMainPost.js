import React from 'react';
import {connect} from 'react-redux';
import {FetchTheStudentsPost, TeacherCommenting} from '../../actions/TeacherActions'
import {Link, Redirect} from "react-router"

import classnames from 'classnames'
class TeacherStudentMainPost extends React.Component{

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
			post:{},
			errors:{},
			headline:"",
			description:"",
			comment:""

		}
		// console.log(this.state.email)
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
		console.log("HERE66666666666666")
				const {temail, tpassword} = this.props.location.state.s;
				const semail = this.props.params.id
				const postId = this.props.params.postId
				this.props.FetchTheStudentsPost({temail, tpassword, postId,semail })
					.then((response)=>{this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$"+JSON.stringify(response));
							if(response.TeacherParticularPost.errorMessage && response.TeacherParticularPost.errorMessage!==undefined && response.TeacherParticularPost.errorMessage!==null && response.TeacherParticularPost.errorMessage!==''){
								this.setState({errorState:true, errorMessage: response.TeacherParticularPost.errorMessage, loading:false})
							}else{
								console.log("**********************************");
								console.log(response);
								this.setState({loading:false, done:true, shouldRedirect:true, post: response.TeacherParticularPost.post})
							; console.log("::::::::::"); console.log(this.state)
							}
						},
						(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
						)


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
		let errors={}
		if(this.state.comment === "") errors.comment="Comment Cant Be Empty"
		this.setState({errors})


		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {temail, tpassword, comment} = this.state
			const postId = this.props.params.postId
			const semail = this.props.params.id
			this.setState({loading: true})
			this.props.TeacherCommenting({temail, tpassword, semail, postId, comment }).then(
				(response)=>{this.setState({done:true}) ; if(response.TeacherComments.errorMessage && response.TeacherComments.errorMessage!==undefined && response.TeacherComments.errorMessage!==null && response.TeacherComments.errorMessage!==''){this.setState({errorState:true, errorMessage: response.TeacherComments.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true}); window.location.reload(true)}},
				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)

		}
	}


	render(){

			function reloadme(){
					window.location.reload(true)
				}
			const errorBox=(
				<div className="alert alert-danger">
					{this.state.errorMessage}
				</div>
			);


const comm=(
		<div>
		{console.log("**********************************************")}
		{console.log(this.state)}
		{console.log("#################################################")}
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
								
								 <img src="http://139.59.7.53:3001/Teachermain1.jpg" alt="Main" className="img-responsive"/>
							</div>

							<div className="teacher-detail">
							<div className="posts-single-inner"><label>Date: </label>{this.state.post.date}</div>
							<div className="posts-single-inner"><label>Teacher : </label>{this.state.post.tname} </div>
							<div className="posts-single-inner"><label>Mail : </label>{this.state.post.temail}</div>
							</div>
							</div>

							<div className="student-sec">
							
							<div className="student-pro">
								
										 <img src="http://139.59.7.53:3001/stu2.jpg" alt="Main" className="img-responsive"/>
							</div>

							<div className="student-detail">
							<div className="posts-single-inner"><label>Student : </label>{this.state.post.sname}</div>
							
							</div>
							</div>

							<div className="head-descr">
								<div className="posts-single-inner"><label>Heading :</label>{this.state.post.posthead}</div>
							<div className="posts-single-inner"><label>Description : </label>{this.state.post.description}</div>
							</div>
							
							</div>

							<div className="img-posts">
								 <img src="http://139.59.7.53:3001/student.jpg" alt="Main" className="img-responsive"/>
							</div>


						</div>
						</div>
						{console.log("*************6666666666666*********************************")}
		{console.log(this.state)}

						<div>
								<form id="contact" onSubmit={this.handleSubmit}>

			                	{this.state.errorState===true && this.state.errorMessage ? errorBox : ""}
								{ this.state.shouldRedirect ? reloadme:" " }

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
						<div className="CommentsSection">
							<div className="container">
								{this.state.post.comments && this.state.post.comments!==null && this.state.post.comments!==undefined && this.state.post.comments.length>0 ? comm : nocomm}
						</div>
						</div>
					</div>
				)

				const whatshappening=(
					<div>
					NOOOOOOOOO
					</div>
				)
				const pageContent=(
						<div>
							{this.state.post && this.state.post!=null && this.state.post!=undefined? loadPost: whatshappening}

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
    				<br/>
    				<br/>
    				<br/>
    				<br/>

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.temail!=="" && this.props.location.state.s.temail!==null && this.props.location.state.s.temail!==undefined ? pageContent : "werwerew"}


				</div>
			);
	}
}
class CommentBlock extends React.Component {
	// console.log("_-___----____-----_____------_______-_ "+this.props)
   render() {
      return (

         					<div className="comment">
         						<div className="CommentDate" >
         							<span>Date Posted On :</span> {this.props.data.cdate}
         						</div>
         						<div className="Commentpost">
         								<span>Posted By : </span>{this.props.data.postedBy}
         						</div>
         						<div className="Commenthere">
         								<span>Comment :</span> {this.props.data.comment}
         						</div>
         					</div>
      );
   }
}
export default connect(null, {FetchTheStudentsPost, TeacherCommenting}) (TeacherStudentMainPost)