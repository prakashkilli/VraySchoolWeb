import React, { Component } from "react";
import "./question.css";
import { SubmitQuestionAnswers, QuestionResponse} from '../../Services';
 import Modal from 'react-bootstrap/Modal';
import TFQuestionModal from './TFQuestionModal';
import CATAQuestionModal from './CATAQuestionModal';
import MCCQuestionModal from './MCCQuestionModal';
import CommonMethods from '../Common/CommonMethodsComponent.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasResponse: [],
      isAnswered: false,
      selectedOption: 0,
      checkedid:0,
      counter: [],
      optionArray: [],
      CATAoptionArray: [],
      userresponse: false,
      Questions: [],
      showModel: false,
      haveBeenChecked: [],
      haveNotBeenChecked: [],
      correctOptions: [],
      textQuestion: '',
      questionOptionsLength: 0,
      correctAnswerCount: 0,
      correctAnswerPercentage: 0,
      questionType: 0,
      userSelectOptions: [],
      remainingOptions: [],
      tempTFData: [],
      isSubmit: false,
      isCheck: false,
    }
    global.Question = this;
  }
  componentDidMount = () => {
    try {
      if(this.props.isCourse) {
        const data = {
          userId: this.props.UserId,
          courseId: this.props.courseId,
          caseId: this.props.CaseId,
          questionId: this.props.ContentItem.id,
          moduleId: this.props.ModuleId,
          moduleContentId: this.props.ModuleContentId,
          isPreview: JSON.parse(this.props.IsPreview)
        }
        QuestionResponse(data,true, res => {
          const { data, error} = res;
          //data.splice(0, data.length - 1)
          if(data.length !== 0){
          var Result = data.filter(t => t.noOfAttempts == data[data.length - 1].noOfAttempts)
          var IsResponse = Result.filter(d => d.response == false)
            if ( (this.props.Submission_choice != "1" ? true : this.props.Guesses == '' ? true : ( Result[Result.length - 1].noOfAttempts >= parseInt(this.props.Guesses)) || (Result[Result.length - 1].response == null ? true : IsResponse.length == 0) ) ) {
              this.setState({ hasResponse: Result });
            } else {
              this.setState({ hasResponse: [] });
            }
          } else {
            this.setState({ hasResponse: [] });
          }

        })
      }
      else {
        const data = {
          caseId: this.props.CaseId,
          questionId: this.props.ContentItem.id,
          userId: this.props.UserId,
          isPreview: JSON.parse(this.props.IsPreview)
        }
        QuestionResponse(data,false, res => {
          const { data, error} = res;
          if (data) {
            this.setState({ hasResponse: data });
          }else{
            this.setState({ hasResponse: [] });
          }
        })

      }
    }
    catch (e) {
      console.error(e);
    }
  }
  TFQuestion = (courseId, caseId, question, index,ModuleId,isPreview) => {

    const _handleOnChange = (e, id, isCorrect,text,explanation) => {
      var _TFdata = this.state.tempTFData;
      question.questionOption.map(t => {
        if(t.id == id){
          if(t.isChecked == undefined){
            t.isChecked = true
          } else {
            t.isChecked = true
          }
        }

      })
      if (this.state.counter.indexOf(id) == -1) {
        this.setState({ counter: [...this.state.counter, id] });
      }
      index = this.state.optionArray.findIndex(x => x.optionId == id);
      if (index == -1) {
        this.state.optionArray = [...this.state.optionArray, { optionId: id, response: true == isCorrect}]
      }
      else {
        this.state.optionArray[index].response = true == isCorrect;
      }
      _TFdata = _TFdata.filter(y => y.optionId !== id )
      _TFdata.push({"response":e.target.value,"text":text,"explanation":explanation,isCorrect:isCorrect, "optionId": id});
      _TFdata = _TFdata.sort((a,b) => a.optionId - b.optionId);
      this.setState({userSelectOptions: this.state.optionArray,tempTFData: _TFdata});
    }
    const _handleOnChange1 = (e, id, isCorrect,text,explanation) => {
      var _TFdata = this.state.tempTFData;
      question.questionOption.map(t => {
        if(t.id == id){
          if(t.isChecked == undefined){
            t.isChecked = false
          } else {
            t.isChecked = false
          }
        }

      })
      if (this.state.counter.indexOf(id) == -1) {
        this.setState({ counter: [...this.state.counter, id] });
      }
      index = this.state.optionArray.findIndex(x => x.optionId == id);
      if (index == -1) {
        this.state.optionArray = [...this.state.optionArray, { optionId: id, response: false == isCorrect}]
      }
      else {
        this.state.optionArray[index].response = false == isCorrect;
      }
      _TFdata = _TFdata.filter(y => y.optionId !== id )
      _TFdata.push({"response":e.target.value,"text":text,"explanation":explanation,isCorrect:isCorrect, "optionId": id});
      _TFdata = _TFdata.sort((a,b) => a.optionId - b.optionId);
      this.setState({userSelectOptions: this.state.optionArray,tempTFData: _TFdata});
    }
    const _handleReviewExplanation = () => {
      this.setState({showModel: this.props.isShowFeedBack ?true:false});
    }
    const handleSubmit = evt => {
      evt.preventDefault();
      if(this.props.isCourse) {
        const data = {
          userId: this.props.UserId,
          courseId: courseId,
          caseId: caseId,
          questionId: question.id,
          qOptionId: 0,
          response: false,
          questionOptionSubmitDtos: this.state.optionArray,
          ModuleId : this.props.ModuleId,
          questionType: 3,
          ModuleContentId: this.props.ModuleContentId,
          isPreview: JSON.parse(isPreview),
          isAllPreviewed:global.isAllPreviewed,
        }
        SubmitQuestionAnswers(data,true, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res => {
          const { data, error} = res;
          const Response = data.questionAnswerResponses.filter(t => t.noOfAttempts == data.questionAnswerResponses[data.questionAnswerResponses.length - 1].noOfAttempts);
          const IsResponse = Response.filter(d => d.response == false)
          if(data)
         {
          if (global.Template1 != undefined) {
            var _data = global.Template1.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
          if(_data.type == 7)
          {
            CommonMethods.updateStatusForModuleContent(1,data);
          }
          else
          {
            for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
              for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                if(_data.contentItem.pageContent[i][j].contentType == 3)
                {
                if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                {
                  _data.contentItem.pageContent[i][j].isAnswered=true;
                }
                }
              }
            }
            var AllClicked=false;
            if(_data.contentItem.pageContent.length == 1)
            {
              AllClicked=true;
            }
             for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
               if(i > 0)
               {
                 if(_data.contentItem.pageContent[i][0].IsClicked == true)
                 {
                   AllClicked=true;
                 }
                 else if(_data.contentItem.pageContent[i][0].IsClicked == undefined)
                 {
                   AllClicked=false;
                   break;
                 }
               }
             }
             if(AllClicked)
             {
              CommonMethods.updateStatusForModuleContent(1,data);
             }
          }
        }
          if (global.Template2 != undefined) {
            var _data = global.Template2.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
            if(_data.type == 7)
            {
              CommonMethods.updateStatusForModuleContent(2,data);
            }
            else if(_data.type == 6)
            {
            for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
              for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                if(_data.contentItem.pageContent[i][j].contentType == 3)
                {
                if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                {
                  _data.contentItem.pageContent[i][j].isAnswered=true;
                }
              }
            }
          }
          CommonMethods.updateStatusForModuleContent(2,data);
           }
          }
      }
         else {
           console.error(error);
         }
    if( IsResponse.length == 0 || (this.props.Submission_choice != "1" ? true : this.props.Guesses == '' ? true : Response[Response.length - 1].noOfAttempts >= parseInt(this.props.Guesses))){
      this.setState({isAnswered: true, showModel: this.props.isShowFeedBack ? true : false, isSubmit: true,
        questionType: question.type, hasResponse: Response });
    } else {
      toast.error('Incorrect answer')
      question.questionOption.map(t => {
        if(t.isChecked == undefined){
          t.isChecked = ''
        } else {
          t.isChecked = ''
        }
      })
      this.setState({ hasResponse: [], counter: [] });
      }
        })
      }
      else {
        const data = {
          isPreview: JSON.parse(isPreview),
          caseId: caseId,
          questionId: question.id,
          questionType: 3,
          qOptionId: 0,
          userId: this.props.UserId,
          response: false,
          questionOptionSubmitDtos: this.state.optionArray,

      }
      SubmitQuestionAnswers(data,false, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res => {
        const { data, error} = res;
          if(data)
         {
          this.setState({isAnswered: true, showModel: this.props.isShowFeedBack ? true : false, isSubmit: true,
            questionType: question.type, hasResponse: data });
         }
         else {
           console.error(error);
         }
      })
    }


  }
    return (
      <form key={question.id} onSubmit={handleSubmit}>
        <div>
          <div className="mb-2">{question.text}</div>
          {this.state.isSubmit ? <div>
            {this.state.tempTFData.map(e => (
              <div>
              <label style={{fontWeight: 'bold'}}>{e.response == "true" ? "T  ": "F"}<label className="mr-2" dangerouslySetInnerHTML={{__html: e.text}} ></label></label>
              </div>
            ))}
          </div>:
                  <table className="para-mb-0">
                    <tbody>
                      {question.questionOption.map(
                        ({ text, id, isCorrect,explanation, isChecked }, i) => (
                          <tr key={id}>
                            <td className="td-width">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    name={id}
                                    type="radio"
                                    value={true}
                                    checked={isChecked === true}
                                    className="form-check-input"
                                    onChange={e => {
                                      _handleOnChange(e, id, isCorrect,text,explanation)
                                    }}
                                  />
                                True
                              </label>
                              </div>
                            </td>
                            <td className="td-width">
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    name={id}
                                    type="radio"
                                    className="form-check-input"
                                    value={false}
                                    checked={isChecked === false}
                                    onChange={e => {
                                      _handleOnChange1(e, id, isCorrect,text,explanation)
                                    }}
                                  />
                                False
                              </label>
                              </div>
                            </td>
                            <td className="p-0" dangerouslySetInnerHTML={{__html:text}}></td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
             }
        </div>
        <div className="text-center my-3">
          {this.state.isAnswered ? (
            <button hidden={!this.props.isShowFeedBack} className="btn btn-sm btn-primary" onClick={() => {_handleReviewExplanation()}}>
             Review Explanation</button>
          ) : (
              <button
                className="btn btn-primary"
                disabled={question.questionOption.length != this.state.counter.length}
                type="submit" value="Submit"
              >Submit</button>
            )}
        </div>
      </form>
    )
  }

  CATAQuestion = (courseId, caseId, question, index,ModuleId,isPreview,Guesses) => {
    const handleSubmit = evt => {
      evt.preventDefault();
      question.questionOption.map(t => {
        index = this.state.optionArray.findIndex(x => x.optionId == t.id);
        if (index == -1) {
          this.state.optionArray = [...this.state.optionArray, { optionId: t.id, response: t.isCorrect == false ? true : false,text:t.text,isChecked:false }]
        }
      })
      this.state.CATAoptionArray = this.state.optionArray.sort((a,b) => a.optionId - b.optionId)
      if(this.props.isCourse) {
        const data = {
          userId: this.props.UserId,
          courseId: courseId,
          caseId: caseId,
          questionId: question.id,
          qOptionId: 0,
          response: true,
          questionOptionSubmitDtos: this.state.optionArray,
          ModuleId : this.props.ModuleId,
          ModuleContentId: this.props.ModuleContentId,
          questionType: 2,
          isPreview: JSON.parse(isPreview),
          isAllPreviewed:global.isAllPreviewed,
        }
        SubmitQuestionAnswers(data,true, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res =>{
         const{data,error}=res;
         const Response = data.questionAnswerResponses.filter(t => t.noOfAttempts == data.questionAnswerResponses[data.questionAnswerResponses.length - 1].noOfAttempts);
         const IsResponse = Response.filter(d => d.response == false)
         if(data)
         {
          if (global.Template1 != undefined) {
          var _data = global.Template1.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
          if(_data.type == 7)
          {
            CommonMethods.updateStatusForModuleContent(1,data);
          }
          else
          {
            for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
              for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                if(_data.contentItem.pageContent[i][j].contentType == 3)
                {
                if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                {
                  _data.contentItem.pageContent[i][j].isAnswered=true;
                }
              }
            }
            }
            var AllClicked=false;
            if(_data.contentItem.pageContent.length == 1)
            {
              AllClicked=true;
            }
             for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
               if(i > 0)
               {
                 if(_data.contentItem.pageContent[i][0].IsClicked == true)
                 {
                   AllClicked=true;
                 }
                 else if(_data.contentItem.pageContent[i][0].IsClicked == undefined)
                 {
                   AllClicked=false;
                   break;
                 }
               }
             }
             if(AllClicked)
             {
              CommonMethods.updateStatusForModuleContent(1,data);
             }
          }
          }
          if (global.Template2 != undefined) {
            var _data = global.Template2.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
                if(_data.type == 7)
                {
                  CommonMethods.updateStatusForModuleContent(2,data);
                }
                else if(_data.type == 6)
                {
                for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
                  for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                    if(_data.contentItem.pageContent[i][j].contentType == 3)
                    {
                    if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                    {
                      _data.contentItem.pageContent[i][j].isAnswered=true;
                    }
                  }
                }
              }
              CommonMethods.updateStatusForModuleContent(2,data);
               }
          }
          }
          else {
            console.error(error);
          }
    if( IsResponse.length == 0 || (this.props.Submission_choice != "1" ? true : this.props.Guesses == '' ? true : Response[Response.length - 1].noOfAttempts >= parseInt(this.props.Guesses))){
      var _options = question.questionOption;
  var correctOptions = [];
  var haveBeenChecked = [];
  var haveNotBeenChecked = [];
  var tempHaveBeenChecked = [];
  var tempHaveNotBeenChecked = [];
  var count = 0;
  var userSelectedOptions = this.state.optionArray;
  for(var i = 0;i<_options.length;i++) {
    if(_options[i].isCorrect) {
      tempHaveBeenChecked.push(_options[i]);
    }
    else {
      tempHaveNotBeenChecked.push(_options[i]);
    }
  }
  for(var i =0;i<_options.length;i++) {
    for(var j =0;j<userSelectedOptions.length;j++) {
      if(_options[i].id == userSelectedOptions[j].optionId && userSelectedOptions[j].response) {
        count = count + 1;
      }
    }
  }
  var _percentage = (count / question.questionOption.length) * 100;
  if(_percentage != "100") {
    if(!this.state.isCheck) {
      haveBeenChecked.push(tempHaveBeenChecked.filter(function(o1){
        return userSelectedOptions.some(function(o2){
          return o2.response== true
        });
      }));
    haveNotBeenChecked.push(tempHaveNotBeenChecked.filter(function(o1){
      return !userSelectedOptions.some(function(o2){
        return o2.response== false
      });
    }));
    }
    else {
      haveBeenChecked.push(tempHaveBeenChecked.filter(function(o1){
        return userSelectedOptions.some(function(o2){
          return o2.optionId == o1.id && o1.isCorrect&&o2.response== false
        });
      }));
    haveNotBeenChecked.push(tempHaveNotBeenChecked.filter(function(o1){
      return !userSelectedOptions.some(function(o2){
        return o2.optionId == o1.id && o1.isCorrect&&o2.response== false
      });
    }));
    }
  }
  this.setState({ isAnswered: true, questionOptionsLength:question.questionOption.length, correctAnswerCount: count,
    correctAnswerPercentage: _percentage, showModel: this.props.isShowFeedBack ?true:false, haveBeenChecked: haveBeenChecked,
    correctOptions: correctOptions, haveNotBeenChecked:haveNotBeenChecked, questionType:question.type,
    isSubmit:true, hasResponse: Response });
} else {
  toast.error('Incorrect answer')
  // this.state.optionArray.forEach(e => {
  //   e.isChecked = false;
  // });
  question.questionOption.map(t => {
      if(t.isChecked == undefined){
        t.isChecked = false
      } else {
        t.isChecked = false;
      }

    });
  this.setState({ hasResponse: [], optionArray:[]});
}
        })
      }
      else {
        const data = {
          isPreview: JSON.parse(isPreview),
          caseId: caseId,
          questionId: question.id,
          questionType: 2,
          qOptionId: 0,
          userId: this.props.UserId,
          response: true,
          questionOptionSubmitDtos: this.state.optionArray,
      }
      SubmitQuestionAnswers(data,false, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res => {
        const {data, error} = res;
var _options = question.questionOption;
        var correctOptions = [];
        var haveBeenChecked = [];
        var haveNotBeenChecked = [];
        var tempHaveBeenChecked = [];
        var tempHaveNotBeenChecked = [];
        var count = 0;
        var userSelectedOptions = this.state.optionArray;
        for(var i = 0;i<_options.length;i++) {
          if(_options[i].isCorrect) {
            tempHaveBeenChecked.push(_options[i]);
          }
          else {
            tempHaveNotBeenChecked.push(_options[i]);
          }
        }
        for(var i =0;i<_options.length;i++) {
          for(var j =0;j<userSelectedOptions.length;j++) {
            if(_options[i].id == userSelectedOptions[j].optionId && userSelectedOptions[j].response) {
              count = count + 1;
            }
          }
        }
        var _percentage = (count / question.questionOption.length) * 100;
        if(_percentage != "100") {
          if(!this.state.isCheck) {
            haveBeenChecked.push(tempHaveBeenChecked.filter(function(o1){
              return userSelectedOptions.some(function(o2){
                return o2.response== true
              });
            }));
          haveNotBeenChecked.push(tempHaveNotBeenChecked.filter(function(o1){
            return !userSelectedOptions.some(function(o2){
              return o2.response== false
            });
          }));
          }
          else {
            haveBeenChecked.push(tempHaveBeenChecked.filter(function(o1){
              return userSelectedOptions.some(function(o2){
                return o2.optionId == o1.id && o1.isCorrect&&o2.response== false
              });
            }));
          haveNotBeenChecked.push(tempHaveNotBeenChecked.filter(function(o1){
            return !userSelectedOptions.some(function(o2){
              return o2.optionId == o1.id && o1.isCorrect&&o2.response== false
            });
          }));
          }
        }
        this.setState({isAnswered: true, questionOptionsLength:question.questionOption.length, correctAnswerCount: count,
          correctAnswerPercentage: _percentage, showModel: this.props.isShowFeedBack ?true:false, haveBeenChecked: haveBeenChecked,
          correctOptions: correctOptions, haveNotBeenChecked:haveNotBeenChecked, questionType:question.type,
          isSubmit:true, hasResponse: data });
      })

    }

    }
    const _handleOnChange = (e, id, isCorrect,text) => {
      question.questionOption.map(t => {
      if(t.id == id){
        if(t.isChecked == undefined){
          t.isChecked = true
        } else {
          t.isChecked = t.isChecked == false ? true : false;
        }
      }
      });
      index = this.state.optionArray.findIndex(x => x.optionId == id);
      if (index == -1) {
        this.state.optionArray = [...this.state.optionArray, { optionId: id, response: e.target.checked == isCorrect,text:text,isChecked:true}]
      }
      else {
        this.state.optionArray[index].response = e.target.checked == isCorrect;
        this.state.optionArray[index].isChecked = e.target.checked;
      }
      this.setState({isCheck: true, checkedid: id});
      //this.setState({userSelectOptions: this.state.optionArray});
    }
    const _handleReviewExplanation = () => {
      this.setState({showModel: this.props.isShowFeedBack ?true:false});
    }

    return (
      <form key={question.id} onSubmit={handleSubmit}>
        <div className="mb-2">{question.text} Check all that apply and click the submit button {this.state.hasResponse.length !=0?"(You are already attempted the question.The CORRECT RESPONSES are shown below.)":"" }</div>
        {this.state.isSubmit ? <div>
            {this.state.CATAoptionArray.map(e => (
               <table className="para-mb-0">
          <tbody>
            <tr>
              <td>
              <div className="form-check">
                <label className="form-check-label">
                <input
                  name={e.optionId}
                  type="checkbox"
                  className="form-check-input"
                  value={e.optionId}
                  disabled
                  checked={e.isChecked}
                />
                {e.response == true ? <div dangerouslySetInnerHTML={{__html:e.text}} ></div>:
                <del dangerouslySetInnerHTML={{__html:e.text}}></del>}
              </label>
              </div>
               </td>
               </tr>
             </tbody>
           </table>
            ))}
            </div>:
        <table className="para-mb-0">
          <tbody>
            <tr>
              <td>
                <div>
                  {question.questionOption.map(
                    ({ text, id, isCorrect, isChecked}, index) => (
                      <div key={id}>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              name={question.id}
                              type="checkbox"
                              className="form-check-input"
                              value={id}
                              checked={isChecked === undefined ? false : isChecked}
                              onChange={e => {
                                _handleOnChange(e, id, isCorrect,text);
                              }}
                            />
                            <div dangerouslySetInnerHTML={{ __html: text }} ></div>
                          </label>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>}
        <div className="text-center my-3">
          {this.state.isAnswered ? (
            <button  hidden={!this.props.isShowFeedBack} className="btn btn-primary" onClick={() => _handleReviewExplanation()}>Review Explanation
            </button>
          ) : (
              <button type="submit" disabled={this.state.optionArray.length == 0 || this.state.optionArray.filter(t => t.isChecked == true).length == 0 } className="btn btn-primary">Submit</button>
            )}
        </div>
      </form>
    )
  }

  MCCQuestion = (courseId, caseId, question, index, ModuleId, isPreview, Guesses) => {
    const _TFdata = [];
    const handleSubmit = evt => {
      evt.preventDefault();
      var count = 0;
      if(this.props.isCourse) {
        const data = {
          userId: this.props.UserId,
          courseId: courseId,
          caseId: caseId,
          questionId: question.id,
          qOptionId: this.state.selectedOption,
          response: this.state.userresponse,
          questionOptionSubmitDtos: [],
          ModuleId : this.props.ModuleId,
          ModuleContentId: this.props.ModuleContentId,
          questionType: 1,
          isPreview: JSON.parse(isPreview),
          isAllPreviewed:global.isAllPreviewed,
        }
          SubmitQuestionAnswers(data, true, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res => {
            const { data, error } = res;
            //data.questionAnswerResponses.splice(0, data.questionAnswerResponses.length - 1);
            if (data) {
              if (global.Template1 != undefined) {
              var _data = global.Template1.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
              if(_data.type == 7)
              {
                CommonMethods.updateStatusForModuleContent(1,data);
              }
              else
              {
              for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
                for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                  if(_data.contentItem.pageContent[i][j].contentType == 3)
                  {
                  if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                  {
                    _data.contentItem.pageContent[i][j].isAnswered=true;
                  }
                }
              }
            }
              var AllClicked=false;
              if(_data.contentItem.pageContent.length == 1)
            {
              AllClicked=true;
            }
               for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
                 if(i > 0)
                 {
                   if(_data.contentItem.pageContent[i][0].IsClicked == true)
                   {
                     AllClicked=true;
                   }
                   else if(_data.contentItem.pageContent[i][0].IsClicked == undefined)
                   {
                     AllClicked=false;
                     break;
                   }
                 }
               }
               if(AllClicked)
               {
                CommonMethods.updateStatusForModuleContent(1,data);
               }
            }
          }
              if (global.Template2 != undefined) {
                var _data = global.Template2.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
                if(_data.type == 7)
                {
                  CommonMethods.updateStatusForModuleContent(2,data);
                }
                else if(_data.type == 6)
                {
                for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
                  for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                    if(_data.contentItem.pageContent[i][j].contentType == 3)
                    {
                    if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                    {
                      _data.contentItem.pageContent[i][j].isAnswered=true;
                    }
                  }
                }
              }
              CommonMethods.updateStatusForModuleContent(2,data);
               }
              }
            }
            else {
              console.error(error);
            }
              const Response = data.questionAnswerResponses.filter(t => t.noOfAttempts == data.questionAnswerResponses[data.questionAnswerResponses.length - 1].noOfAttempts);
              if (Response[Response.length - 1].response || (this.props.Submission_choice != "1" ? true : this.props.Guesses == '' ? true : Response[Response.length - 1].noOfAttempts >= parseInt(this.props.Guesses))) {
               // this.setState({ hasResponse: Response });
                var _options = question.questionOption;
            var userSelectOptions = [];
            var remainingOptions = [];
            var correctOptions = [];
            for(var i =0;i<_options.length;i++) {
                if(_options[i].id == this.state.selectedOption && _options[i].isCorrect && this.state.userresponse) {
                  count = count + 1;
                }
            }
            var _percentage = (count / question.questionOption.length) * 100;
            for(var i = 0; i<_options.length;i++) {
                if(_options[i].id  == this.state.selectedOption) {
                    userSelectOptions.push(_options[i]);
                    _TFdata.push({"id":_options[i].id,"text":_options[i].text,"response":true,"isCorrect":_options[i].isCorrect});
                }
                else {
                    remainingOptions.push(_options[i]);
                    _TFdata.push({"id":_options[i].id,"text":_options[i].text,"response":false,"isCorrect":_options[i].isCorrect});
                }
                if(_options[i].isCorrect == true) {
                  correctOptions.push(_options[i]);
                }
            }
  this.setState({isSubmit:true, tempTFData:_TFdata, showModel:this.props.isShowFeedBack ?true:false,
    correctAnswerPercentage: _percentage, correctAnswerCount: count, questionType: question.type,
    isAnswered: true, questionOptionsLength:question.questionOption.length, userSelectOptions: userSelectOptions,
    remainingOptions: remainingOptions, correctOptions: correctOptions, hasResponse: Response });
              } else {
                toast.error('Incorrect answer')
                this.setState({ hasResponse: [], selectedOption: 0, checkedid: 0  });
              }
          })
      }
      else {
        const data = {
          isPreview: JSON.parse(isPreview),
          caseId: caseId,
          questionId: question.id,
          qOptionId: this.state.selectedOption,
          response: this.state.userresponse,
          questionOptionSubmitDtos: [],
          userId: this.props.UserId,
          questionType: 1,
      }
      SubmitQuestionAnswers(data,false, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res => {
        const {data, error} = res;
var _options = question.questionOption;
var userSelectOptions = [];
var remainingOptions = [];
var correctOptions = [];
for(var i =0;i<_options.length;i++) {
    if(_options[i].id == this.state.selectedOption && _options[i].isCorrect && this.state.userresponse) {
      count = count + 1;
    }
}
var _percentage = (count / question.questionOption.length) * 100;
for(var i = 0; i<_options.length;i++) {
    if(_options[i].id  == this.state.selectedOption) {
        userSelectOptions.push(_options[i]);
        _TFdata.push({"id":_options[i].id,"text":_options[i].text,"response":true,"isCorrect":_options[i].isCorrect});
    }
    else {
        remainingOptions.push(_options[i]);
        _TFdata.push({"id":_options[i].id,"text":_options[i].text,"response":false,"isCorrect":_options[i].isCorrect});
    }
    if(_options[i].isCorrect == true) {
      correctOptions.push(_options[i]);
    }
}
this.setState({isSubmit:true, tempTFData:_TFdata, showModel:this.props.isShowFeedBack ?true:false,
correctAnswerPercentage: _percentage, correctAnswerCount: count, questionType: question.type,
isAnswered: true, questionOptionsLength:question.questionOption.length, userSelectOptions: userSelectOptions,
remainingOptions: remainingOptions, correctOptions: correctOptions, hasResponse: data});
      })
    }
    }

    const handleOnChange = (e, id, isCorrect) => {
      this.setState({ selectedOption: id, checkedid: id, });
      if (isCorrect == true)
        this.state.userresponse = true;
      else
        this.state.userresponse = false;
    };
    const _handleReviewExplanation = () => {
      this.setState({showModel:this.props.isShowFeedBack ?true:false});
    }

    return (
      <form key={question.id} onSubmit={handleSubmit}>
         <div className="mb-2">{question.text}</div>
         {this.state.isSubmit ? <div>
          {this.state.tempTFData.map(({ id, text,isCorrect,response }) => (
                    <div key={id} className="para-mb-0">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            name={id}
                            type="radio"
                            disabled
                            checked={response}
                          />
                          {isCorrect ?<div className="mb-0" dangerouslySetInnerHTML={{__html: text}} ></div>:
                          <del dangerouslySetInnerHTML={{__html: text}}></del>}
                        </label>
                      </div>
                    </div>
                  ))}
         </div>:
        <table className="para-mb-0">
          <tbody>
            <tr>
              <td>
                {question.questionOption.map(({ id, text, isCorrect }) => (
                  <div key={id}>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          name={question.id}
                          type="radio"
                          checked={id == this.state.checkedid}
                          value={id}
                          onChange={e => {
                            handleOnChange(e, id, isCorrect)
                          }}
                        />
                        <div dangerouslySetInnerHTML={{ __html: text }} >
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>}
        {/* </table> */}
        <div className="text-center my-3">
          {this.state.isAnswered ? (
            <button  hidden={!this.props.isShowFeedBack} className="btn btn-sm btn-primary" onClick={() => {_handleReviewExplanation()}}>Review Explanation
            </button>
          ) : (
              <button
                disabled={this.state.selectedOption == 0}
                type="submit"
                className="btn btn-primary">Submit</button>
            )}
        </div>
      </form>
    )
  }

  MCCQuestionResponse = (id, question, index,ModuleId,responseData,isPreview) => {
    const _data = [];
    for(var i=0;i<responseData.length;i++) {
      for(var j=0;j<question.questionOption.length;j++) {
        if(responseData[i].questionOptionId == question.questionOption[j].id) {
          _data.push({"isCorrect":question.questionOption[j].isCorrect,"id":question.questionOption[j].id,"response":responseData[i].response ? question.questionOption[j].isCorrect : !question.questionOption[j].isCorrect,"text":question.questionOption[j].text,"explanation":question.questionOption[j].explanation});
        }
        else {
          _data.push({"isCorrect":question.questionOption[j].isCorrect,"id":question.questionOption[j].id,"response":false,"text":question.questionOption[j].text,"explanation":question.questionOption[j].explanation});
        }
      }
    }
    const _handleReviewExplanation = ()=> {
            var _options = question.questionOption;
            var userSelectOptions = [];
            var remainingOptions = [];
            var correctOptions = [];
            var count = 0;
            for(var i =0;i<_options.length;i++) {
                if(_options[i].id == responseData[0].questionOptionId && responseData[0].response) {
                  count = count + 1;
                }
            }
            var _percentage = (count / question.questionOption.length) * 100;

              for(var j=0;j<_options.length;j++) {
                if(responseData[0].questionOptionId == _options[j].id) {
                  userSelectOptions.push(_options[j]);
                }
                else {
                    remainingOptions.push(_options[j]);
                }
              }

            this.setState({showModel:this.props.isShowFeedBack ?true:false,correctAnswerPercentage: _percentage,correctAnswerCount: count,questionType: question.type, isAnswered: true,questionOptionsLength:question.questionOption.length,userSelectOptions: userSelectOptions,remainingOptions: remainingOptions,correctOptions: correctOptions});
    }
    return (
      <div key={index}>
        <div className="mb-2">{question.text}</div>
        <table className="para-mb-0">
          <tbody>
            <tr>
              <td>
                <div>
                  {_data.map(({ id, text,isCorrect,response }) => (
                    <div key={id}>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            name={id}
                            type="radio"
                            disabled
                            checked={response}
                          />
                          {isCorrect ?<div className="mb-0" dangerouslySetInnerHTML={{__html: text}}  style={{color:isCorrect && response?"green": isCorrect ==false && response ==false ? "red":isCorrect && response == false ? "green":"red"}}></div>:
                          <del dangerouslySetInnerHTML={{__html: text}}  style={{color:isCorrect && response?"green": isCorrect ==false && response ==false ? "red":isCorrect && response == false ? "green":"red"}}></del>}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-2">
          <button  hidden={!this.props.isShowFeedBack} className="btn btn-sm btn-primary" onClick={() => _handleReviewExplanation()} >Review Explanation
          </button>
        </div>
      </div>
    )
  }

  CATAQuestionResponse = (question, index,ModuleId,responseData,isPreview) => {
    const _data = [];
      question.questionOption.filter(function(o1){
        responseData.some(function(o2){
          if(o2.questionOptionId == o1.id) {
            _data.push({"isCorrect":o1.isCorrect,"id":o1.id,"response":o2.response ? o1.isCorrect : !o1.isCorrect,"text":o1.text,"explanation":o1.explanation});
          }
        });
      });
    const _handleReviewExplanation = () => {
      var _options = question.questionOption;
          var correctOptions = [];
          var haveBeenChecked = [];
          var haveNotBeenChecked = [];
          var tempHaveBeenChecked = [];
          var tempHaveNotBeenChecked = [];
          var count = 0;
          var userSelectedOptions = responseData;
          for(var i = 0;i<_options.length;i++) {
            if(_options[i].isCorrect) {
              tempHaveBeenChecked.push(_options[i]);
            }
            else {
              tempHaveNotBeenChecked.push(_options[i]);
            }
          }
          for(var i =0;i<_options.length;i++) {
            for(var j =0;j<userSelectedOptions.length;j++) {
              if(_options[i].id == userSelectedOptions[j].questionOptionId && userSelectedOptions[j].response) {
                count = count + 1;
              }
            }
          }
          var _percentage = (count / question.questionOption.length) * 100;
          if(_percentage != "100") {
            haveBeenChecked.push(tempHaveBeenChecked.filter(function(o1){
              return userSelectedOptions.some(function(o2){
                return o2.questionOptionId == o1.id && o1.isCorrect == true
              });
            }));
          haveNotBeenChecked.push(tempHaveNotBeenChecked.filter(function(o1){
            return userSelectedOptions.some(function(o2){
              return o2.questionOptionId == o1.id && o1.isCorrect == false
            });
          }));
          }
          else {
            haveBeenChecked.push(tempHaveBeenChecked.filter(function(o1){
              return userSelectedOptions.some(function(o2){
                return o2.optionId == o1.id && o1.isCorrect&&o2.response== false
              });
            }));
          haveNotBeenChecked.push(tempHaveNotBeenChecked.filter(function(o1){
            return !userSelectedOptions.some(function(o2){
              return o2.optionId == o1.id && o1.isCorrect&&o2.response== false
            });
          }));
          }
          this.setState({questionOptionsLength:question.questionOption.length,correctAnswerCount: count,correctAnswerPercentage: _percentage,showModel: this.props.isShowFeedBack ?true:false,haveBeenChecked: haveBeenChecked,correctOptions: correctOptions,haveNotBeenChecked:haveNotBeenChecked,questionType:question.type});
    }
    return (
      <div key={index}>
        <div className="mb-2">{question.text}  Check all that apply and click the submit button {this.state.hasResponse.length !=0?"(You are already attempted the question.The CORRECT RESPONSES are shown below.)":"" }</div>
        <table className="para-mb-0">
          <tbody>
            <tr>
              <td>
                <div>
                  {_data.map(({ id, text,response,isCorrect }) =>  (
                    <div key={id}>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            name={id}
                            type="checkbox"
                            checked={response}
                            className="form-check-input"
                            disabled
                          />
                          {isCorrect ?
                          <div dangerouslySetInnerHTML={{__html: text}}></div>:
                          <del dangerouslySetInnerHTML={{__html:text}} ></del>}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-2">
          <button  hidden={!this.props.isShowFeedBack} className="btn btn-sm btn-primary" onClick={() => {_handleReviewExplanation()}}>Review Explanation
          </button>
        </div>
      </div>
    )
  }
  TFQuestionResponse = (question, index,ModuleId,responseData,isPreview) => {
    const _handleReviewExplanation = () => {
      this.setState({tempTFData:[]});
      var _data = this.state.tempTFData;
      question.questionOption.filter(function(o1){
        responseData.some(function(o2){
          if(o2.questionOptionId == o1.id) {
            _data.push({"response":o2.response ? o1.isCorrect.toString() :  (!o1.isCorrect).toString(),"text":o1.text,"explanation":o1.explanation,isCorrect:o1.isCorrect});
          }
        });
      });
      this.setState({showModel: this.props.isShowFeedBack ?true:false,tempTFData: _data,questionType:3});
    }
    return (
      <div key={index}>
         <div className="mb-2">{question.text} (Please respond to the following with TRUE or FALSE)</div>
        <table className="para-mb-0">
          <tbody>
            <tr>
              <td style={{width: "65%"}}>
                <div>
                  {question.questionOption.map(({ id, text,isCorrect }) => (
                    <div key={id} className="t-f-qsn">
                        <label>
                          {/* <input
                            name={question.id}
                            type="radio"
                            className="form-check-input"
                            disabled
                          /> */}
                          <div className="f-bold d-inline-block">{isCorrect ? "T " : "F "}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                          <div className="d-inline-block" dangerouslySetInnerHTML={{__html: text}} ></div>
                        </label>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-2">
          <button  hidden={!this.props.isShowFeedBack} className="btn btn-sm btn-primary" onClick={() => _handleReviewExplanation()}>Review Explanation
          </button>
        </div>
      </div>
    )
  }
  TQuestion = (courseId, caseId, question, index,ModuleId,QuestionType,isPreview) => {
    const handleSubmit = evt => {
      evt.preventDefault();
      if(this.props.isCourse) {
        const _data = {
          userId: this.props.UserId,
          courseId: courseId,
          caseId: caseId,
          questionId: question.id,
          qOptionId: 0,
          response: false,
          questionOptionSubmitDtos: [],
          ModuleId : this.props.ModuleId,
          ModuleContentId: this.props.ModuleContentId,
          questionType: QuestionType,
          textAnswer: this.state.textQuestion,
          isPreview: JSON.parse(isPreview),
          isAllPreviewed:global.isAllPreviewed,
        }
        SubmitQuestionAnswers(_data,true, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res => {
          const { data, error } = res;
          if (data) {
            this.setState({ isAnswered: true, hasResponse: data.questionAnswerResponses});
            if (global.Template1 != undefined) {
              var _data = global.Template1.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
          if(_data.type == 7)
          {
            CommonMethods.updateStatusForModuleContent(1,data);
          }
          else
          {
              for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
                for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                  if(_data.contentItem.pageContent[i][j].contentType == 3)
                  {
                  if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                  {
                    _data.contentItem.pageContent[i][j].isAnswered=true;
                  }
                }
              }
            }
              var AllClicked=false;
              if(_data.contentItem.pageContent.length == 1)
              {
                AllClicked=true;
              }
               for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
                 if(i > 0)
                 {
                   if(_data.contentItem.pageContent[i][0].IsClicked == true)
                   {
                     AllClicked=true;
                   }
                   else if(_data.contentItem.pageContent[i][0].IsClicked == undefined)
                   {
                     AllClicked=false;
                     break;
                   }
                 }
               }
               if(AllClicked)
               {
                CommonMethods.updateStatusForModuleContent(1,data);
               }
              }
            }
            if (global.Template2 != undefined) {
              var _data = global.Template2.state.Modules[global.ModuleIndex].courseModuleContent[global.subModuleIndex];
              if(_data.type == 7)
              {
                CommonMethods.updateStatusForModuleContent(2,data);
              }
              else if(_data.type == 6)
              {
              for (var i = 0; i < _data.contentItem.pageContent.length; i++) {
                for (var j = 0; j < _data.contentItem.pageContent[i].length; j++) {
                  if(_data.contentItem.pageContent[i][j].contentType == 3)
                  {
                  if(_data.contentItem.pageContent[i][j].caseQuestion.questionId == question.id)
                  {
                    _data.contentItem.pageContent[i][j].isAnswered=true;
                  }
                }
              }
            }
            CommonMethods.updateStatusForModuleContent(2,data);
             }
            }
          }
        })
      }
      else {
        const _data = {
          isPreview: JSON.parse(isPreview),
          caseId: caseId,
          questionId: question.id,
          qOptionId: 0,
          response: false,
          questionOptionSubmitDtos: [],
          userId: this.props.UserId,
          questionType: QuestionType,
          textAnswer: this.state.textQuestion,
      }
      SubmitQuestionAnswers(_data,false, this.props.Submission_choice != "1" ? false : true, this.props.Guesses, res => {
        const { data, error } = res;
          if (data) {
            this.setState({ isAnswered: true});
          }
      })
    }
    }
    const _handleOnTextAreaChange = (e) => {
      this.setState({textQuestion: e.target.value, tquestion: e.target.value});
    }
    return (
      <form key={question.id} onSubmit={handleSubmit}>
        <div key={index} className="para-mb-0">
          <label>{question.text}</label><br/>
          <textarea disabled={this.state.isAnswered} onChange={(e) => {_handleOnTextAreaChange(e)}} className="form-control w-75" id="tquestion" name="tquestion" rows="4" cols="50" >
          </textarea><br/>
          <div className="text-center my-3">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                  disabled={this.state.isAnswered}
                />
          </div>
        </div>
      </form>
    )
  }
  TQuestionResponse = (question, index,ModuleId,isPreview) => {
    return (
      <div key={index} className="para-mb-0">
        <label>{question.text}</label><br/>
        <textarea disabled className="form-control w-75" id="tquestion" name="tquestion" rows="4" cols="50" value={CommonMethods.getPlainText(question.explanation)}>
        </textarea><br/>
        <div className="text-center mt-2">
        <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                  disabled
                />
        </div>
      </div>
    )
  }

  QuestionRender(courseId, caseId, question, index, hasResponse,ModuleId,isPreview,Guesses) {
    var html = [];
    if(question != '' && question != undefined) {
      if (question.type == 1) {
        if (hasResponse.length != 0)
          html.push(this.MCCQuestionResponse(question.id, question, index,ModuleId,hasResponse,isPreview));
        else
          html.push(this.MCCQuestion(courseId, caseId, question, index,ModuleId,isPreview,Guesses));
      }
      if (question.type == 2) {
        if (hasResponse.length != 0)
          html.push(this.CATAQuestionResponse(question, index,ModuleId,hasResponse,isPreview));
        else
          html.push(this.CATAQuestion(courseId, caseId, question, index,ModuleId,isPreview,Guesses));
      }
      if (question.type == 3) {
        if (hasResponse.length != 0)
          html.push(this.TFQuestionResponse(question, index,ModuleId,hasResponse,isPreview));
        else
          html.push(this.TFQuestion(courseId, caseId, question, index,ModuleId,isPreview));
      }
      if (question.type == 4) {
        if (hasResponse.length != 0)
          html.push(this.TQuestionResponse(question, index,ModuleId,isPreview));
        else
          html.push(this.TQuestion(courseId, caseId, question, index,ModuleId,question.type,isPreview));
      }
    }

    return html;
  }

  _handleShowModel = (value) => {
    if(this.state.hasResponse.length != 0)
    {
      this.setState({tempTFData:[]});
    }
    this.setState({showModel: value});
  }

  render() {
    const classtext = this.props.dnone == true ? "d-none" : "";
    return (
      this.state.hasResponse != undefined ?
      <div
        id={"content_" + this.props.ContentId}
        key={this.props.ContentId}
        className={"qsn-brk para-mb-0 mt-4" + classtext}
      >
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
        <h4>Question</h4>
        {this.QuestionRender(
          this.props.courseId,
          this.props.CaseId,
          this.props.ContentItem,
          this.props.index,
          this.state.hasResponse,
          this.props.ModuleId,
          this.props.IsPreview,
          this.props.Guesses,
        )}
        <div>
        <Modal
              show={this.state.showModel}
              onHide={() => this._handleShowModel(false)}
              dialogClassName="modal-lg exp-popup"
              aria-labelledby="modla-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                Explanation
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div>
                        <h5 className="text-primary">Question</h5>
                        <label>{this.props.ContentItem.text}{this.props.ContentItem.type == 2 ? "Check all that apply and click the submit button" + this.state.hasResponse.length !=0?"(You are already attempted the question.The CORRECT RESPONSES are shown below.)":""  :this.props.ContentItem.type == 1?"Please respond to the following with TRUE or FALSE":""}</label>
                        <div className="pl-4">
                        {/* <h6 className="text-primary">Explanation</h6>                         */}
                        {this.state.questionType == 2 ?
                        <CATAQuestionModal
                        correctAnswerPercentage={this.state.correctAnswerPercentage}
                        questionOptionsLength={this.state.questionOptionsLength}
                        haveBeenChecked={this.state.haveBeenChecked.length > 0 ? this.state.haveBeenChecked[0]:this.state.haveBeenChecked}
                        haveNotBeenChecked={this.state.haveNotBeenChecked > 0 ? this.state.haveNotBeenChecked[0]:this.state.haveNotBeenChecked}
                        correctAnswerCount={this.state.correctAnswerCount}
                        question={this.props.ContentItem}
                        >
                        </CATAQuestionModal>
                          :null
                        }
                        {this.state.questionType == 1 ?
                        <MCCQuestionModal
                        userSelectOptions={this.state.userSelectOptions}
                        remainingOptions={this.state.remainingOptions}
                        >
                        </MCCQuestionModal>
                          :null
                        }
                        {this.state.questionType == 3 ?
                        <TFQuestionModal tempTFData={this.state.tempTFData}></TFQuestionModal>
                        :null}
                        </div>
                    </div>
              </Modal.Body>
            </Modal>
        </div>
      </div>:null
    )
  }
}