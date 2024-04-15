import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navmenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogged : false,
        }
    }
     handleCourseClick = ()=>{
        var data = localStorage.getItem("UserLoggedInId");
        if(data != 0){
            window.location.replace(window.location.origin + "/dashboard");
        }
        else{
            window.location.replace(window.location.origin + "/Allcourses");
        }
     }
         render() {
        var location = window.location.href;
        var isUserLogged = this.state.isLogged;
        return (            
            <header className="custom-navbar" id="navigation">
                <div className="container">
                    <div className="row">
                        <div className="wow fadeInLeft" data-wow-delay="0.3s">
                            <div className="header-logo">
                                <a href="#"><img src="images/logo.png" className="img-fluid" alt="" /></a>
                            </div>
                        </div>
                        <div className="d-flex position-static menu-sec">
                            <nav className="main-menu-area mx-auto mobile-menu-active">
                                <ul className="main-menu">
                                    {/* <li className={location.match("/AllCourses") || location.match("/Mycourses")? "sub-menu-wrap active" : "sub-menu-wrap"}>
                                        <Link to={"/dashboard"}>Courses</Link>
                                        <ul className="sub-menu">
                                            <li><Link to="/Allcourses" className="nav-link">All Courses</Link></li>
                                            <li><Link to="/Mycourses" className="nav-link">My Courses</Link></li>
                                        </ul> 
                                    </li> */}
                                    <li><Link onClick={()=> this.handleCourseClick()}>Courses</Link></li>
                                    <li><Link to="/Subscription">Subscription</Link></li>
                                    <li><Link to="/Software">Software</Link></li>
                                    <li><Link to="/faqs">FAQ</Link></li>
                                    {/* <li className="sub-menu-wrap">
                                        <a href="javascript:void(0)">Knowledgebase</a>
                                        <ul className="sub-menu">
                                            <li><Link to="/trainers-2" className="nav-link">Trainers-2</Link></li>
                                            <li><Link to="/studentgallery">Student Gallery</Link></li>
                                            <li><a href="#" className="nav-link">Page 3</a></li>
                                        </ul>
                                    </li> */}
                                    <li><Link to="/About">About</Link></li>
                                    <li><Link to="/Contactus">Contact Us</Link></li>
                                    {/* <li className="sub-menu-wrap">
                                        <a href="#">About</a>
                                        <ul className="sub-menu">
                                            <li><Link to="/About" className="nav-link">Page 1</Link></li>
                                            <li><Link to="/About" className="nav-link">Page 2 </Link></li>
                                            <li><Link to="/About" className="nav-link">Page 3</Link></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </nav>
                            {/* <div className="mobile-menu-container"><span className="sr-only">Mobile Menu Will Come Here.</span></div> */}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}