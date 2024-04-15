import React, {Component} from "react";
import ModuleBar from "../modulebar";
// import "bootstrap/dist/css/bootstrap.min.css";
import CommonMethods from "../Common/CommonMethodsComponent";
import {useParams,Link} from 'react-router-dom';
import { GetModules,GetFacultyModules, AppSettings } from '../../Services';
import Instruction from "../instruction";
import FileContent from "../FileContent";
import Question from "../Question/question";
import PageBar from "../pagebar";
import $ from "jquery";

var index = 1;

// function withParams(Component) {
//     return props => <Component {...props} params={useParams()} />;
//   }

export default class Template1 extends Component {
  isShowTime = false;
  constructor(props) {
    super(props);
    this.state={
      Modules:[],
      PageNumber: 1,
      isShowing: false,
      Allow_Certificate: true,
      PreogressthroughcaseQue:false,
      EnableCertificationBtn:false,
      ShowCourseCompletedPopup:false,
      ShowCourseCompleted: false,
      ShowCoursePreviewResetPopUp: false,
      ResetStatus: false,
      isFacultyControl: false,
      ModuleIndex:  0,
      subModuleIndex:  0,
      isNavigation: false,
      seconds : -1,
      isDisabled: true,
      AllowUserFlag:false,
      BannerText:"",
      Submission_choice:0,
      Guesses: 0,
    }
    global.Template1 = this;
    global.ModuleIndex = 0;
    global.subModuleIndex = 0;
    this.UpdateModules = this.UpdateModules.bind(this);
    this.SelectedPage=0;
    global.isAllPreviewed=null;
  }
  componentDidMount = async() => {
    
    const {Course,isFaculty} = this.props;
    var _parsedJsonData = JSON.parse(Course.settings);
     if (document) document.body.classList.add("template-1");
    // var CertificationScore = CommonMethods.getDataFromJson(_parsedJsonData,"Certificate_score");
    // var _allowuserflag = CommonMethods.getDataFromJson(_parsedJsonData,"Allowuserflag");
    // var Iscertificate_course = CommonMethods.getDataFromJson(_parsedJsonData,"Iscertificate_course");
    // var Isfaculty_control = CommonMethods.getDataFromJson(_parsedJsonData,"Instruction_control");
    var Banner_Text = CommonMethods.getDataFromJson(_parsedJsonData,"Banner_Text");
    var _Submission_choice = CommonMethods.getDataFromJson(_parsedJsonData, "Submission_choice");
    var _Guesses = CommonMethods.getDataFromJson(_parsedJsonData,"Guesses");
    // if(Isfaculty_control == "" || Isfaculty_control == undefined ? false: JSON.parse(Isfaculty_control) == 2 || JSON.parse(Isfaculty_control) == 1) {
    //   if(JSON.parse(Isfaculty_control) == 2) {
    //     this.setState({isNavigation: true});
    //   }
    //   else if(JSON.parse(Isfaculty_control) == 1) {
    //     this.setState({isNavigation: false});
    //   }
    //   if(isFaculty != undefined && isFaculty != "")
    //   {
    //     if(JSON.parse(isFaculty)) {
    //       this.GetFacultyModules();
    //     }
    //     else {
    //       setInterval(this.UpdateModules,5000);
    //     }
    //   }

    //   this.setState({isFacultyControl: true});
    // }
    // else {
      await this.GetModules();
    //}
    // if(_allowuserflag == "" ? false :JSON.parse(_allowuserflag))
    // {
    //   this.setState({AllowUserFlag:_allowuserflag})
    // }
    // if(Iscertificate_course == "" ? false : JSON.parse(Iscertificate_course)) {
    //   if(CertificationScore!= "" && CertificationScore!= "" &&CertificationScore!= undefined && Course.userCourseResponse != undefined)
    //   {
    //     if(Course.userCourseResponse.score >= parseInt(CertificationScore))
    //     {
    //       this.setState({EnableCertificationBtn:true});
    //     }
    //   } else if(CertificationScore === "" && Course.userCourseResponse !== null && Course.userCourseResponse != undefined){
    //     if(Course.userCourseResponse.status === 3)
    //     this.setState({EnableCertificationBtn:true});
    //   } else{
    //     this.setState({EnableCertificationBtn:false});
    //   }
    // }
    // else {
    //   this.setState({EnableCertificationBtn:false});
    // }
    this.setState({BannerText: Banner_Text, Guesses: _Guesses, Submission_choice: _Submission_choice})
  }
  UpdateModules (){
    if(!this.state.isShowing){
      this.GetFacawaitultyModules();
    }

  }

