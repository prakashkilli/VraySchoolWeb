import React, {Component} from "react";
import CommonMethods from './Common/CommonMethodsComponent';

export default class Instruction extends Component {
  constructor(props) {
    super(props);   
  }  
  render() {
    const classtext = this.props.dnone == true ? "d-none" : ""
    return (
      <div className="mt-4">
      {this.props.ContentItem != null ?
      <div id={"content_"+ this.props.ContentId} className={"qsn-brk" + classtext}>
        <h4>{this.props.ContentItem.title}</h4>
        <div dangerouslySetInnerHTML={{__html:this.props.ContentItem.text}}  className=""></div>
      </div>:<div></div>}
      </div>
    )
  }
}