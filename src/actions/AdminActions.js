// handling right as well as wrong response
function handleResponse(response){

	if(response.ok){
		console.log("OK RESPONSE IN ACTION")
		// console.log(response.json())
		return response.json();
	}
	else{
		console.log("RESPONSE NOT OK")
		// console.log(response)
		let error = new Error(response.statusText);
		error.response = response;
		throw error
	}

}




export function AdminLogins(data){
	console.log("DATA!!    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/Admin/login",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// fetchAndValidateAdminProfile
export function fetchAndValidateAdminProfile(data){
	console.log("DATA!!    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/Admin/details",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}

// approveTheSchool
export function approveSchool(data){
	console.log("DATA!!    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/Admin/approveTheSchool",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// disapproveTheSchool
export function disapproveTheSchool(data){
	console.log("DATA!!    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/Admin/disapproveTheSchool",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// logMeOut
export function logMeOut(data){
	debugger
	console.log("DATA of logMeOut funtion!!    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/Admin/logMeOut",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}