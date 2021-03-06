import React from 'react';

import SchoolList from '../lists/SchoolList'

import {connect} from 'react-redux';
import {fetchSchools} from '../actions/actions'

class SchoolPage extends React.Component{


	componentDidMount(){
		this.props.fetchSchools();
	}



	render(){

		return(

			<div>
			    <header>
			    	<div className="header-top">
			        	<div className="container">
			            	<div className="row">
			                	<div className="col-xs-5">
			                    	<div className="logo">
			                        	<a href="index.html"><img src="images/logo.png" alt="main Logo" className="img-responsive"/></a>
			                        </div>
			                    </div>
			                    <div className="col-xs-7 text-right register">
			                    	<a href="/register"><i className="fa fa-sign-in" aria-hidden="true"></i> Register</a>

			                    	<a href="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </header>

				<br/><h1> Welcome To schools List Page</h1><br/>
				<SchoolList schools={this.props.schools} />
			</div>

			);
	}

}

SchoolPage.propTypes={
	schools      : React.PropTypes.array.isRequired,
	fetchSchools : React.PropTypes.func.isRequired, 
}


function mapStateToProps(state){
	return{
		schools: state.schools
	}
}

export default connect(mapStateToProps, {fetchSchools})(SchoolPage);