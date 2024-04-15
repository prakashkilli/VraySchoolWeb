import React, {Component} from 'react';
import "./file-Viewer.css";
import $ from "jquery";
import PerfectScrollbar from 'react-perfect-scrollbar';
import "react-perfect-scrollbar/dist/css/styles.css";
import {AppSettings, InsertModuleContentResponse} from "../../Services";
import CommonMethods from '../Common/CommonMethodsComponent';

const CaseFileType = {
  Image: 1,
  Video: 5,
  Audio: 9,
  PDF: 3,
  Dicom: 4,
}

export default class FileViewer extends React.Component {
  img = "";
  resizedHeight = 0;
  resizedWidth = 0;
  leftPadding = 0;
 topPadding = 0;
 isOneRatioActive = false;
 imageZoomFactor = 0;
 isContrastBrightnessActive = false;
 imgContrastValue = 0;
 imgBrightnessValue = 0;
 scaleFactor = 1.1;
 tempXPer = 0;
 prevXPer = 0;
 tempYPer = 0;
 prevYPer = 0;
 lastX = 0;
 lastY = 0;
 px = 0;
 py = 0;
 
 canvasWidth = 859;
 prevCanvasHeight = 0;
 prevCanvasWidth = 0;
 NonCanvasHeight = 400;
 NonCanvasWidth = 859;
 prevNonCanvasWidth= 0;
 prevNonCanvasHeight = 0;
 isDisplayCanvas = false;
 mousePos = {};
 dragStart = {};
 presentFocus = [];
 dragActiveDown = false
 contrastBrightnessActiveDown = "";
 imageIndex = 0;
 selectedImage = "";
 imageLocationUrl = AppSettings.appsettings["ImageURL"];
 dicomLocationUrl = AppSettings.appsettings["DicomURL"];
 context="";
  isShowLoader;
 trustedUrl = "";
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      IsImage:false,
      isSeenVideo: false,
      canvasHeight : '',
    };
    global.FileViewer=this;
    this.canvasRef = React.createRef(null);
    this.perfectScrollbarRef = React.createRef(null);
  }
  getContext = () => {
    if(this.canvasRef.current != "" && this.canvasRef.current != undefined) {
      const renderCtx = this.canvasRef.current.getContext("2d");
      return renderCtx;
    }

  }
  componentDidMount () {
    this.setState({canvasHeight: document.getElementById('caseview-finding-image-Dhgt').offsetHeight});
    var CANVASHeight=document.getElementById('caseview-finding-image-Dhgt').offsetHeight;
    const {CaseFiles} = this.props;
    if(CaseFiles[0].type == CaseFileType.Image && CaseFiles[0].fileSubType !="gif" )
    {
      this.setState({IsImage:true});
    }
    if (this.canvasRef.current) {
      const renderCtx = this.getContext();
      if (renderCtx) {
        this.context = renderCtx;
      }
    }
    var _isFullScreen = localStorage.getItem("isFullScreen");
    _isFullScreen = JSON.parse(_isFullScreen);
      if(_isFullScreen) {
        this.prevCanvasHeight = CANVASHeight;
        this.prevCanvasWidth = this.canvasWidth;
        this.prevNonCanvasHeight = this.NonCanvasHeight;
        this.prevNonCanvasWidth = this.NonCanvasWidth;
        this.setState({canvasHeight : window.innerHeight - 55}); //document.body.clientHeight;//
        this.canvasWidth = $(window).width() - 60; //document.body.clientWidth;//
        this.NonCanvasHeight = window.innerHeight - 55; //document.body.clientHeight;//
        this.NonCanvasWidth = $(window).width() - 60; //document.body.clientWidth;//
        if(this.canvasRef.current !=undefined) {
          this.canvasRef.current.height = CANVASHeight;
          this.canvasRef.current.width = this.canvasWidth;
          this.loadImageOnResize(this.canvasRef.current, this.context);
        }
        document.body.style.overflow = "hidden";
        this.setState({isFullScreen: true, IsImage: true});
      }
      if (this.context.canvas != undefined) {
        this.trackTransforms(this.context);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        var p1 = this.context.transformedPoint(0, 0);
        var p2 = this.context.transformedPoint(500, 500);
        this.context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        this.selectedImage = CaseFiles[0];
        this.img = new Image();
        // img.crossOrigin = 'anonymous';
        this.img.src = this.imageLocationUrl + this.selectedImage.id +
          "?" +
          new Date().getTime();
        this.onMouseEnterImage(this.selectedImage, 0, this.canvasRef.current, this.context);

      }
  }
  trackTransforms(ctx) {
    if(this.canvasRef.current != null) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var xform = svg.createSVGMatrix();

    ctx.getTransform = () => {
      return xform;
    };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = () => {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = () => {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = (sx, sy) => {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };

    var rotate = ctx.rotate;
    ctx.rotate = radians => {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(ctx, radians);
    };

    var translate = ctx.translate;
    ctx.translate = (dx, dy) => {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };

    var transform = ctx.transform;
    ctx.transform = (a, b, c, d, e, f) => {
      var m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = (a, b, c, d, e, f) => {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    ctx.transformedPoint = (x, y) => {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
    }

  }

   aspectRatioCalculation(canvasElement) {
    var AspectRatioValue = 0;
    var ImageHeight = 0;
    var ImageWidth = 0;
    if (this.img != undefined) {
      ImageHeight = this.img.height;
      ImageWidth = this.img.width;
    }

    if (ImageHeight == 0 || ImageHeight == undefined)
     ImageHeight = 100;
    if (ImageWidth == 0 || ImageWidth == undefined)
     ImageWidth = 100;

    //if (canvas.height < imgH.naturalHeight && canvas.width < imgH.naturalWidth) {
    if (canvasElement.height < canvasElement.width) {
      this.resizedHeight = canvasElement.height;
      AspectRatioValue = ImageWidth / ImageHeight;
      this.resizedWidth = Math.round(this.resizedHeight * AspectRatioValue);
      if (this.resizedWidth > canvasElement.width) {
        this.resizedWidth = canvasElement.width;
        AspectRatioValue = ImageHeight / ImageWidth;
        this.resizedHeight = Math.round(this.resizedWidth * AspectRatioValue);
      }
    } else {
      // screen width is smaller than height (mobile, etc)
      this.resizedWidth = canvasElement.width;
      AspectRatioValue = ImageHeight / ImageWidth;
      this.resizedHeight = Math.round(this.resizedWidth * AspectRatioValue);
      if (canvasElement.height < this.resizedHeight) {
        this.resizedHeight = canvasElement.height;
        AspectRatioValue = ImageWidth / ImageHeight;
        this.resizedWidth = Math.round(this.resizedHeight * AspectRatioValue);
      }
    }
    var Imagegkheadheight = 0;
    var Imagegkheadwidth = 0;

    if (
      canvasElement.height <= ImageHeight ||
      canvasElement.width <= ImageWidth
    ) {
      Imagegkheadheight = this.resizedHeight;
      Imagegkheadwidth =this.resizedWidth;
    } else {
      /* start - dont remove this*/
      Imagegkheadheight = ImageHeight;
      Imagegkheadwidth = ImageWidth;
      /*end*/
      this.resizedHeight = Imagegkheadheight;
      this.resizedWidth = Imagegkheadwidth;
    }

    this.leftPadding = (canvasElement.width - Imagegkheadwidth) / 2;
    this.topPadding = (canvasElement.height - Imagegkheadheight) / 2;
  }
   displayOneRatio(canvasElement, context) {
    const renderCtx = this.getContext();
    if (canvasElement == null || renderCtx == null || this.img == undefined) return
    this.isOneRatioActive = !this.isOneRatioActive;
    if (this.isOneRatioActive) {
      this.setImageZoomFactortoZero();
      this.leftPadding = canvasElement.width / 2 - this.img.width / 2;
      this.topPadding = canvasElement.height / 2 - this.img.height / 2;
      this.resizedWidth = this.img.width;
      this.resizedHeight = this.img.height;
      renderCtx.setTransform(1, 0, 0, 1, 0, 0);
      this.clearCanvasAndDrawImage(canvasElement, renderCtx);
      this.disableContrastBrightness();
    } else this.displayBestFit(canvasElement, renderCtx);
  }
   displayBestFit(canvasElement, context) {
     const renderCtx = this.getContext();
    if (canvasElement == null || renderCtx == null || this.img == undefined) return
    this.disableOneRatio();
    this.setImageZoomFactortoZero();
    renderCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.aspectRatioCalculation(canvasElement);
    this.clearCanvasAndDrawImage(canvasElement, renderCtx);
    this.disableContrastBrightness();
  }
   setImageZoomFactortoZero() {
    this.imageZoomFactor = 0;
  }
   disableOneRatio() {
    this.isOneRatioActive = false;
  }
   clearCanvasAndDrawImage(canvasElement, context) {
    // trackTransforms(context)
    // context.setTransform(1, 0, 0, 1, 0, 0)
    const renderCtx = this.getContext();
    var p1 = renderCtx.transformedPoint(0, 0);
    var p2 = renderCtx.transformedPoint(canvasElement.width, canvasElement.height);
    renderCtx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    renderCtx.drawImage(this.img, this.leftPadding, this.topPadding, this.resizedWidth, this.resizedHeight);
    this.maintainBrightnessContrast(canvasElement, renderCtx);
  }
   disableContrastBrightness() {
    this.isContrastBrightnessActive = false;
  }
   maintainBrightnessContrast(canvasElement, context) {
    const renderCtx = this.getContext();
    if (this.imgContrastValue != 0 && this.imgBrightnessValue != 0) {
     this.adjustBrightnessContrast(
      this.imgBrightnessValue,
      this.imgContrastValue,
        canvasElement,
        renderCtx
      );
    }
  }
   adjustBrightnessContrast(
    bright,
    tempcontrast,
    canvasElement,
    context
  ) {
    //return
    this.imgBrightnessValue = bright;
    this.imgContrastValue = tempcontrast;
    var brightness = bright || 0;
    var contrast = tempcontrast || 0;
    brightness = Math.min(150, Math.max(-150, brightness));
    contrast = Math.max(0, contrast + 1);

    var x = this.leftPadding;
    var y = this.topPadding;

    context.drawImage(this.img, x, y, this.resizedWidth, this.resizedHeight);
    var imageData = context.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    var data = imageData.data;

    var w = parseInt(canvasElement.width);
    var h = parseInt(canvasElement.height);

    var p = w * h;
    var pix = p * 4,
      pix1,
      pix2;

    var mul, add;
    if (contrast != 1) {
      mul = contrast;
      add = (brightness - 128) * contrast + 128;
    } else {
      // currentObject if-then is not necessary anymore, is it?
      mul = 1;
      add = brightness;
    }
    var r, g, b;
    while (p--) {
      if ((r = data[(pix -= 4)] * mul + add) > 255) data[pix] = 255
      else if (r < 0) data[pix] = 0
      else data[pix] = r

      if ((g = data[(pix1 = pix + 1)] * mul + add) > 255) data[pix1] = 255
      else if (g < 0) data[pix1] = 0
      else data[pix1] = g

      if ((b = data[(pix2 = pix + 2)] * mul + add) > 255) data[pix2] = 255
      else if (b < 0) data[pix2] = 0
      else data[pix2] = b
    }
    context.putImageData(imageData, 0, 0)
  }
   zoomIn(canvasElement, context) {
    const renderCtx = this.getContext();
    this.disableOneRatio();
    this.zoomInZoomOutOperation(3, canvasElement, renderCtx);
    this.imageZoomFactor += 3;
    this.disableContrastBrightness();
  }
   zoomOut(canvasElement, context) {
    const renderCtx = this.getContext();
    this.disableOneRatio();
    this.zoomInZoomOutOperation(-3, canvasElement, renderCtx);
    this.imageZoomFactor -= 3;
    this.disableContrastBrightness();
  }
   zoomInZoomOutOperation(tempZoomFactor, canvasElement, context) {
    var pt = context.transformedPoint(
      Math.round(canvasElement.width / 2),
      Math.round(canvasElement.height / 2)
    );
    context.translate(pt.x, pt.y);
    var factor = Math.pow(this.scaleFactor, tempZoomFactor);
    context.scale(factor, factor);
    context.translate(-pt.x, -pt.y);
    this.clearCanvasAndDrawImage(canvasElement, context);
  }
   enableContrastBrightness() {

    this.isContrastBrightnessActive = !this.isContrastBrightnessActive;
  }
  PdfORGifFullScreen()
  {
    var _isFull = false;
    if(this.state.isFullScreen) {
      this.setState({isFullScreen: false});
      _isFull = false;
    }
    else {
      this.setState({isFullScreen: true});
      _isFull = true;
    }
    if (_isFull) {
      this.prevNonCanvasHeight = this.NonCanvasHeight;
      this.prevNonCanvasWidth = this.NonCanvasWidth;
      this.NonCanvasHeight = window.innerHeight - 55; //document.body.clientHeight;//
      this.NonCanvasWidth = $(window).width() - 60; //document.body.clientWidth;//
      document.body.style.overflow = "hidden";

    } else {
      this.NonCanvasHeight = this.prevNonCanvasHeight;
      this.NonCanvasWidth = this.prevNonCanvasWidth;
      document.body.style.overflow = "auto";
      this.setState({isFullScreen: false,IsImage: false});
      localStorage.setItem("isFullScreen",false);
    }
  }
   resetContrastBrightness(canvasElement, context) {
    const renderCtx = this.getContext();
    this.imgBrightnessValue = this.imgContrastValue = this.tempXPer = this.prevXPer = this.tempYPer = this.prevYPer = 0;
    this.adjustBrightnessContrast(0, 0, canvasElement, renderCtx);
    this.disableContrastBrightness();
  }
   fullScreen(canvasElement, context) {
    const renderCtx = this.getContext();
    if (canvasElement == null) return
    this.state.isFullScreen = !this.state.isFullScreen;
    this.setState({isFullScreen : this.state.isFullScreen});
    if (this.state.isFullScreen) {
      this.prevCanvasHeight = this.state.canvasHeight;
      this.prevCanvasWidth = this.canvasWidth;
      this.setState({canvasHeight : window.innerHeight - 55}) //document.body.clientHeight;//
      this.canvasWidth = $(window).width() - 60; //document.body.clientWidth;//
      canvasElement.height = this.state.canvasHeight;
      canvasElement.width = this.canvasWidth;
      this.loadImageOnResize(canvasElement, renderCtx);
      document.body.style.overflow = "hidden";

    } else {
      // canvasHeight = prevCanvasHeight
      // canvasWidth = canvasElement.offsetWidth - 135
      this.setState({canvasHeight : this.prevCanvasHeight});
      this.canvasWidth = this.prevCanvasWidth;
      canvasElement.height = this.state.canvasHeight;
      canvasElement.width = this.canvasWidth;
      this.loadImageOnResize(canvasElement, renderCtx);
      document.body.style.overflow = "auto";
      this.setState({isFullScreen: false});
      localStorage.setItem("isFullScreen",false);
    }

  }
  reDrawCanvasOnResize(){
    const renderCtx = this.getContext();
    this.canvasWidth = this.canvasRef.current.parentElement.offsetWidth;
    this.canvasRef.current.width = this.canvasWidth;
    this.loadImageOnResize(this.canvasRef.current, renderCtx);
  }
   loadImageOnResize(canvasElement, context) {
    const renderCtx = this.getContext();
    if (!this.isDisplayCanvas) return
    renderCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.trackTransforms(renderCtx);
    this.img.src = this.imageLocationUrl + this.selectedImage.id + '&' + new Date().getTime();
    //img.setAttribute('crossOrigin', '');
    $(this.img)
      .off("load")
      .on("load", () => {
        if (this.isOneRatioActive) {
          this.leftPadding = canvasElement.width / 2 - this.img.width / 2;
          this.topPadding = canvasElement.height / 2 - this.img.height / 2;
          this.resizedWidth = this.img.width;
          this.resizedHeight = this.img.height;
        } else this.aspectRatioCalculation(canvasElement, renderCtx);
        this.maintainImageZoomandBrightness(canvasElement, renderCtx);
      })
  }
   maintainImageZoomandBrightness(canvasElement, context) {
    const renderCtx = this.getContext();
    if (this.imageZoomFactor != 0) {
      this.zoomInZoomOutOperation(this.imageZoomFactor, canvasElement, renderCtx);
    } else this.clearCanvasAndDrawImage(canvasElement, renderCtx);
  }
   mouseDownEvent(evt, canvasElement, context) {
    const renderCtx = this.getContext();
    evt.preventDefault();
    if (this.isContrastBrightnessActive) {
      this.presentFocus = this.getMousePosition(evt, canvasElement);
      this.contrastBrightnessActiveDown = true;
    } else {
      this.dragActiveDown = true;
      var evenStyle = document.body.style;
      evenStyle.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
        "none"
        this.lastX = this.mousePos.x;
        this.lastY = this.mousePos.y;
        this.dragStart = renderCtx.transformedPoint(this.lastX, this.lastY);
    }
  }
   mouseUpEvent(evt) {
    if (this.isContrastBrightnessActive) {
      this.contrastBrightnessActiveDown = false;
    } else {
      this.dragStart = null;
      this.dragActiveDown = false;
    }
  }
   mouseMoveEvent(evt, canvasElement, context) {
    const renderCtx = this.getContext();
    if (this.isContrastBrightnessActive) {
      if (this.contrastBrightnessActiveDown) {
        this.mousePos = this.getMousePosition(evt, canvasElement);
        this.contrastBrightnessAction(canvasElement, renderCtx);
      }
    } else {
      this.mousePos = this.getMousePosition(evt, canvasElement);
      if (this.mousePos == undefined) {
        this.lastX = evt.offsetX || evt.pageX - canvasElement.offsetLeft;
        this.lastY = evt.offsetY || evt.pageY - canvasElement.offsetTop;
      } else {
        this.lastX = this.mousePos.x;
        this.lastY = this.mousePos.y;
      }
      if (this.dragActiveDown && this.dragStart) {
        var pt = renderCtx.transformedPoint(this.lastX, this.lastY);
        renderCtx.translate(pt.x - this.dragStart.x, pt.y - this.dragStart.y);
        this.clearCanvasAndDrawImage(canvasElement, renderCtx);
      }
    }
  }
   getMousePosition(evt, canvasElement) {
    var rect = canvasElement.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    }
  }
   contrastBrightnessAction(canvasElement, context) {
    const renderCtx = this.getContext();
    var presentX = this.mousePos.x;
    var presentY = this.mousePos.y;

    if (typeof this.presentFocus.x == "undefined") this.presentFocus.x = 0
    if (typeof this.presentFocus.y == "undefined") this.presentFocus.y = 0

    /////////////brightness
    if (typeof this.px == "undefined") this.px = this.presentFocus.x

    var getCurrentXPer = (presentX - this.presentFocus.x) / canvasElement.width

    if (this.px != this.presentFocus.x) {
      this.prevXPer = this.tempXPer
      this.tempXPer = getCurrentXPer + this.prevXPer
      this.px = this.presentFocus.x
    } else this.tempXPer = getCurrentXPer +this. prevXPer

    if (this.tempXPer > 1) this.tempXPer = 1
    else if (this.tempXPer < -1) this.tempXPer = -1

    if (this.tempXPer > 0) {
      this.imgContrastValue = this.tempXPer * 3
    } else {
      this.imgContrastValue = this.tempXPer
    }

    if (typeof this.py == "undefined") this.py = this.presentFocus.y

    var getCurrentYPer = (this.presentFocus.y - presentY) / canvasElement.height

    if (this.py != this.presentFocus.y) {
      this.prevYPer = this.tempYPer
      this.tempYPer = getCurrentYPer + this.prevYPer
      this.py = this.presentFocus.y
    } else this.tempYPer = getCurrentYPer + this.prevYPer

    if (this.tempYPer > 1) this.tempYPer = 1
    else if (this.tempYPer < -1) this.tempYPer = -1
    this.imgBrightnessValue = this.tempYPer * 150

    if (this.presentFocus.x != presentX && this.presentFocus.y != presentY) {
      this.adjustBrightnessContrast(
        this.imgBrightnessValue,
        this.imgContrastValue,
        canvasElement,
        renderCtx
      )
    } else
     this.adjustBrightnessContrast(
        this.imgBrightnessValue,
        this.imgContrastValue,
        canvasElement,
        renderCtx
      )
  }
   navigatePrevNextImage(
    isNext,
    isFullScreen,
    canvasElement,
    perfectScrollbar
  ) {
    const {caseFileSectionIndex} = this.props;
   var index = caseFileSectionIndex;
   index = JSON.parse(index);
   if(isNext)
   index = index + 1;
   else
   index = index - 1;
   this._handleOnThumbNailClick(index,isFullScreen);
    // const {CaseFileContent} = this.props;
    // const renderCtx = this.getContext();
    // if (index >= 0 && index< CaseFileContent.files.length) {`
    //   index = isNext ? index + 1 : index - 1
    //   this.onMouseEnterImage(
    //     CaseFileContent.files[index],
    //     index,
    //     canvasElement,
    //     renderCtx
    //   )
    //   if (perfectScrollbar && perfectScrollbar.directiveRef)
    //     perfectScrollbar.directiveRef.scrollToTop(index * 100)
    // }
  }
   onMouseEnterImage(img, imgIndex, canvasElement, context) {
    //if (this.selectedImage == img)
    //    return;
    const renderCtx = this.getContext();
    this.selectedImage = img
    this.imageIndex = imgIndex
    this.isShowLoader = true
    var fileSubType = this.selectedImage.location.split('.')[1];
    if (this.selectedImage.type == CaseFileType.Dicom) {
      this.trustedUrl = this.selectedImage.dicomViewer.url.replace(
        //sanitizer.bypassSecurityTrustResourceUrl(
        "#SIUID#",
        this.selectedImage.studyId
        //)
      )
    } else this.trustedUrl = this.imageLocationUrl + this.selectedImage.id //sanitizer.bypassSecurityTrustResourceUrl(
    //)
    if (
      this.selectedImage.type == CaseFileType.Image &&
      fileSubType && fileSubType != "gif"
    ) {
      this.isDisplayCanvas = true
      this.setImageZoomFactortoZero()
      this.initializeImage(canvasElement, renderCtx)
      this.resetContrastBrightness(canvasElement, renderCtx)
    } else {
      this.isDisplayCanvas = false
    }
  }
   initializeImage(canvasElement, context) {
    const renderCtx = this.getContext();
    this.trackTransforms(renderCtx)
    renderCtx.setTransform(1, 0, 0, 1, 0, 0)
    this.imageDraw(canvasElement, renderCtx)
    this.lastX = canvasElement.width / 2
    this.lastY = canvasElement.height / 2
  }
  _handleOnThumbNailClick = (index,isFullScreen) => {
    // localStorage.setItem("isFullScreen",false);
      const {onThumbNailClick} = this.props;
     onThumbNailClick(index,isFullScreen);
  }
  renderStaticthumbnailbasedonType (caseFile,renderCtx,index) {
    if(caseFile.type == CaseFileType.Image )
    {
    return(
      <img
            src={this.imageLocationUrl + caseFile.id+"&thumbnail=1"}
            className="caseview-finding-thumbnail-image c-pointer"
            onClick={() => this._handleOnThumbNailClick(index,false)}
            // onMouseEnter={() => this.onMouseEnterImage(caseFile, 0, this.canvasRef.current, renderCtx)}
          />
    )
    }
    else if(caseFile.type == CaseFileType.PDF)
    {
      return(
        <img width="100%" height="100%" src="/assets/Images/PDF-Icon.png"
         className={caseFile.url ==''?'a-disabled file-thumbnail':'c-pointer file-thumbnail'}
         onClick={() => this._handleOnThumbNailClick(index,false)}
         ></img>
      )
    }
    else if(caseFile.type == CaseFileType.Video)
    {
      return(
        <img width="100%" height="100%" src="/assets/Images/video.jpg"
         className={caseFile.url ==''?'a-disabled file-thumbnail':'c-pointer file-thumbnail'}
         onClick={() => this._handleOnThumbNailClick(index,false)}
         ></img>
      )
    }
    else if(caseFile.type == CaseFileType.Audio)
    {
      return(
        <img width="100%" height="100%" src="/assets/Images/audio.png"
        className={caseFile.url ==''?'a-disabled file-thumbnail':'c-pointer file-thumbnail'}
        onClick={() => this._handleOnThumbNailClick(index,false)}
        ></img>
      )
    }
    else if(caseFile.type == CaseFileType.Dicom)
    {
      return(
        <img
        src="/assets/Images/dicom.png"
            className="caseview-finding-thumbnail-image c-pointer"
            onClick={() => this._handleOnThumbNailClick(index,false)}
            // onMouseEnter={() => this.onMouseEnterImage(caseFile, 0, this.canvasRef.current, renderCtx)}
          />
      )
    }

  }
  renderCanvasElement(caseFile)
  {
    if(caseFile.type == CaseFileType.Image)
    {
      if(caseFile.fileSubType !="gif")
      {
      return(
        <canvas
                      id="canvas"
                      ref={this.canvasRef}
                      width={this.canvasWidth}
                      height={this.state.canvasHeight}
                      className={
                        (this.isContrastBrightnessActive == true
                          ? "img-processing-drag-contrast-brightnees"
                          : "img-processing-drag-open-hand",
                        (!this.isContrastBrightnessActive && !this.dragActiveDown) ==
                        true
                          ? "img-processing-drag-open-hand"
                          : "img-processing-drag-open-hand",
                        (!this.isContrastBrightnessActive && this.dragActiveDown) == true
                          ? "img-processing-drag-closed-hand"
                          : "img-processing-drag-open-hand")
                      }
                      onMouseDown={event =>
                        this.mouseDownEvent(event, this.canvasRef.current, this.context)
                      }
                      onMouseUp={event => this.mouseUpEvent(event)}
                      onMouseOut={event => this.mouseUpEvent(event)}
                      onMouseMove={event =>
                        this.mouseMoveEvent(event, this.canvasRef.current, this.context)
                      }
                    ></canvas>
      )
      }
      else if(caseFile.fileSubType=="gif")
      {
           return(
            <div
            className={
              this.state.isFullScreen == true ? "image-container-full-screen-active" : ""
            }
          >
          <i className={this.state.isFullScreen == false ? "mdi mdi-fullscreen fullscrn-icon float-right" : "mdi mdi-fullscreen-exit fullscrn-icon  float-right"} onClick={() => this.PdfORGifFullScreen()}></i>
            <div
            className="finding-gif-img-div"
            style={{
              height: this.NonCanvasHeight + "px",
              width:this.NonCanvasWidth + "px",
            }}
          >
            <div className="caseview-finding-gif-image-div">
              <img
                className="gif-image m-auto"
                src={this.imageLocationUrl + caseFile.id}
              />
            </div>
          </div>
          </div>
           )
      }
    }
      else if(caseFile.fileSubType == "dcm") {
        return (
          // <div className="img-thumbnail mt-2 iframe-div">
          //     <iframe
          <div
            className={
              this.state.isFullScreen == true ? "image-container-full-screen-active" : ""
            }
          >
          <i className={this.state.isFullScreen == false ? "mdi mdi-fullscreen fullscrn-icon float-right" : "mdi mdi-fullscreen-exit fullscrn-icon  float-right"} onClick={() => this.PdfORGifFullScreen()}></i>
            <div
            className="finding-gif-img-div"
            style={{
              height: this.NonCanvasHeight + "px",
              width:this.NonCanvasWidth + "px",
            }}
          >
          {/* <div className="img-thumbnail mt-2 iframe-div"></div> */}
            <div className="caseview-finding-gif-image-div">
            <iframe
                width="100%"
                height="100%"
                src={AppSettings.appsettings["DicomURL"]+caseFile.id}
              ></iframe>
            </div>
          </div>
          </div>
        )
      }
    else if(caseFile.type == CaseFileType.PDF)
    {
      return(

        <div
              className={
                this.state.isFullScreen == true ? "image-container-full-screen-active" : ""
              }
            >
            {this.state.isFullScreen== false ? (
              <a  href={this.imageLocationUrl + caseFile.id} target="_blank">
            <i className="mdi mdi-open-in-new new-window"></i>
            </a>
            ):null}
        <i className={this.state.isFullScreen == false ? "mdi mdi-fullscreen fullscrn-icon float-right" : "mdi mdi-fullscreen-exit fullscrn-icon-exit  float-right"} onClick={() => this.PdfORGifFullScreen()}></i>
      <object className={this.state.isFullScreen == false ?'viewer-height':''}  width="100%" height="100%" data={this.imageLocationUrl + caseFile.id} type="application/pdf"></object>
      </div>
      )
    }
    else if(caseFile.type == CaseFileType.Video)
    {
      return(
        <video className="viewer-height" onTimeUpdate={(e) => this._handleOnTimeUpdate(e)} controls  src={this.imageLocationUrl + caseFile.id} width="100%" height="100%" ></video>
      )
    }
    else if(caseFile.type == CaseFileType.Audio)
    {
      return(
        <audio onTimeUpdate={(e) => this._handleOnTimeUpdate(e)} className="my-5"
    controls >
  <source src={this.imageLocationUrl + caseFile.id} type="audio/mpeg"></source>
  <source src={this.imageLocationUrl + caseFile.id} type="audio/ogg"></source>
  <source src={this.imageLocationUrl + caseFile.id} type="audio/wav"></source>
</audio>
      )
    }
  }
  _handleOnTimeUpdate= (e) => {
    const {IsPreview} = this.props;
    if(e.currentTarget.duration == e.currentTarget.currentTime) {
      if(this.props.isCourse) {
        this.state.isSeenVideo = true;
          if(global.ModuleBar.props.SubIndexData.type == 6) {
            var status = 0;
            if(global.Question!= undefined) {
              var _isSubmitQuestion = global.Question.state.isAnswered;
              if(_isSubmitQuestion) {
                status = 3;
              }
              else {
                status = 2;
              }
            }
            else {
              status = 3;
            }
            const data = {
              userId: this.props.UserId,
              courseId: this.props.CourseId,
              moduleContentId: global.ModuleBar.props.SubIndexData.id,
              status: status,
              moduleId: this.props.ModuleId,
              IsPreview: JSON.parse(IsPreview)
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
              moduleContentId: this.props.Id,
              status: 3,
              moduleId: this.props.ModuleId,
              IsPreview: JSON.parse(IsPreview)
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
   imageDraw(canvasElement, context) {
    const renderCtx = this.getContext();
    var p1 = renderCtx.transformedPoint(0, 0);
    var p2 = renderCtx.transformedPoint(canvasElement.width, canvasElement.height);
    renderCtx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    this.img = new Image();
    this.img.src =
    this.imageLocationUrl + this.selectedImage.id + "&" + new Date().getTime();
      //this.img.setAttribute("crossOrigin", "")
    $(this.img)
      .off("load")
      .on("load", () => {
        this.aspectRatioCalculation(canvasElement, renderCtx);
        renderCtx.drawImage(
          this.img,
          this.leftPadding,
          this.topPadding,
          this.resizedWidth,
          this.resizedHeight
        );
        this.isShowLoader = false;
      })
  }
  render () {
    const {CaseFiles,CaseFileContent,ContentType,FileSectionId,pageId,caseFileSectionIndex} = this.props;
    const renderCtx = this.getContext();
    this.selectedImage = CaseFiles[0];
    var index = caseFileSectionIndex;
 return (
   <div className={this.state.isFullScreen ? "fv-div img-fullscreen" : "fv-div"}>
      <div className="text-center image-navigations">
        <div className="py-1">
        {CaseFileContent != "" && CaseFileContent != undefined && CaseFileContent != null ?
          <button
            className="align-top bg-transparent w-25 text-left"
            disabled={index == 0}
            onClick={() =>
              this.navigatePrevNextImage(
                false,
                false,
                this.canvasRef.current,
                this.perfectScrollbarRef
              )
            }
          ><i className={CaseFileContent.length > 1 == true ? "mdi mdi-arrow-left-bold-box text-white f-25":""}></i></button>:""}
          <div className="f-18 d-inline-block image-name">{this.selectedImage.name}</div>
          {CaseFileContent != "" && CaseFileContent != undefined && CaseFileContent != null ?
          <button
           className="align-top bg-transparent w-25 text-right"
            disabled={index == CaseFileContent.length - 1}
            onClick={() =>
              this.navigatePrevNextImage(true,false,this.canvasRef.current,
                this.perfectScrollbarRef)
            }
          ><i className={CaseFileContent.length > 1 == true ? "mdi mdi-arrow-right-bold-box text-white f-25":""}></i></button>:""}

        </div>
        <PerfectScrollbar>
        <div className="border-top" style={{height: this.props.CaptionHeight === undefined ? '' : this.props.CaptionHeight,
      maxHeight: "50px" }} >
        {this.selectedImage.caption}
      </div>
      </PerfectScrollbar>
      </div>

      <div className="finiding-viewer-template">
        <div className="tbl tbl-fixed">
          <div className="tbl-row">
          {CaseFileContent != "" && CaseFileContent != undefined && CaseFileContent != null ?
            (
              <div className={CaseFileContent.length > 1 ? "tbl-cell align-middle fv-left-scroll thumbnail-tbl-cell":"tbl-cell align-middle fv-left-scroll"}>
              {CaseFileContent.length > 1 ?(
              <div>
            <div>
               <PerfectScrollbar ref={this.perfectScrollbarRef}>
                <div className="caseview-finding-thumbnail-images-div">
                <ul className="p-0 m-0 caseview-finding-thumbnail-images-ul">
                  {CaseFileContent.map((caseFile, i) => (
                    <li key={caseFile.id}>
                      <div className={
                          caseFile == this.selectedImage ? "caseview-finding-thumbnail-image-div selected-image" : "caseview-finding-thumbnail-image-div"
                        }
                      >
                        {this.renderStaticthumbnailbasedonType(caseFile,renderCtx,i)}
                      </div>
                    </li>
                  ))}
                </ul>
                </div>
              </PerfectScrollbar>
            </div>
              </div>
              ):null}
              </div>
            ):null}
            <div className="tbl-cell caseview-finding-image-container">
            <div
              className={
                this.state.isFullScreen == true ? "image-container-full-screen-active" : ""
              }
            >
            {this.state.isFullScreen == true ?
              CaseFileContent != "" && CaseFileContent != undefined && CaseFileContent != null ?
                <div className={CaseFileContent.length > 1 == true ? "leftarrow-on-fullscreen image-navigations-fullscreen":""}>
                  <button
                    className="align-middle prev-button-on-fullscreen"
                    disabled={index == 0}
                    onClick={() =>
                      this.navigatePrevNextImage(false,true,this.canvasRef.current,
                this.perfectScrollbarRef)
                    }
                  ></button>
                </div>:"":""}
                <div id="caseview-finding-image-Dhgt" className="caseview-finding-image">
                  <div
                    className={this.isDisplayCanvas == true ? "hide-canvas" : ""}
                  >
                  {this.props.CaseFiles.map((caseFile, i) => (
                    <div key={i}>
                        {this.renderCanvasElement(caseFile)}
                    </div>

                  ))}
                  </div>

                </div>
                {this.state.IsImage ?(
              <div className="img-processing-control-holder-right">
                <span className="img-tools">
                  <i className="mdi mdi-magnify-plus-outline" title="Zoom In" onClick={() => this.zoomIn(this.canvasRef.current, this.context)}></i>
                  <i className="mdi mdi-magnify-minus-outline" title="Zoom Out" onClick={() => this.zoomOut(this.canvasRef.current, this.context)}></i>
                  <i className="mdi mdi-arrow-collapse-all" title="Best Fit" onClick={() => this.displayBestFit(this.canvasRef.current, this.context)}></i>
                  <i className="mdi mdi-aspect-ratio" title="Display 1:1" onClick={() => this.displayOneRatio(this.canvasRef.current, this.context)}></i>
                  <i className="mdi mdi-brightness-5" title="Brightness/Contrast" onClick={() => this.enableContrastBrightness()}></i>
                  <i className="mdi mdi-brightness-6" title="Reset Brightness/Contrast" onClick={() => this.resetContrastBrightness(this.canvasRef.current, this.context)}></i>
                  <i className={this.state.isFullScreen == false ? "mdi mdi-fullscreen float-right" : "mdi mdi-fullscreen-exit float-right"} title={this.state.isFullScreen == false ? "Full Screen" : "Minimize"} onClick={() => this.fullScreen(this.canvasRef.current, this.context)}></i>
                </span>
              </div>
                ):null}
              </div>
              {this.state.isFullScreen == true ?
                CaseFileContent != "" && CaseFileContent != undefined && CaseFileContent != null ?
              <div className={CaseFileContent.length > 1 == true ?"rightarrow-on-fullscreen image-navigations-fullscreen":""}>
                  <button
                    className="align-middle next-button-on-fullscreen"
                    disabled={index == CaseFileContent.length - 1}
                    onClick={() =>
                      this.navigatePrevNextImage(true,true,this.canvasRef.current,
                this.perfectScrollbarRef)
                    }
                  ></button>
                </div>:"": "" }
            </div>
          </div>
        </div>
      </div>
    </div>
 )
  }
}