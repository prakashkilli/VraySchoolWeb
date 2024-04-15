import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class About extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1 className="py-5 text-center">
            Online School for Architectural Visualization
          </h1>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-5 pb-5">
              <p className="mb-5">
                VRaySchool is an innovative online school for ArchViz that was
                purchased by Hotkeys Holding LLC in 2022. Their goal is to
                empower innovation in distance learning and fully integrate
                classes into school systems, enabling 3D software learning to
                become truly accessible to everybody.
              </p>

              <p className="mb-5">
                The horizons are expanding faster than ever before. AI is used
                to assist with designs, references and examples showcasing pro
                knowledge are available, and 24/7 support ensures nothing is
                missed. Multi-language step-by-step video training will also be
                available anywhere in the world, enabling everyone to master the
                art of lighting and rendering with VRay.
              </p>

              <p className="mb-5">
                For VRaySchool, this is only the beginning.
              </p>
            </div>
          </div>
        </div>
      </div>
      // <div>
      //   <main class="main">
      //     <section class="top-blog-section">
      //       <div class="container mt-5 mb-4">
      //         <div class="breadcrumb mb-3">
      //           <Link to="/Home">Home</Link>{" "}
      //           <i class="fa fa-angle-right mx-2"></i> About Us
      //         </div>
      //         <div class="row">
      //           <div class="col-sm-12 col-md-12 col-lg-12 mb-3">
      //             <img
      //               src="/assets/images/Rectangle-268.png"
      //               alt="Rectangle-268"
      //               class="w-100"
      //             />
      //           </div>
      //         </div>
      //       </div>
      //     </section>
      //   </main>
      //   <section class="text-section about-us-section">
      //     <div class="container">
      //       <div class="row mb-4">
      //         <div class="col-sm-12 col-md-1 col-lg-1"></div>
      //         <div class="col-sm-12 col-md-10 col-lg-10 text-center">
      //           <h1>
      //             VRay School is about mastering the tool as well as improving
      //             your skills to become better; no matter what level you are at.
      //           </h1>
      //         </div>
      //         <div class="col-sm-12 col-md-1 col-lg-1"></div>
      //       </div>
      //       <div class="row mb-4">
      //         <div class="col-sm-12 col-md-1 col-lg-1"></div>
      //         <div class="col-sm-12 col-md-5 col-lg-5">
      //           <div class="img-block">
      //             <img
      //               src="/assets/images/Rectangle-building.png"
      //               alt="Rectangle-building"
      //               class="w-100 mb-2"
      //             />
      //           </div>
      //           <h2>USP #1</h2>
      //           <p class="">
      //             Wie schön leuchtet der Morgenstern ('How beautifully the
      //             morning star shines'), BWV 1, is a church cantata for the
      //             Annunciation by Johann Sebastian Bach. He composed,
      //           </p>
      //         </div>
      //         <div class="col-sm-12 col-md-5 col-lg-5">
      //           <div class="img-block">
      //             <img
      //               src="/assets/images/Rectangle-symble.png"
      //               alt="Rectangle-symble"
      //               class="w-100 mb-2"
      //             />
      //           </div>
      //           <h2>USP #2</h2>
      //           <p class="">
      //             Alexander Minelli holds 2 degrees in Animation Film/TV and
      //             Interactive Communications. He has a strong background in
      //             architecture, interior design and traditional lighting. He
      //             worked for TOP companies.
      //           </p>
      //         </div>
      //         <div class="col-sm-12 col-md-1 col-lg-1"></div>
      //       </div>
      //       <div class="video-learn-more mb-5">
      //         <a href="#">
      //           <div class="img-over-text">
      //             <i class="fa fa-play-circle"></i>
      //             <p>Learn more watch the video</p>
      //           </div>
      //         </a>
      //       </div>
      //       <div class="clear"></div>
      //     </div>
      //   </section>
      //   <section class="Dont-Miss-section my-5">
      //     <div class="container">
      //       <div class="row">
      //         <div class="col-sm-12 col-md-1 col-lg-1"></div>
      //         <div class="col-sm-12 col-md-10 col-lg-10">
      //           <div class="Dont-Miss-section-bg no-bg py-5">
      //             <h1 class="cssanimation sequence leFadeInLeft">
      //               Want to know more?
      //             </h1>
      //             <p>
      //               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      //               Neque aenean blandit viverra cum turpis sed justo.
      //             </p>
      //             <input
      //               class="my-3 form-control"
      //               type="text"
      //               placeholder="enter your email"
      //             />
      //             <Link to="/Subscription" class="tm-btn-2">
      //               Subscribe
      //             </Link>
      //           </div>
      //         </div>
      //         <div class="col-sm-12 col-md-1 col-lg-1"></div>
      //       </div>
      //     </div>
      //   </section>
      //   <section class="watch-tutorials-section my-5">
      //     <div class="container">
      //       <div class="read-all-sec">
      //         <h4 class="cssanimation sequence leFadeInLeft">
      //           VRaySchool on YouTube
      //         </h4>
      //         <a href="#">Subscribe on YouTube</a>
      //       </div>
      //       <div class="row">
      //         <div class="col-md-4 col-lg-4 mb-4">
      //           <div class="bg-block">
      //             <a href="#">
      //               <img
      //                 src="/assets/images/Rectangle-41.png"
      //                 alt=""
      //                 class="w-100 mb-3"
      //               />
      //               <div
      //                 style={{
      //                   background: "#fff",
      //                   width: "20px",
      //                   height: "20px",
      //                   backgroundposition: "center center",
      //                   position: "absolute",
      //                   left: "50%",
      //                   top: "50%",
      //                   transform: "translate(-50%, -50%)",
      //                 }}
      //               >
      //                 <i
      //                   class="fa fa-youtube-play"
      //                   style={{
      //                     fontSize: "48px",
      //                     color: "red",
      //                     position: "absolute",
      //                     left: "50%",
      //                     top: "50%",
      //                     transform: "translate(-50%, -50%)",
      //                   }}
      //                 ></i>
      //               </div>
      //             </a>
      //           </div>
      //         </div>
      //         <div class="col-md-4 col-lg-4 mb-4">
      //           <div class="bg-block">
      //             <a href="#">
      //               <img
      //                 src="/assets/images/Rectangle-42.png"
      //                 alt=""
      //                 class="w-100 mb-3"
      //               />
      //               <div
      //                 style={{
      //                   background: "#fff",
      //                   width: "20px",
      //                   height: "20px",
      //                   backgroundposition: "center center",
      //                   position: "absolute",
      //                   left: "50%",
      //                   top: "50%",
      //                   transform: "translate(-50%, -50%)",
      //                 }}
      //               >
      //                 <i
      //                   class="fa fa-youtube-play"
      //                   style={{
      //                     fontSize: "48px",
      //                     color: "red",
      //                     position: "absolute",
      //                     left: "50%",
      //                     top: "50%",
      //                     transform: "translate(-50%, -50%)",
      //                   }}
      //                 ></i>
      //               </div>
      //             </a>
      //           </div>
      //         </div>
      //         <div class="col-md-4 col-lg-4 mb-4">
      //           <div class="bg-block">
      //             <a href="#">
      //               <img
      //                 src="/assets/images/Rectangle-43.png"
      //                 alt=""
      //                 class="w-100 mb-3"
      //               />
      //               <div
      //                 style={{
      //                   background: "#fff",
      //                   width: "20px",
      //                   height: "20px",
      //                   backgroundposition: "center center",
      //                   position: "absolute",
      //                   left: "50%",
      //                   top: "50%",
      //                   transform: "translate(-50%, -50%)",
      //                 }}
      //               >
      //                 <i
      //                   class="fa fa-youtube-play"
      //                   style={{
      //                     fontSize: "48px",
      //                     color: "red",
      //                     position: "absolute",
      //                     left: "50%",
      //                     top: "50%",
      //                     transform: "translate(-50%, -50%)",
      //                   }}
      //                 ></i>
      //               </div>
      //             </a>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </section>
      // </div>
    );
  }
}
