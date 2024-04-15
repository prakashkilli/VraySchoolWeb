import React, {Component} from "react";
import moment from "moment";
import { decode } from 'js-base64';
import CommonMethods from "../Common/CommonMethodsComponent";
import {GetUserCourse} from '../../Services.js';
import {useParams} from 'react-router-dom';
import Template1 from "../CoursePreview/template1";
import Template2 from "../CoursePreview/template2";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class CoursesView extends Component {
    constructor(props) {
        super(props);
        this.state={
          Template:'',
          Course:[],
          isCourseDateExpired: false,
          isCourseStarted: false,
          isCourseAssign: false,
          show_terms_and_conditions_modal: false,
          ShowCoursePreviewResetPopUp: false,
          ResetStatus: false,
          terms_and_conditions: "",
          isAgreeTermsAndConditions: false,
          isShowFeedBack: false,
          CourseId:0,
          UserId:0,
          IsPreview:false,
          isTimedExam: false,
          templateType: "",
          CourseCompleted:false
        }
        global.App = this;
      }
      componentDidMount = async() => {
        var courseData = this.props.params.courseData;
        courseData = decode(courseData);
        var parseCourseData = JSON.parse(courseData);
        parseCourseData = parseCourseData.Data.split(";");
        this.setState({CourseId:parseCourseData[0],UserId:parseCourseData[2],IsPreview:parseCourseData[1]});
        var courseId = parseCourseData[0];
        var isPreview = parseCourseData[1];
        var userId = parseCourseData[2];
        if(window.location.href.match("CourseView")) {
          await GetUserCourse(courseId,userId,isPreview ,res => {
            const {data, error } = res;
            if(data) {
              var _parsedJsonData = JSON.parse(data.settings);
    
              var _template =  CommonMethods.getDataFromJson(_parsedJsonData,"Isdicom_viewer");
              var Isshow_feedback = CommonMethods.getDataFromJson(_parsedJsonData,"Isshow_feedback");
              this.setState({Course:data,templateType:data.template.name, Template:_template == "" ?"Template1":_template,isCourseAssign: true,isShowFeedBack: Isshow_feedback});
              
              if(!JSON.parse(isPreview)) {
                    if(data.courseAssignment != ""){
                      for(var i = 0; i< res.data.courseAssignment.length;i++) {
                        var dbUserId = data.courseAssignment[i].userId;
                        if(dbUserId == null || dbUserId == "") {
                          var _groupUserIds = res.data.courseAssignment[i].userGroupUserIds;
                          for(var j = 0;j<=_groupUserIds.length;j++) {
                            if(_groupUserIds[j] == JSON.parse(userId)) {
                              var courseStartDate = this.formatDate(data.startDate);
                              var courseEndDate = data.endDate == null ? null :this.formatDate(data.endDate);
                              var currentDate = new Date().toLocaleString();
                              if(data.gracePeriod != undefined) {
                                var _time =  new Date(courseEndDate).setDate(new Date(courseEndDate).getDate() + data.gracePeriod);
                                _time = new Date(_time);
                                courseEndDate =this.formatDate(_time);
                               }
                              if(new Date(currentDate).getTime() >= new Date(courseStartDate).getTime() && new Date(currentDate).getTime() <= new Date(courseEndDate).getTime()) {
                                this.setState({isCourseStarted: true,isCourseDateExpired:false});
                              }
                              else {
                                if(new Date(currentDate).getTime() >= new Date(courseStartDate).getTime() && courseEndDate == "" && courseEndDate == null && courseEndDate == undefined) {
                                  this.setState({isCourseStarted: true,isCourseDateExpired: false});
                                }
                                else {
                                  this.setState({isCourseStarted: false,isCourseDateExpired: true});
                                }
                              }
                            }
                          }
                        }
                        else {
                          if(dbUserId == JSON.parse(userId)) {
                            var courseStartDate = this.formatDate(data.startDate);
                            var courseEndDate = data.endDate == null ? null :this.formatDate(data.endDate);
                            var currentDate = new Date().toLocaleString();
                            if(data.gracePeriod != undefined) {
                             var _time =  new Date(courseEndDate).setDate(new Date(courseEndDate).getDate() + data.gracePeriod);
                             _time = new Date(_time);
                             courseEndDate =this.formatDate(_time);
                            }
                            if(new Date(currentDate).getTime() >= new Date(courseStartDate).getTime() && new Date(currentDate).getTime() <= new Date(courseEndDate).getTime()) {
                              this.setState({isCourseStarted: true,isCourseDateExpired:false});
                            }
                            else {
                              if(new Date(currentDate).getTime() >= new Date(courseStartDate).getTime() && courseEndDate == "" || courseEndDate == null) {
                                this.setState({isCourseStarted: true,isCourseDateExpired: false});
                              }
                              else {
                                this.setState({isCourseStarted: false,isCourseDateExpired: true});
                              }
                            }
                          }
                        }
                      }
                    } else {
                      this.setState({isCourseAssign: false});
                        console.log(error);
                    }
                  }
            }
            else {
              console.error(error);
            }
          })
        }
    
        
        
      }
    render() {
        
        var courseData = this.props.params.courseData;
    courseData = decode(courseData);
    var parseCourseData = JSON.parse(courseData);
    parseCourseData = parseCourseData.Data.split(";");
    var userId = parseCourseData[2];
    var id = parseCourseData[0];
    var isPreview = parseCourseData[1];
    var isFaculty = parseCourseData[3];
    if(this.state.Course != "") {
        if (this.state.Template == "Template1") {
            return (<Template1 Course={this.state.Course} isTimedExam={this.state.isTimedExam} isNavigation={true} isFaculty={isFaculty} isShowFeedBack={this.state.isShowFeedBack} CourseId={id} IsPreview={isPreview} UserId={JSON.parse(userId)} TemplateType={this.state.templateType} />)
          }
          else if(this.state.Template == "Template2"){
            return (<Template2 Course={this.state.Course} isTimedExam={this.state.isTimedExam} isNavigation={true} isFaculty={isFaculty} isShowFeedBack={this.state.isShowFeedBack} CourseId={id} IsPreview={isPreview} UserId={JSON.parse(userId)} TemplateType={this.state.templateType} />)
          }
          else {
           return(<Template1 Course={this.state.Course} isTimedExam={this.state.isTimedExam} isNavigation={true} isFaculty={isFaculty} isShowFeedBack={this.state.isShowFeedBack} CourseId={id} IsPreview={isPreview} UserId={JSON.parse(userId)} TemplateType={this.state.templateType} />)
          }
    }
    else {
        return null;
      }        
    }
}
export default withParams(CoursesView);