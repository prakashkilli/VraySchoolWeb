import React,{Component} from 'react';
import { Link, useParams } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import "react-perfect-scrollbar/dist/css/styles.css";
import {InsertModuleContentResponse,SaveFlagResponse} from '../Services.js';
import CommonMethods from './Common/CommonMethodsComponent';
// import FlagModulebar from './FlagModulebar/FlagModulebar';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
class ModuleBar extends Component {
    constructor(props) {
        super(props);
        this.state ={
          statusInProgress : 'mdi mdi-check-circle status-inprogress',
          statusCompleted: 'mdi mdi-check-circle status-completed',
          normalStatus: 'mdi mdi-check-circle',
        }
        global.ModuleBar = this;
    }
    componentDidMount = () => {
      try {
        var _data = this.props.SubIndexData;
        var _isExam = null;
        if(this.props.isTimedExam) {
          _isExam = true;
        }
        if(global.Template1 != undefined)
        {
          //this.SaveTemplate1ModuleContentResponse(_data,this.props.IsPreview,this.props.moduleId,true,_isExam);
        }
        else if(global.Template2 !=  undefined)
        {
          //this.SaveTemplate2ModuleContentResponse(_data,this.props.IsPreview,this.props.moduleId,true,_isExam);
        }
        }
      catch(e) {
        console.error(e);
      }
    }
    SaveTemplate1ModuleContentResponse = (_data,IsPreview,ModuleId,isAgree,IsTimedExam) => {
      try {
        if(_data != undefined) {
        if(_data.userCourseModuleContentResponse == "")
        {
          if(_data.type >= 1 && _data.type <= 4 || _data.type == 8 || _data.type == 10) {
            var _status = 0;
            if(_data.type == 10) {
              var _files = _data.contentItem.files;
              for(var i = 0;i<_files.length;i++) {
                if(_files[i].type == 5) {
                  _status = 2;
                }
                else {
                  _status = 3;
                }
              }
            }
            else {
              _status = 3;
            }
            const data = {
              userId: this.props.UserId,
              courseId: this.props.CourseId,
              moduleContentId: _data.id,
              status: _status,
              moduleId: ModuleId,
              isPreview: JSON.parse(IsPreview),
              isDisclosureAccepted: isAgree,
              isTimedExam: IsTimedExam
            }
            InsertModuleContentResponse(data,true, res => {
              const { data, error } = res;
              if (global.Template1 != undefined) {
                CommonMethods.updateStatusForModuleContent(1,data);
              }
            })
          }
          if(_data.type == 6 || _data.type == 7 || _data.type == 5 || _data.type == 9) {
            if(_data.type == 6) {
              var _pageContent = _data.contentItem.pageContent;
              var status = 0;
              var _isQuestionAnsPending =false;
              for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
              for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                if(_data.contentItem.pageContent[i][j].contentType == 3)
                {
                  if(_data.contentItem.pageContent[i][j].isAnswered == true )
                  {
                    _isQuestionAnsPending=false;
                  }
                  else
                  {
                    _isQuestionAnsPending=true;
                    break;
                  }
                 
                }
            }
            if(_isQuestionAnsPending)
            {
              break;
            }
          }
                var _subPageData = _pageContent[0];
               //var _isQuestion =  _subPageData.some(x => x.contentType == 3 && x.caseQuestion != null);
               var _isVideo = false;
               _subPageData.forEach(element => {
                 if(element.caseFileSection != null && element.caseFileSection != "" && element.caseFileSection != undefined)
                 {
                   _isVideo = element.caseFileSection.fileSection.files.some(x => x.type == 5);
                 }
               });
                for(var j=0;j<_subPageData.length;j++) {
                  if(_subPageData[j].contentType == 3 && _subPageData[j].caseQuestion != null) {
                    status = 2;
                  }
                  else {
                    if(_subPageData[j].contentType == 1 || _subPageData[j].contentType == 2)
                     {
                        if(_data.contentItem.pageContent.length == 1)
                        {
                        status = _isQuestionAnsPending || _isVideo ? 2:3;
                        }
                        else if(_data.contentItem.pageContent.length > 1)
                        {
                        status =  2;
                        }
                      }
                     else if(_subPageData[j].contentType == 4) {
                        var _fileSection = _subPageData[j].caseFileSection.fileSection.files;
                        for(var x = 0; x<_fileSection.length;x++) {
                        if(_data.contentItem.pageContent.length == 1)
                        {  
                          status = _isQuestionAnsPending || _isVideo ? 2:3;
                        }
                        else if(_data.contentItem.pageContent.length > 1)
                        {
                        status =  2;
                        }
                      }
                    }
                  }
                }
                const data = {
                  userId: this.props.UserId,
                  courseId: this.props.CourseId,
                  moduleContentId: _data.id,
                  status: status,
                  moduleId: ModuleId,
                  IsPreview: JSON.parse(IsPreview),
                  isDisclosureAccepted: isAgree,
                  isTimedExam: IsTimedExam
                }
                InsertModuleContentResponse(data,true, res => {
                  const { data, error } = res;
                  if (global.Template1 != undefined) {
                    CommonMethods.updateStatusForModuleContent(1,data);
                  }
                  if (global.Template2 != undefined) {
                    CommonMethods.updateStatusForModuleContent(2,data);
                  }
                })
            }
            else {
              const data = {
                userId: this.props.UserId,
                courseId: parseInt(this.props.CourseId),
                moduleContentId: _data.id,
                status: 2,
                moduleId: ModuleId,
                IsPreview: JSON.parse(IsPreview),
                isDisclosureAccepted: isAgree,
                isTimedExam: IsTimedExam,
              }
              InsertModuleContentResponse(data,true, res => {
                const { data, error } = res;
                if (global.Template1 != undefined) {
                  CommonMethods.updateStatusForModuleContent(1,data);
                }
                if (global.Template2 != undefined) {
                  CommonMethods.updateStatusForModuleContent(2,data);
                }
              })
          }

          }

        }
        }

      }
      catch(e) {
        console.error(e);
      }
    }
    SaveTemplate2ModuleContentResponse = (_data,IsPreview,ModuleId,isAgree,IsTimedExam) => {
      try {
        if(_data != undefined) {
        if(_data.userCourseModuleContentResponse == "")
        {
          if(_data.type >= 1 && _data.type <= 4 || _data.type == 8 || _data.type == 10) {
            var _status = 0;
            if(_data.type == 10) {
              var _files = _data.contentItem.files;
              for(var i = 0;i<_files.length;i++) {
                if(_files[i].type == 5) {
                  _status = 2;
                }
                else {
                  _status = 3;
                }
              }
            }
            else {
              _status = 3;
            }
            const data = {
              userId: this.props.UserId,
              courseId: this.props.CourseId,
              moduleContentId: _data.id,
              status: _status,
              moduleId: ModuleId,
              isPreview: JSON.parse(IsPreview),
              isDisclosureAccepted: isAgree,
              isTimedExam: IsTimedExam
            }
            InsertModuleContentResponse(data,true, res => {
              const { data, error } = res;
              if (global.Template1 != undefined) {
                CommonMethods.updateStatusForModuleContent(1,data);
              }
              if (global.Template2 != undefined) {
                CommonMethods.updateStatusForModuleContent(2,data);
              }
            })
          }
          if(_data.type == 6 || _data.type == 7 || _data.type == 5 || _data.type == 9) {
            if(_data.type == 6) {
              var _pageContent = _data.contentItem.pageContent;
              var status = 0;
              var _isQuestionAnsPending =false;
              for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
              for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                if(_data.contentItem.pageContent[i][j].contentType == 3)
                {
                  if(_data.contentItem.pageContent[i][j].isAnswered == true )
                  {
                    _isQuestionAnsPending=false;
                  }
                  else
                  {
                    _isQuestionAnsPending=true;
                    break;
                  }
                 
                }
            }
            if(_isQuestionAnsPending)
            {
              break;
            }
          }
              var _subPageData = _pageContent[0];
               //var _isQuestion =  _subPageData.some(x => x.contentType == 3 && x.caseQuestion != null);
               var _isVideo = false;
               _subPageData.forEach(element => {
                 if(element.caseFileSection != null && element.caseFileSection != "" && element.caseFileSection != undefined)
                 {
                   _isVideo = element.caseFileSection.fileSection.files.some(x => x.type == 5);
                 }
               });
                for(var j=0;j<_subPageData.length;j++) {
                  if(_subPageData[j].contentType == 3 && _subPageData[j].caseQuestion != null) {
                    if(_data.contentItem.pageContent.length == 1)
                        {
                          if(_data.contentItem.pageContent[0].length == 1)
                          {
                           status = _isQuestionAnsPending || _isVideo ? 2:3;
                          }
                          else
                          {
                            status=2;
                            global.isAllPreviewed=false;
                          }
                        }
                        else if(_data.contentItem.pageContent.length > 1)
                        {
                        status =  2;
                        global.isAllPreviewed=false;
                        }
                  }
                  else {
                    if(_subPageData[j].contentType == 1 || _subPageData[j].contentType == 2)
                     {
                        if(_data.contentItem.pageContent.length == 1)
                        {
                          if(_data.contentItem.pageContent[0].length == 1)
                          {
                           status = _isQuestionAnsPending || _isVideo ? 2:3;
                          }
                          else
                          {
                            status=2;
                            global.isAllPreviewed=false;
                          }
                        }
                        else if(_data.contentItem.pageContent.length > 1)
                        {
                        status =  2;
                        global.isAllPreviewed=false;
                        }
                      }
                     else if(_subPageData[j].contentType == 4) {
                        var _fileSection = _subPageData[j].caseFileSection.fileSection.files;
                        for(var x = 0; x<_fileSection.length;x++) {
                          if(_data.contentItem.pageContent.length == 1)
                          {
                            if(_data.contentItem.pageContent[0].length == 1)
                            {
                             status = _isQuestionAnsPending || _isVideo ? 2:3;
                            }
                            else
                            {
                              status=2;
                              global.isAllPreviewed=false;
                            }
                          }
                          else if(_data.contentItem.pageContent.length > 1)
                          {
                          status =  2;
                          global.isAllPreviewed=false;
                          }
                      }
                    }
                  }
                }
                const data = {
                  userId: this.props.UserId,
                  courseId: this.props.CourseId,
                  moduleContentId: _data.id,
                  status: status,
                  moduleId: ModuleId,
                  IsPreview: JSON.parse(IsPreview),
                  isDisclosureAccepted: isAgree,
                  isTimedExam: IsTimedExam
                }
                InsertModuleContentResponse(data,true, res => {
                  const { data, error } = res;
                  if (global.Template1 != undefined) {
                    CommonMethods.updateStatusForModuleContent(1,data);
                  }
                  if (global.Template2 != undefined) {
                    CommonMethods.updateStatusForModuleContent(2,data);
                  }
                })
            }
            else {
              const data = {
                userId: this.props.UserId,
                courseId: this.props.CourseId,
                moduleContentId: _data.id,
                status: 2,
                moduleId: ModuleId,
                IsPreview: JSON.parse(IsPreview),
                isDisclosureAccepted: isAgree,
                isTimedExam: IsTimedExam,
              }
              InsertModuleContentResponse(data,true, res => {
                const { data, error } = res;
                if (global.Template1 != undefined) {
                  CommonMethods.updateStatusForModuleContent(1,data);
                }
                if (global.Template2 != undefined) {
                  CommonMethods.updateStatusForModuleContent(2,data);
                }
              })
          }

          }

        }
        }

      }
      catch(e) {
        console.error(e);
      }
    }
    _handleOnModuleChangeEvent = (Id,Moduleindex,moduleContent) => {
      try {
        const {onModuleChangeEvent} = this.props;
        onModuleChangeEvent(Id,Moduleindex);
        var _isExam = null;
        if(this.props.isTimedExam) {
          _isExam = true;
        }
        if(global.Template1 != undefined)
        {
        global.isAllPreviewed=null;
        this.SaveTemplate1ModuleContentResponse(moduleContent.courseModuleContent[0],this.props.IsPreview,Id,null,_isExam);
        }
        else if(global.Template2 != undefined)
        {
        global.isAllPreviewed=null;
        this.SaveTemplate2ModuleContentResponse(moduleContent.courseModuleContent[0],this.props.IsPreview,Id,null,_isExam);
        }
      }
      catch(e) {
        console.error(e);
      }
    }
    _handleOnSubModuleChangeEvent = (_data,Moduleindex,SubMIndex,IsPreview,ModuleId) => {
      try {
        var _isExam = null;
        if(this.props.isTimedExam) {
          _isExam = true;
        }
        if(global.Template1 != undefined)
        {
        global.isAllPreviewed=null;
        this.SaveTemplate1ModuleContentResponse(_data,IsPreview,ModuleId,null,_isExam);
        }
        else if(global.Template2 != undefined)
        {
        global.isAllPreviewed=null;
        this.SaveTemplate2ModuleContentResponse(_data,IsPreview,ModuleId,null,_isExam);
        }
          const {onSubModuleChangeEvent} = this.props;
        onSubModuleChangeEvent(Moduleindex,SubMIndex);
      }
      catch(e) {
        console.error(e);
      }
    }
    
    render() {
      const {moduleId,IsPreview,Course} = this.props;
    //   var  _allowuserflag=false;
    //   if(Course != undefined)
    //   {
    //   var _parsedJsonData = JSON.parse(Course.settings);
    //  _allowuserflag = CommonMethods.getDataFromJson(_parsedJsonData,"Allowuserflag");
    //   }
    return (
          <nav id="sidebarMenu">
            <div className="sidebar">
                <div className="sidebar-scroll">
                  <ul className="nav flex-column">
                    {this.props.courseModules.map((c, Moduleindex) => (
                      <li className="nav-item" key={c.id}>
                      {this.props.courseModules.length > 1 ?
                        <Link
                          title={c.title}
                            onClick={() => this._handleOnModuleChangeEvent(c.id,Moduleindex,c)}
                           className={this.props.selectedModule == Moduleindex ? "nav-link active" : c.ModuleClass}>
                          <div className="a-link" data-toggle="collapse" href="#collapse-submodule" aria-expanded="false" aria-controls="collapse-submodule">
                            <span className="txt-ellipsis">
                              {c.title}
                            </span>
                            {c.courseModuleContent != "" && c.courseModuleContent != undefined && c.courseModuleContent != null ?<i className={c.userCourseModuleResponse == "" ? "mdi mdi-check-circle check-icon" :c.userCourseModuleResponse[0].status == 3 ? "mdi mdi-check-circle check-icon status-completed" :c.userCourseModuleResponse[0].status == 2 ? "mdi mdi-check-circle check-icon status-inprogress": "mdi mdi-check-circle check-icon" }></i>:null}
                            {c.courseModuleContent != "" && c.courseModuleContent != undefined && c.courseModuleContent != null ?<i className={c.check ? "mdi mdi-chevron-up collapse-icon mr-2" : "mdi mdi-chevron-down collapse-icon mr-2"}></i>:null
                            }
                          </div>
                        </Link>:""}
                        {c.id == moduleId ?
                          <ul className="sub-module collapse show" id="collapse-submodule">
                            {c.courseModuleContent.map((item,SubMindex) => (
                              item.contentItem != '' && item.contentItem != undefined && item.contentItem != null ?
                              <li key={item.id} className={item.SubModuleClass}>
                                  <a className={this.props.selectedSubModule == SubMindex ? "nav-link active" : "nav-link"}>
                                      <div className="v-dot">
                                      <i className={item.userCourseModuleContentResponse.length == 0 ? this.state.normalStatus :item.userCourseModuleContentResponse[0].status == 3 ? this.state.statusCompleted :item.userCourseModuleContentResponse[0].status == 2 ? this.state.statusInProgress: this.state.normalStatus }></i>
                                      </div>
                                      <span onClick={() => this._handleOnSubModuleChangeEvent(item,Moduleindex,SubMindex,IsPreview,c.id)}  title={item.type >= 1 && item.type <= 5 ? item.contentItem.name : item.type == 6  ? item.contentItem.name:item.type == 9  ? item.contentItem.name :item.type == 7 ? item.contentItem.text :item.type == 8 ?item.contentItem.title:item.type == 10 ? item.contentItem.name:""} className="txt-ellipsis"> {item.type >= 1 && item.type <= 5 ? item.contentItem.name : item.type == 6  ? item.contentItem.name:item.type == 9  ? item.contentItem.name :item.type == 7 ? item.contentItem.text :item.type == 8 ?item.contentItem.title:item.type == 10 ? item.contentItem.name:"" }</span>
                                      
                                      </a>
                              </li>:null
                            ))}
                          </ul> :<></>
                        }
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </nav>
        )
    }
}
export default withParams(ModuleBar);