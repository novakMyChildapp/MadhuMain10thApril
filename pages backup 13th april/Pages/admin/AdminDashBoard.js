// AdminDashBoard
import React from 'react';
import {  Redirect } from 'react-router';

import {connect} from 'react-redux'

import {fetchAndValidateAdminProfile, approveSchool, disapproveTheSchool, logMeOut} from '../../actions/AdminActions'

class AdminDashBoard extends React.Component{


		constructor(props){
			super(props)
			this.state={

				email:'',
				name:'',
				password:'',
				token:'',
				adminId:"",

				sessionExpired:false,
				redirectMeToHomePage:false,

				schoolsList:[],

				loading:false,
				done:false,
				errorState:false,
				errorMessage:"",
				SuccessMessage:"",
				shouldRedirect:false,
				reloadme:false,

			}
			this.approveSchool = this.approveSchool.bind(this);
			this.dissapproveSchool =  this.dissapproveSchool.bind(this);
			this.logMeOut = this.logMeOut.bind(this);
			// console.log(this.state.email)
		}
		componentWillMount (){
			debugger
			document.body.className = "green";
			if(this.props.location.state!=null)
			{
				this.setState({email:this.props.location.state.s.email})
				this.setState({password:this.props.location.state.s.password})
				this.setState({token: this.props.location.state.s.token})
				// this.setState({SuccessMessage: this.props.location.state.s.SuccessMessage})
				// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+JSON.stringify(this.props.location.state.s))
			}

		}
		componentDidMount(){
			debugger
			const {email, password,token} = this.state
			// debugger
			this.props.fetchAndValidateAdminProfile({email, password, token }).then(
				(response)=>{ this.setState({done:true}) ;
					 if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='' && response.success!==false )
					 	{this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}
					 if(response.success!==null && response.success===false){
					 	this.setState({"sessionExpired":true})
					 	this.setState({redirectMeToHomePage:true})
					 	this.setState({errorMessage:response.errorMessage})

					 }
					 else{console.log(response.success);console.log(response.success!==null); console.log(response.success===false); this.setState({loading:false, done:true, schoolsList: response.schools, adminId:response.admin._id})}},

				(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
			)
		}

		approveSchool(e){
			debugger
			this.setState({SuccessMessage:""})
			console.log(e.target)
			var confirmation = confirm("Do You Want to Approve This School")
			if(confirmation ===true){
				const id = e.target.value
				const {email, password, token} =this.state
				// debugger
				this.props.approveSchool({id, email, password, token}).then(
					(response)=>{ debugger; this.setState({done:true}) ;
					if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
						{
							debugger
							this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})
						}
						else{
								debugger
								this.setState({loading:false, done:true, SuccessMessage:"Successfully Approved", reloadme:true}); /*window.location.reload(true) */
								e.target.parentNode.parentNode.remove()
						}
					},

					(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
				)

					e.target.parentNode.parentNode.remove()


			
			}

		}
		dissapproveSchool(e){
			this.setState({SuccessMessage:""})
			// debugger
			console.log(e.target)
			var confirmation = confirm("Do You Want to Delete School Request")
			if(confirmation ===true){
				const id = e.target.value
				const {email, password, token} =this.state

				this.props.disapproveTheSchool({id, email, password, token}).then(
					(response)=>{ debugger; this.setState({done:true}) ;
							if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
								{
									this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})

								}
								else{ this.setState({loading:false, done:true, SuccessMessage:"Successfully Deleted Request", reloadme:true}) /*; window.location.reload(true)*/}},

					(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
				)
				e.target.parentNode.parentNode.remove()
			}
		}
		logMeOut(e){
			// debugger
			console.log(e.target.value)
			const {email, password, token} =this.state
				this.props.logMeOut({email, password, token}).then(
					(response)=>{ this.setState({done:true}) ; if(response.errorMessage && response.errorMessage!==undefined && response.errorMessage!==null && response.errorMessage!=='')
						{this.setState({errorState:true, errorMessage: response.errorMessage, loading:false})}
					else{ this.setState({loading:false, done:true, schoolsList: response.schools, sessionExpired:true,redirectMeToHomePage:true, SuccessMessage:response.SuccessMessage})}},

					(err) => err.response.json().then(({errors})=> { console.log("here"); this.setState({errors, loading:false})})
				)

		}


		render(){
			debugger
			
			const list=(
				<div className="dissapproveSchoolv">
					<h3> Schools Yet To Be Approved </h3>
					 
					 { this.state.schoolsList && this.state.schoolsList.map((school, i)=><SchoolList key={i} school={school}  states={this.state} approveSchool={this.approveSchool} dissapproveSchool={this.dissapproveSchool} /> )}
				</div>

				)
			const nothing=(
					<div>
						<br/><h2>No Schools to Approve yet. </h2>
					</div>

				)
			const pageContent=(

					<div>
					{console.log("777777777777777777777777777777")}
					{console.log(this.state.schoolsList)}
						{this.state.errorMessage && this.state.errorMessage!==null &&  this.state.errorMessage!==undefined && this.state.errorMessage!=="" && <div id="#warning" className="alert alert-danger">{this.state.errorMessage}</div>}
						{this.state.SuccessMessage && this.state.SuccessMessage!==null &&  this.state.SuccessMessage!==undefined && this.state.SuccessMessage!=="" && <div id="#warning" className="alert alert-success">{this.state.SuccessMessage}</div>}
						{this.state.reloadme && this.state.reloadme===true? <Redirect to={{pathname:"/novak/AdminPanel",state:{s:this.state}}} />:""}
						
						{this.state.schoolsList && this.state.schoolsList!=null && this.state.schoolsList.length>0? list:nothing}

					</div>

				)


			return(
					<div>
					 <header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                        	<a href="/"><img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/></a>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    	<a >{this.state.email} </a>
							            <button className="Admin_Logout" onClick={this.logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>

				                    
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>
				    <h1 style={{"padding-top":50+"px"}}>Schools Request Accept/Reject Area </h1>

						{this.props.location.state!==null && this.props.location.state.s!==undefined && this.props.location.state.s!==null && this.props.location.state.s.email!=="" && this.props.location.state.s.email!==null && this.props.location.state.s.email!==undefined && this.props.location.state.s.password && this.props.location.state.s.password!==undefined && this.props.location.state.s.password!==null && this.props.location.state.s.password!=="" && this.props.location.state.s.token && this.props.location.state.s.token!==null && (this.state.errorMessage===null || this.state.errorMessage==="")  ? pageContent : <Redirect to="/" />}
						{this.state.sessionExpired===true && this.state.redirectMeToHomePage===true ? <Redirect to={{pathname:"/novak/mainadmin/login", state:{errorMessage:this.state.errorMessage,SuccessMessage :this.state.SuccessMessage}}} />:""}
					</div>
				)


		}




}
function SchoolList ({school, state, approveSchool, dissapproveSchool})  {

	return(
				<div className="school-inner-wrap">

						<div className="school-inner-box">
							<span className="school-name">
								{school.name}
							</span>
							<span className="school-email">
								{school.email}
							</span>
						</div>
						<div className="Schools_Approved_btns">
							<button className="Approve" onClick={approveSchool} value={school._id}>Approve </button>
							<button className="Dissapprove" onClick={dissapproveSchool} value={school._id}>Dissapprove </button>
						</div>
				</div>

	);
}

export default connect(null, {fetchAndValidateAdminProfile, approveSchool, disapproveTheSchool, logMeOut}) (AdminDashBoard)