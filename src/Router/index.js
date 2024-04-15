import React, { Component } from "react";
import { BrowserRouter as Router, Route,Routes,Outlet,Navigate} from "react-router-dom";
import NavMenu from "../Components/Navmenu";
import Header from "../Components/Header";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import Home from "../Components/Home";
import Software from "../Components/Software";
import Subscription from "../Components/Subscription";
import About from "../Components/About";
import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";
import Course1 from "../Components/Course1";
import Trainers2 from "../Components/Trainers2";
import Studentgallery from "../Components/Studentgallery";
import Footer from "../Components/Footer";
import Faqs from "../Components/Faqs";
import Contactus from "../Components/Contactus";
import Trainer from "../Components/Trainer";
import Register from "../Components/Login/Register";
import Allcourses from "../Components/Course1/Allcourses";
import Mycourses from "../Components/Course1/Mycourses";
import CoursesView from "../Components/CoursesView";
import Profile from "../Components/Profile";
import CourseInformation from "../Components/CourseInformation";
import ChangePassword from '../Components/Login/changepassword';

export default class Routing extends Component {
  constructor(props) {
    super(props);
    this.state= {
      
    }
  }
  render() {
      return (
        <Router>
            <Routes>     
                <Route path="/Login" element={<Login/>} />  
                {/* <Route path="*" element={<Navigate to="/Login" replace />} />  */}
                <Route path="/Register" element={<Register/>}/>    
                <Route  element={<DefaultContainer/>} >
                   <Route path="/home"  element={<Home/>} />                    
                   <Route path="/dashboard" element={<Dashboard/>}/>                    
                   <Route path="/Software" element={<Software/>}/>
                   <Route path="/Subscription" element={<Subscription/>}/>
                   <Route path="/About" element={<About/>}/>
                   <Route path="/Cart" element={<Cart/>}/>
                   <Route path="/trainers-2" element={<Trainers2/>}/>
                   <Route path="/Course1" element={<Course1/>}/>
                   <Route path="/studentgallery" element={<Studentgallery/>}/>
                   <Route path="/faqs" element={<Faqs/>}/>
                   <Route path="/contactus" element={<Contactus/>}/>
                   <Route path="/trainer" element={<Trainer/>}/> 
                   <Route path="/Allcourses" element={<Allcourses/>}/>
                   <Route path="*" element={<Navigate to="/Allcourses" replace />} /> 
                   <Route path="/Mycourses" element={<Mycourses/>}/>
                   <Route path="/profile/:id" element={<Profile/>}/>
                   <Route path="/CourseInformation/:id" element={<CourseInformation/>}/>
                   <Route path="/ChangePassword" element={<ChangePassword/>}/>
                </Route>
                <Route path="/Checkout" element={<Checkout/>}/>
                {/* <Route path='/CourseViewer/:courseData' render={(matchProps) =>
                  <CoursesView
                    {...matchProps}
                    {...this.props}
                  />
                }/> */}
                <Route path="/CourseViewer/:courseData" element={<CoursesView/>}/>
            </Routes>
        </Router>
      );
  }
}
class DefaultContainer extends Component {
    constructor(props) {
      super(props);
    }    
    render() {      
        return (
          <>        
            <Header></Header>     
            <NavMenu></NavMenu>                
            <Outlet/>     
            <Footer/>           
          </>
        );
  }
}