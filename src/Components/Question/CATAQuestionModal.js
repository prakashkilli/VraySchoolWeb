import React,{Component} from 'react';
import CommonMethods from '../Common/CommonMethodsComponent';
export default class CATAQuestionModal extends Component {
    render () {
        const {correctAnswerPercentage,questionOptionsLength,haveBeenChecked,haveNotBeenChecked,correctAnswerCount,question} = this.props;
        return (
            <div>
                          <label>There were<span className="mx-1 f-600">{questionOptionsLength}&nbsp;items</span>
                           presented you.</label>
                            <h5 className="text-primary">you got {correctAnswerPercentage}% ({correctAnswerCount} of {questionOptionsLength}) correct</h5>
                            {haveBeenChecked.length > 0 ?<label>The following choices should have also been checked.</label>:null}
                            {haveBeenChecked.map(({ id, text, isCorrect }) => (
                              <ul key={id}>
                                          <li dangerouslySetInnerHTML={{ __html: text }} title={CommonMethods.getPlainText(text)} >
                                          </li>
                              </ul>
                          ))}
                          {haveNotBeenChecked.length > 0 ?<label>The following choices should not been checked.</label>:null}
                          {haveNotBeenChecked.map(({ id, text, isCorrect }) => (
                              <ul key={id}>
                                          <li dangerouslySetInnerHTML={{ __html: text }} title={CommonMethods.getPlainText(text)} >
                                  </li>
                              </ul>
                          ))}
                          <div className="border-bottom my-3"></div>
                          {question.questionOption.map(e => (
                              <div>
                                  <label dangerouslySetInnerHTML={{__html:e.text + ": "}} title={CommonMethods.getPlainText(e.text) + ": "}></label>
                                  <label dangerouslySetInnerHTML={{__html:e.explanation}} title={CommonMethods.getPlainText(e.explanation)}></label>
                              </div>
                          ))}
                          </div>
        )
    }
}