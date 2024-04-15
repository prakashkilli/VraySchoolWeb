import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Course1 extends Component {

    render() {
        return (
            <div>
                <main class="main">


                    <section class="top-blog-section">
                        <div class="container mt-5 mb-4">
                            <div class="breadcrumb mb-3">
                                <Link to="/Home">Home</Link> <i class="fa fa-angle-right mx-2"></i> Courses
                            </div>
                        </div>
                    </section>

                </main>
                <section class="mb-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-md-3 col-lg-3 category-accordian">
                                <h2>Filter</h2>
                                <div id="accordion" class="accordion">
                                    <div class="card mb-0">
                                        <div class="card-header collapsed" data-toggle="collapse" href="#collapseOne">
                                            <a class="card-title">
                                                Category
                                            </a>
                                        </div>
                                        <div id="collapseOne" class="card-body collapse" data-parent="#accordion" >
                                            <ul>
                                                <li><input type="checkbox" /> Photoshop Post Work</li>
                                                <li><input type="checkbox" /> Architectural Visualization</li>
                                                <li><input type="checkbox" /> VRay Training</li>
                                                <li><input type="checkbox" /> Bundles</li>
                                            </ul>
                                        </div>
                                        <div class="card-header collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                            <a class="card-title">
                                                Software
                                            </a>
                                        </div>
                                        <div id="collapseTwo" class="card-body collapse" data-parent="#accordion" >
                                            <ul>
                                                <li><input type="checkbox" /> Blender</li>
                                                <li><input type="checkbox" /> 3dsMax</li>
                                                <li><input type="checkbox" /> Unreal Engine</li>
                                                <li><input type="checkbox" /> Twinmotion</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-9 col-lg-9">
                                <section class="blog-sec">
                                    <div class="blog-imges-sec-main">
                                        <div class="row v-ray-school-section float-right mb-3">
                                            <div class="col-sm-12 col-md-12 col-lg-12 Filter-by-section">
                                                <span class="filter-by-text mr-5" 
                                                style={{ display: "flex",alignitems: "center",justifycontent: "space-between"}}>
                                                    <i class="fa fa-filter mr-2" aria-hidden="true"></i> Hide filters</span>
                                                <span class="mr-2 filter-by-text">Filter by: <b>Lighting</b></span> <a href=""><i class="fa fa-caret-down"
                                                    aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                        <div class="blog-imges-sec float-left">
                                            <div class="row">
                                                <div class="col-md-6 col-lg-6 mb-4">
                                                    <div class="blog h-100 d-flex flex-column">
                                                        <img src="/assets/images/course-list-1.png" alt="course-list-1" class="w-100" />
                                                        <div class="text-box h-100 d-flex flex-column">
                                                            <div class="text-box-2 h-100 d-flex flex-column">
                                                                <div class="h-100 d-flex flex-column">
                                                                    <div class="text-left">
                                                                        <a href="#" class="position-relative">3dsMax</a>
                                                                    </div>
                                                                    <h6>Interior design</h6>
                                                                    <p class="text-underline">by Alex Minelli</p>
                                                                    <p>Lorem ipsum dolor sit amet, our consectetur adipiscing elit Lorem ipsum dolor sit amet, our
                                                                        consectetur
                                                                        adipiscing elit.</p>
                                                                </div>
                                                                <div>
                                                                    <img src="assets/images/blog/Arrow.png" alt="" class="arrow-img" />
                                                                    <img src="assets/images/blog/Arrow-hover.png" alt="" class="arrow-img-hover" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-lg-6 mb-4">
                                                    <div class="blog h-100 d-flex flex-column">
                                                        <img src="/assets/images/course-list-2.png" alt="course-list-2" class="w-100" />
                                                        <div class="text-box h-100 d-flex flex-column">
                                                            <div class="text-box-2 h-100 d-flex flex-column">
                                                                <div class="h-100 d-flex flex-column">
                                                                    <div class="text-left">
                                                                        <a href="#" class="position-relative">ArchVIZ</a>
                                                                    </div>
                                                                    <h6>VFX for ArchVIZ</h6>
                                                                    <p class="text-underline">by Alex Minelli</p>
                                                                    <p>Lorem ipsum dolor sit amet, our consectetur adipiscing elit Lorem ipsum dolor sit amet, our
                                                                        consectetur
                                                                        adipiscing elit.</p>
                                                                </div>
                                                                <div>
                                                                    <img src="assets/images/blog/Arrow.png" alt="" class="arrow-img" />
                                                                    <img src="assets/images/blog/Arrow-hover.png" alt="" class="arrow-img-hover" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 col-lg-6 mb-3">
                                                    <div class="blog h-100 d-flex flex-column">
                                                        <img src="/assets/images/course-list-3.png" alt="course-list-3" class="w-100" />
                                                        <div class="text-box h-100 d-flex flex-column">
                                                            <div class="text-box-2 h-100 d-flex flex-column">
                                                                <div class="h-100 d-flex flex-column">
                                                                    <div class="text-left">
                                                                        <a href="#" class="position-relative">3dsMax</a>
                                                                    </div>
                                                                    <h6>Interior design</h6>
                                                                    <p class="text-underline">by Alex Minelli</p>
                                                                    <p>Lorem ipsum dolor sit amet, our consectetur adipiscing elit Lorem ipsum dolor sit amet, our
                                                                        consectetur
                                                                        adipiscing elit.</p>
                                                                </div>
                                                                <div>
                                                                    <img src="assets/images/blog/Arrow.png" alt="" class="arrow-img" />
                                                                    <img src="assets/images/blog/Arrow-hover.png" alt="" class="arrow-img-hover" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-lg-6 mb-3">
                                                    <div class="blog h-100 d-flex flex-column">
                                                        <img src="/assets/images/course-list-4.png" alt="course-list-4" class="w-100" />
                                                        <div class="text-box h-100 d-flex flex-column">
                                                            <div class="text-box-2 h-100 d-flex flex-column">
                                                                <div class="h-100 d-flex flex-column">
                                                                    <div class="text-left">
                                                                        <a href="#" class="position-relative">ArchVIZ</a>
                                                                    </div>
                                                                    <h6>VFX for ArchVIZ</h6>
                                                                    <p class="text-underline">by Alex Minelli</p>
                                                                    <p>Lorem ipsum dolor sit amet, our consectetur adipiscing elit Lorem ipsum dolor sit amet, our
                                                                        consectetur
                                                                        adipiscing elit.</p>
                                                                </div>
                                                                <div>
                                                                    <img src="assets/images/blog/Arrow.png" alt="" class="arrow-img" />
                                                                    <img src="assets/images/blog/Arrow-hover.png" alt="" class="arrow-img-hover" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}