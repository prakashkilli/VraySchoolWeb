import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Studentgallery extends Component {

    render() {
        return (
            <div>
                <main class="main">
    <section class="top-blog-section">
      <div class="container mt-5 mb-4">
        <div class="breadcrumb mb-3">
          <Link to="/Home">Home</Link> <i class="fa fa-angle-right mx-2"></i> <a href="#">Knowledgebase</a> <i
            class="fa fa-angle-right mx-2"></i> Student Gallery
        </div>
        <h1 class="mb-4 cssanimation sequence leFadeInLeft">Works by VRay School Students</h1>
        <div class="v-ray-school-section">
          <div class="row">
            <div class="col-md-6 col-lg-6 mb-4">
              <div class="img-block mb-3">
                <img src="/assets/images/student-gallery-1.png" alt="student-gallery-1" class="w-100"/>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 mb-4">
              <div class="img-block mb-3">
                <img src="/assets/images/student-gallery-2.png" alt="student-gallery-2" class="w-100"/>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6 col-lg-6 mb-4">
              <div class="img-block mb-3">
                <img src="/assets/images/student-gallery-3.png" alt="student-gallery-3" class="w-100"/>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 mb-4">
              <div class="img-block mb-3">
                <img src="/assets/images/student-gallery-4.png" alt="student-gallery-4" class="w-100"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <section class="text-section">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-1 col-lg-1"></div>
        <div class="col-sm-12 col-md-10 col-lg-10">
          <div class="bg-141414 mb-5">
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-8">
                <img src="/assets/images/blog/Rectangle-192.png" alt="Rectangle-192" class="w-100" style={{ height: "100%"}}/>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-4 v-center-align mb-3">
                <div class="right-section">
                  <h3>FEATURED COURSE</h3>
                  <h2>Twinmotion for Architecture</h2>
                  <p>Lacus euismod id aliquam commodo morbi a. Rutrum feugiat nunc vitae adipiscing. Diam tincidunt odio
                    quis
                    aliquam. Sit in interdum convallis integer mattis lacus.</p>
                  <a href="#">Read more <img src="/assets/images/blog/Arrow2-hover.png" alt="Arrow2-hover"/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-1 col-lg-1"></div>
      </div>

      <div class="clear"></div>
      <div class="v-ray-school-section mb-5">
        <div class="row">
          <div class="col-md-6 col-lg-6 mb-4">
            <div class="img-block mb-3">
              <img src="/assets/images/student-gallery-5.png" alt="student-gallery-5" class="w-100"/>
            </div>
          </div>
          <div class="col-md-6 col-lg-6 mb-4">
            <div class="img-block mb-3">
              <img src="/assets/images/student-gallery-6.png" alt="student-gallery-6" class="w-100"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
            </div>
        )
    }
}