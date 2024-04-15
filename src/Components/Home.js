import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { GetLocalStorageData } from '../Services'


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        name:'',
    }
  }
    componentDidMount=()=>{
    }
  render() {
    return (
      <div>

<main class="main">
<div class="container my-5">
    <div class="hero-section pos-rel">
        {/* <div class="hero-section-content hero-sldr owl-carousel owl-theme">  */}
        <div class="hero-section-content">
        <div className="hero-single" style={{backgroundImage:`url(/assets/images/slider/slider1.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>         
        <div class="container-fluid g-0">
            <div class="row">
            <div class="col-xl-12 text-center">
                <div class="hero-content px-5">
                <div class="hero-desc">
                    <h3>Learn V-Ray: Advance Your Career</h3>
                    <div class="row">
                    <div class="col-sm-12 col-md-2 col-lg-2"></div>
                    <div class="col-sm-12 col-md-8 col-lg-8">
                        <p>Quisque vitae risus ac libero faucibus tincidunt. Nulla vel tellus non arcu viverra fermentum. Nullam egestas pharetra ipsum, laoreet vehicula magna rhoncus nec. Aenean quis sapien imperdiet, lobortis ligula ac, tempor nisl.</p>
                    </div>
                    <div class="col-sm-12 col-md-2 col-lg-2"></div>
                    </div>
                    
                    <div class="hero-btn">
                    <Link to="/Subscription" class="tm-btn-2"> Start Learning </Link>                            
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    {/* </div> */}
</div>
</div>
</main>

<section class="blog-sec">
    

    <div class="blog-imges-sec-main">
    <div class="container">
    <div class="blog-view-all-sec">
        <h4>Courses we offer</h4>
        <a href="" >View all courses</a>
    </div>
    <div class="blog-imges-sec">
            <div class="row">
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="blog h-100 d-flex flex-column">
                <img src="assets/images/blog/blog1.png" alt="" class="w-100"/>
                <div class="text-box h-100 d-flex flex-column">
                    <div class="text-box-2 h-100 d-flex flex-column">
                    <div class="h-100 d-flex flex-column">
                        <div class="text-left">
                        <a href="#" class="position-relative">3dsMax</a>
                        </div>
                        <h6>Interior design</h6>
                        <p class="text-underline">by Alex Minelli</p>
                        <p>Lorem ipsum dolor sit amet, our consectetur adipiscing elit Lorem ipsum dolor sit amet, our consectetur
                        adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="assets/images/blog/Arrow.png" alt="" class="arrow-img"/>
                        <img src="assets/images/blog/Arrow-hover.png" alt="" class="arrow-img-hover"/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="blog h-100 d-flex flex-column">
                <img src="assets/images/blog/blog2.png" alt="" class="w-100"/>
                <div class="text-box h-100 d-flex flex-column">
                    <div class="text-box-2 h-100 d-flex flex-column">
                    <div class="h-100 d-flex flex-column">
                        <div class="text-left">
                        <a href="#" class="position-relative">ArchVIZ</a>
                        </div>
                        <h6>VFX for ArchVIZ</h6>
                        <p class="text-underline">by Alex Minelli</p>
                        <p>Lorem ipsum dolor sit amet, our consectetur adipiscing elit Lorem ipsum dolor sit amet, our consectetur
                        adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="assets/images/blog/Arrow.png" alt="" class="arrow-img"/>
                        <img src="assets/images/blog/Arrow-hover.png" alt="" class="arrow-img-hover"/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="blog h-100 d-flex flex-column">
                <img src="assets/images/blog/blog3.png" alt="" class="w-100"/>
                <div class="text-box h-100 d-flex flex-column">
                    <div class="text-box-2 h-100 d-flex flex-column">
                    <div class="h-100 d-flex flex-column">
                        <div class="text-left">
                        <a href="#" class="position-relative">Unreal Engine</a>
                        </div>
                        <h6>Megascans in Unreal Engine</h6>
                        <p class="text-underline">by Alex Minelli</p>
                        <p>Lorem ipsum dolor sit amet, our consectetur adipiscing elit Lorem ipsum dolor sit amet, our consectetur
                        adipiscing elit.</p>                              
                    </div>
                    <div>
                        <img src="assets/images/blog/Arrow.png" alt="" class="arrow-img"/>
                        <img src="assets/images/blog/Arrow-hover.png" alt="" class="arrow-img-hover"/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>                              
    </div>
    </div>
</div>
</section>
       
<div class="cleaner"></div>


<section class="instructor-section">
  <div class="container">
    <div class="row mb-4 pb-4">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="img-block">
          <img src="assets/images/blog/instructor.png" alt="instructor" class="w-100 mb-3"/>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6 right-img-sec mb-3">
        <div class="img-block">
          <img src="assets/images/blog/instructor2.png" alt="instructor2" class="w-100 mb-3"/>
        </div>
        <div class="mb-3">
          <h4>Meet The Instructor</h4>
          <p class="mb-3 pb-3">
            Alexander Minelli holds 2 degrees in Animation Film/TV and Interactive Communications. He has a strong
            background in architecture, interior design and traditional lighting.
          </p>
          <a href="#">Learn more <img src="assets/images/blog/Arrow2.png" alt="Arrow2"/></a>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-12 col-md-6 col-lg-6 mb-3 left-content-sec">
        <div class="mb-3">
          <h4>Learn V-Ray for 3dsMax</h4>
          <p>
            Alexander Minelli holds 2 degrees in Animation Film/TV and Interactive Communications. He has a strong backgroun in architecture, interior design and traditional lighting.
          </p>
          <a href="#">Explore <img src="assets/images/blog/Arrow2.png" alt="Arrow2"/></a>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
        <div class="img-block">
          <img src="assets/images/blog/Rectangle71.png" alt="Rectangle71" class="w-100"/>
        </div>
      </div>
      
    </div>
  </div>
</section>

<section class="v-ray-school-section my-5">
  <div class="container">
    <div class="read-all-sec">
      <h4>News from V-Ray School</h4>
      <a href="#">Read all</a>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="img-block mb-3">
          <img src="images/V-Ray-School-1.png" alt="" class="w-100"/>
        </div>
        <p>V-Ray School News | NFT | Black Friday | Chaos Emmy Award</p>
        <a href="#">Read more</a>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="img-block mb-3">
          <img src="images/V-Ray-School-2.png" alt="" class="w-100"/>
        </div>
        <p>VRay Survey | VRaySchool 2.0 NEW Website | New Class</p>
        <a href="#">Read more</a>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="img-block mb-3">
          <img src="images/V-Ray-School-3.png" alt="" class="w-100"/>
        </div>
        <p>Metahuman to UE4 - Design and Animation Retargeting</p>
        <a href="#">Read more</a>
      </div>
    </div>
  </div>
</section>

<section class="Get-Over-section my-5">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="Get-Over-bg-img py-5">
          <h1>Get Over 30 Courses for Just $399</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus varius nec non mauris. At in
            habitant bibendum amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus varius nec non mauris. At in
            habitant bibendum amet.</p>
          <a href="#" class="tm-btn-2">Subscribe</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="Categories-section my-5">
  <div class="container">
    <div class="read-all-sec">
      <h4>Categories</h4>
      <a href="#">View all categories</a>
    </div>
    <div class="row">
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="images/Categories-1.png" alt="" class="w-100"/>
        </div>
        <p>Vray for 3dsMax</p>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="images/Categories-2.png" alt="" class="w-100"/>
        </div>
        <p>Vray for Photoshop</p>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="images/Categories-3.png" alt="" class="w-100"/>
        </div>
        <p>Vray for Architecture</p>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="images/Categories-4.png" alt="" class="w-100"/>
        </div>
        <p>Unreal Engine</p>
      </div>
    </div>
  </div>
</section>

<section class="testimonial-section">
  <div class="container">
    <div id="testim" class="testim">
      <div class="testim-cover">
         <div class="wrap">
             <span id="right-arrow" class="arrow right fa fa-chevron-right" style={{display: 'none'}}></span>
             <span id="left-arrow" class="arrow left fa fa-chevron-left " style={{display: 'none'}}></span>
            <div class="top-controls">
              <img src="asset/images/stars.png" alt=""/>
              <ul id="testim-dots" class="dots">            
                <li class="dot active"></li>
                <li class="dot"></li>
                <li class="dot"></li>
                <li class="dot"></li>
                <li class="dot"></li>
              </ul>
            </div>
             <div id="testim-content" class="cont">
                 
                 <div class="active">
                  <p>I find I am buying all the time as there is always something new to love. The styles are great, the quality is really good and very consistent.</p>
                   <h2>James Smith</h2>                     
                 </div>

                 <div>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>                    
                     <h2>Mr. Lorem Ipsum</h2>                     
                 </div>

                 <div>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>                    
                     <h2>Lorem Ipsum</h2>
                 </div>

                 <div>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>                    
                     <h2>Lorem De Ipsum</h2>
                 </div>

                 <div>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>                    
                     <h2>Ms. Lorem R. Ipsum</h2>
                 </div>

             </div>

         </div>
      </div>
      
    </div>
 <script src="https://use.fontawesome.com/1744f3f671.js"></script>
  </div>
</section>

<section class="watch-tutorials-section my-5">
  <div class="container">
    <div class="read-all-sec">
      <h4>Watch Tutorials</h4>
      <a href="#">Subscribe on YouTube</a>
    </div>
    <div class="row">
      <div class="col-md-4 col-lg-4 mb-4">
        <div class="bg-block">
          <img src="assets/images/Rectangle-41.png" alt="" class="w-100 mb-3"/>
          <a href="#"
          style={{background:'#fff', width: '20px', height: '20px', backgroundPosition: 'center center', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
          >
            <i class="fa fa-youtube-play"
            style={{fontSize:'48px',color:'red', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
            ></i>
          </a>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 mb-4">
        <div class="bg-block">
          <img src="assets/images/Rectangle-42.png" alt="" class="w-100 mb-3"/>
          <a href="#"
          style={{background:'#fff', width: '20px', height: '20px', backgroundPosition: 'center center', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
            >
            <i class="fa fa-youtube-play"
             style={{fontSize:'48px',color:'red', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
            ></i>
          </a>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 mb-4">
        <div class="bg-block">
          <img src="assets/images/Rectangle-43.png" alt="" class="w-100 mb-3"/>
          <a href="#"
             style={{background:'#fff', width: '20px', height: '20px', backgroundPosition: 'center center', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
            >
            <i class="fa fa-youtube-play"
               style={{fontSize:'48px',color:'red', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
            ></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="Works-by-students-section">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-8 mb-3 left-content-sec">
        <img src="assets/images/Rectangle-59.png" alt="Rectangle-59" class="w-100"/>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-3 right-img-sec">
        <div class="mb-3 small-img-group">
          <a href="#"><img src="assets/images/Rectangle-61.png" alt=""/></a>
          <a href="#"><img src="assets/images/Rectangle-62.png" alt=""/></a>
          <a href="#"><img src="assets/images/Rectangle-63.png" alt=""/></a>
          <a href="#"><img src="assets/images/Rectangle-64.png" alt=""/></a>
          <a href="#"><img src="assets/images/Rectangle-65.png" alt=""/></a>
        </div>
        <div class="">
          <h4>Works by our students</h4>
          <p class="mb-4 pb-4">
            Alexander Minelli holds 2 degrees in Animation Film/TV and Interactive Communications. He has a strong background in architecture, interior design and lighting.
          </p>
          <Link to='/studentgallery'>View Complete Gallery <img src="assets/images/blog/Arrow2.png" alt="Arrow2"/></Link>
        </div>
      </div>
      
         </div>
       </div>
       
    </section>

      </div>
      
    )
  }
}
