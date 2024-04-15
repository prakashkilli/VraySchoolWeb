import React,{Component} from 'react';
import CommonMethods from '../Common/CommonMethodsComponent';
export default class MCCQuestionModal extends Component {
    render () {
        const {userSelectOptions,remainingOptions} = this.props;
        return (
            <div>
                            {userSelectOptions.length > 0 ?<label className="mr-2">You Selected</label>:null}
                            {userSelectOptions.map(({ id, text, isCorrect,explanation }) => (
                              <span key={id}>
                                          <div className="d-inline-block f-bold" dangerouslySetInnerHTML={{ __html: text }} title={CommonMethods.getPlainText(text)} >
                                          </div>
                                  <h6 className="text-primary">Explanation</h6>
                                  <label>
                                    <i className={isCorrect ? "mdi mdi-check-bold mr-2 f-18 text-success":"mdi mdi-close-thick mr-2 f-18 text-danger"}></i>
                                    <div className="d-inline-block" dangerouslySetInnerHTML={{ __html: explanation }} title={CommonMethods.getPlainText(explanation)} ></div>
                                  </label>
                              </span>
                          ))}
                          {remainingOptions.length > 0 ?<label className="f-bold d-block">Other Explanations</label>:null}
                          {remainingOptions.map(({ id, text, isCorrect, explanation }) => (
                              <div key={id}>
                             
                                          <label className="d-block" dangerouslySetInnerHTML={{ __html: text }} title={CommonMethods.getPlainText(text)} >
                                          </label>
                                          <i className={isCorrect ? "mdi mdi-check-bold mr-2 f-18 text-success":"mdi mdi-close-thick mr-2 f-18 text-danger"}></i>
                                          <label dangerouslySetInnerHTML={{ __html: explanation }} title={CommonMethods.getPlainText(explanation)} >
                                          </label>
                              </div>
                          ))}
                          </div>
        )
    }
}