import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Checkout extends Component {

    render() {
        return (
            <div>
                 <main class="main">

    <section class="top-blog-section checkout-section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-8 pb-3 pl-5 pr-150 pt-5">
            <Link to="/dashboard" ><img class="mb-3" src="/assets/images/logo.png" alt="logo"/></Link>
            <div class="breadcrumb">
              <Link to="/Cart">Cart</Link> <i class="fa fa-angle-right mx-2"></i> <a href="#">Information</a> <span><i
                  class="fa fa-angle-right mx-2"></i> Shipping <i class="fa fa-angle-right mx-2"></i> Payment</span>
            </div>
            <h1 class="cssanimation sequence leFadeInLeft">Contact Information</h1>
            <form action="">
              <input type="text" class="form-control form-group" placeholder="Email Address"/>
              <input type="text" class="form-control form-group mb-3" placeholder="Phone Number"/>
              <h1 class="mt-5 cssanimation sequence leFadeInLeft">Shipping Address</h1>
              <select class="form-control form-group">
                <option selected>Countery/Regon </option>
                <option>United States</option>
              </select>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 form-group">
                  <input type="text" class="form-control" placeholder="First Name"/>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 form-group">
                  <input type="text" class="form-control" placeholder="Last Name"/>
                </div>
              </div>
              <input type="text" class="form-control form-group" placeholder="Appartment, sute"/>
              <input type="text" class="form-control form-group" placeholder="Land mark"/>
              <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-4 form-group">
                  <input type="text" class="form-control" placeholder="City"/>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 form-group">
                  <select class="form-control">
                    <option selected>State </option>
                    <option>State</option>
                  </select>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 form-group">
                  <input type="text" class="form-control" placeholder="Pin Code"/>
                </div>
              </div>
              <div class="form-group">
                <input type="checkbox" class="mr-2"/>Save this information for next time
              </div>
              <div class="form-group checkout-btns">
                <a href="#" class="tm-btn-2 mr-3">Continue</a> <Link to="/Cart" class="">Retrun to Cart</Link>
              </div>
            </form>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 pb-3 px-5 right-section py-5">
            <div class="price-sec">
              <img src="/assets/images/Rectangle-250.png" alt="Rectangle-250"/>
              <span>Twinmotion for Architecture</span>
              <span>$199</span>
            </div>
            <div class="price-sec">
              <img src="/assets/images/Rectangle-256.png" alt="Rectangle-256"/>
              <span>VRay Unreal Engine Class</span>
              <span>$149</span>
            </div>
            <div class="price-sec">
              <span>Subtotal</span>
              <span>$348</span>
            </div>
            <div class="price-sec">
              <span class="total-text">Total:</span>
              <span class="total-price">$348</span>
            </div>
          </div>
        </div>
      </div>

    </section>

  </main>

   </div>
        )
    }
}