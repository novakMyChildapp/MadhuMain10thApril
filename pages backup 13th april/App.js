 import React, { Component } from 'react';
// import logo from './logo.svg';

import { Match } from 'react-router';


import AdminLoginPage from "./Pages/admin/AdminLoginPage";
import AdminDashBoard from "./Pages/admin/AdminDashBoard"

import SchoolPage from "./Pages/SchoolPage";
import SchoolForm from "./Pages/SchoolForm";
import SchoolLogin from "./Pages/SchoolLogin";

import ForgotSchoolPassword from "./Pages/ForgotSchoolPassword"
import ForgotTeacherPassword from "./Pages/ForgotTeacherPassword"
import ForgotStudentParentPassword from "./Pages/ForgotStudentParentPassword"

import SchoolDashBoard from "./Pages/School/SchoolDashBoard";
import MySchoolProfile from "./Pages/School/MySchoolProfile"
import SchoolTeachersList from "./Pages/School/SchoolTeachersList";
import SchoolStudentsList from "./Pages/School/SchoolStudentsList"

import SchoolTeachersView from "./Pages/School/SchoolTeachersView"
import SchoolTeachersProfileView from "./Pages/School/SchoolTeachersProfileView"

import SchoolStudentProfileView from "./Pages/School/SchoolStudentProfileView"

import TeacherForm from "./Pages/School/TeacherForm";
import StudentForm from "./Pages/School/StudentForm";


import TeacherDashboard from "./Pages/Teacher/TeacherDashboard"
import TeacherStudentTimeline from "./Pages/Teacher/TeacherStudentTimeline"
import TeacherStudentMainPost from "./Pages/Teacher/TeacherStudentMainPost"
import MyTeacherProfile from "./Pages/Teacher/MyProfile"


import StudentDashboard from "./Pages/Student/StudentDashboard"
import StudentTeacherTimeline from "./Pages/Student/StudentTeacherTimeline"
import StudentTeacherMainPost from "./Pages/Student/StudentTeacherMainPost"
import MyStudentParentProfile from "./Pages/Student/MyStudentParentProfile"
import CompleteTimeline from "./Pages/Student/CompleteTimeline"


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">


          <Match exactly pattern="/novak/mainadmin/login" component={AdminLoginPage}/>
          <Match exactly pattern="/novak/AdminPanel" component={AdminDashBoard} />

          <Match exactly pattern="/" component={SchoolLogin} />
          <Match exactly pattern="/schools" component={SchoolPage} />

          <Match exactly pattern="/school/forgotpassword" component={ForgotSchoolPassword} />
          <Match exactly pattern="/teacher/forgotpassword" component={ForgotTeacherPassword} />
          <Match exactly pattern="/studentParent/forgotpassword" component={ForgotStudentParentPassword} />

          <Match exactly pattern="/Register" component={SchoolForm} />
          <Match exactly pattern="/Login" component={SchoolLogin} />
          <Match exactly pattern="/schoolUser" component={SchoolDashBoard} />
          <Match exactly pattern="/schoolUser/myschoolprofile" component={MySchoolProfile} />
          <Match exactly pattern="/view/teachers" component={SchoolTeachersList} />
          <Match exactly pattern="/view/teachers/:id" component={SchoolTeachersView} />
          <Match exactly pattern="/view/teachers/:id/profile" component={SchoolTeachersProfileView} />

          <Match exactly pattern="/view/students" component={SchoolStudentsList} />
          <Match exactly pattern="/view/students/:id/profile" component={SchoolStudentProfileView} />

          <Match exactly pattern="/Register/teacher" component={TeacherForm} />
          <Match exactly pattern="/Register/student" component={StudentForm} />



          <Match exactly pattern="/schoolTeacher" component={TeacherDashboard} />
          <Match exactly pattern="/schoolTeacher/myprofile" component={MyTeacherProfile}/>
          <Match exactly pattern="/view/student/:id" component={TeacherStudentTimeline} />
          <Match exactly pattern="/view/student/:id/viewpost/:postId" component={TeacherStudentMainPost} />


          <Match exactly pattern="/studentParents" component={StudentDashboard} />
          <Match exactly pattern="/studentParents/MyProfile" component={MyStudentParentProfile} />
          <Match exactly pattern="/studentParents/timeline/:id" component={StudentTeacherTimeline} />
          <Match exactly pattern="/studentParents/timeline/:id/viewpost/:postId" component={StudentTeacherMainPost}/>
          <Match exactly pattern="/studentParents/completeTimeline" component={CompleteTimeline} />

            <footer>
                <div className="container">
                    <div className="copy pull-right">
                      <p>&copy; All Rights reserved. Powered By sitename.com</p>
                    </div>
                </div>
              </footer>
      </div>
    );
  }
}

export default App;
