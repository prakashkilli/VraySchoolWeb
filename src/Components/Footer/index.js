import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="footer-sec">
          <div class="container">
            <div class="footer-info d-flex row border-top-0">
              <div class="col-md-3 col-sm-12">
                <Link to="/Home" class="nav-link pl-0">
                  <img src="/assets/images/logo.png" alt="" />
                </Link>
              </div>
              <div class="col-md-6 col-sm-12"></div>
              <div class="col-md-3 col-sm-12">
                <div class="ml-auto social-media">
                  <h3>Connect with us on social</h3>
                  <ul class="menu-social">
                    <li>
                      <a href="#">
                        <i class="fa fa-facebook-square" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-youtube" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="footer-info d-flex row border-top-0 footer-list py-3">
              <div class="col-md-3 col-sm-12">
                <h3>Courses</h3>
                <ul>
                  <li>
                    <a href="#">Photoshop Post Work</a>
                  </li>
                  <li>
                    <a href="#">Architectural Visualization</a>
                  </li>
                  <li>
                    <Link to="/trainers-2">VRay Training</Link>
                  </li>
                  <li>
                    <a href="#">Sale</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-3 col-sm-12">
                <h3>About</h3>
                <ul>
                  <li>
                    <Link to="/About">About us</Link>
                  </li>
                  <li>
                    <a href="#">Forum</a>
                  </li>
                  <li>
                    <Link to="/FAQS">F.A.Q.s</Link>
                  </li>
                  <li>
                    <Link to="/contactus">Contact</Link>
                  </li>
                </ul>
              </div>

              <div class="col-md-3 col-sm-12">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <Link to="/course1">Courses</Link>
                  </li>
                  <li>
                    <Link to="/trainer">Instructors</Link>
                  </li>
                  <li>
                    <Link to="/subscription">Subscription</Link>
                  </li>
                  <li>
                    <a href="#">Showcase</a>
                  </li>
                </ul>
              </div>

              <div class="col-md-3 col-sm-12">
                <h3>Policies</h3>
                <ul>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Cookie Policy</a>
                  </li>
                  <li>
                    <a href="#">Other Policies</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        <div class="copyright-sec">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <div class="text">
                  <p>
                    Copyright © <span id="year"></span> . All Rights Reserved
                  </p>
                  <p>Copyrights VraySchool. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="js/jquery-min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.easing.min.js"></script>
        <script src="js/jquery.counterup.min.js"></script>
        <script src="js/jquery.magnific-popup.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/fontawesome.js"></script>
        <script src="js/jquery.meanmenu.min.js"></script>
        <script src="js/owl.carousel.min.js"></script>
        <script src="js/custom.js"></script>
      </div>
    );
  }
}
