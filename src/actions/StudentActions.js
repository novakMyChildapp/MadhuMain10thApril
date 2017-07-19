export const LOG_Student = "LOG_Student"
export const Get_My_Teachers = "Get_My_Teachers"
export const Get_My_TeachersPosts = "Get_My_TeachersPosts"
export const Get_My_This_TeachersPost = "Get_My_This_TeachersPost"
export const StudentParent_Commenting ="StudentParent_Commenting"

function handleResponse(response){

	if(response.ok){
		// console.log("OK RESPONSE IN ACTION")
		console.log("$$$$$$$ $$$$$$$$$$$$ $$$$$$$$$$$$ $$$$$$$$$$$$$$ "+JSON.stringify(response))
		return response.json();
	}
	else{
		console.log("RESPONSE NOT OK")
		console.log(response)
		let error = new Error(response.statusText);
		error.response = response;
		throw error
	}

}
// *******************************************************************************************************************************************
export function getStudentL(student){
	console.log(student)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: LOG_Student,
		student
	}
}
// getMyTeachers
export function getMyTeachers(myteachers){
	console.log(myteachers)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: Get_My_Teachers,
		myteachers
	}
}
// getMyTimelinePosts
export function getMyTimelinePosts(myteachersposts){
	console.log(myteachersposts)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: Get_My_TeachersPosts,
		myteachersposts
	}
}
// getMyTimelinePost
export function getMyTimelinePost(myparticularposts){
	console.log(myparticularposts)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: Get_My_This_TeachersPost,
		myparticularposts
	}
}
// StudentParentsCommenting
export function StudentParentsCommenting(studentParentComment){
	console.log(studentParentComment)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: StudentParent_Commenting,
		studentParentComment
	}
}




// *******************************************************************************************************************************************
export function StudentLogins(data){
	console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/logmein",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// FetchMyTeachers

export function FetchMyTeachers(data){
	console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/fetchmyteachers",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// FetchMyPosts
export function FetchMyPosts(data){
	console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/FetchMyPosts",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		// }).then(handleResponse).then(data2=>dispatch(getMyTimelinePosts(data2)));;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}

// FetchAllMyPosts
export function FetchAllMyPosts(data){
	console.log(" student profile   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/FetchAllOfMyPosts",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// FetchTheTeacherPost
export function FetchTheTeacherPost(data){
	console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/FetchMyParticularPost",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		// }).then(handleResponse).then(data2=>dispatch(getMyTimelinePost(data2)));;

		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// StudentCommenting
export function StudentCommenting(data){
	console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/comment",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		// }).then(handleResponse).then(data2=>dispatch(StudentParentsCommenting(data2)));;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
export function UpdateStudentProfileDetails(data){
	console.log("Teacher Posting DATA  to student profile   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/changePassword",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// FetchMySProfile
export function FetchMySProfile(data){
	console.log(" student profile   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/fetchStduentProfile",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}

export function logMeOut(data){
	console.log("DATA verification  for logout " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/student/logMeOut",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
	}
}

