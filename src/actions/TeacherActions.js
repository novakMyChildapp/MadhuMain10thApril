export const LOG_Teacher ="LOG_Teacher"
export const Teacher_Get_Students ="Teacher_Get_Students"
export const Teacher_Get_Students_Posts ="Teacher_Get_Students_Posts"
export const Teacher_Posts_On_Students_Timeline = "Teacher_Posts_On_Students_Timeline"
export const Teacher_Student_Particular_Post = "Teacher_Student_Particular_Post"
export const Teacher_Student_Particular_Post_Commenting ="Teacher_Student_Particular_Post_Commenting"

function handleResponse(response){

	if(response.ok){
		console.log("OK RESPONSE IN Teacher ACTION")
		console.log("$$$$$$$ $$$$$$$$$$$$ $$$$$$$$$$$$ $$$$$$$$$$$$$$ "+JSON.stringify(response))
		return response.json();
	}
	else{
		console.log("RESPONSE NOT OK in TEACHER ACTIOn")
		console.log(response)
		let error = new Error(response.statusText);
		error.response = response;
		throw error
	}

}
// *******************************************************************************************************************************************
export function getTeacher(teacher){
	console.log(teacher)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: LOG_Teacher,
		teacher
	}
}
// 
export function TeacherGetAllStudents(teacherStudents){
	console.log(teacherStudents)
	// console.log("BBBBBBBBBBBBBBB")
	return{
		type: Teacher_Get_Students,
		teacherStudents
	}
}
// TeacherGetAllStudentPosts
export function TeacherGetAllStudentPosts(teacherStudentsposts){
	console.log(teacherStudentsposts)
	console.log("BBBBBBBBBBBBBBB")
	return{
		type: Teacher_Get_Students_Posts,
		teacherStudentsposts
	}
}
// TeacherPostOnTimeLine
export function TeacherPostOnTimeLine(teacherPostsOnStudentsTimeLine){
	console.log(teacherPostsOnStudentsTimeLine)
	console.log("BBBBBBBBBBBBBBB")
	return{
		type: Teacher_Posts_On_Students_Timeline,
		teacherPostsOnStudentsTimeLine
	}
}
// TeacherViewParticularPost
export function TeacherViewParticularPost(TeacherParticularPost){
	console.log(TeacherParticularPost)
	console.log("BBBBBBBBBBBBBBB")
	return{
		type: Teacher_Student_Particular_Post,
		TeacherParticularPost
	}
}
// TeacherCommentingOnPost
export function TeacherCommentingOnPost(TeacherComments){
	console.log(TeacherComments)
	console.log("BBBBBBBBBBBBBBB")
	return{
		type: Teacher_Student_Particular_Post_Commenting,
		TeacherComments
	}
}

// *******************************************************************************************************************************************
export function TeacherLogins(data){
	console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/logmein",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}

export function FetchTheStudents(data){
	console.log("DATA gggggg   " +JSON.stringify(data))
	debugger
	return dispatch =>{
		return fetch("/api/teacher/getallstudents",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}

// FetchTheStudentsPosts
export function FetchTheStudentsPosts(data){
	console.log("DATA gggggg   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/getallstudentposts",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// saveTeacherPostOnStudent
export function saveTeacherPostOnStudent(data){
	console.log("Teacher Posting DATA  to student profile   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/postonstudentstimeline",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse).then(data=>dispatch(TeacherPostOnTimeLine(data)));;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// FetchTheStudentsPost
export function FetchTheStudentsPost(data){
	console.log("Teacher Posting DATA  to student profile   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/getthepost",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// TeacherCommenting
export function TeacherCommenting(data){
	console.log("Teacher Posting DATA  to student profile   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/post/comment",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}

// UpdateTeacherProfileDetails
export function UpdateTeacherProfileDetails(data){
	console.log("Teacher Posting DATA  to student profile   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/changePassword",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// FetchMyTProfile    to get my(teachers's) profile
export function FetchMyTProfile(data){
	console.log("Teacher Fething his own profile " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/FetchMyTProfile",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}
// uploadImage

export function uploadImage(data){
	console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/upload",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);;
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}

// logMeOut
export function logMeOut(data){
	debugger
	console.log("DATA of logMeOut funtion!!    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/teacher/logMeOut",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		//}).then(handleResponse).then(data=>dispatch(getschool(data)));;
	}
}