  GetFacultyModules() {
    try {
      const {CourseId,UserId,IsPreview,isFaculty}=this.props;
      GetFacultyModules(CourseId,UserId,IsPreview,isFaculty ,res => {
          const {data, error } = res;
          if(data){
            this.setState({Modules:data});
          }
        })
    }
    catch(e){
      console.error(e);
    }
  }
  GetModules(){
    
    const {CourseId,UserId,IsPreview}=this.props;
    GetModules(CourseId,UserId,IsPreview ,res => {
        
        const {data, error } = res;
        if(data){
          const {Course} = this.props;
         var _parsedJsonData = JSON.parse(Course.settings);
          if(this.props.Course!=  undefined && this.props.Course!= "")
          {
            var randomization = CommonMethods.getDataFromJson(_parsedJsonData,"Israndomization");
            var progressCasesOrder = CommonMethods.getDataFromJson(_parsedJsonData,"Isprogress_order");
            if(randomization == "" ? false:JSON.parse(randomization))
            {
              data.forEach(element => {
              var CaseQuelist=[];
              var remainingList=[];
              var TotalList=[];
                element.courseModuleContent.forEach(obj =>{
                  if(obj.type == 7 || obj.type == 6)
                  {
                    CaseQuelist.push(obj);
                  }
                  else
                  {
                    remainingList.push(obj);
                  }
                })
              var randomlistcontent =this.shuffle(CaseQuelist);
              randomlistcontent.forEach(item =>{
                  TotalList.push(item);
                })
                remainingList.forEach(item =>{
                  TotalList.push(item);
                })
                element.courseModuleContent=TotalList;
              });
            }
              if(progressCasesOrder == "" ? false: JSON.parse(progressCasesOrder))
              {
                this.setState({PreogressthroughcaseQue:true});
                if(data.length > 0)
                  {
                    data[this.state.ModuleIndex].courseModuleContent.forEach((element,Index) => {
                      if(Index > this.state.subModuleIndex )
                      element.SubModuleClass="nav-item disabled"
                      else
                      element.SubModuleClass="nav-item"
                    });
                    data.forEach((element,index) =>{
                      if(index > this.state.ModuleIndex)
                      element.ModuleClass="nav-link disabled";
                      else
                      element.ModuleClass="nav-link ";
                    })
                }
                if(data[this.state.ModuleIndex].courseModuleContent.length > 0)
                {
                  if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].type == 7)
                  {
                    if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse.length > 0)
                    {
                      if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse[0].status == 3 && data[this.state.ModuleIndex].courseModuleContent.length-1 > this.state.subModuleIndex)
                      {
                        data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].SubModuleClass="nav-item";
                        data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex+1].SubModuleClass="nav-item";
                      }
                      else if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse[0].status == 2 && data[this.state.ModuleIndex].courseModuleContent.length-1 > this.state.subModuleIndex)
                      {
                        data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex+1].SubModuleClass="nav-item disabled";
                      }
                      if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse[0].status == 3  && data.length -1  > this.state.ModuleIndex && data[this.state.ModuleIndex].courseModuleContent.length -1 == this.state.subModuleIndex  )
                      {
                        data[this.state.ModuleIndex+1].ModuleClass="nav-link";
                      }
                    }
                  }
                  else if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].type == 6  )
                  {
                    if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse.length > 0)
                    {
                      if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse[0].status == 3 && data[this.state.ModuleIndex].courseModuleContent.length-1 > this.state.subModuleIndex)
                      {
                        data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].SubModuleClass="nav-item";
                        data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex+1].SubModuleClass="nav-item";
                      }
                      else if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse[0].status == 2 && data[this.state.ModuleIndex].courseModuleContent.length-1 > this.state.subModuleIndex)
                      {
                        data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex+1].SubModuleClass="nav-item disabled";
                      }
                      if(data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].userCourseModuleContentResponse[0].status == 3  && data.length -1  > this.state.ModuleIndex && data[this.state.ModuleIndex].courseModuleContent.length -1 == this.state.subModuleIndex  )
                      {
                        data[this.state.ModuleIndex+1].ModuleClass="nav-link";
                      }
                    }
                  }
                  else
                  {
                    data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].SubModuleClass="nav-item";
                    if(data[this.state.ModuleIndex].courseModuleContent.length > 1)
                    data[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex+1].SubModuleClass="nav-item";
                  }
                }
                else if(data.length-1 > this.state.ModuleIndex)
                {
                  data[this.state.ModuleIndex+1].ModuleClass="nav-link";
                }
              }
              else
              {
                data.forEach(Mod =>{
                  Mod.courseModuleContent.forEach(ele =>{
                    ele.SubModuleClass="nav-item";
                  })
                  Mod.ModuleClass="nav-link";
                })
              }
          }
          
            data[0].check = true;
            this.setState({Modules:data});
            this._CertificationEnableEvent();
        } else {
            console.log(error);
        }
    })
  }
  shuffle(array){
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
 return array
  }
  
