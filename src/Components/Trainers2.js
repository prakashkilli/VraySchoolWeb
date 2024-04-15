import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Trainers2 extends Component {

    render() {
        return (
            <div>
                <main class="main">
      
        <div class="container my-5">
          <div class="top-blog-section">
            <div class="breadcrumb">
              <Link to="/Home">Home</Link> <i class="fa fa-angle-right mx-2" aria-hidden="true"></i> <a href="#">Knowledgebase</a> <i class="fa fa-angle-right mx-2" aria-hidden="true"></i> Trainers              
            </div>
          </div>          
        </div>
     
      </main>
     
       
<div class="cleaner"></div>


<section class="instructor-section">
  <div class="container">
    <div class="row mb-4 pb-4">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="img-block">
          <img src="/assets/images/blog/instructor.png" alt="instructor" class="w-100 mb-3"/>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6 right-img-sec mb-3">
        <div class="img-block">
          <img src="/assets/images/blog/instructor2.png" alt="instructor2" class="w-100 mb-3"/>
        </div>
        <div class="mb-3">
          <h4>Meet The Instructor</h4>
          <p class="mb-3 pb-3">
            Alexander Minelli holds 2 degrees in Animation Film/TV and Interactive Communications. He has a strong
            background in architecture, interior design and traditional lighting.
          </p>
          <a href="#">Learn more <img src="/assets/images/blog/Arrow2.png" alt="Arrow2"/></a>
        </div>
      </div>
    </div>
  </div>
</section>



<section class="v-ray-school-section my-5">
  <div class="container">
    <div class="read-all-sec">
      <h4 className="cssanimation sequence leFadeInLeft">Corporate Projects</h4>
      <div class="d-flex align-items-center next-preview-btns">
        <div class="mr-3 left-arrow">
          <img src="/assets/images/blog/Arrow-left.png" alt="Arrow-left" class="arrow-img"/>
          <img src="/assets/images/blog/Arrow-left-hover.png" alt="Arrow-left-hover" class="arrow-img-hover"/>
        </div>
        <div class="right-arrow">
          <img src="/assets/images/blog/Arrow.png" alt="Arrow" class="arrow-img"/>
          <img src="/assets/images/blog/Arrow-hover.png" alt="Arrow-hover" class="arrow-img-hover"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-6 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Corporate-Projects1.png" alt="Corporate-Projects1" class="w-100"/>
        </div>
        <h3>Corporate Project #1</h3>
        <p class="p-16">
          Wie schön leuchtet der Morgenstern ('How beautifully the morning star shines'), BWV 1, is a church cantata for the
          Annunciation by Johann Sebastian Bach. He composed,
        </p>        
      </div>
      <div class="col-md-6 col-lg-6 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Corporate-Projects2.png" alt="Corporate-Projects2" class="w-100"/>
        </div>
        <h3>Corporate Project #2</h3>
        <p class="p-16">
          Alexander Minelli holds 2 degrees in Animation Film/TV and Interactive Communications. He has a strong background in
          architecture, interior design and traditional lighting. He worked for TOP companies.
        </p>        
      </div>
    </div>
  </div>
</section>



<section class="Categories-section my-5">
  <div class="container">
    <div class="read-all-sec">
      <h4 className="cssanimation sequence leFadeInLeft">Render Gallery</h4>      
    </div>
    <div class="row">
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-1.png" alt="" class="w-100"/>
        </div>        
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-2.png" alt="" class="w-100"/>
        </div>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-3.png" alt="" class="w-100"/>
        </div>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-4.png" alt="" class="w-100"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-1.png" alt="" class="w-100"/>
        </div>        
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-2.png" alt="" class="w-100"/>
        </div>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-3.png" alt="" class="w-100"/>
        </div>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-4.png" alt="" class="w-100"/>
        </div>
      </div>
    </div>

    <div class="text-center pb-5">
      <a href="#" class="tm-btn-2 loadmore-btn"> Load More </a>
    </div>
  </div>
</section>
            </div>
        )
    }
}
