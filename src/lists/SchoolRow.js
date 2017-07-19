import React from 'react'

export default function SchoolRow({ school }) {

      return (

		<div className="col-md-3 col-sm-3 col-xs-12">
  		<div className="card">
  		{
  			console.log(JSON.stringify(school.schoolImage))
  		}
  		{school.schoolImage && school.schoolImage!=null ? <img className="card-img-top" src={school.schoolImage} alt="School" /> :<img className="card-img-top" src="https://rajeshindia-production.s3.amazonaws.com/uploads/management/image/3/Dummy_Image_Man.jpg" alt="Card"/>}
  			
	      	<div className="card-block">
			    <h4 className="card-title">{school.name}</h4>
			    <p className="card-text" data-toggle="tooltip" title={school.email}>{school.email}</p>
			    
		  	</div>
	</div>

	</div>


      );

}
SchoolRow.propTypes={
	school: React.PropTypes.object.isRequired
}