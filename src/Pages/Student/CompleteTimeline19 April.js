import React from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router';

import { FetchAllMyPosts, logMeOut } from '../../actions/StudentActions'
// FetchAllMyPosts

import StudentHeader from "./StudentHeader"   // Navigation bar of Admin
class CompleteTimeline extends React.Component{
	constructor(props){
			super(props)
			this.state={

				semail:'',
				sname:'',
				spassword:'',
				studentToken:'',

				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				shouldRedirect:false,
				myposts:[],
				shouldRedirectError:false,

				sessionExpired:false,
				redirectMeToHomePage:false,

			}
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
									this.setState({loading:false, done:true, shouldRedirect:true, myposts:response.posts})
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
		render(){


		const PostContainer=(
				<div>
				<br/>
				<br/>
				<br/>
					<h1>All Posts </h1>
					{this.state.myposts.map((post, i) => <TableRow key={i} data={post} s={this.state} />)}

				</div>
			)
		const NoContent=(
				<div>
				{console.log("_____________________________________________________")}
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

		return(

				<div className="post-des-wrap">
				<div className="container">
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
				<img src={"http://localhost:3001"+this.props.data2 }  alt="Uploads"/>
					{console.log(this.props.data2)}
				</div>

			)

	}
}

export default connect(null, {FetchAllMyPosts, logMeOut}) (CompleteTimeline)