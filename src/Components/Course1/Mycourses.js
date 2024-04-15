import React, { Component } from 'react';
import { GetUserCourses, ShowLoader, GetLocalStorageData, UnSubscribe_Course_To_User, AppSettings } from '../../Services';
import { Link } from 'react-router-dom';
import { encode, decode } from 'js-base64';
import CustomImage from "../Common/CustomImage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Mycourses extends Component {
  imageLocationUrl = AppSettings.appsettings["ImageURL"];
  constructor(props) {
    super(props);
    this.state = {
      MyCoursesList: [],
      tempMyCourses: [],
    }
    global.Mycourses = this;
  }
  componentDidMount = async () => {
    try {
      let _data = GetLocalStorageData();
      if (_data.length != 0) {
        await GetUserCourses(_data[0].id, (res) => {
          const { data, status, error } = res;
          if (status) {
            this.setState({ MyCoursesList: res.data });
            this.setState({ tempMyCourses: res.data });
          }
        });

      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  }
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
            toast.success("Course Unsubscribed successfully");
            debugger;
            var allUserCourses = this.state.MyCoursesList;
            const filteredData = allUserCourses.filter((item) => item.id !== CourseId);
            this.setState({ tempMyCourses: filteredData });
          } else {
            alert("Something went wrong");
          }
        });
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };
  _handleOnCourseViewClick = (CourseId) => {
    try {
      let LoginUserData = GetLocalStorageData();
      var _data = { "Data": CourseId + ";" + true + ";" + LoginUserData[0].id + ";" + false };
      var courseData = encode(JSON.stringify(_data));
      window.open(window.location.origin + "/CourseViewer/" + courseData, '_blank');
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  render() {
    const { tempMyCourses } = this.state;
    let _data = GetLocalStorageData();
    if (_data.length == 0) {
      return (<div className='container'><h1>Please login to see your courses</h1></div>)
    }
    else {
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

          <div className='container'>
            <div className="row mt-2 mb-1">
              <div className="col-sm-12">
                <div class="div-flex-align">
                  <h3 class="cssanimation sequence leFadeInLeft mb-0">Subscribed Courses</h3>
                  <Link className="link" to="/dashboard">Back to Dashboard </Link>
                </div>
              </div>
            </div>
            <div className="row course-card">
              {tempMyCourses.map((c) => {
                return (
                  <div className="col-sm-4 mb-4">
                    <div className="card zoom h-100" key={c.id}>
                      <div className="card-header">
                        <b title={c.name} className="txt-ellipsis">{c.name}</b>
                      </div>
                      <div className="card-body">
                        <div class="img-block">
                          <CustomImage src={this.imageLocationUrl + c.id + "&isCourseImage=true"} courseName={c.name} height={"h-180"}></CustomImage>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent d-inline-block">
                        <div className='d-flex align-items-center justify-content-between'>
                          <button className="btn btn-danger btn-sm bg-danger" onClick={() => this._handleUnSubscribeClick(_data[0].id, c.id)}> Un Subscribe </button>
                          <button className='btn btn-default btn-sm' onClick={() => this._handleOnCourseViewClick(c.id)}><i className="fa fa-eye" aria-hidden="true"></i> View Course</button>
                        </div>

                        <div className="mt-2">
                      {c.toDate >= 2 && c.toDate <= 7 ?
                        (                          
                          <div title={c.toDate} className="text-center">
                            <div className="text-danger mb-1">Your Course Expires in <b>{c.toDate} Days</b></div>
                            <div><a className="link" href="#">Click here to renewal course</a></div>
                          </div>
                        ) : c.toDate == 1 ?
                          (
                            <div title={c.toDate}  className="text-center">
                              <div className="text-danger mb-1">Your Course Expires in <b>1 Day</b></div>
                              <div><a className="link" href="#">Click here to renewal course</a></div>
                            </div>
                          ) : c.toDate < 1 ?
                            (
                              <div title={c.toDate} className="text-center">
                                <div className="text-danger mb-1">Your Course Expiring <b>Today</b></div>
                                <div><a className="link" href="#">Click here to renewal course</a></div>
                              </div>)
                            : ("")}

                      </div>
                      </div>
                      
                    </div>
                  </div>
                )

              })}
            </div>

          </div>
        </div>
      )
    }
  }
}
