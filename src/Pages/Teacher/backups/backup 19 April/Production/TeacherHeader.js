import React from 'react'
import { Link, Redirect } from 'react-router';


export default function TeacherHeader({ states, logMeOut }) {
debugger
      return (
				<header>
			    	<div className="header-top">
			        	<div className="container-fluid">
			            	<div className="row">
			                	<div className="col-xs-5 col-sm-3">
			                    	<div className="logo">
			                    		<Link to={{pathname:"/schoolTeacher", state:{s:states}}}>
			                        		<img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/>
			                        	</Link>
			                        </div>
			                    </div>
			                    <div className="col-xs-7 col-sm-9 text-right register">
			                    <div className="Toggle_mobile_btn"><i className="fa fa-bars" aria-hidden="true"></i></div>
			                    	<div className="main_menu">
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
			        </div>
			    </header>
			)
  }