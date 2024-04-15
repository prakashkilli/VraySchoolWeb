import React, { Component } from "react";
import { Link } from "react-router-dom";





export default class Subscription extends Component {

    render() {
        return (
            <div>
            <main class="main">
        <div class="container my-5">
          <div class="hero-section pos-rel">
      {/* <div class="hero-section-content hero-sldr owl-carousel owl-theme"> */}
              <div class="hero-section-content">
              <div class="hero-single"  
          style={{ backgroundImage: `url(/assets/images/subscription1.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
             >
                <div class="container-fluid g-0 mb-3">
                  <div class="row">
                    <div class="col-xl-12 text-center">
                      <div class="hero-content px-5">
                        <div class="hero-desc">
                          <p>Learn at your own pace</p>
                          <div class="row">
                            <div class="col-sm-12 col-md-2 col-lg-2"></div>
                            <div class="col-sm-12 col-md-8 col-lg-8">
                                <h3>Get Unlimited access to all the 30 courses for just $399!</h3>    
                            </div>
                            <div class="col-sm-12 col-md-2 col-lg-2"></div>
                          </div>
                          <div class="hero-btn">
                          <Link to="/Cart" class="tm-btn-2">Subscribe Now</Link>                           
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
      <section>
        <div class="container">
          <div class="row mb-4">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="img-block">
                  <img src="/assets/images/subscription-2.png" alt="subscription-2" class="w-100 mb-2"/>
                </div>
                <h2>Over 15 Progressive Workshops</h2>
                <p class="">
                     Lacus euismod id aliquam commodo morbi a. Rutrum feugiat nunc vitae adipiscing. Diam tincidunt odio quis aliquam. Sit in
                    interdum convallis integer mattis lacus. Lacus euismod id aliquam commodo morbi a. Rutrum feugiat nunc vitae adipiscing.
                </p>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="img-block">
                  <img src="/assets/images/subscription-3.png" alt="subscription-3" class="w-100 mb-2"/>
                </div>
                <h2>Libraries of materials & Other Assets</h2>
                <p class="">
                     Lacus euismod id aliquam commodo morbi a. Rutrum feugiat nunc vitae adipiscing. Diam tincidunt odio quis aliquam. Sit in
                    interdum convallis integer mattis lacus. Lacus euismod id aliquam commodo morbi a.
                </p>
              </div>              
            </div>
          </div>
      </section>
<div class="cleaner"></div>
<section class="text-section">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="bg-gradient mb-5">
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-7">
                <img src="/assets/images/subscription-4.png" alt="Rectangle-192" class="w-100"/>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-5 space-between-column">
                <div class="v-center-align h-100">
                  <div class="right-section">
                    <h2>All the benefits, at the best costs and everything</h2>
                    <ul class="circle-check-list">
                      <li>Unlimited Access to 16 workshops</li>
                      <li>Learn ArchVIz Exterior / Interior</li>
                      <li>Learn VR and Interactive 3D</li>
                      <li>Unlimited streaming</li>
                      <li>Direct support with V-Ray Certified Instructors</li>
                      <li>3D Models plus assets</li>
                    </ul>
                  </div>
                </div>
                <div class="py-3 px-3 space-between">
                  <div>
                      <h2 class="mb-0">$399/year</h2>
                      Incl. of all taxes
                  </div>
                  <div>
                  <Link to="/Cart" class="tm-btn-2">Subscribe</Link>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </section>
<section class="Categories-section my-5">
  <div class="container">
    <div class="read-all-sec">
      <h4 className="cssanimation sequence leFadeInLeft">All included courses</h4>      
    </div>
    <div class="row">
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-1.png" alt="" class="w-100"/>
        </div>
        <p>Vray for 3dsMax</p>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-2.png" alt="" class="w-100"/>
        </div>
        <p>Vray for Photoshop</p>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-3.png" alt="" class="w-100"/>
        </div>
        <p>Vray for Architecture</p>
      </div>
      <div class="col-md-3 col-lg-3 mb-4">
        <div class="img-block mb-3">
          <img src="/assets/images/Categories-4.png" alt="" class="w-100"/>
        </div>
        <p>Unreal Engine</p>
      </div>
    </div>
                <div class="row">
        <div class="col-md-3 col-lg-3 mb-4">
          <div class="img-block mb-3">
            <img src="/assets/images/Categories-1.png" alt="" class="w-100"/>
          </div>
          <p>Vray for 3dsMax</p>
        </div>
        <div class="col-md-3 col-lg-3 mb-4">
          <div class="img-block mb-3">
            <img src="/assets/images/Categories-2.png" alt="" class="w-100"/>
          </div>
          <p>Vray for Photoshop</p>
        </div>
        <div class="col-md-3 col-lg-3 mb-4">
          <div class="img-block mb-3">
            <img src="/assets/images/Categories-3.png" alt="" class="w-100"/>
          </div>
          <p>Vray for Architecture</p>
        </div>
        <div class="col-md-3 col-lg-3 mb-4">
          <div class="img-block mb-3">
            <img src="/assets/images/Categories-4.png" alt="" class="w-100"/>
          </div>
          <p>Unreal Engine</p>
        </div>
      </div>
  </div>
</section>
</div>
        )
    }
}