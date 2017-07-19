import {SET_Schools, ADD_Schools, GET_School, GET_Teachers} from "../actions/actions"

import{ADD_Teachers, ADD_Students, GET_Students, GET_The_Teachers, Add_The_Student_To_Teacher} from "../actions/SchoolActions"

import {LOG_Teacher, Teacher_Get_Students, Teacher_Get_Students_Posts, Teacher_Posts_On_Students_Timeline, Teacher_Student_Particular_Post} from "../actions/TeacherActions"
import {Teacher_Student_Particular_Post_Commenting} from"../actions/TeacherActions"

import {LOG_Student, Get_My_Teachers, Get_My_TeachersPosts, Get_My_This_TeachersPost, StudentParent_Commenting} from "../actions/StudentActions"

export default function schools(state = [], action=[]){
	switch(action.type){
		case ADD_Schools:
		return[
			...state,
			action.school
		]

		case SET_Schools:
		{	
			console.log(action.schools)
			return action.schools
		}

		case GET_School:{
			return [
				...state,
				action.school
				]
		}

		case ADD_Teachers:{
			return [
				...state,
				action.teacher
				]
		}
		case GET_Teachers:{
			// console.log("RRREEEDDDUUUCCCEEERRR55 "+ JSON.stringify(action))
			// console.log("RRREEEDDDUUUCCCEEERRR "+ JSON.stringify(action.teachers.allteachers))
			return [
				...state,
				action.teachers
				]
		}
		case GET_The_Teachers:{
			// console.log("RRREEEDDDUUUCCCEEERRR Teacher====>"+ JSON.stringify(action))
			// console.log("RRREEEDDDUUUCCCEEERRR "+ JSON.stringify(action.teachers.allteachers))
			return [
				...state,
				action
				]
		}

		case ADD_Students:{
			// console.log("RRREEEDDDUUUCCCEEERRR "+ JSON.stringify(action))
			return[
				...state,
				action.student
			]
		}
		case GET_Students:{
			// console.log("RRREEEDDDUUUCCCEEERRR  7777777777777777 "+ JSON.stringify(action.students))
			return[
				...state,
				action.students
			]
		}
		case LOG_Teacher:{
			return [
				...state,
				action.teacher
				]

		}
		case LOG_Student:{
			return [
				...state,
				action.student
				]

		}





		case Add_The_Student_To_Teacher:{
			// console.log("RRREEEDDDUUUCCCEEERRR  7777777777777777 "+ JSON.stringify(action))
			return[
				...state,
				action
			]
		}
		case Teacher_Get_Students:{
			return[
			...state,
			action
			]
		}

		case Teacher_Get_Students_Posts:{
			// console.log("RRREEEDDDUUUCCCEEERRR  7777777777777777 "+ JSON.stringify(action))
			return[
				...state,
				action
			]
		}
		case Teacher_Posts_On_Students_Timeline:{
			// console.log("RRREEEDDDUUUCCCEEERRR  7777777777777777 "+ JSON.stringify(action))
			return[
				...state,
				action
			]
		}
		case Teacher_Student_Particular_Post:{
			// console.log("RRREEEDDDUUUCCCEEERRR  116 "+ JSON.stringify(action))
			return[
				...state,
				action
			]
		}
		case Teacher_Student_Particular_Post_Commenting:{
			// console.log("RRREEEDDDUUUCCCEEERRR  123 "+ JSON.stringify(action))
			return[
				...state,
				action
			]
		}




		case Get_My_Teachers:{
			// console.log("STUDENTRELATED REDUCER " + JSON.stringify(action))
			return[
				...state,
				action
			]
		}
		case Get_My_TeachersPosts:{
			// console.log("STUDENTRELATED REDUCER Get_My_TeachersPosts    " + JSON.stringify(action))
			return[
				...state,
				action
			]
		}
		// Get_My_This_TeachersPost
		case Get_My_This_TeachersPost:{
			// console.log("STUDENTRELATED REDUCER Get_My_This_TeachersPost    " + JSON.stringify(action))
			return[
				...state,
				action
			]
		}
		case StudentParent_Commenting:{
			// console.log("STUDENTRELATED REDUCER StudentParent_Commenting    " + JSON.stringify(action))
			return[
				...state,
				action
			]		}

		default: return state;
	}

}