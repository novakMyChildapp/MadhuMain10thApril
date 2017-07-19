import React from 'react'
import { Link, Redirect } from 'react-router';


export default function SchoolHeader({ states, logMeOut }) {
	function OpenMe(){
		console.log("HIII")
	    var x = document.body;
	    if (x.className=="green") {
	        x.className = 'green open';
	    } else {
	        x.className = 'green';
	    }
	}

// debugger
      return (
				    <header>
				    	<div className="header-top">
				        	<div className="container-fluid">
				            	<div className="row">
				                	<div className="col-xs-5 col-sm-3">
				                    	<div className="logo">
				                    		<Link to={{pathname:"/schoolUser", state:{s:states}}} >
				                        		<img src="/NOVAK-2.png" alt="Main Logo" className="img-responsive"/>
				                        	</Link>
				                        </div>
				                    </div>
				                    <div className="col-xs-7 col-sm-9 text-right register">
				                    	<div className="Toggle_mobile_btn"><i className="fa fa-bars" aria-hidden="true" onClick={OpenMe}></i></div>
				                    	<div className="main_menu">
				                    		{/*<a >{states.email} </a>*/}
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

