import React,{Component} from 'react';
import CommonMethods from '../Common/CommonMethodsComponent';
export default class TFQuestionModal extends Component {
    render () {
        const {tempTFData} = this.props;
        return (
            <div>
            {tempTFData.map((e) => {
             return <div className="border-bottom my-3">
          
               <div className="row">
                 <div className="col-sm-2">
                    <div className="text-primary mb-0 f-14">Statement</div>
                 </div>
                 <div className="col-sm-10">
                    <label dangerouslySetInnerHTML={{__html:e.text}} title={CommonMethods.getPlainText(e.text)}></label>
                 </div>
               </div> 
               <div className="row">
                 <div className="col-sm-2">
                    <div className="text-primary mb-0 f-14">Your answer</div>
                 </div>
                 <div className="col-sm-10">
                 <label>
                   <i className={JSON.parse(e.response) == e.isCorrect ? "mdi mdi-check-bold mr-2 f-18 text-success":"mdi mdi-close-thick mr-2 f-18 text-danger"}></i>
                   {e.response == "true" ? "T  ":"F  "}</label>
                 </div>
               </div> 
               <div className="row">
                 <div className="col-sm-2">
                    <div className="text-primary mb-0 f-14">Explanation</div>
                 </div>
                 <div className="col-sm-10">
                 <label dangerouslySetInnerHTML={{__html:e.explanation}} title={CommonMethods.getPlainText(e.explanation)}></label>
                 </div>
               </div>
             </div>
             
           })}
           </div>   
        )
    }
}