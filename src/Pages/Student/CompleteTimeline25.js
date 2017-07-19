import React from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router';

import { FetchAllMyPosts, StudentCommenting, logMeOut } from '../../actions/StudentActions'
// FetchAllMyPosts

import classnames from 'classnames'

import StudentHeader from "./StudentHeader"   // Navigation bar of Admin
class CompleteTimeline extends React.Component{
	constructor(props){
			super(props)
			this.state={

				semail:'',
				sname:'',
				spassword:'',
				studentToken:'',
				studentImage:"",

				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				myposts:[],
				shouldRedirectError:false,

				sessionExpired:false,
				redirectMeToHomePage:false,
				comment:"",
				errors:{},


			}
			this.handleChange = this.handleChange.bind(this)
			this.handleSubmit  = this.handleSubmit.bind(this)
			this.logMeOut = this.logMeOut.bind(this)
			// console.log(this.state.email)
		}
		componentWillMount (){
			document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({semail:this.props.location.state.s.semail})
				this.setState({sname:this.props.location.state.s.sname})
				this.setState({spassword:this.props.location.state.s.spassword})
				this.setState({studentToken:this.props.location.state.s.studentToken})
				// console.log(this.props.location.state.s)


				const {semail, spassword, studentToken} = this.props.location.state.s
				if(studentToken===null || studentToken===undefined){
					debugger
					this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

				}
				else{
					if(this.props.location.state!=null)
					{
						this.props.FetchAllMyPosts({semail, spassword, studentToken})
						.then(
							(response)=>{ debugger; this.setState({done:true}) ;
								if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
									this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
								}
								else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
									this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
								}
								else{
									this.setState({loading:false, done:true, shouldRedirect:true, myposts:response.posts, studentImage:response.studentImage})
									console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
									console.log(this.state)
								}
						},
						(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
						)

					}
				}

