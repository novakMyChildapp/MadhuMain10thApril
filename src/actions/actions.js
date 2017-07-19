export const SET_Schools = "SET_Schools"
export const ADD_Schools = "ADD_Schools"

export const GET_School = "GET_School"

export const GET_Teachers = "GET_Teachers"

// handling right as well as wrong response
function handleResponse(response){

	if(response.ok){
		// console.log("OK RESPONSE IN ACTION")
		// console.log(response.json())
		return response.json();
	}
	else{
		// console.log("RESPONSE NOT OK")
		// console.log(response)
		let error = new Error(response.statusText);
		error.response = response;
		throw error
	}

}



export function  setSchools(schools){
	return{
		type: SET_Schools,
		schools
	}
}
export function addSchools(school) {
	// console.log("schools 6 66 6 6 66 6 6 6 "+school)
	return{
		type: ADD_Schools,
		school
	}
}

export function getschool(school){
	// console.log(school)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: GET_School,
		school
	}
}
// schoolForgotPassword
// export function schoolForgotPassword(schoolPass){
// 	// console.log(school)
// 	// console.log("BBBBBBBBBBBBBBB")
// 	return{
// 		type: GET_schoolPass,
// 		schoolPass
// 	}
// }


export function saveSchoolLogin(data){
	// console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/newlogin",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse).then(data=>dispatch(addSchools(data)));
	}
}


export function SchoolLogins(data){
	// console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/Logmein",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse).then(data=>dispatch(getschool(data)));;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}



export function fetchSchools(){
	return dispatch=>{
		// console.log("ACTIONS ")
		fetch('/api/getSchools')
		.then(res=> res.json())
		.then(data=> dispatch(setSchools(data.schools)));
	}
}


// SchoolPasswordForgotRecovery
export function SchoolPasswordForgotRecovery(data){
	// console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/PasswordRecovery",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// TeacherPasswordForgotRecovery
export function TeacherPasswordForgotRecovery(data){
	// console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/Teachers/PasswordRecovery",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// StudentParentPasswordForgotRecovery
export function StudentParentPasswordForgotRecovery(data){
	// console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/StudentParent/PasswordRecovery",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}




// export function getTeachers(teachers) {
// 	console.log("........................................"+JSON.stringify(teachers))
// 	return{
// 		type: GET_Teachers,
// 		teachers
// 	}
// }

// export function FetchTeachers(data){
// 	return dispatch=>{
// 		console.log("ACTIONS Fetching Teachers")
// 		console.log("))))))))))))))))))))))))))))"+JSON.stringify(data))
// 		fetch('/api/schools/getallteachers',{
// 			method: 'post',
// 			body:JSON.stringify(data),
// 			headers:{
// 				"Content-Type": "application/json"
// 			}
// 		}).then(handleResponse)
// 		.then(data2=> dispatch(getTeachers(data2.allteachers)));
// 	}
// }