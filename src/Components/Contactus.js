import React, { Component } from "react";

export default class Contactus extends Component {
  render() {
    return (
      <div>
        <main class="main">
          <section class="top-blog-section">
            <div class="container my-5 conact-us-section">
              {/* <div class="breadcrumb">
                <a href="#index.html">Home</a>{" "}
                <i class="fa fa-angle-right mx-2"></i> Contact Us
              </div> */}
              <div class="row">
                {/* <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
                  <img
                    src="/assets/images/Rectangle-223.png"
                    alt="Rectangle-223"
                    class="w-100 h-100"
                  />
                </div> */}
                <div class="col-sm-12 col-md-3 col-lg-3 mb-3"></div>
                <div class="col-sm-12 col-md-6 col-lg-6 mb-3 text-center">
                  <div class="right-section px-5">
                    <h2 className="pb-3">Contact us</h2>
                    <div>
                      <input
                        class="my-3 form-control"
                        type="text"
                        placeholder="Your Name"
                      />
                      <input
                        class="my-3 form-control"
                        type="text"
                        placeholder="Your Email"
                      />
                      <textarea
                        rows="5"
                        class="my-3 form-control"
                        placeholder="Message"
                      ></textarea>
                      <a href="#" class="tm-btn-2">
                        Send
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-3 mb-3"></div>
              </div>
            </div>
          </section>
        </main>

        {/* <section class="watch-tutorials-section my-5">
    <div class="container">
      <div class="read-all-sec">
        <h4>VRaySchool on YouTube</h4>
        <a href="#">Subscribe on YouTube</a>
      </div>
      <div class="row">
        <div class="col-md-4 col-lg-4 mb-4">
          <div class="bg-block">
            <a href="#">
              <img src="/assets/images/Rectangle-41.png" alt="" class="w-100 mb-3"/>
              <div
                style={{ background: "#fff", width: "20px", height: "20px", backgroundposition: "center center", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                <i class="fa fa-youtube-play"
                  style={{ fontSize:"48px", color:"red", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}></i>
              </div>
            </a>
          </div>
        </div>
        <div class="col-md-4 col-lg-4 mb-4">
          <div class="bg-block">
            <a href="#">
            <img src="/assets/images/Rectangle-42.png" alt="" class="w-100 mb-3"/>
            <div
                style={{ background: "#fff", width: "20px", height: "20px", backgroundposition: "center center", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                <i class="fa fa-youtube-play"
                  style={{ fontSize:"48px", color:"red", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}></i>
              </div>
            </a>
          </div>
        </div>
        <div class="col-md-4 col-lg-4 mb-4">
          <div class="bg-block">
            <a href="#">
            <img src="/assets/images/Rectangle-43.png" alt="" class="w-100 mb-3"/>
            <div
               style={{ background: "#fff", width: "20px", height: "20px", backgroundposition: "center center", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                <i class="fa fa-youtube-play"
                   style={{ fontSize:"48px", color:"red", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section> */}
      </div>
    );
  }
}
