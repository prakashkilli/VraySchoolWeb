import React, { Component } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment/moment";
import "react-toastify/dist/ReactToastify.css";
import {
  GetcoursedetailsById,
  GetLocalStorageData,
  UnSubscribe_Course_To_User,
  SubscribeCourse_to_User,
  AppSettings,
  Add_Course_To_Cart,
  GetCourseSubscriptionPlans,
  GetExpiredCourses,
} from "../../Services";
import CustomImage from "../Common/CustomImage";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class CourseInformation extends Component {
  imageLocationUrl = AppSettings.appsettings["ImageURL"];
  subscriptionPlanMonth = 0;
  constructor(props) {
    super(props);
    this.state = {
      CourseInfo: {},
      CourseSubscriptionPlanDetails: [],
      isCourseSubscribed: false,
      isCourseRenewal: true,
      subscriptionPlanId: 0,
      subscriptionAmount: 0,
      subscriptionPlan: 0,
    };
  }
  componentDidMount = async () => {
    try {
      var courseId = parseInt(this.props.params.id);
      await GetcoursedetailsById(courseId, (res) => {
        const { data, status, error } = res;
        if (status === 200) {
          this.setState({ CourseInfo: data });
          var courseAssignment = data.courseAssignment;
          var userdata = GetLocalStorageData();
          var today = new Date();
          var date = moment(today).format("YYYY-MM-DD hh:mm:ss")
          if (courseAssignment != null || courseAssignment != undefined) {
            for (var i = 0; i < courseAssignment.length; i++) {
              if (courseAssignment[i].userId == userdata[0].id && courseAssignment[i].toDate < date ) { // Expiry Course Condition
                this.subscriptionPlanMonth = courseAssignment[i].subscriptionPlan;
                this.setState({ isCourseSubscribed: false });
                this.setState({ isCourseRenewal: false });
                break;
              }
              else if(courseAssignment[i].userId == userdata[0].id && courseAssignment[i].count <=7){ // Course will expiry with in 7 days
                this.subscriptionPlanMonth = courseAssignment[i].subscriptionPlan;
                this.setState({ isCourseSubscribed: false });
                this.setState({ isCourseRenewal: false });
                break;
              }
              else {
                this.setState({ isCourseRenewal: true });
              }
            }
          }
          else{
            this.setState({isCourseSubscribed: false});
            this.setState({ isCourseRenewal: true });
          }
          this.CourseSubscriptionPlans(courseId);
        } else {
          console.log(error);
          toast.error("Something went wrong");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    //  this.GetExpired_Courses();
  };
  CourseSubscriptionPlans = async (CourseId) => {
    try {
      await GetCourseSubscriptionPlans(CourseId, (res) => {
        const { data, status, error } = res;
        for (var i = 0; i < data.length; i++) {
          if (this.subscriptionPlanMonth == data[i].subscriptionPlan) {
            data[i].checked = true;
            this.setState({subscriptionPlanId: data[i].id});
          } else {
            data[i].checked = false;
          }
        }
        this.setState({ CourseSubscriptionPlanDetails: data });
      });
    } catch (error) {
      console.error(error);
    }
  };

  addtocart = () => {
    if (this.state.subscriptionPlanId == "") {
      toast.error("Please Select Subscription Plan");
    } else {
      let _data = GetLocalStorageData();
      if (_data.length != 0) {
        let user_id = _data[0].id;
        let Add_To_Cart = {
          userId: user_id,
          courseId: this.state.CourseInfo.id,
          Name: this.state.CourseInfo.name,
          id: this.state.subscriptionPlanId,
        };
        Add_Course_To_Cart(Add_To_Cart, (res) => {
          const { data, status, error } = res;
          if (status === 200) {
            if (res.data) {
              toast.success("Course added successfully");
              // alert(Amount*100);
              var AddToCartItem = global.Header.state.count;
              global.Header.setState({ count: AddToCartItem + 1 });
              window.location.replace(window.location.origin + "/Cart");
            } else {
              toast.error("Course already added to cart");
              window.location.replace(window.location.origin + "/Cart");
            }
          } else {
            console.log(error);
            toast.error("Something went wrong");
          }
        });
      } else {
        toast.error("Please Login");
      }
    }
  };
  subscribeCourseToUser = (Login_id, course_Id) => {
    try {
      if (this.state.subscriptionPlanId == 0) {
        toast.error("Please Select Subscription Plan");
      } else {
        //let login_id = Login_id;
        let _data = GetLocalStorageData();
        var email = _data[0].primaryEmail;
        var PlanId = this.state.subscriptionPlanId;
        var data = [
          {
            UserId: Login_id,
            EmailId: email,
            Planid: PlanId,
            courseId: course_Id,
          },
        ];
        SubscribeCourse_to_User(data, (res) => {
          const { data, status, error } = res;
          if (status == 200) {
            console.log(data);
            var AddToCartItem = global.Header.state.count;
            if (AddToCartItem != 0) {
              global.Header.setState({ count: AddToCartItem - 1 });
            }
            alert("Course Subscribed successfully");
            if (data.isSubscribed) {
               window.location.replace(window.location.origin + "/dashboard");
              this.setState({ isCourseSubscribed: true });
            } else {
              window.open(
                data.url,
                "_blank",
                "location=yes,height=570,width=520,scrollbars=yes,status=yes"
              );
            }
          } else {
            console.log(error);
            toast.error("Something went wrong");
          }
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };
  _handleUnSubscribeClick = (UserId, CourseId) => {
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
          isAssign: false,
          UserGroupId: 2,
        },
      ];
      UnSubscribe_Course_To_User(login_id, unAssign_user, (res) => {
        const { data, status, error } = res;
        if (status === 200) {
          toast.success("Course Unsubscribed successfully");
          var tempdata = this.state.CourseInfo;
          var userdata = GetLocalStorageData();
          var courseAssignment = tempdata.courseAssignment;
          for (var i = 0; i < courseAssignment.length; i++) {
            if (courseAssignment[i].userId == userdata[0].id) {
              courseAssignment.filter((x) => x.id != courseAssignment[i].id);
              this.setState({
                CourseInfo: tempdata,
                isCourseSubscribed: false,
              });
              break;
            }
          }
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
  _handleOnRadioButtonChange = (plan) => {
    try {
      var _details = this.state.CourseSubscriptionPlanDetails;
      for (var i = 0; i < _details.length; i++) {
        if (plan.id == _details[i].id) {
          _details[i].checked = true;
        } else {
          _details[i].checked = false;
        }
      }
      this.setState({
        subscriptionPlanId: plan.id,
        subscriptionAmount: plan.subscriptionAmount,
        subscriptionPlan: plan.subscriptionPlan,
        CourseSubscriptionPlanDetails: _details,
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  // renderCart = () => {
  //   window.location.replace(window.location.origin + "/Cart");
  // };
  render() {
    const { CourseInfo } = this.state;
    var _data = GetLocalStorageData();
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
          <div className="row">
            <div className="col-sm-2 mb-4"></div>
            <div className="col-sm-8 my-2">
              <div className="my-1 div-flex-align">
                <h2 className="cssanimation sequence leFadeInLeft mb-0">
                  {CourseInfo.name}
                </h2>
                <Link className="link" to="/dashboard">
                  Back to Dashboard{" "}
                </Link>
              </div>
            </div>
            <div className="col-sm-2 mb-4"></div>
          </div>
          <div className="row course-card">
            <div className="col-sm-2 mb-4"></div>
            <div className="col-sm-4 mb-4">
              <div class="card img-block">
                <CustomImage
                  src={
                    this.imageLocationUrl +
                    this.props.params.id +
                    "&isCourseImage=true"
                  }
                  courseName={CourseInfo.name}
                  height={"h-300"}
                ></CustomImage>
              </div>
            </div>
            <div className="col-sm-4 mb-4">
              <div key={CourseInfo.id}>
                {!this.state.isCourseSubscribed ? (
                  <div>
                    <div className="mb-2">
                      <b>Select Your Plan</b>
                    </div>
                    {this.state.CourseSubscriptionPlanDetails.map(
                      (e, index) => (
                        <div className="card mb-2 zoom" key={e.id}>
                          <div className="card-body py-2 div-flex-align">
                            <div>
                              <input
                                type={"radio"}
                                id={e.subscriptionPlan}
                                checked={e.checked}
                                value={e.subscriptionAmount}
                                className="radioPlan"
                                name="radioPlan"
                                onChange={() =>
                                  this._handleOnRadioButtonChange(e)
                                }
                              ></input>
                              <label
                                className="ml-1 mb-0"
                                for={e.subscriptionPlan}
                              >
                                {" "}
                                {e.subscriptionPlan} Months{" "}
                              </label>
                            </div>
                            <h2 className="mb-0">$ {e.subscriptionAmount}</h2>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div>
                    <label>
                      Your Subscription Plan : {this.state.subscriptionPlan}{" "}
                      Months
                    </label>
                    <label>
                      Your Subscription Plan Amount : $
                      {this.state.subscriptionAmount}
                    </label>
                    {/* <label>Your Plan valid from: to :</label> */}
                  </div>
                )}
                <div className="mt-1">
                  {!this.state.isCourseRenewal ? (
                    <>
                      <button
                        title="Subscribe"
                        className="d-inline-block badge badge-danger badge-pill border-0 text-center py-1"
                        target="_blank"
                        onClick={() => {
                          this.subscribeCourseToUser(
                            _data[0].id,
                            CourseInfo.id
                          );
                        }}
                      >
                        Renewal
                      </button>
                      <button
                        onClick={() => {
                          this.addtocart(_data[0].id, CourseInfo.id);
                        }}
                        className="d-inline-block badge badge-primary badge-pill border-0 text-center ml-2 py-1"
                      >
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        title="Subscribe"
                        className="d-inline-block badge badge-primary badge-pill border-0 text-center py-1"
                        target="_blank"
                        onClick={() => {
                          this.subscribeCourseToUser(
                            _data[0].id,
                            CourseInfo.id
                          );
                        }}
                      >
                        Subscribe
                      </button>
                      <button
                        onClick={() => {
                          this.addtocart(_data[0].id, CourseInfo.id);
                        }}
                        className="d-inline-block badge badge-primary badge-pill border-0 text-center ml-2 py-1"
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-sm-2 mb-4"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default withParams(CourseInformation);
