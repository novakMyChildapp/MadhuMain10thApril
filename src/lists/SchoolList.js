import React from 'react'

import SchoolRow from "./SchoolRow"

export default function SchoolList ({schools})  {
	console.log("*** * * * * * *  ****** *" + schools)

	const emptyMessage= (
		<div>
			<h3 className="active">There are no schools yet in website </h3> <br/>
		</div>
		)
	const SchoolList=(


						<div className="SchoolsListMain container">

							<h1>Registered Schools List </h1> <br/>
								{schools.map((school, i)=><SchoolRow key={i} data={school} school={school} /> )}

						</div>
	)
	return(
		<div>
			{schools.length === 0 ? emptyMessage : SchoolList}
		</div>

	);
}

SchoolList.propTypes={

	schools: React.PropTypes.array.isRequired,


}

