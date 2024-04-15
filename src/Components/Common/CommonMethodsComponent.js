import {GetUserCourse} from '../../Services';
const CommonMethods={
    getPlainText(text){
        var temp=document.createElement('div');
        temp.innerHTML=text;
        return temp.textContent;
    },
    getDataFromJson(JsonData,text) {
        var _value = "";
        for(var i = 0;i<JsonData.length;i++) {
            var _fields = JsonData[i].fields;
            for(var j=0;j<_fields.length;j++){
                if(_fields[j].name == text)
                _value = _fields[j].value;
            }
        }
        return _value;
    },
    OnSubModuleChangeEvent(Template){
        if(Template.state.PreogressthroughcaseQue)
        {
          Template.state.Modules[global.ModuleIndex].courseModuleContent.forEach((element,_subMindex) =>{
            if(element.type == 7)
            {
              if(_subMindex == global.subModuleIndex)
                {
                  if(Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse.length > 0)
                  {
                    if(Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 3 && Template.state.Modules[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                    {
                      Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item";
                    }
                    else if(Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 2 && Template.state.Modules[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                    {
                      Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item disabled";
                    }
                    if(Template.state.Modules[global.ModuleIndex].courseModuleContent.length -1 == global.subModuleIndex && Template.state.Modules.length -1  > global.ModuleIndex && Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 3 )
                    {
                      Template.state.Modules[global.ModuleIndex+1].ModuleClass="nav-link";
                    }
                    if(Template.state.Modules[global.ModuleIndex].courseModuleContent.length -1 == global.subModuleIndex && Template.state.Modules.length -1  > global.ModuleIndex && Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 2 )
                    {
                      Template.state.Modules[global.ModuleIndex+1].ModuleClass="nav-link disabled";
                    }
                  }
                  if(Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse.length > 0)
                  {
                    if(Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex].userCourseModuleContentResponse[0].status == 3 && Template.state.Modules[global.ModuleIndex].courseModuleContent.length -1 == global.subModuleIndex && Template.state.Modules.length -1  > global.ModuleIndex )
                      {
                        Template.state.Modules[global.ModuleIndex+1].ModuleClass="nav-link";
                        Template.state.Modules[global.ModuleIndex].ModulePreviewDone=true;
                      }
                  }
              }
            }
            else if(element.type == 6  )
            {
              if(Template.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse.length > 0)
              {
                if(Template.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 3 && Template.state.Modules[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                {
                  Template.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex].SubModuleClass="nav-item";
                  Template.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass="nav-item";
                }
                else if(Template.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 2 && Template.state.Modules[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex)
                {
                  Template.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex+1].SubModuleClass="nav-item disabled";
                }
                if(Template.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex].userCourseModuleContentResponse[0].status == 3  && Template.state.Modules.length -1  > global.ModuleIndex && Template.state.Modules[global.ModuleIndex].courseModuleContent.length -1 == global.subModuleIndex  )
                {
                  Template.state.Modules[global.ModuleIndex+1].ModuleClass="nav-link";
                }
              }
              else if(_subMindex == global.subModuleIndex && Template.state.Modules[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex )
            {
              Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item";
  
            }
            }
            else if(_subMindex == global.subModuleIndex && Template.state.Modules[global.ModuleIndex].courseModuleContent.length-1 > global.subModuleIndex )
            {
              Template.state.Modules[global.ModuleIndex].courseModuleContent[_subMindex+1].SubModuleClass="nav-item";
  
            }
            if(Template.state.Modules.length -1  > global.ModuleIndex &&  Template.state.Modules[global.ModuleIndex].courseModuleContent.length -1 == global.subModuleIndex && element.type != 7 && element.type != 6 )
            {
              Template.state.Modules[global.ModuleIndex+1].ModuleClass="nav-link";
              Template.state.Modules[global.ModuleIndex].ModulePreviewDone=true;
            }
          })
        }
        else{
          Template.state.Modules[global.ModuleIndex].courseModuleContent.forEach(ele =>{
            ele.SubModuleClass="nav-item";
          })
        }
      },
      updateStatusForModuleContent(Template,data) {
        var Modules = [];
        if(Template == 1)
        Modules = global.Template1.state.Modules;
        else
        Modules = global.Template2.state.Modules;
        for(var i = 0; i<Modules.length;i++) {
          if(Modules[i].id == data.moduleId) {
            var _courseModuleContent = Modules[i].courseModuleContent;
            for(var j = 0;j<_courseModuleContent.length;j++) {
              if(_courseModuleContent[j].id == data.moduleContentId) {
                if(_courseModuleContent[j].userCourseModuleContentResponse[0] == undefined) {
                  let obj = {
                    "status":data.moduleContentStatus,
                    id:data.moduleContentResponseId,
                    isFlaged:false,
                    courseModuleContentId:data.moduleContentId,
                  }
                  _courseModuleContent[j].userCourseModuleContentResponse.push(obj);
                }
                else {
                  _courseModuleContent[j].userCourseModuleContentResponse[0].status = data.moduleContentStatus ;
                }
              }
            }
            if(Modules[i].userCourseModuleResponse[0] == undefined) {
              let obj = {
                "status":data.moduleStatus
              }
              Modules[i].userCourseModuleResponse.push(obj);
            }
            else {
              Modules[i].userCourseModuleResponse[0].status = data.moduleStatus
            }
          }
        }
        if(global.Template1 != undefined)
        {
          if(Template == 1)
          this.OnSubModuleChangeEvent(global.Template1);
        }
        if(global.Template2 != undefined)
        {
          if(Template == 2)
          this.OnSubModuleChangeEvent(global.Template2);
        }
        if(data.courseStatus == 3) {
          var JsonData ="";
          var _tempData="";
          var CertificationScore ="";
          GetUserCourse(global.App.state.CourseId,global.App.state.UserId,global.App.state.IsPreview ,res => {
            const {data, error } = res;
            if(data) {
              _tempData = data;
              JsonData=JSON.parse(data.settings);
              var _redirectURL = this.getDataFromJson(JsonData,"Redirect_url");
               CertificationScore = CommonMethods.getDataFromJson(JsonData,"Certificate_score");
               var Iscertificate_course = CommonMethods.getDataFromJson(JsonData,"Iscertificate_course");
              if(_redirectURL != "" && _redirectURL != null && _redirectURL != undefined) {
                window.open(_redirectURL, '_blank');
              }
              if(global.Template1 != undefined) {
                if(Iscertificate_course == "" ? false: JSON.parse(Iscertificate_course)) {
                  if(CertificationScore!= "" &&CertificationScore!= undefined && _tempData.userCourseResponse != undefined)
                  {
                    if(_tempData.userCourseResponse.score >= parseInt(CertificationScore))
                    {
                      global.Template1.setState({EnableCertificationBtn:true});
                    }
                  }else if(CertificationScore === ""){
                    global.Template1.setState({EnableCertificationBtn:true});
                  }
                }
                else {
                  global.Template1.setState({EnableCertificationBtn:false});
                }
                if(global.Template1.state.ShowCourseCompleted){
                  global.Template1.setState({Allow_Certificate: false});
                } else {
                  global.Template1.setState({Allow_Certificate: false,ShowCourseCompletedPopup:true,ShowCourseCompleted: true});
                }
  
  
              }
              if(global.Template2 != undefined) {
                if(Iscertificate_course == "" ? false: JSON.parse(Iscertificate_course)) {
                  if(CertificationScore!= "" &&CertificationScore!= undefined && _tempData.userCourseResponse != undefined)
                  {
                    if(_tempData.userCourseResponse.score >= parseInt(CertificationScore))
                    {
                      global.Template2.setState({EnableCertificationBtn:true});
                    }
                  }else if(CertificationScore === ""){
                    global.Template2.setState({EnableCertificationBtn:true});
                  }
                }
                else {
                  global.Template2.setState({EnableCertificationBtn:false});
                }
                if(global.Template2.state.ShowCourseCompleted){
                  global.Template2.setState({Allow_Certificate: false});
                } else {
                  global.Template2.setState({Allow_Certificate: false,ShowCourseCompletedPopup:true,ShowCourseCompleted: true});
                }
              }
            }
          })
  
        }
        if(Template == 1) {
          global.Template1.setState({Modules: Modules});
        }
        else {
          global.Template2.setState({Modules: Modules});
        }
      },
}
export default CommonMethods;