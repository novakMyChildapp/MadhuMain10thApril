import React from 'react'
import { Link, Redirect } from 'react-router';


export default function TeacherHeader({ states, logMeOut }) {
debugger
      return (
				<header>
			    	<div className="header-top">
			        	<div className="container-fluid">
			            	<div className="row">
			                	<div className="col-xs-5">
			                    	<div className="logo">
			                    		<Link to={{pathname:"/schoolTeacher", state:{s:states}}}>
			                        		<img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/>
			                        	</Link>
			                        </div>
			                    </div>
			                    <div className="col-xs-7 text-right register">
			                    	<a >{states.email} </a>
			                    	<a className="page-scroll">{states.temail}</a>
			                    	<Link to={{pathname:"/schoolTeacher", state:{s:states}}}>
			                        	Home
			                    	</Link>
			                    	<Link to={{pathname:"/schoolTeacher/myprofile", state:{s:states}}}>
			                        	My Profile
			                    	</Link>
			                    	<button className="Admin_Logout" onClick={logMeOut}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</button>
			                    
			                    </div>
			                </div>
			            </div>
			        </div>
			    </header>
			)
  }