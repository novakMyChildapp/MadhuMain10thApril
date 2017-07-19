import React from 'react';
import {connect} from 'react-redux';
import {FetchTheStudentsPosts, saveTeacherPostOnStudent, uploadImage, logMeOut, TeacherCommenting} from '../../actions/TeacherActions'
import classnames from 'classnames'
import { Link, Redirect } from 'react-router';

import TeacherHeader from "./TeacherHeader"   // Navigation bar of Teacher

var Dropzone = require('react-dropzone');

class TeacherStudentTimeline extends React.Component{


	constructor(props){
		super(props)
		this.state={

			temail:'',
			tname:'',
			tpassword:'',
			teacherToken:'',

			teacherImage:"",


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
			RelatedImages1:[],

			shouldRedirectError:false,

			sessionExpired:false,
			redirectMeToHomePage:false,

		}
		this.onDrop = this.onDrop.bind(this);
		this.logMeOut = this.logMeOut.bind(this)

			this.handleChangeC = this.handleChangeC.bind(this)
			this.handleSubmitC  = this.handleSubmitC.bind(this)
		//this.onSubmit = this.onSubmit.bind(this);
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
debugger
			//validations
			let errors = {};
			// if(this.state.headline === "") errors.headline="Headline Cant Be Empty"
			// if(this.state.description === "") errors.description="Description Cant Be Empty"


		if(this.state.headline === "" || this.state.headline.trim() === "") errors.headline="Headline Cant Be Empty"
			if(this.state.description === "" || this.state.description.trim() === "") errors.description="Description Cant Be Empty"
			this.setState({errors})

			console.log(errors)
			const isValid = Object.keys(errors).length===0

				if(isValid){
					var formData = new FormData();
					var data = this.state;
					data.semail = this.props.params.id
					debugger
					Object.keys(data).forEach(( key ) => {
						if(key === 'RelatedImages1'){
							formData.append(key, data[key][0]);
						}
						else{
							if(key ==='temail' || key==='tpassword' || key==='tname' || key==='headline' || key==='description' || key==='semail' || key==='teacherToken'){
								formData.append(key, data[ key ]);
							}
							
						}
					});

					console.info('POST', formData, this.state);
					console.info('This is expected to fail:');
					 return fetch('/api/teacher/postonstudentstimeline', {
						method: 'POST',
						body: formData,
					})
					.then(data => {debugger ; console.log(data);this.setState({loading:false, done:true, shouldRedirect:true,headline:"", description:""}); window.location.reload(true)})
					.catch(err => {debugger; console.log("++++++++++++++++++++!!!!!!!!!!@@@@@@@@");console.error(err) ; this.setState({errors, loading:false})});
					// .then(res => {debugger; res.json()})
					// .then(response =>{debugger ;this.setState({done:true}) ;
					// 	console.log(response) ;console.log("%$^$^$%^%$^$%^$%^$%^%$^$%$%^%$") ;if(response.teacherPostsOnStudentsTimeLine.errorMessage && response.teacherPostsOnStudentsTimeLine.errorMessage!==undefined && response.teacherPostsOnStudentsTimeLine.errorMessage!==null && response.teacherPostsOnStudentsTimeLine.errorMessage!==''){this.setState({errorState:true, errorMessage: response.teacherPostsOnStudentsTimeLine.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true,headline:"", description:""}); window.location.reload(true)}} )
					// // .then(res => console.log(res))
					// .catch(err => console.log(err));
					// console.log("******************    NO ERROR")
					// const {temail, tpassword, tname, headline, description, files} = this.state
					// const semail  =this.props.params.id
					// this.setState({loading: true})
					// this.props.saveTeacherPostOnStudent({temail, tpassword, tname, headline, description ,semail}).then(
					// 	// ()=>{console.log("HEREEEE")}
					// 	(response)=>{this.setState({done:true}) ;console.log(response) ;console.log("%$^$^$%^%$^$%^$%^$%^%$^$%$%^%$") ;if(response.teacherPostsOnStudentsTimeLine.errorMessage && response.teacherPostsOnStudentsTimeLine.errorMessage!==undefined && response.teacherPostsOnStudentsTimeLine.errorMessage!==null && response.teacherPostsOnStudentsTimeLine.errorMessage!==''){this.setState({errorState:true, errorMessage: response.teacherPostsOnStudentsTimeLine.errorMessage, loading:false})}else{ this.setState({loading:false, done:true, shouldRedirect:true,headline:"", description:""}); window.location.reload(true)}},
					// 	(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
					// )
				}

		}