showorhideTOC=()=>{
  var body = $("body")
    body.toggleClass("sidebar-icon-only")
}
  
  _handleOnModuleChangeEvent = (Id,MIndex) => {
    try{
      var _data = this.state.Modules;
      const {Course} = this.props;
      var _parsedJsonData = JSON.parse(Course.settings);
      for(var i = 0;i<_data.length;i++) {
        if(_data[i].check == true && i != MIndex)
        {
          _data[i].check = !_data[i].check;
        }
      }
      if(this.props.Course!=  undefined && this.props.Course != "")
      {
          var progressCasesOrder = CommonMethods.getDataFromJson(_parsedJsonData,"Isprogress_order");
       if(progressCasesOrder == "" ? false:JSON.parse(progressCasesOrder))
        {
          if(_data[MIndex].ModulePreviewDone !=true)
          {
          _data[0].ModuleClass ="nav-link";
          _data[MIndex].ModuleClass ="nav-link";
          _data[MIndex].courseModuleContent.forEach((element) => {
            element.SubModuleClass="nav-item disabled"
          });
          if(_data[MIndex].courseModuleContent.length > 0)
          {
          _data[MIndex].courseModuleContent.forEach((element,_subMindex) => {
            if(_subMindex == 0)
            {
              element.SubModuleClass="nav-item";
              if(element.type == 7)
              {
                  if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse.length > 0)
                {
                  if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 3 && _data[MIndex].courseModuleContent.length-1 > 0)
                  {
                    _data[MIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item";
                  }
                  else if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 2 && _data[MIndex].courseModuleContent.length-1 > 0)
                  {
                    _data[MIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item disabled";
                  }
                }
                if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse.length > 0)
                {
                if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 3 && _data[MIndex].courseModuleContent.length -1 == 0 && _data.length -1  > MIndex )
                {
                  _data[MIndex+1].ModuleClass="nav-link";
                }
              }
              } else if(element.type == 6){
                if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse.length > 0)
                {
                  if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 3 && _data[MIndex].courseModuleContent.length-1 > 0)
                  {
                    _data[MIndex].courseModuleContent[_subMindex].SubModuleClass="nav-item";
                    _data[MIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item";
                  }
                  else if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 2 && _data[MIndex].courseModuleContent.length-1 > 0)
                  {
                    _data[MIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item disabled";
                  }
                  if(_data[MIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 3  && _data.length -1  > MIndex && _data[MIndex].courseModuleContent.length -1 == 0  )
                  {
                    _data[MIndex+1].ModuleClass="nav-link";
                  }
                }
              } else if(element.type != 6  && element.type != 7 && _data[MIndex].courseModuleContent.length-1 > 0  )
            {
              _data[MIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item";
            }
            if( _data.length -1  > MIndex &&  _data[MIndex].courseModuleContent.length -1 == 0 && element.type != 7 && element.type != 6 )
          {
            _data[MIndex+1].ModuleClass="nav-link";
            _data[MIndex].ModulePreviewDone=true;
          }
            }
            });
          }
          else if(_data.length-1 > MIndex)
          {
            _data[MIndex+1].ModuleClass="nav-link";
          }
        }
        else
        {
        _data[MIndex].courseModuleContent.forEach((element) => {
          element.SubModuleClass="nav-item"
        });
      }
      }
    }
      else{
        _data.forEach(ele =>{
          ele.ModuleClass="nav-link";
        })
      }
      _data[MIndex].check  = !_data[MIndex].check;
      global.ModuleIndex = MIndex;
      global.subModuleIndex= 0;

      if(_data[MIndex].courseModuleContent[0].dicomid != undefined && _data[MIndex].courseModuleContent[0].dicomid != "" && _data[MIndex].courseModuleContent[0].dicomid != null ){
        window.open(AppSettings.appsettings.AccessionDicomURL + _data[MIndex].courseModuleContent[0].dicomid, true )
      }

      this.setState({Modules:_data,PageNumber:1,ModuleIndex: MIndex,subModuleIndex:0});
      if(MIndex == 0 && global.subModuleIndex == 0) {
        this.setState({isDisabled: true});
      }
      else {
        this.setState({isDisabled: false});
      }
    }
    catch(e) {
      console.error(e);
    }
  }
  _handleOnSubModuleChangeEvent = (MIndex,SubMIndex) => {
    try{
      global.subModuleIndex = SubMIndex;
      global.ModuleIndex = MIndex;
      const {Course} = this.props;

      if(this.state.Modules[MIndex].courseModuleContent[SubMIndex].contentItem.dicomid != undefined && this.state.Modules[MIndex].courseModuleContent[SubMIndex].contentItem.dicomid != "" && this.state.Modules[MIndex].courseModuleContent[SubMIndex].contentItem.dicomid != null){
        window.open(AppSettings.appsettings.AccessionDicomURL + this.state.Modules[MIndex].courseModuleContent[SubMIndex].contentItem.dicomid, true )
      }

      var _parsedJsonData = JSON.parse(Course.settings);
      var progressCasesOrder = CommonMethods.getDataFromJson(_parsedJsonData,"Isprogress_order");
      if(this.props.Course!=  undefined && this.props.Course != "")
      {
      this.setState({PreogressthroughcaseQue:progressCasesOrder == "" ? false: JSON.parse(progressCasesOrder)});
      CommonMethods.OnSubModuleChangeEvent(global.Template1);
      }
      this.setState({PageNumber:1,subModuleIndex: SubMIndex});
      if(MIndex == 0 && global.subModuleIndex == 0) {
        this.setState({isDisabled: true});
      }
      else {
        this.setState({isDisabled: false});
      }
    }
    catch(e) {
      console.error(e);
    }
  }
  renderCasePageContent =(pageContent, CourseId,moduleId,moduleContentId,IsPreview) => {
    var _index = 1;
    if(pageContent != '' && pageContent != undefined && pageContent != null)
    {
      return (
        <div>  
          {pageContent.length >1 ?(
        <PageBar
          selectedPage={pageContent[this.state.PageNumber-1][0].pageNumber}
          casepages={pageContent}
          PageChangeEvent={(id) => this._handleOnPageChangeEvent(id)}
        ></PageBar>
        ):null}      
         <div>
          {pageContent[this.state.PageNumber-1].map(ele => {
            var html = [];
            var dicComContentinList=[];
            if(ele.contentType == 2 && ele.caseFile != null)
            {
              dicComContentinList.push(ele.caseFile.file);
            }
            if(ele.contentType == 1 && ele.caseTextElement != null)
            {
              html.push(
                <Instruction
                key={ele.id}
                ContentId={ele.contentType}
                ContentItem={ele.caseTextElement.textElement}
                ModuleId={moduleId}
                courseId={CourseId}
                ModuleContentId={moduleContentId}
                ></Instruction>
              )
            }
            if(ele.contentType == 2 && ele.caseFile != null)
            {
              html.push(
                <FileContent
                key={ele.id}
                ContentId={ele.contentType}
                ContentItem={dicComContentinList}
                ModuleId={moduleId}
                courseId={CourseId}
                ModuleContentId={moduleContentId}
                IsPreview={IsPreview}
                UserId = {this.props.UserId}
                isCourse={true}
                ></FileContent>
              )
            }
            if(ele.contentType == 3 && ele.caseQuestion != null)
            {
              html.push(
                <Question
                courseId={CourseId}
                index={_index++}
                key={ele.id}
                CaseId={ele.caseId}
                ContentId={ele.contentType}
                ContentItem={ele.caseQuestion.question}
                ModuleId={moduleId}
                ModuleContentId={moduleContentId}
                IsPreview={IsPreview}
                UserId = {this.props.UserId}
                isCourse={true}
                isShowFeedBack={this.props.isShowFeedBack}
                Guesses={this.state.Guesses}
                Submission_choice={this.state.Submission_choice}
                ></Question>
              )
            }
            if(ele.contentType == 4 || ele.contentType == 10 && ele.caseFileSection != null)
            {
              html.push(
                <FileContent
                key={ele.id}
                ContentId={ele.contentType}
                ContentItem={ele.caseFileSection.fileSection.files}
                ModuleId={moduleId}
                courseId={CourseId}
                ModuleContentId={moduleContentId}
                IsPreview={IsPreview}
                UserId = {this.props.UserId}
                isCourse={true}
                CaseId={ele.caseId}
                CaseFileContent={ele.caseFileSection.fileSection.files}
                CaptionHeight={ele.caseFileSection.fileSection.captionHeight}
                ></FileContent>
              )
            }
            return html;
          })}
        </div>
        {pageContent.length >1 ?(
        <PageBar
          selectedPage={pageContent[this.state.PageNumber-1][0].pageNumber}
          casepages={pageContent}
          PageChangeEvent={(id) => this._handleOnPageChangeEvent(id)}
        ></PageBar>
        ):null}
      </div>
      )
    }

  }
  renderPageContent(content, CourseId,moduleId,IsPreview) {
    if(content != "" && content != undefined && content != null){
      if(content.contentItem != '' && content.contentItem != undefined && content.contentItem !=null) {
      if(content.type == 6)
        return(this.renderCasePageContent(content.contentItem.pageContent,CourseId, moduleId,content.id,IsPreview))
      if (content.type == 8)
    return (
      <Instruction
        key={content.id}
        ContentId={content.contentId}
        ContentItem={content.contentItem}
        ModuleId={moduleId}
        courseId={CourseId}
        ModuleContentId={content.id}
      ></Instruction>
    )
  if ((content.type >= 1 && content.type <= 5)|| content.type == 9 ) {
    var _tempList = [];
    _tempList.push(content.contentItem);
    return (
      <FileContent
        key={content.id}
        ContentId={content.type}
        ContentItem={_tempList}
        ModuleId={moduleId}
        courseId={CourseId}
        ModuleContentId={content.id}
        IsPreview={IsPreview}
        UserId = {this.props.UserId}
        isCourse={true}
      ></FileContent>
    )
  }

  if (content.type == 7)
    return (
      <Question
        courseId={CourseId}
        key={content.id}
        index={index++}
        ContentId={content.contentId}
        ContentItem={content.contentItem}
        ModuleId={moduleId}
        ModuleContentId={content.id}
        IsPreview={IsPreview}
        UserId = {this.props.UserId}
        isCourse={true}
        isShowFeedBack={this.props.isShowFeedBack}
        Guesses={this.state.Guesses}
        Submission_choice={this.state.Submission_choice}
      ></Question>
    )
    if(content.type == 4 || content.type == 10)
      return(
        <FileContent
        key={content.id}
        ContentId={content.type}
        ContentItem={content.contentItem.files}
        ModuleId={moduleId}
        courseId={CourseId}
        ModuleContentId={content.id}
        IsPreview={IsPreview}
        UserId = {this.props.UserId}
        isCourse={true}
        CaseFileContent={content.contentItem.files}
        CaptionHeight={content.contentItem.captionHeight}
        ></FileContent>
      )
    }
    else {
      return null;
    }
    }
    else {
      return null;
    }
  }
  showorhideTOC(){
    var body = $('body');
    body.toggleClass('sidebar-icon-only');
  }
  _handleOnPreviousClick = () => {
    try {
      global.isAllPreviewed=null;
      if(this.state.subModuleIndex == 0) {
        if(this.state.Modules.length >1) {
          var _subMindex = this.state.Modules[this.state.ModuleIndex - 1].courseModuleContent.length - 1;
          this.setState({ModuleIndex: this.state.ModuleIndex - 1});
          this._handleOnSubModuleChangeEvent(this.state.ModuleIndex -1,_subMindex);
        }
        else {
          this._handleOnModuleChangeEvent(0,this.state.ModuleIndex - 1);
        }
      }
      else {
        this._handleOnSubModuleChangeEvent(this.state.ModuleIndex,this.state.subModuleIndex - 1);
      }
      // if(this.state.ModuleIndex -1 == 0 && global.subModuleIndex == 0) {
      //   this.setState({isDisabled: true});
      // }
    }
    catch(e) {
      console.error(e);
    }
  }
  _handleOnNextClick = () => {
    try {
      global.isAllPreviewed=null;
      const {isFaculty,TemplateType} = this.props;
      if(!JSON.parse(isFaculty) && (TemplateType == "Workshop" || TemplateType == "Virtual" || TemplateType == "Blank")) {
        var moduleContentLength = this.state.Modules[this.state.ModuleIndex].courseModuleContent.length;
          if(moduleContentLength-1 == this.state.subModuleIndex) {
            var enable = this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex].isEnable
          }
          else {
            var enable = this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex + 1].isEnable
          }
        if(!this.state.isFacultyControl){
          var moduleContentLength = this.state.Modules[this.state.ModuleIndex].courseModuleContent.length;
          if(moduleContentLength-1 == this.state.subModuleIndex) {
            this._handleOnModuleChangeEvent(0,this.state.ModuleIndex + 1);
          }
          else {
            this._handleOnSubModuleChangeEvent(this.state.ModuleIndex,this.state.subModuleIndex + 1);
          }
          var _data = this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
          global.ModuleBar.SaveTemplate1ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
        } else if((enable === null || enable === undefined) ? false : enable) {
          var moduleContentLength = this.state.Modules[this.state.ModuleIndex].courseModuleContent.length;
          if(moduleContentLength-1 == this.state.subModuleIndex) {
            this._handleOnModuleChangeEvent(0,this.state.ModuleIndex + 1);
          }
          else {
            this._handleOnSubModuleChangeEvent(this.state.ModuleIndex,this.state.subModuleIndex + 1);
          }
          var _data = this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
          global.ModuleBar.SaveTemplate1ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
        }
      }
      else if(JSON.parse(isFaculty) && (TemplateType == "Workshop" || TemplateType == "Virtual" || TemplateType == "Blank") && this.state.isFacultyControl) {
        if(this.state.isNavigation){
        var moduleContentLength = this.state.Modules[this.state.ModuleIndex].courseModuleContent.length
          if(moduleContentLength-1 == this.state.subModuleIndex){
            global.ModuleBar.EnableModule(this.state.Modules,this.state.ModuleIndex,this.state.Modules[this.state.ModuleIndex].id,this.state.isNavigation);
            global.ModuleBar.EnableModuleContent(this.state.Modules[this.state.ModuleIndex+1].courseModuleContent,this.state.ModuleIndex+1, -1,this.props.IsPreview,this.state.Modules[this.state.ModuleIndex+1].id);
          } else {
            global.ModuleBar.EnableModuleContent(this.state.Modules[this.state.ModuleIndex].courseModuleContent,this.state.ModuleIndex, this.state.subModuleIndex,this.props.IsPreview,this.state.Modules[this.state.ModuleIndex].id);
          }
        }
        else{
          var moduleContentLength = this.state.Modules[this.state.ModuleIndex].courseModuleContent.length
          if(moduleContentLength-1 == this.state.subModuleIndex){
            global.ModuleBar.EnableModule(this.state.Modules,this.state.ModuleIndex,this.state.Modules[this.state.ModuleIndex].id,this.state.isNavigation);
            global.ModuleBar.EnableModuleContent(this.state.Modules[this.state.ModuleIndex+1].courseModuleContent,this.state.ModuleIndex+1, -1,this.props.IsPreview,this.state.Modules[this.state.ModuleIndex+1].id);
          } else {
            global.ModuleBar.EnableModuleContent(this.state.Modules[this.state.ModuleIndex].courseModuleContent,this.state.ModuleIndex, this.state.subModuleIndex,this.props.IsPreview,this.state.Modules[this.state.ModuleIndex].id);
          }
        }

      }
      else {
        var moduleContentLength = this.state.Modules[this.state.ModuleIndex].courseModuleContent.length;
        if(moduleContentLength-1 == this.state.subModuleIndex) {
          this._handleOnModuleChangeEvent(0,this.state.ModuleIndex + 1);
        }
        else {
          this._handleOnSubModuleChangeEvent(this.state.ModuleIndex,this.state.subModuleIndex + 1);
        }
        var _data = this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
        global.ModuleBar.SaveTemplate1ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
      }
      // this.setState({isDisabled: false});
    }
    catch(e) {
      console.error(e);
    }
  }
  
  renderModulePresentationView = () => {
    
    const {Course,IsPreview,isFaculty} = this.props;
      return (
        <div>
          <div className="container-fluid page-body-wrapper">
            <nav className="navbar navbar-expand-lg fixed-top">
            <div className="navbar-brand-inner-wrapper d-inline-block">
              <Link to={'/'}>
                <img src="/assets/images/logo.png" class="img-fluid" alt="" />
                </Link>
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" onClick={() => this.showorhideTOC()}>
              <span className="mdi mdi-backburger" title="Collapse/Expand"></span>
            </button>
            </div>
            <h5 className="f-normal mb-0 txt-ellipsis"
              style={{maxWidth :"55%"}}
              title={this.state.BannerText === "" ? Course.name : this.state.BannerText}
              >{this.state.BannerText === "" ? Course.name : this.state.BannerText}</h5>
            <div className="d-inline-block ml-auto">
            
            </div>
            </nav>           
            <div>
            {this.state.Modules .length > 0 ?(
            <ModuleBar
              selectedModule={this.state.ModuleIndex}
              selectedSubModule={this.state.subModuleIndex}
              name={this.state.Modules[this.state.ModuleIndex].title}
              moduleId={this.state.Modules[this.state.ModuleIndex].id}
              courseModules={this.state.Modules}
              onModuleChangeEvent = {(Id,Index) => this._handleOnModuleChangeEvent(Id,Index)}
              onSubModuleChangeEvent = {(ModuleIndex,SubMIndex) => this._handleOnSubModuleChangeEvent(ModuleIndex,SubMIndex)}
              SubIndexData={this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex]}
              CourseId ={this.state.Modules[this.state.ModuleIndex].courseId}
              IsPreview={IsPreview}
              UserId={this.props.UserId}
              isTimedExam={this.props.isTimedExam}
              Course={this.props.Course}
            ></ModuleBar>
            ):null}
            </div>
            
            <div className="content-wrapper"> 
            {this.state.Modules.length > 1 || this.state.Modules[0].courseModuleContent.length >1 ?
      <div className="container mb-0">
        <input type="submit" value="Previous" className="btn btn-sm btn-primary" disabled={this.state.isDisabled} onClick={e => this._handleOnPreviousClick()}></input>
        {this.state.PreogressthroughcaseQue ?(
        <input type="submit" value="Next" className="btn btn-sm btn-primary float-right"
        disabled={
          this.state.Modules[global.ModuleIndex].courseModuleContent.length > global.subModuleIndex+1 ?
           (this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass=="nav-item" ?
           false : true) :
           this.state.Modules.length >global.ModuleIndex+1 ?
           (this.state.Modules[global.ModuleIndex+1].ModuleClass=="nav-link" ?
           false : true) : this.state.ModuleIndex == this.state.Modules.length -1 && this.state.subModuleIndex == this.state.Modules[this.state.ModuleIndex].courseModuleContent.length -1} onClick={e => this._handleOnNextClick()}></input>
        ):(
         <input type="submit" value="Next" className="btn btn-sm btn-primary float-right"  disabled={this.state.ModuleIndex == this.state.Modules.length -1 && this.state.subModuleIndex == this.state.Modules[this.state.ModuleIndex].courseModuleContent.length -1} onClick={e => this._handleOnNextClick()}></input>
        )}
        </div>:null}
            {this.state.isFacultyControl ?
        this.state.Modules[this.state.ModuleIndex].isEnable ?

                <div className="container">
                {this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex] != undefined ?
                 this.renderPageContent(this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex], this.state.Modules[this.state.ModuleIndex].courseId,this.state.Modules[this.state.ModuleIndex].id,IsPreview):null}
                </div>:""
                :<div className="container">
                {this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex] != undefined ?
                 this.renderPageContent(this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex], this.state.Modules[this.state.ModuleIndex].courseId,this.state.Modules[this.state.ModuleIndex].id,IsPreview):null}
                </div>}
                <div className="footer">@VRS</div>
            </div>
        </div>
        
        </div>

        )
  } 
  
  render() { 
      return(   
        (this.state.Modules.length !== 0 ) ?
        this.renderModulePresentationView() : <div></div>
      )
  }

}
//export default withParams(Template1);