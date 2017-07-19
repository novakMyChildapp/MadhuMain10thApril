import React from 'react';
import {connect} from 'react-redux';
import { FetchMyPosts } from '../../actions/StudentActions'
import { Link, Redirect } from 'react-router';

class StudentTeacherTimeline extends React.Component{
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
				myposts:[]

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

				// console.log("I AM HERE")
				// console.log(this)
			}
		}
		componentDidMount (){
			console.log(this.props)
							const {semail, spassword} = this.props.location.state.s
				const TId =this.props.params.id
			if(this.props.location.state!=null)
			{
				this.props.FetchMyPosts({semail, spassword, TId})
				.then(
					(response)=>{this.setState({done:true}) ;
						if(response.myteachersposts.errorMessage && response.myteachersposts.errorMessage!==undefined && response.myteachersposts.errorMessage!==null && response.myteachersposts.errorMessage!==''){
							this.setState({errorState:true, errorMessage: response.myteachersposts.errorMessage, loading:false})
						}else{
							this.setState({loading:false, done:true, shouldRedirect:true, myposts:response.myteachersposts.posts})
							console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRREEEEEEEEEEEEEE")
							console.log(this.state)
						}
				},
				(err) => err.response.json().then(({errors})=> { console.log("#################@@@@@@@@@@@@@@@@@@@@here"); this.setState({errors, loading:false})})
				)

			}
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
				                    	<Link to={{pathname:"/studentParents", state:{s:this.state}}}>
				                        	Home
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
				                </ul>
				            </div>
				           
				        </div>
      
    				</nav>
					{this.state.myposts && this.state.myposts!==null && this.state.myposts!==undefined && this.state.myposts.length>0 ? PostContainer : NoContent }

				</div>
	)

		return(


				<div>
						{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.semail!=="" && this.props.location.state.s.semail!==null && this.props.location.state.s.semail!==undefined && this.props.location.state.s.spassword && this.props.location.state.s.spassword!=null && this.props.location.state.s.spassword!=undefined && this.props.location.state.s.spassword!="" ? pageContent : <Redirect to="/" />}

				</div>
			);
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
					    		<img className="media-object" src="http://placekitten.com/150/150" />
					  		</a>
					  		<div className="media-body">
					  			<h4 className="media-heading">Student Name:  {this.props.data.sname}</h4>
					    		<h4 className="media-heading">Heading : <Link to={{pathname:"/studentParents/timeline/"+this.props.data.temail+"/viewpost/"+this.props.data._id, state:{s:this.props.s}}} >{this.props.data.posthead} </Link></h4>
					          <p>Teacher : {this.props.data.tname}</p> 
					          <p>Description : {this.props.data.description}</p>
					          <ul className="list-inline list-unstyled"> 
					  			<li><span><i className="glyphicon glyphicon-calendar"></i> {this.props.data.date} </span></li>
					            <li>|</li>
					            <span><i className="glyphicon glyphicon-comment"></i> {this.props.data.comments && this.props.data.comments!=null && this.props.data.comments!=undefined && this.props.data.comments.length>0?" "+this.props.data.comments.length : " 0" }  Comments</span>
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

export default connect(null, {FetchMyPosts}) (StudentTeacherTimeline)