		logMeOut(e){
			debugger
			console.log(e.target.value)
			const {temail, tpassword, teacherToken} =this.state
				this.props.logMeOut({temail, tpassword, teacherToken}).then(
					(response)=>{debugger; this.setState({done:true}) ;
						if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
							{
								this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
							}
						else
							{
								this.setState({loading:false, done:true, sessionExpired:true,redirectMeToHomePage:true, SuccessMessage:response.SuccessMessage})
							}
						},
					(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
				)

		}





	handleChangeC = (e)=>{
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
	handleSubmitC = (e)=>{
		e.preventDefault();
debugger
		//validations
		let errors={}
		var comment = e.target.comment.value
		if(comment === "" || comment.trim() === "") errors.comment="Comment Can't Be Empty"
		this.setState({errors})


var idAndSemail =e.target.className.split("-*-")

		const postId = idAndSemail[0]

		const isValid = Object.keys(errors).length===0

		if(isValid){
			console.log("******************    NO ERROR")
			const {temail, tpassword,  teacherToken} = this.state

			const semail = idAndSemail[1]
			this.setState({loading: true})
			this.props.TeacherCommenting({temail, tpassword, semail, postId, comment, teacherToken }).then(
				(response)=>{ debugger;this.setState({done:true}) ; 
					if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null)
						{
							this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
						}
						else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
							this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
						}
						else{
						 this.setState({loading:false, done:true, shouldRedirect:true}); window.location.reload(true)
						}
				},
				(err) => err.response.json().then(({errors})=> {debugger; console.log("here"); this.setState({errors, loading:false})})
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
				this.setState({teacherToken:this.props.location.state.s.teacherToken})
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

				const {temail, tpassword, tname, teacherToken} = this.props.location.state.s;
				const semail  =this.props.params.id
				console.log(this.props)



				if(teacherToken===null || teacherToken===undefined){
					debugger
					this.setState({shouldRedirectError:true, errorMessage:"Please Login Again"})

				}
				else{

					this.props.FetchTheStudentsPosts({temail, tpassword, tname,semail, teacherToken })
					.then((response)=>{ debugger ;this.setState({done:true}) ;console.log("$%%$%%$%%$%_______________$%$%$%$%$%$%$%$%$");
						if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success===null){
							this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
						}
						else if(response.errorMessage && response.errorMessage!==null && response.errorMessage !==undefined && response.errorMessage!=="" && response.success===false){
							this.setState({shouldRedirectError:true, errorMessage:response.errorMessage})
						}

						else{
							console.log("**********************************");
							console.log(response);
							this.setState({loading:false, done:true, shouldRedirect:true,studentsPosts:response.posts, teacherImage:response.teacherImage})
						; console.log("::::::::::"); console.log(this.state)
						}
					},
						(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
					)

				}


				// console.log("###################1" + JSON.stringify(this.state))
				console.log("###################2 "+ JSON.stringify(this.props.students))


			}

	}
    onDrop(acceptedFiles) {
      this.setState({
        RelatedImages1: acceptedFiles
      });
    }


	render(){

const PostContainer=(
		<div className="all-post-caption">
			<h1>All Posts </h1>
			{this.state.studentsPosts.map((post, i) => <TableRow key={i} data={post} s={this.state} handleSubmitC={this.handleSubmitC} handleChangeC={this.handleChangeC} />)}

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
					<form id="contact" onSubmit={this.handleSubmit.bind(this)}>
					  <div className="containerTimeline">
					    <div className="headTimeline">
					      <h2 className="Timelineh2">Post Here</h2>
					    </div>
					    <div className={classnames("form-horizontal","center-block",{loader: this.state.loading})}> </div>

					    <div className={classnames('form-group', {"has-error":!!this.state.errors.headline})}><input className="timelineInput" type="text" name="headline" value={this.state.headline} onChange={this.handleChange} id="headline" placeholder="Headline" /><br/><span className="errorM">{this.state.errors.headline}</span></div>
					    <div className={classnames('form-group', {"has-error":!!this.state.errors.description})}><textarea className="timelineInput" type="text" name="description" value={this.state.description} onChange={this.handleChange} id="description" placeholder="Description"></textarea><br/><span className="errorM">{this.state.errors.description}</span></div>
                		<div className="timeline_img_preview">
			            	{this.state.RelatedImages1.length > 0 ?
		            		<div className="img_preview_main">
		            			{this.state.RelatedImages1.map((file,id) => <div className='img_preview' key={id}>
		            			<img src={file.preview} alt="Preview Not Available" /*width={100}*//>
		            			{/*<div>{file.name + ' : ' + file.size + ' bytes.'}</div>*/}
		            			</div> )}
		            		</div> : null}
				        </div>
			            <div className="upload_footer">
			                <Dropzone accept="image/*" ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
			                	<i className="fa fa-camera"></i>
			                    {/*<div>Try dropping some files here, or click to select files to upload.</div>*/}
			                </Dropzone>
				            
							<button id="submit" type="submit"> Post </button>
				        </div>

					    
					  </div>
					</form> 

					<div>
						{this.state.studentsPosts && this.state.studentsPosts!==null && this.state.studentsPosts!==undefined && this.state.studentsPosts.length>0 ? PostContainer : NoContent }
					</div>
				</div>
	)

		return(

			<div>
			<div className="overlay"></div>
{/*					<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
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
				                    <button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
				                </ul>
				            </div>
				           
				        </div>
      
    				</nav>*/}
{/*								<header>
							    	<div className="header-top">
							        	<div className="container-fluid">
							            	<div className="row">
							                	<div className="col-xs-5">
							                    	<div className="logo">
							                        	<a href="index.html"><img src="http://139.59.7.53:3001/NOVAK-2.png" alt="Main Logo" className="img-responsive"/></a>
							                        </div>
							                    </div>
							                    <div className="col-xs-7 text-right register">
							                    	<a >{this.state.email} </a>
							                    	<a className="page-scroll">{this.state.temail}</a>
							                    	<Link to={{pathname:"/schoolTeacher", state:{s:this.state}}}>
							                        	Home
							                    	</Link>
							                    	<Link to={{pathname:"/schoolTeacher/myprofile", state:{s:this.state}}}>
							                        	My Profile
							                    	</Link>
							                    	<button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
							                    
							                    </div>
							                </div>
							            </div>
							        </div>
							    </header>*/}	
							    <TeacherHeader states={this.state} logMeOut={this.logMeOut} />    				

				{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.temail!=="" && this.props.location.state.s.temail!==null && this.props.location.state.s.temail!==undefined && this.props.location.state.s.tpassword && this.props.location.state.s.tpassword!==null && this.props.location.state.s.tpassword!==undefined && this.props.location.state.s.tpassword!=="" && this.props.location.state.s.teacherToken && this.props.location.state.s.teacherToken!==null && this.props.location.state.s.teacherToken!==undefined && this.props.location.state.s.teacherToken!=="" ? pageContent : <Redirect to="/" />}
				{this.state.shouldRedirectError ? <Redirect to={{pathname:"/", state:{teacher:"Please login Again"}}} /> : "" }
				{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/", state:{teacher:this.state.SuccessMessage}}} />:""}
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
				const showComments= (
				<div style={{"background":"grey"}}>
					{this.props.data.comments.map((comment, i) => <CommentBlock key={i} data={comment} />)}
				</div>
			)
			function reloadme(){
					window.location.reload(true)
				}
			const errorBox=(
				<div className="alert alert-danger">
					{this.props.s.errorMessage}
				</div>
			);

		debugger
		return(
				<div className="post-des-wrap">
					<div className="container">
						<div className="well">
					      <div className="media">
						      	<a className="pull-left profile_img" href="#">
						    		{this.props.s.teacherImage && this.props.s.teacherImage!=null ? <img src={this.props.s.teacherImage} alt="TeacherProfile" />:<img className="media-object" src="/Dummy_Image_Man.jpg" alt="Profile" />}
						  		</a>
						  		<div className="media-body">
						  			<h4 className="media-heading"><span>Student Name:</span>  {this.props.data.sname}</h4> 
						    		<h4 className="media-heading"><span>Heading : </span><Link to={{pathname:"/view/student/"+this.props.data.semail+"/viewpost/"+this.props.data._id, state:{s:this.props.s}}}> {this.props.data.posthead} </Link></h4>
						            <p><span>Teacher : </span>{this.props.data.tname}</p> 
						            <p><span>Description :</span> {this.props.data.description}</p>
							        <div className="media_part">
							          	{this.props.data.paths && this.props.data.paths!=null && this.props.data.paths.map((post, i) => <ImagesRow key={i} data2={post} s={this.state} />)}
								          <ul className="list-inline list-unstyled"> 
								  			<li><span><i className="glyphicon glyphicon-calendar"></i> {this.props.data.date} </span></li>
								            <li>|</li>
								            <li><span><i className="glyphicon glyphicon-comment"></i>{this.props.data.comments && this.props.data.comments!==null && this.props.data.comments!==undefined && this.props.data.comments.length>0? " "+this.props.data.comments.length: " 0" } Comments</span> </li>
								            <li>|</li>
								          </ul>
							        </div>
								
						       </div>

								<form id="contact" className={this.props.data._id+"-*-"+this.props.data.semail} onSubmit={this.props.handleSubmitC}>

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
					{/*console.log(this.props.data2)*/}
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
export default connect (null, {FetchTheStudentsPosts, saveTeacherPostOnStudent, uploadImage, logMeOut, TeacherCommenting}) (TeacherStudentTimeline)