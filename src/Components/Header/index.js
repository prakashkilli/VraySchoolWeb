import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  GetLocalStorageData,
  GetAllCourses,
  ManagePaymentInformation,
  GetCartDetails,
  ShowLoader,
} from "../../Services";
import $ from "jquery";
import Cookies from "universal-cookie";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      UserId: 0,
      course: "",
      count: 0,
      CartCoursesList: [],
    };
    global.Header = this;
  }
  componentDidMount = async() => {
    let _data = GetLocalStorageData();
    if (_data != "" && _data != undefined) {
      this.setState({ name: _data[0].userName });
      this.setState({ UserId: _data[0].id });
        try{
          await GetCartDetails(_data[0].id, (res) => {
            const { data, status, error } = res;
            this.setState({ count: data.length });
          })
        }
        catch (e) {
          console.error(e);
          toast.error("Something went wrong");
        }   
    } else {
      this.setState({ name: "" });
      this.setState({ UserId: 0 });
    }
  };
  _handleOnManagePaymentDetailsClick = () => {
    try {
      var userInfo = GetLocalStorageData();
      if (userInfo != null) {
        var email = userInfo[0].primaryEmail;
        var userId = userInfo[0].id;
        ManagePaymentInformation(userId, email, (res) => {
          const { data, status, error } = res;
          if (status === 200) {
            window.open(
              data,
              "_blank",
              "location=yes,height=570,width=520,scrollbars=yes,status=yes"
            );
          } else {
            console.log(error);
            //alert("Something went wrong");
            toast.error("Something went wrong");
          }
        });
      }
    } catch (error) { 
      toast.error("Something went wrong");
    }
  };
  _handleClickOnLogin = () => {
    window.location.replace(window.location.origin + "/Login");
  };
  _handleOnLogOutClick = () => {
    toast.success("Logout successfully");
    const data = [];
    const id=0;
    
    localStorage.setItem("UserLoggedInData", JSON.stringify(data));
    localStorage.setItem("UserLoggedInId",JSON.stringify(id));
    const cookies = new Cookies();
    //cookies.set("UserId");
    window.location.replace(window.location.origin + "/");
  };
  _handleClickOnSignup = () => {
    window.location.replace(window.location.origin + "/Register");
  };
  _handleOnSearchClick = () => {
    try {
      $(".search-btn").hide();
      $(".search-overlay").fadeIn();
      $(".close-btn").addClass("active");
      this.setState({ course: "" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  _handleOnCloseClick = () => {
    try {
      $(".search-overlay").fadeOut();
      $(".search-btn").show();
      $(".close-btn").removeClass("active");
      if (window.location.href.match("Allcourses")) {
        var AllCourses = global.Allcourses.state.courses;
        global.Allcourses.setState({ tempallcourses: AllCourses });
      } else if (window.location.href.match("Mycourses")) {
        var AllCourses = global.Mycourses.state.MyCoursesList;
        global.Mycourses.setState({ tempmycourses: AllCourses });
      } else {
        var dashallcourses = global.Dashboard.state.AllCourses;
        var dashmycourses = global.Dashboard.state.MyCoursesList;
        global.Dashboard.setState({
          tempallcourses: dashallcourses,
          tempMycourses: dashmycourses,
        });
      }

      this.setState({ course: "" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  handleSrcClick = (course) => {
    //  window.location.href =  window.location.origin + "/dashboard?course="+course;
    if (window.location.href.match("dashboard")) {
      var dashallcourses = global.Dashboard.state.AllCourses;
      var dashmycourses = global.Dashboard.state.MyCoursesList;
      if (course != "") {
        var tempdashallcourses = dashallcourses.filter(
          (e) => {
            return e.name.toLowerCase().startsWith(course.toLowerCase());
          }
        );
        var tempdashmycourses = dashmycourses.filter(
          (el) => {
            return el.name.toLowerCase().startsWith(course.toLowerCase());
          }
        );
        global.Dashboard.setState({
          tempMycourses: tempdashmycourses,
          tempallcourses: tempdashallcourses,
        });
      } else {
        global.Dashboard.setState({ tempallcourses: dashallcourses });
        global.Dashboard.setState({ tempMycourses: dashmycourses });
      }
    } else if (window.location.href.match("Allcourses")) {
      var allcourses = global.Allcourses.state.AllCourses;
      if (course != "") {
        var allcoursesinfo = allcourses.filter(
          (el) => {
            return el.name.toLowerCase().startsWith(course.toLowerCase());
          }
        );
        global.Allcourses.setState({ tempallcourses: allcoursesinfo });
      } else {
        global.Allcourses.setState({ tempallcourses: allcourses });
      }
    } else if (window.location.href.match("Mycourses")) {
      var tempmycoursesmy = global.Mycourses.state.MyCoursesList;
      if (course != "") {
        var mycoursestemp = tempmycoursesmy.filter(
          (el) => {
            return el.name.toLowerCase().startsWith(course.toLowerCase());
          }
        );
        global.Mycourses.setState({ tempmycourses: mycoursestemp });
      } else {
        global.Mycourses.setState({ tempmycourses: tempmycoursesmy });
      }
    }
  };
  render() {
    const CourseCount = this.state.count;
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={ 3000 }
          hideProgressBar={ false }
          newestOnTop={ false }
          closeOnClick={ true }
          rtl={ false }
          pauseOnFocusLoss={ true }
          draggable={ false }
          pauseOnHover={ true }
        />
     
      <div className="top-header">
        <div className="container">
          <div className="top-innder-section">
            <div className="d-flex">
              <div className="openClose-time">
                <div className="login-sec">
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item">
                      <i
                        className="search-btn ti-search"
                        onClick={() => this._handleOnSearchClick()}
                      ></i>
                      <i
                        className="close-btn ti-close"
                        onClick={() => this._handleOnCloseClick()}
                      ></i>
                      <div className="search-overlay search-popup">
                        <div className="search-box">
                          <div className="search-form d-flex">
                            <input
                              className="search-input"
                              name="search"
                              placeholder="Search"
                              type="text"
                              value={this.state.course}
                              onChange={(e) => {
                                this.setState({ course: e.target.value });
                              }}
                              onKeyUp={() =>
                                this.handleSrcClick(this.state.course)
                              }
                            />
                            <button
                              className="search-button d-flex align-items-center justify-content-center"
                              type="submit"
                              onClick={() =>
                                this.handleSrcClick(this.state.course)
                              }
                            >
                              <i className="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <Link to="/Cart">
                    <i className="ti-shopping-cart"></i>
                  </Link>
                  <span className="cart-count">{CourseCount}</span>
                </div>
              </div>
            </div>

            <div className="top-logo">
              <Link to="/dashboard">
                <img
                  src="/assets/images/logo.png"
                  className="img-fluid"
                  alt=""
                />
              </Link>
            </div>

            <div className="d-flex">
              {this.state.name ? (
                <ul>
                  <li className="nav-item nav-profile dropdown d-inline-block">
                    <a
                      className="nav-link dropdown-toggle mr-1"
                      href="#"
                      data-toggle="dropdown"
                      id="profileDropdown"
                    >
                      <span className="nav-profile-name">
                        {this.state.name}
                      </span>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right navbar-dropdown py-0"
                      aria-labelledby="profileDropdown"
                    >
                      <Link
                        className="dropdown-item"
                        to={`/profile/${this.state.UserId}`}
                      >
                        <i className="fa fa-user mr-2" aria-hidden="true"></i>
                        Profile
                      </Link>
                      <Link
                        className="dropdown-item"
                        onClick={() =>
                          this._handleOnManagePaymentDetailsClick()
                        }
                      >
                        <i className="fa fa-cog mr-2" aria-hidden="true"></i>
                        Manage Card Information
                      </Link>
                      <Link className="dropdown-item" to="/ChangePassword">
                        <i className="fa fa-lock mr-2" aria-hidden="true"></i>
                        Change Password
                      </Link>
                      <span
                        type="button"
                        className="dropdown-item"
                        onClick={this._handleOnLogOutClick}
                      >
                        <i
                          className="fa fa-sign-out mr-2"
                          aria-hidden="true"
                        ></i>
                        Logout
                      </span>
                    </div>
                  </li>
                </ul>
              ) : (
                  <li>
                    <button
                      type="button"
                      className="btn get-a-quote mr-4"
                      onClick={this._handleClickOnSignup}
                    >
                      Sign Up
                  </button>
                    <button
                      type="button"
                      className="btn get-a-quote"
                      onClick={this._handleClickOnLogin}
                    >
                      Login
                  </button>
                  </li>
                )}
            </div>
          </div>
        </div>
      </div>
       </div>
    );
  }
}
