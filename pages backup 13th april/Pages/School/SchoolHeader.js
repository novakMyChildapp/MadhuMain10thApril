import React from 'react'
import { Link, Redirect } from 'react-router';


export default function SchoolHeader({ states, logMeOut }) {
// debugger
      return (
				    <header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-3">
				                    	<div className="logo">
				                    		<Link to={{pathname:"/schoolUser", state:{s:states}}} >
				                        		<img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/>
				                        	</Link>
				                        </div>
				                    </div>
				                    <div className="col-xs-9 text-right register">
				                    	<div className="Toggle_mobile_btn"><i className="fa fa-bars" aria-hidden="true"></i></div>
				                    	<div className="main_menu">
				                    		{<a >{states.email} </a>}
					                    	<Link to={{pathname:"/schoolUser", state:{s:states}}} >
					                    		Home
					                    	</Link>
					                    	<Link to={{pathname:"/schooluser/myschoolprofile", state:{s:states}}} >
					                    		My Profile
					                    	</Link>
				                    		<button className="Admin_Logout" onClick={logMeOut}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
				                    	</div>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </header>
				)
  }

