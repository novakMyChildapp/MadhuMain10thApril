export const ADD_Teachers = "ADD_Teachers"
export const GET_Teachers = "GET_Teachers"
export const ADD_Student = "ADD_Student"
export const GET_Students = "GET_Students"
export const GET_The_Teachers ="GET_The_Teachers"
export const Add_The_Student_To_Teacher = "Add_The_Student_To_Teacher"

function handleResponse(response){

	if(response.ok){
		// console.log("OK RESPONSE IN ACTION")
		// console.log("$$$$$$$ $$$$$$$$$$$$ $$$$$$$$$$$$ $$$$$$$$$$$$$$ "+JSON.stringify(response))
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

export function addTeacher(teacher) {
	// console.log("schools 6 66 6 6 66 6 6 6 "+JSON.stringify(teacher))
	return{
		type: ADD_Teachers,
		teacher
	}
}

export function addStudent(student) {
	// console.log("schools 6 66 6 6 66 6 6 6 "+JSON.stringify(student))
	return{
		type: ADD_Student,
		student
	}
}


export function getTeachers(teachers) {
	// console.log("........................................"+JSON.stringify(teachers))
	return{
		type: GET_Teachers,
		teachers
	}
}

export function getStudents(students) {
	// console.log("......................students.................."+JSON.stringify(students))
	return{
		type: GET_Students,
		students,
	}
}

export function getTheTeachers(teachers) {
	// console.log("........................................"+JSON.stringify(teachers))
	return{
		type: GET_The_Teachers,
		teachers
	}
}
// addStudentToTeacher
export function addStudentToTeacher(addStu) {
	// console.log("........................................"+JSON.stringify(addStu))
	return{
		type: Add_The_Student_To_Teacher,
		addStu
	}
}

// VerifySchool
export function VerifySchool(data){
	console.log("DATA verification   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/verifyme",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
	}
}
// logMeOut
export function logMeOut(data){
	console.log("DATA verification   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/logMeOut",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
	}
}

// mySchoolProfilePic
export function mySchoolProfilePic(data){
	console.log("mySchoolProfilePic   " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/mySchoolProfilePic",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
	}
}


export function TeacherRegistration(data){
	// console.log("DATA    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/teacher/registration",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse).then(data=>dispatch(addTeacher(data)));
	}
}


// view all teachers
export function FetchTeachers(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Teachers")
		// console.log("))))))))))))))))))))))))))))"+JSON.stringify(data))
		return fetch('/api/schools/getallteachers',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
	}
}
// DeleteTeacher
export function DeleteTeacher(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Teachers")
		// console.log("))))))))))))))))))))))))))))"+JSON.stringify(data))
		return fetch('/api/schools/deleteTheTeacher',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		
	}
}



export function FetchTheTeacher(data){
	return dispatch=>{
		console.log("ACTIONS Fetching One Teacher")
		// console.log("))))))))))))))))))))))))))))"+JSON.stringify(data))
		return fetch('/api/schools/gettheteacher',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);//************************************************************************
	}
}

// AddStudentToTeacher
export function AddStudentToTeacher(data){
	return dispatch=>{
		console.log("ACTIONS Adding student to teacher")
		// console.log("))))))))))))))))))))))))))))"+JSON.stringify(data))
		return fetch('/api/schools/teacher/addStudent',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);//************************************************************************
	}
}
// DeAssignStudentToTeacher
export function DeAssignStudentToTeacher(data){
	return dispatch=>{
		console.log("ACTIONS Deleting student from teacher")
		// console.log("))))))))))))))))))))))))))))"+JSON.stringify(data))
		return fetch('/api/schools/teacher/DeassignStudent',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
	}
}


export function StudentRegistration(data){
	// console.log("DATA   StudentRegistration    " +JSON.stringify(data))
	return dispatch =>{
		return fetch("/api/schools/student/registration",{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse).then(data=>dispatch(addStudent(data)));
	}
}

export function FetchStudents(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Students")
		// console.log("))))  )))))  )))))  )))))   ))))))   )))"+JSON.stringify(data))
		return fetch('/api/schools/getallstudents',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
	}
}

// DeleteStudent
export function DeleteStudent(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Students")
		// console.log("))))  )))))  )))))  )))))   ))))))   )))"+JSON.stringify(data))
		return fetch('/api/schools/deleteTheStudent',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		
	}
}


// UpdateSchoolProfileDetails
export function UpdateSchoolProfileDetails(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Students")
		// console.log("))))  )))))  )))))  )))))   ))))))   )))"+JSON.stringify(data))
		return fetch('/api/schools/changepassword',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse);
	}
}

// FetchTeacherProfile
export function FetchTeacherProfile(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Students")
		// console.log("))))  )))))  )))))  )))))   ))))))   )))"+JSON.stringify(data))
		return fetch('/api/schools/FetchTeacherProfile',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
	}
}

// TeacherProfileUpdation
export function TeacherProfileUpdation(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Students")
		// console.log("))))  )))))  )))))  )))))   ))))))   )))"+JSON.stringify(data))
		return fetch('/api/schools/TeacherProfileUpdation',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
	}
}
// FetchStudentProfile 
export function FetchStudentProfile(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Students")
		// console.log("))))  )))))  )))))  )))))   ))))))   )))"+JSON.stringify(data))
		return fetch('/api/schools/FetchStudentProfile',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
	}
}

// StudentProfileUpdation
export function StudentProfileUpdation(data){
	return dispatch=>{
		// console.log("ACTIONS Fetching Students")
		// console.log("))))  )))))  )))))  )))))   ))))))   )))"+JSON.stringify(data))
		return fetch('/api/schools/StudentProfileUpdation',{
			method: 'post',
			body:JSON.stringify(data),
			headers:{
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
	}
}