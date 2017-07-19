import React from 'react'
import { Link } from 'react-router';


export default function StudentHeader({ states, logMeOut }) {
debugger
      return (
				    <header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-5">
				                    	<div className="logo">
				                    		<Link to={{pathname:"/studentParents", state:{s:states}}}>
				                        		<img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/>
				                        	</Link>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 text-right register">
				                    		
											{/*<a className="page-scroll">{states.semail} </a> */}
					                    	<Link to={{pathname:"/studentParents", state:{s:states}}}>
					                        	Home
					                    	</Link>
					                    	<Link to={{pathname:"/studentParents/completeTimeline", state:{s:states}}}>
					                        	Complete Timeline
					                    	</Link>
					                    	<Link to={{pathname:"/studentParents/MyProfile", state:{s:states}}}>
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