import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Instruction from "../instruction";
import FileContent from "../FileContent";
import Question from "../Question/question";
import $ from "jquery";
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import "react-perfect-scrollbar/dist/css/styles.css";
import { GetModules,GetFacultyModules,AppSettings } from "../../Services";
import ModuleBar from "../modulebar";
import PageBar from "../pagebar";
import CommonMethods from "../Common/CommonMethodsComponent";
// import Generate_PDF from '../Generate_PDF';
// import CommonMethods from '../Common/CommonMethodsComponent';
// import CourseCompletedPopUp from '../Common/CourseCompletedPopUp';
// import CoursePreviewResetPopUp from '../Common/CoursePreviewResetPopUp';
// import ShowCountDownTime from '../Common/showTime';
// import FacultyModuleBar from '../ModuleBar/FacualtyControlModuleBar';

var index = 1;

export default class Template2 extends Component {
  constructor(props) {
    super(props);
    this.state={
      Modules:[],
      PageNumber: 1,
      CaseId: 1,
      PaginationDotIndex:0,
      Allow_Certificate: true,
      isShowing: false,
      _IsShuffle:false,
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
      BannerText:"",
      CaseContentList:[],
      Submission_choice:0,
      Guesses: 0,
    }
    global.ModuleIndex = 0;
    global.subModuleIndex = 0;
    global.Template2 = this;
    global.isAllPreviewed=null;
    this.UpdateModules = this.UpdateModules.bind(this);
  }
  componentDidMount = async() => {
    const {Course,isFaculty} = this.props;
    var _parsedJsonData = JSON.parse(Course.settings);
    if (document)
    {
    document.body.classList.remove("template-1");
    document.body.classList.add("template-2");
    }
    // var Isfaculty_control = CommonMethods.getDataFromJson(_parsedJsonData,"Instruction_control");
    // var CertificationScore = CommonMethods.getDataFromJson(_parsedJsonData,"Certificate_score");
    // var Iscertificate_course = CommonMethods.getDataFromJson(_parsedJsonData,"Iscertificate_course");
    var Banner_Text = CommonMethods.getDataFromJson(_parsedJsonData,"Banner_Text");
    // var _Submission_choice = CommonMethods.getDataFromJson(_parsedJsonData, "Submission_choice");
    // var _Guesses = CommonMethods.getDataFromJson(_parsedJsonData,"Guesses");
    // if(Isfaculty_control == "" ? false :JSON.parse(Isfaculty_control) == 2 || JSON.parse(Isfaculty_control) == 1) {
    //   if(JSON.parse(Isfaculty_control) == 2) {
    //     this.setState({isNavigation: true});
    //   }
    //   else if(JSON.parse(Isfaculty_control) == 1) {
    //     this.setState({isNavigation: false});
    //   }
    //   if(JSON.parse(isFaculty)) {
    //     this.GetFacultyModules();
    //   }
    //   else {
    //     setInterval(this.UpdateModules,5000);
    //   }
    //   this.setState({isFacultyControl: true});
    // }
    // else {
      await this.GetModules();
    // }
    // if(Iscertificate_course == "" ? false : JSON.parse(Iscertificate_course)) {
    //   if(CertificationScore!= "" && CertificationScore!= "" &&CertificationScore!= undefined && Course.userCourseResponse != undefined)
    //   {
    //     if(Course.userCourseResponse.score >= parseInt(CertificationScore))
    //     {
    //       this.setState({EnableCertificationBtn:true});
    //     }
    //   } else if(CertificationScore === ""  && Course.userCourseResponse !== null && Course.userCourseResponse != undefined){
    //     if(Course.userCourseResponse.status === 3)
    //     this.setState({EnableCertificationBtn:true});
    //   } else{
    //     this.setState({EnableCertificationBtn:false});
    //   }
    // }
    // else {
    //   this.setState({EnableCertificationBtn:false});
    // }
    this.setState({BannerText: Banner_Text})
  }
  UpdateModules (){
    if(!this.state.isShowing){
      this.GetFacultyModules();
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
          if(this.props.Course!=  undefined && this.props.Course != "")
          {
          var randomization = CommonMethods.getDataFromJson(_parsedJsonData,"Israndomization");
          var progressCasesOrder = CommonMethods.getDataFromJson(_parsedJsonData,"Isprogress_order");
          if(randomization == "" ? false: JSON.parse(randomization))
            {
              data.forEach(element => {
              var CaseQuelist=[];
              var remainingList=[];
              var TotalList=[];
                element.courseModuleContent.forEach(obj =>{
                  if(obj.type == 7|| obj.type == 6)
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
                data[global.ModuleIndex].courseModuleContent.forEach((element,Indexx) => {
                  if( Indexx > global.subModuleIndex )
                  element.SubModuleClass="nav-item disabled"
                  else
                  element.SubModuleClass="nav-item"
                  });
                data.forEach((element,index) =>{
                  if(index > global.ModuleIndex)
                  element.ModuleClass="nav-link disabled";
                  else
                  element.ModuleClass="nav-link ";
                })
              }
              if(data[global.ModuleIndex].courseModuleContent.length > 0)
              {
                if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].type == 7)
                {
                  if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse.length > 0)
                  {
                    if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 3 && data[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                    {
                      data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].SubModuleClass="nav-item";
                      data[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass="nav-item";
                    }
                    else if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 2 && data[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                    {
                      data[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass="nav-item disabled";
                    }
                    if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 3  && data.length -1  > global.ModuleIndex && data[global.ModuleIndex].courseModuleContent.length -1 == global.subModuleIndex )
                    {
                      data[global.ModuleIndex+1].ModuleClass="nav-link";
                    }
                  }
                }
                else if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].type == 6  )
                {
                  if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse.length > 0)
                  {
                    if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 3 && data[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                    {
                      data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].SubModuleClass="nav-item";
                      data[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass="nav-item";
                    }
                    else if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 2 && data[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                    {
                      data[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass="nav-item disabled";
                    }
                    if(data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 3  && data.length -1  > global.ModuleIndex && data[global.ModuleIndex].courseModuleContent.length -1 == global.subModuleIndex  )
                    {
                      data[global.ModuleIndex+1].ModuleClass="nav-link";
                    }
                  }
                }
                else
                {
                  data[global.ModuleIndex].courseModuleContent[global.subModuleIndex].SubModuleClass="nav-item";
                  if(data[global.ModuleIndex].courseModuleContent.length > 1)
                        data[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass="nav-item";
                }
              }
              else if(data.length-1 > global.ModuleIndex)
              {
                data[global.ModuleIndex+1].ModuleClass="nav-link";
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
            data[0].check = true;
            this.setState({Modules:data});
            this._CertificationEnableEvent();
        } else {
            console.log(error);
        }
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
OnDragEnd  =(e) =>{
  global.FileContent.handleDragChangeEvent();
}
  showorhideTOC() {
    var body = $("body")
    body.toggleClass("sidebar-icon-only")
  }
  ContentRender(content,CourseId,ModuleId, ModuleContentId,IsPreview,dnone) {
    if(content != undefined)
    {
    var html =[];
    if (content.contentType == 1)
    html.push(<Instruction
      key={content.id}
      ContentItem={content.caseTextElement.textElement}
      contentId={content.contentType}
      ModuleId={ModuleId}
      ModuleContentId={ModuleContentId}
    ></Instruction>);
    if (content.contentType == 3)
    html.push( <Question
      courseId={CourseId}
      index={index++}
      key={content.id}
      CaseId={content.caseId}
      ContentId={content.contentType}
      ContentItem={content.caseQuestion.question}
      ModuleId={ModuleId}
      ModuleContentId={ModuleContentId}
      IsPreview={IsPreview}
      UserId = {this.props.UserId}
      isCourse={true}
      isShowFeedBack={this.props.isShowFeedBack}
      Guesses={this.state.Guesses}
      Submission_choice={this.state.Submission_choice}
      ></Question>
    );
    return html;
  }
  }
  showContent(id,evt, index) {
    this.setState({PaginationDotIndex:index});
    $(".content-slider .slide-link").removeClass("active")
     evt.currentTarget.className += " active";
     var _data = this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
     //_data.contentItem.pageContent[this.state.PageNumber-1][index].isClicked=true;
     _data.contentItem.pageContent.forEach(ele =>{
       ele.forEach(element =>{
        if(element.id == id)
        element.isClicked=true;
       })

     })
      var AllClicked= false;
      var Exit_loop = false;
      for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
        for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
          if(_data.contentItem.pageContent[i][j].contentType !=2 && _data.contentItem.pageContent[i][j].contentType !=4 && _data.contentItem.pageContent[i][j].contentType !=10)
          {
            if(_data.contentItem.pageContent[i][j].isClicked == true)
            {
              AllClicked=true;
              global.isAllPreviewed=true;
            }
            else if(_data.contentItem.pageContent[i][j].isClicked == undefined)
            {
              AllClicked=false;
              Exit_loop=true;
              global.isAllPreviewed=false;
              break;
            }
          }

        }
        if(Exit_loop)
        {
          break;
        }
      }
      if(AllClicked)
      {
      this.SaveTemplate2ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
      }
  }

  SaveTemplate2ModuleContentResponse = (_data,IsPreview,ModuleId,isAgree) => {
    try {
      if(_data != undefined) {
      if(_data.userCourseModuleContentResponse.length > 0)
      {
        if(_data.userCourseModuleContentResponse[0].status != 3)
      {
        if(_data.type == 6 || _data.type == 7 || _data.type == 5 || _data.type == 9) {
          if(_data.type == 6) {
            var _pageContent = _data.contentItem.pageContent[this.state.PageNumber-1];
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
             var _isVideo = false;
             _data.contentItem.pageContent.forEach(ele => {
               ele.forEach(element =>{
               if(element.caseFileSection != null && element.caseFileSection != "" && element.caseFileSection != undefined)
               {
                 _isVideo = element.caseFileSection.fileSection.files.some(x => x.type == 5);
               }
             });
            })

              for(var j=0;j<_pageContent.length;j++) {
                if(_pageContent[j].contentType == 3 && _pageContent[j].caseQuestion != null) {
                  status = _isQuestionAnsPending ? 2:3;
                }
                else {
                  if(_pageContent[j].contentType == 1 || _pageContent[j].contentType == 2) {
                    status = _isQuestionAnsPending || _isVideo ? 2:3;
                 }
                else if(_pageContent[j].contentType == 4) {
                   var _fileSection = _pageContent[j].caseFileSection.fileSection.files;
                   for(var x = 0; x<_fileSection.length;x++) {
                     if(_fileSection[x].type == 5) {
                       status = _isQuestionAnsPending || _isVideo ? 2:3;
                     }
                     else {
                       status = _isQuestionAnsPending || _isVideo ? 2:3;
                     }
                   }
                 }
                }
              }
         //   }

              const data = {
                userId: this.props.UserId,
                courseId:parseInt(this.props.CourseId),
                moduleContentId: _data.id,
                status: status,
                moduleId: ModuleId,
                IsPreview: JSON.parse(IsPreview),
                isDisclosureAccepted: isAgree,
                isTimedExam: this.props.isTimedExam
              }
            //   if(_data.userCourseModuleContentResponse[0].status != status)
            //   {
            //   InsertModuleContentResponse(data,true, res => {
            //     const { data, error } = res;
            //       CommonMethods.updateStatusForModuleContent(2,data);
            //   })
            // }
          }
        }
      }

      }
      }

    }
    catch(e) {
      console.error(e);
    }
  }
  renderCasePageContent =(CaseContent,CourseId,ModuleId,ModuleContentId,IsPreview) =>{
    if(CaseContent != "" && CaseContent != undefined) {
      if(this.state.CaseContentList.length == 0)
      this.setState({CaseContentList:CaseContent})
       var imageContent = [];
       var DicomimageContent=[];
       var content = [];
       var PaginationDots=[];
       var _tempData = [];
      imageContent = CaseContent[this.state.PageNumber-1].filter(t => t.contentType == 4 || t.contentType == 10);
      DicomimageContent = CaseContent[this.state.PageNumber-1].filter(t => t.contentType == 2);
      PaginationDots = CaseContent[this.state.PageNumber-1].filter(i => i.contentType !=2 && i.contentType !=4 && i.contentType !=10 );
      if(CaseContent[this.state.PageNumber-1].filter(i => i.contentType !=2 && i.contentType !=4 && i.contentType !=10).length > 0)
      {
        content.push(CaseContent[this.state.PageNumber-1].filter(i => i.contentType !=2 && i.contentType !=4 && i.contentType !=10 )[this.state.PaginationDotIndex]);
        if(content[0] != undefined)
        content[0].isClicked=true;
      }
        imageContent.forEach(element => {
         element.caseFileSection.fileSection.files.forEach(element => {
                  _tempData.push(element);
                });
       });
       DicomimageContent.forEach(element => {
        _tempData.push(element.caseFile.file);
       });
       return (
         <div>
                   <SplitterLayout percentage={true} primaryMinSize={10} onDragEnd={() => this.OnDragEnd()}
                   secondaryInitialSize={70} secondaryMinSize={30}>
                   {PaginationDots.length >0 ? (
                       <div className="left-content">
                       {PaginationDots.length >1 ?(
                       <div className="content-slider">
                         <ul>
                           {PaginationDots.map((ele, index) => {
                             return (
                               <li key={ele.id} className="c-pointer">
                                 <a
                                   key={ele.id}
                                   onClick={e => this.showContent(ele.id,e, index)}
                                   className={
                                     index == 0 ? "slide-link active" : "slide-link"
                                   }
                                 >
                                   <i className="mdi mdi-circle f-25 align-middle mr-3"></i>
                                 </a>
                               </li>
                             )
                           })}
                         </ul>
                       </div>
                       ):null}
                       <PerfectScrollbar>
                       {content.length > 0 ?(
                       <div className="qsn-scroll">
                       {content.map((ele, i) => {
                         return this.ContentRender(
                           ele,
                           CourseId,
                           ModuleId,
                           ModuleContentId,
                           IsPreview,
                           i != 0
                         )
                       })}
                       </div>
                       ):null}
                       </PerfectScrollbar>
                       </div>
                       ):null}

                   {/* <div className="tbl-cell v-line"></div> */}
                   {imageContent.length > 0 ?(
                   <div className="right-content">
                     <div className="">
                       {imageContent.map((ele, i) => {
                         if (i == 0) {

                           return (
                             <FileContent
                               key={ele.id}
                               ContentId={ele.contentType}
                               ContentItem={_tempData}
                               ModuleId={ModuleId}
                               courseId={CourseId}
                               ModuleContentId={content.id}
                               IsPreview={IsPreview}
                               UserId = {this.props.UserId}
                               isCourse={true}
                               CaseFileContent={ele.caseFileSection.fileSection.files}
                               CaptionHeight={ele.caseFileSection.fileSection.captionHeight}
                             ></FileContent>
                           )
                         }
                       })}
                     </div>
                   </div>
                   ):null}
                   {DicomimageContent.length > 0 ?(
                    <div className="right-content">
                      <div className="">
                        {DicomimageContent.map((ele, i) => {
                          if (i == 0) {
                            return (
                              <FileContent
                                key={ele.id}
                                ContentId={ele.contentType}
                                ContentItem={_tempData}
                                ModuleId={ModuleId}
                                courseId={CourseId}
                                ModuleContentId={content.id}
                                IsPreview={IsPreview}
                                UserId = {this.props.UserId}
                                isCourse={false}
                                // CaseFileContent={_tempData}
                              ></FileContent>
                            )
                          }
                        })}
                        </div>
                    </div>
                    ):null}
                   </SplitterLayout>
                   </div>
       )
    }

  }
  renderPageContent = (content, CourseId,moduleId,IsPreview) => {
    if(content != "" && content != undefined && content != null){
      if(content.contentItem != '' && content.contentItem != undefined && content.contentItem !=null) {
      if(content.type == 6)
        return(this.renderCasePageContent(content.contentItem.pageContent,CourseId,moduleId,content.id,IsPreview))
      if (content.type == 8)
    return (
      <Instruction
        key={content.id}
        ContentId={content.contentId}
        ContentItem={content.contentItem}
        ModuleContentId={content.id}
        ModuleId={moduleId}
        courseId={CourseId}
      ></Instruction>
    )
  if ((content.type >= 1 && content.type <= 5) || content.type == 9)  {
    var _tempList = [];
    _tempList.push(content.contentItem);
    return (
      <FileContent
        key={content.id}
        ContentId={content.contentId}
        ContentItem={_tempList}
        ModuleContentId={content.id}
        ModuleId={moduleId}
        courseId={CourseId}
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
        CaseId={content.caseId}
        ContentItem={content.contentItem}
        ModuleContentId={content.id}
        ModuleId={moduleId}
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
  _handleOnModuleChangeEvent = (Id,MIndex) => {
    try{

      this.setState({CaseContentList:[]})
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
              }
              else if(element.type == 6){
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
        else{
          _data.forEach(ele =>{
            ele.ModuleClass="nav-link";
          })
        }
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
      this.setState({CaseContentList:[]})
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
        CommonMethods.OnSubModuleChangeEvent(global.Template2);
      }
      this.setState({PaginationDotIndex:0,PageNumber:1,subModuleIndex: SubMIndex,ModuleIndex: MIndex});
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
 
  _handleOnPageChangeEvent = (PageNumber) => {
    this.setState({PageNumber: PageNumber,PaginationDotIndex:0});
    var _data = this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
    _data.contentItem.pageContent[PageNumber-1][0].isClicked=true;
     var AllClicked=false;
     var Exit_loop = false;
     var oneIteminPages=false;
     for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
        if(_data.contentItem.pageContent[i].length == 1)
        {
          oneIteminPages=true;
        }
        else
        {
          oneIteminPages=false;
          break;
        }
    }
    if(!oneIteminPages)
    {
     for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
       for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
           if(_data.contentItem.pageContent[i][j].isClicked == true)
           {
             AllClicked=true;
             global.isAllPreviewed=true;
           }
           else if(_data.contentItem.pageContent[i][j].isClicked == undefined)
           {
             AllClicked=false;
             Exit_loop=true;
             global.isAllPreviewed=false;
             break;
           }
         }
       if(Exit_loop)
       {
         break;
       }
     }
     if(AllClicked)
     {
     this.SaveTemplate2ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
     }
    }
     if(oneIteminPages)
     {
      this.SaveTemplate2ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
     }
  }
  renderModulePresentationView = () => {
    const {Course,IsPreview,isFaculty} = this.props;
        return (
          <div className="template-2">
        <div className="container-fluid page-body-wrapper">
          <nav className="navbar navbar-expand-lg fixed-top">
            <div className="navbar-brand-inner-wrapper d-inline-block">
            <img src="/assets/images/logo.png" class="img-fluid" alt="" ></img>
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-toggle="minimize"
              onClick={() => this.showorhideTOC()}>
              <span className="mdi mdi-backburger" title="Collapse/Expand"></span>
            </button>
            </div>
            
            <h5 className="mb-0 txt-ellipsis"
            style={{maxWidth :"55%"}}
            title={this.state.BannerText === "" ? Course.name : this.state.BannerText}
            >{this.state.BannerText === "" ? Course.name : this.state.BannerText}</h5>

            

          </nav>
          {this.state.Modules .length > 0 ?(              
          <ModuleBar
            selectedModule={this.state.ModuleIndex}
            selectedSubModule={this.state.subModuleIndex}
            name={this.state.Modules[this.state.ModuleIndex].title}
            moduleId={this.state.Modules[this.state.ModuleIndex].id}
            courseModules={this.state.Modules}
            onModuleChangeEvent = {(Id,Moduleindex) => this._handleOnModuleChangeEvent(Id,Moduleindex)}
            onSubModuleChangeEvent = {(ModuleIndex,SubMIndex) => this._handleOnSubModuleChangeEvent(ModuleIndex,SubMIndex)}
            SubIndexData={this.state.Modules[this.state.ModuleIndex].courseModuleContent[this.state.subModuleIndex]}
            CourseId ={this.state.Modules[this.state.ModuleIndex].courseId}
            IsPreview={IsPreview}
            UserId = {this.props.UserId}
            isTimedExam={this.props.isTimedExam}
            Course={this.props.Course}
          ></ModuleBar>):null}
          
          <div className="content-wrapper">
          {/* {this.props.TemplateType != "Workshop" ? */}
      {this.state.Modules.length > 1 || this.state.Modules[0].courseModuleContent.length >1 ?
           <div className="container-fluid mt-2">
             <div className="row">
             <div className="col-md-2">
          <input type="submit" value="Previous" className="btn btn-sm btn-primary" disabled={this.state.isDisabled} onClick={e => this._handleOnPreviousClick()}></input>
             </div>
             <div className="col-md-8">
             {this.state.CaseContentList.length > 0 ?(
          <PageBar
          selectedPage={this.state.CaseContentList[this.state.PageNumber-1][0].pageNumber}
          casepages={this.state.CaseContentList}
          PageChangeEvent={(id) => this._handleOnPageChangeEvent(id)}
        ></PageBar>
          ):null}
             </div>
             <div className="col-md-2">
             {this.state.PreogressthroughcaseQue ?(
          <input type="submit" value="Next" className="btn btn-sm btn-primary float-right"
        disabled={this.state.Modules[global.ModuleIndex].courseModuleContent.length > global.subModuleIndex+1 ?
           this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass=="nav-item" ? false:true :
           this.state.Modules.length >global.ModuleIndex+1 ?
           this.state.Modules[global.ModuleIndex+1].ModuleClass=="nav-link" ? false:true:this.state.ModuleIndex == this.state.Modules.length -1 && this.state.subModuleIndex == this.state.Modules[this.state.ModuleIndex].courseModuleContent.length -1} onClick={e => this._handleOnNextClick()}></input>
          ):(
          <input type="submit" value="Next" className="btn btn-sm btn-primary float-right" disabled={this.state.ModuleIndex == this.state.Modules.length -1 && this.state.subModuleIndex == this.state.Modules[this.state.ModuleIndex].courseModuleContent.length -1} onClick={e => this._handleOnNextClick()}></input>
          )}
             </div>
             </div>


          </div>:null}
         
          {this.state.isFacultyControl ?
        this.state.Modules[this.state.ModuleIndex].isEnable ?

        <PerfectScrollbar>
            <div className="container-fluid content-wrapper-scroll">
            {this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex] != undefined ?
            this.renderPageContent(this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex], this.state.Modules[global.ModuleIndex].courseId,this.state.Modules[global.ModuleIndex].id,IsPreview):null}
            </div>
         </PerfectScrollbar>:""
                :<PerfectScrollbar>
            <div className="container-fluid content-wrapper-scroll">
            {this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex] != undefined ?
            this.renderPageContent(this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex], this.state.Modules[global.ModuleIndex].courseId,this.state.Modules[global.ModuleIndex].id,IsPreview):null}
            </div>
         </PerfectScrollbar>}

         <footer className="footer">@VraySchool</footer>
         </div>
         </div>         
         </div>
        )
  }
  _handleOnPreviousClick = () => {
    try {
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
      // if(this.state.ModuleIndex == 0 && global.subModuleIndex == 0) {
      //   this.setState({isDisabled: true});
      // }
    }
    catch(e) {
      console.error(e);
    }
  }
  _handleOnNextClick = () => {

    try {
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
          global.ModuleBar.SaveTemplate2ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
        } else if((enable === null || enable === undefined) ? false : enable) {
          var moduleContentLength = this.state.Modules[this.state.ModuleIndex].courseModuleContent.length;
          if(moduleContentLength-1 == this.state.subModuleIndex) {
            this._handleOnModuleChangeEvent(0,this.state.ModuleIndex + 1);
          }
          else {
            this._handleOnSubModuleChangeEvent(this.state.ModuleIndex,this.state.subModuleIndex + 1);
          }
          var _data = this.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
          global.ModuleBar.SaveTemplate2ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
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
        global.ModuleBar.SaveTemplate2ModuleContentResponse(_data,this.props.IsPreview,this.state.Modules[global.ModuleIndex].id,null);
      }
    }
    catch(e) {
      console.error(e);
    }
  }
  render() {
    if(this.state.seconds == 0) {
      return(
        <div className="label-card">
        {/* {this.props.IsPreview == "true" ? <button style={{position : "absolute",right : "20px",top : "20px"}} className="btn btn-primary btn-sm " onClick={() => this._handleShowPreviewResetPopup(true)}>Reset</button> : null}
          <div className="card border-info">
            <div className="card-body">
            <h3 className="text-info">Course session time out.</h3>
            </div>
          </div> */}
          {/* {this.props.IsPreview == "true" ? <CoursePreviewResetPopUp
        isShowing={this.state.ShowCoursePreviewResetPopUp}
        _handleShowPreviewResetPopup={(e) => this._handleShowPreviewResetPopup(e)}
        _ResetPreviewResponses = {() => this._ResetPreviewResponses()}
        ResetStatus = {this.state.ResetStatus}
        >
        </CoursePreviewResetPopUp> : null } */}
        </div>
        )
    }
    else {
      return(
        (this.state.Modules.length !== 0 ) ?
        this.renderModulePresentationView() : <div></div>
      )
    }
  }

}