				// console.log("I AM HERE")
				// console.log(this)
			}
		}
		componentDidMount (){
			// debugger
			// console.log(this.props)
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

	handleChange = (e)=>{
		debugger
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
		debugger
		console.log("^^^^^^^^^")
		console.log(e.target.value)
		e.preventDefault();
// debugger
		//validations
		let errors={}
		// if(this.state.comment === "") errors.comment="Comment Can't Be Empty"
		var comment = e.target.comment.value
		if(comment === "" || comment.trim() === "") errors.comment="Comment Can't Be Empty"
		this.setState({errors})

var idAndTemail =e.target.className.split("-*-")

		const postId = idAndTemail[0]
		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {semail, spassword, studentToken} = this.state

			const temail = idAndTemail[1]
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



		render(){


		const PostContainer=(
			<div>
				<br/>
				<br/>
				<div className="post-des-wrap">
					<div className="container">
						<div className="post_headingdiv">
							<h1>All Posts </h1>
							{this.state.studentImage && this.state.studentImage!=undefined && this.state.studentImage!=="" ? <div className="Student_img_ct"><img className="media-object" alt="Profile" src={this.state.studentImage} /></div> :<div className="Student_img_ct"><img className="media-object" alt="Profile" src="/Dummy_Image_Man.jpg" /></div>}
						</div>
						<div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>
						{this.state.myposts.map((post, i) => <TableRow key={i} data={post} s={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />)}
					</div>
				</div>
			</div>
			)
		const NoContent=(
				<div>
				{console.log("________________________*_____________________________")}
				{console.log(this)}
				<br/>
				<br/>
				<br/>
					<h1> No Posts Found Yet </h1>
				
				</div>
			)

				const pageContent=(
								<div>
{/*									<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
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
									{this.state.myposts && this.state.myposts!==null && this.state.myposts!==undefined && this.state.myposts.length>0 ? PostContainer : NoContent }

								</div>
					)


			return(
				<div>
						{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.semail!=="" && this.props.location.state.s.semail!==null && this.props.location.state.s.semail!==undefined && this.props.location.state.s.spassword && this.props.location.state.s.spassword!==null && this.props.location.state.s.spassword!==undefined && this.props.location.state.s.spassword!=="" && this.props.location.state.s.studentToken && this.props.location.state.s.studentToken!=null? pageContent : <Redirect to="/" />}
						{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{StudentParent:"Please login Again"}}} /> : "" }
						{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{StudentParent:this.state.SuccessMessage}}} />:""}
				</div>
			)
		}
}

class TableRow extends React.Component{

	render(){
		const showComments= (
				<div style={{"background":"grey"}}>
					{this.props.data.comments.map((comment, i) => <CommentBlock key={i} data={comment} />)}
				</div>
			)
			function reloadme(){
				console.log("************* here *******************")
					window.location.reload(true)
				}
			const errorBox=(
				<div className="alert alert-danger">
					{/*this.state.errorMessage */}
				</div>
			);
		return(


					<div className="well">
				      <div className="media">
					      	<a className="pull-left" href="#">
					    		{this.props.data.teacherImage && this.props.data.teacherImage!==null && this.props.data.teacherImage!==undefined?<img className="media-object" alt="Profile" src={this.props.data.teacherImage} />:<img className="media-object" alt="Profile" src="/Dummy_Image_Man.jpg" />}
					  		</a>
					  		<div className="media-body">
					  			<h4 className="media-heading">Student Name:  {this.props.data.sname}</h4>
					    		<h4 className="media-heading">Heading : <Link to={{pathname:"/studentParents/timeline/"+this.props.data.temail+"/viewpost/"+this.props.data._id, state:{s:this.props.s}}} >{this.props.data.posthead} </Link></h4>
					          <p>Teacher : {this.props.data.tname}</p> 
					          <p>Description : {this.props.data.description}</p>
					          {this.props.data.paths && this.props.data.paths!=null && this.props.data.paths.map((post, i) => <ImagesRow key={i} data2={post} s={this.state} />)}
					          <ul className="list-inline list-unstyled"> 
					  			<li><span><i className="glyphicon glyphicon-calendar"></i> {this.props.data.date} </span></li>
					            <li>|</li>
					            <span><i className="glyphicon glyphicon-comment"></i> {this.props.data.comments && this.props.data.comments!==null && this.props.data.comments!==undefined && this.props.data.comments.length>0?" "+this.props.data.comments.length : " 0" }  Comments</span>
					            <li>|</li>
					          </ul>

					       </div>
								<form id="contact" className={this.props.data._id+"-*-"+this.props.data.temail} onSubmit={this.props.handleSubmit}>

			                	{this.props.s.errorState===true && this.props.s.errorMessage ? errorBox : ""}
								{ this.props.s.shouldRedirect ? reloadme:"" }

								  <div className="containerTimeline">
								    <div className="headTimeline">
								     {/* <h2 className="Timelineh2">Comment Here</h2>*/}
								    </div>
								    {/*<div className={classnames("form-horizontal","center-block",{loader: this.props.s.loading})}> </div>*/}
								    {console.log(this.props)}
									{<div className={classnames('form-group', {"has-error":!!this.props.s.errors.comment})}>
									<textarea className="timelineInput" type="text" name="comment" /*value={this.props.s.comment} onChange={this.props.handleChange}*/ id="comment" placeholder="Comment here"></textarea>
									<br/><span className="errorM">{this.props.s.errors.comment}</span></div>					   }

								    <button id="submit" type="submit" value={this.props.data._id}>
								      Submit Comment
								    </button>
								  </div>
								</form> 
								{this.props.data.comments && this.props.data.comments!==null && this.props.data.comments!==undefined && this.props.data.comments.length>0? showComments : "" }
				       </div>
				      </div>



			)

	}

}
class ImagesRow extends React.Component{
	render(){
		return(
				<div>
				<img src={this.props.data2 }  alt="Uploads"/>
					{console.log(this.props.data2)}
				</div>

			)

	}
}
class CommentBlock extends React.Component {
	// console.log("_-___----____-----_____------_______-_ "+this.props)
   render() {
      return (

         					<div className="comment" >
         						<div className="Commentpost">
         							{/*<div className="c_pic"><a herf=""><img className="media-object" alt="Profile" src="/Dummy_Image_Man.jpg" /></a></div>*/}
         							<div className="C_name"><a href="#">{this.props.data.postedBy}</a></div>
         							<div className="Comment_content">{this.props.data.comment}</div>
         							<div className="C_date">{this.props.data.cdate}</div>
         						</div>
         					</div>
      );
   }
}

export default connect(null, {FetchAllMyPosts, logMeOut, StudentCommenting}) (CompleteTimeline)