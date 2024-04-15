import React, { Component } from "react";
import FileViewer from "./FileViewer/fileViewer";
import {AppSettings} from "../Services";
export default class FileContent extends Component {
  constructor(props) {
    super(props);
    this.state={
      caseFileSectionIndex: 0,
      isFullScreen: false,
    }
    global.FileContent=this;
    global.caseFileSectionIndex = 0;
  }
  componentDidMount = () => {
    if(global.FileViewer == undefined) {
      localStorage.setItem("isFullScreen", false);
    }
  }
  handleDragChangeEvent()
  {
    global.FileViewer.reDrawCanvasOnResize()
  }
  SingleImage = (item,resizeValue) => {
    return (
      <div className="text-center">
          {this.RenderImageTag(item,resizeValue)}
        {/* <span className="font-italic">{props.item.name}</span> */}
      </div>
    )
  }
  _handleOnThumbnailClick = (index,isFullScreen) => {
    global.caseFileSectionIndex = index;
    if(global.FileViewer != undefined) {
      if(isFullScreen) {
        localStorage.setItem("isFullScreen",true);
      }
    }
    this.setState({caseFileSectionIndex:index});

  }
  MultiImage = (item,resizeValue) => {
    const {ModuleContentId,IsPreview,CaseFileContent,CaptionHeight} = this.props;
    const caseFiles = [];
    var html = [];
      if(item !=null) {
        item.fileSubType = item.location.split('.')[1];
        caseFiles.push(item);
            return(<div className="qsn-brk mt-4">
                <FileViewer
                 key={item.id}
                 CaseFileContent={CaseFileContent}
                 Id={ModuleContentId}
                 CaseFiles={caseFiles}
                 resizeValue={resizeValue}
                 CourseId={this.props.courseId}
                 ModuleId={this.props.ModuleId}
                 IsPreview={IsPreview}
                 UserId = {this.props.UserId}
                 ContentType={this.props.ContentId}
                 caseFileSectionIndex={this.state.caseFileSectionIndex}
                 onThumbNailClick = {(index,isFullScreen) => this._handleOnThumbnailClick(index,isFullScreen)}
                 isFullScreen={this.state.isFullScreen}
                 isCourse={this.props.isCourse}
                 CaptionHeight={CaptionHeight}
                 ></FileViewer>
          </div>)
    }
    return html;
  }

  ImageContent = data => {
    if(data.ContentItem != '' && data.ContentItem != undefined) {
      return( this.MultiImage(data.ContentItem[this.state.caseFileSectionIndex],0,this.props.ondragChangeEvent));
    }
    return <div></div>
  }
  render() {
    if(global.FileViewer == undefined) {
      localStorage.setItem("isFullScreen", false);
    }
    return (
      <div>
      {this.ImageContent(this.props)}
        </div>
    )
  }
}