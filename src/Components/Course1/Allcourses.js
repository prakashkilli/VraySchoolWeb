import React, { Component } from 'react'
import { AssignCourse_to_User, Getallcourses, GetLocalStorageData ,GetUserCourses,AppSettings,GetExpiredCourses} from '../../Services';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import CustomImage from "../Common/CustomImage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Allcourses extends Component {
  imageLocationUrl = AppSettings.appsettings["ImageURL"];
  constructor() {
    super();
    this.state = {
      courses: [],
      tempallcourses: [],
    }
    global.Allcourses=this;
  }
  componentDidMount = async () => {
    
    try {
      await Getallcourses((result) => {
      
        const { data, error } = result;
        if (error) {
          toast.error(error);
          return;
        }
        if (data) {
          
          let UserId = JSON.parse(localStorage.getItem("UserLoggedInId"));
         
        
          if(UserId){
            GetUserCourses(UserId,(res)=>{
              const {data,status,error}=res;
              if(status){
                var ids=new Set(res.data.map(({id})=>id));
                 GetExpiredCourses(UserId,(rez) => { 
                
                  const { data, status, error } = rez; 
                  if(status){
                   var eids = new Set(rez.data.map(({ courseId }) => courseId));
                  }                  
                  var selectedRows = result.data.filter(({ id }) => !ids.has(id) && !eids.has(id));
                  selectedRows.forEach((element) => {
                  element.Text = "";
                  element.settings = JSON.parse(element.settings);
                });
                this.setState({courses: selectedRows });
                this.setState({tempallcourses: selectedRows });
              })
             }
            })
          }
          else{
            data.forEach((element) => {
              element.Text = "";
              element.settings = JSON.parse(element.settings);
            });
            this.setState({courses: data });
            this.setState({tempallcourses: data});
          }
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }    
  }  
  _handleOnCourseViewClick = (id) => {
    try {
      let UserId = JSON.parse(localStorage.getItem("UserLoggedInId"));
      if(UserId) {
        window.location.href =  window.location.origin + "/CourseInformation/" + id;
      }
      else {
         toast.error("Please login to see course information.");
      }      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  render() {
    let filterdata = this.state.tempallcourses;
    const params = new URLSearchParams(window.location.search) // id=123
    let isLogin = params.get('isLogin');
   // let dataid = JSON.parse(localStorage.getItem("UserLoggedInId"));
    let _data = GetLocalStorageData();
    let UserId = JSON.parse(localStorage.getItem("UserLoggedInId"));
    if(_data != "" && _data != undefined && _data != null && !JSON.parse(isLogin)) {
      window.location.replace(window.location.origin + "/dashboard");
    }
    else {
      return (
        <div class="container">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={false}
            pauseOnHover={true}
          />
        <div className="row mt-2 mb-1">
            <div className="col-sm-12">
              <div class="div-flex-align">
                <h3 class="cssanimation sequence leFadeInLeft mb-0">All Courses</h3>
                {
                  UserId ?
                   ( <Link className="link" to="/dashboard">Back to Dashboard </Link>)
                   :("")
                }
              </div>
            </div>
          </div>
          <div className="row course-card">
            {filterdata.map((el) => {
                  return (
                    <div className="col-sm-4 mb-4" key={el.id}>
                      <div className="card cursor-pointer zoom" onClick={() => this._handleOnCourseViewClick(el.id)}>
                        <div className="card-header">
                          <b title={el.name} className="txt-ellipsis">{el.name}</b>
                        </div>
                        <div className="card-body">
                          <div class="img-block">
                          <CustomImage src={this.imageLocationUrl + el.id + "&isCourseImage=true"} courseName={el.name} height={"h-180"}></CustomImage>                            
                          </div>
                        </div>                        
                        <div className="card-footer bg-transparent d-inline-block">
                          <div className="row">
                            <div className="col-md-10">                           
                              
                            </div>    
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  );  
            })}
          </div>
        </div>
      )
    }
    
  }
}
