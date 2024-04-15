import React, { Component } from "react";
import {
  UnSubscribe_Course_To_User,
  Getallcourses,
  GetLocalStorageData,
  GetUserCourses,
  ShowLoader,
  HideLoader,
  GetExpiredCourses,
  AppSettings
} from "../../Services";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { encode } from "js-base64";
import { useParams } from "react-router-dom";
import CustomImage from "../Common/CustomImage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default class Dashboard extends Component {
  imageLocationUrl = AppSettings.appsettings["ImageURL"];
  constructor(props) {
    super(props);
    this.state = {
      AllCourses: [],
      loginid: 0,
      MyCoursesList: [],
      tempallcourses: [],
      tempMycourses: [],
      ExpiredCoursesList: [],
      AllMyCoursesData: [],
      isSubscribed: false,
    };
    global.Dashboard = this;
  }
  componentDidMount = async () => {
    try {
      ShowLoader();
      this.GetAllCourses();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  GetAllCourses = async () => {
    try {
      await Getallcourses((result) => {
        const { data, error } = result;
        if (error) {
          // Handle error
          return;
        }
        if (data) {
          let _data = GetLocalStorageData();
          if (_data != null) {
            GetUserCourses(_data[0].id, (res) => {
              const { data, status, error } = res;                 
              if (status) {
                var ids = new Set(res.data.map(({ id }) => id));          
                GetExpiredCourses(_data[0].id,(rez) => { 
                  const { data, status, error } = rez; 
                  if(status){
                   var eids = new Set(rez.data.map(({ courseId }) => courseId));
                  }                  
                  var selectedRows = result.data.filter(({ id }) => !ids.has(id) && !eids.has(id));
                  selectedRows.forEach((element) => {
                    element.Text = "";
                    element.settings = JSON.parse(element.settings);
                  });                
                  this.setState({MyCoursesList: res.data.slice(0,6),tempMycourses: res.data.slice(0,6),AllMyCoursesData: res.data, AllCourses: selectedRows.slice(0, 6),tempallcourses: selectedRows.slice(0, 6),ExpiredCoursesList: rez.data });
                })
           
              }
            });
          }
        }
      });
      HideLoader();
      //this.GetExpired_Courses();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      HideLoader();
    }
  };
  GetSubscribedCourses = async () => {
    try {
      let _data = GetLocalStorageData();
      if (_data.length != 0) {
        await GetUserCourses(_data[0].id, (res) => {
          const { data, status, error } = res;
          if (status) {
            this.setState({ MyCoursesList: res.data.splice(0, 0) });
            this.setState({ tempMycourses: res.data.splice(0, 6) });
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  _handleOnCourseViewClick = (id) => {
    try {
      let LoginUserData = GetLocalStorageData();
      var _data = {
        Data: id + ";" + true + ";" + LoginUserData[0].id + ";" + false,
      };
      var courseData = encode(JSON.stringify(_data));
      window.open(
        window.location.origin + "/CourseViewer/" + courseData,
        "_blank"
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  _handleUnSubscribeClick = (UserId, CourseId) => {
    const confirmBox = window.confirm(
      "Do you really want to Unsubscribe the course?"
    )
    if (confirmBox === true) {
      try {
        let login_id = 0;
        let _data = GetLocalStorageData();
        if (_data.length != 0) {
          login_id = _data[0].id;
        }

        let unAssign_user = [
          {
            userId: UserId,
            courseId: CourseId,
            usergroupid: 2,
            isAssign: false,
          },
        ];
        UnSubscribe_Course_To_User(login_id, unAssign_user, (res) => {
          const { data, status, error } = res;

          if (status === 200) {
            
            toast.success("Un subscribed successfully").delay(10000)
            .fadeOut(10000);
            
            var allUserCourses = this.state.AllMyCoursesData;
            const filteredData = allUserCourses.filter((item) => item.id !== CourseId);
            this.setState({ tempMycourses: filteredData.slice(0, 6) });
            this.GetAllCourses();
          } else {
            console.log(error);
            toast.error("Something went wrong");
          }
        });
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    };
  }
  _handleOnAllCourseViewClick = (id) => {
    try {
      window.location.href =
        window.location.origin + "/CourseInformation/" + id;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // GetExpired_Courses = async () => {
  //   try {
  //     let _data = GetLocalStorageData();
  //     if(_data.length != 0){
  //     GetExpiredCourses(_data[0].id,(res)=>{
  //       const{data,status}=res;
  //       debugger;
  //       if(status == 200){
  //       this.setState({ExpiredCoursesList: data});
  //       }
  //     })
  //   }
  // }
  //   catch (error) {
  //     console.error(error);
  //     toast.error(error);
  //   }
  // }

  render() {
    let _data = GetLocalStorageData();
    var MyCourses = this.state.tempMycourses;
    var courses = this.state.tempallcourses;
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={false}
          pauseOnHover={true}
        />
        <div className="container">
          {/* <span>Hello</span> */}
          <div class="div-flex-align mt-4">
            <h3 className="cssanimation sequence leFadeInLeft">
              Subscribed Courses
            </h3>
            <Link to={"/Mycourses"} class="link">
              My Courses
            </Link>
          </div>
          <div className="row course-card">
            {MyCourses.map((c) => {
              return (
                <div className="col-sm-4 mb-4">
                  <div className="card zoom h-100" key={c.id}>
                    <div className="card-header">
                      <b title={c.name} className="txt-ellipsis">
                        {c.name}
                      </b>
                    </div>
                    <div className="card-body">
                      <div class="img-block">
                        <CustomImage src={this.imageLocationUrl + c.id + "&isCourseImage=true"} courseName={c.name} height={"h-180"}></CustomImage>
                        {/* <img
                          src={this.imageLocationUrl + c.id + "&isCourseImage=true"}
                          alt=""
                          class="h-200 w-100"
                        /> */}
                      </div>

                    </div>
                    <div className="card-footer bg-transparent d-inline-block">
                      <div className="d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-danger btn-sm bg-danger"
                          onClick={() =>
                            this._handleUnSubscribeClick(_data[0].id, c.id)
                          }
                        >
                          {" "}
                          Un Subscribe{" "}
                        </button>
                        <button
                          className="btn btn-default btn-sm"
                          onClick={() => this._handleOnCourseViewClick(c.id)}
                        >
                          {" "}
                          <i className="fa fa-eye" aria-hidden="true"></i> View
                          Course{" "}
                        </button>
                      </div>

                      <div className="mt-2">
                      {c.toDate >= 2 && c.toDate <= 7 ?
                        (
                          <div  title={c.toDate} className="text-center">
                            <div className="text-danger mb-1">Your Course Expires in <b>{c.toDate} Days</b></div>
                              <div><Link className="link" onClick={() => this._handleOnAllCourseViewClick(c.id)}>Click here to ReNew course</Link></div>
                          </div>
                        ) : c.toDate == 1 ?
                          (
                            <div title={c.toDate} className="text-center">
                            <div className="text-danger mb-1">Your Course Expires in <b>1 Day</b></div>
                              <div><Link className="link" onClick={() => this._handleOnAllCourseViewClick(c.id)}>Click here to ReNew course</Link></div>
                          </div>
                          ) : c.toDate < 1 ?
                            (
                              <div title={c.toDate} className="text-center">
                                <div className="text-danger mb-1">Your Course Expiring <b>Today</b></div>
                                  <div><Link className="link" onClick={() => this._handleOnAllCourseViewClick(c.id)}>Click here to ReNew course</Link></div>
                              </div>)
                            : ("")}

                    </div>

                    </div>
                    
                  </div>
                </div>
              );
            })}
          </div>
          <div class="div-flex-align mt-4">
            <h3 className="cssanimation sequence leFadeInLeft">
              Expired Courses
            </h3>
            {/* <Link to={"/Mycourses"} class="link">
            Expired Course
            </Link> */}
          </div>
          <div className="row course-card">
            {this.state.ExpiredCoursesList.map((c) => {
              return (
                <div className="col-sm-4 mb-4">
                  <div className="card zoom h-100" key={c.id} >
                    <div className="card-header">
                      <b title={c.name} className="txt-ellipsis">
                        {c.name}
                      </b>
                    </div>
                    <div className="card-body">
                      <div class="img-block">
                        <CustomImage src={this.imageLocationUrl + c.courseId + "&isCourseImage=true"} courseName={c.name} height={"h-180"}></CustomImage>
                        {/* <img
                          src={this.imageLocationUrl + c.id + "&isCourseImage=true"}
                          alt=""
                          class="h-200 w-100"
                        /> */}
                      </div>

                    </div>
                     <div className="card-footer bg-transparent d-inline-block d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-danger btn-sm bg-danger"
                        onClick={() => this._handleOnAllCourseViewClick(c.courseId)}
                      >
                        {" "}
                        ReNew{" "}
                      </button>
                    </div>

                      {/*

                      
                      <button
                        className="btn btn-default btn-sm"
                        onClick={() => this._handleOnCourseViewClick(c.id)}
                      >
                        {" "}
                        <i className="fa fa-eye" aria-hidden="true"></i> View
                        Course{" "}
                      </button>
                    </div> */}
                  </div>
                  {/* <div>
                    {c.toDate <= 7 ? (
                      <label title={c.toDate} className="txt-ellipsis">
                        Your Course Expires in &nbsp;
                        <b>{c.toDate} Days</b>
                      </label>
                    ) : (<label title={c.toDate} className="txt-ellipsis">
                      Please Renewal Your Course
                    </label>)}
                  </div> */}


                </div>
              );
            })}
          </div>
          <div class="div-flex-align mt-4">
            <h3 className="cssanimation sequence leFadeInLeft">All Courses</h3>
            <Link to={"/Allcourses?isLogin=true"} class="link">
              All Courses
            </Link>
          </div>
          <div className="row course-card">
            {courses.map((el) => {
              return (
                <div className="col-sm-4 mb-4" key={el.id}>
                  {/* <Card.Img variant="top" src="../Images\Madelung 3.jpg"/> */}
                  <div
                    className="card cursor-pointer zoom h-100"
                    onClick={() => this._handleOnAllCourseViewClick(el.id)}
                  >
                    <div className="card-header">
                      <b title={el.name} className="txt-ellipsis">
                        {el.name}
                      </b>
                    </div>
                    <div className="card-body">
                      <div class="img-block">
                        <CustomImage src={this.imageLocationUrl + el.id + "&isCourseImage=true"} courseName={el.name} height={"h-180"}></CustomImage>
                        {/* <img
                        src={this.imageLocationUrl + el.id + "&isCourseImage=true"}
                        alt=""
                        class="h-200 w-100"
                      /> */}
                      </div>
                    </div>
                    <div className="card-footer bg-transparent d-inline-block">
                      <div className="row">
                        <div className="col-md-10"></div>

                        <div className="col-md-2 text-right algin-self-center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}
