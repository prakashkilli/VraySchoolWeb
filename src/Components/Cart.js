import React, { Component } from 'react';
import { GetUserCourses, GetLocalStorageData,Remove_Course_From_Cart, AssignCourse_to_User, SubscribeCourse_to_User, GetCartDetails,AppSettings } from '../Services';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { encode, decode } from 'js-base64';
import CustomImage from './Common/CustomImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Cart extends Component {
  imageLocationUrl = AppSettings.appsettings["ImageURL"];
  constructor(props) {
    super(props);
    this.state = {
      CartCoursesList: [],
      Carttempmycourses: [],
    }
    global.CartList = this;
  }
  componentDidMount = async () => {
    try {
      let _data = GetLocalStorageData();
      if (_data.length != 0) {
        await GetCartDetails(_data[0].id, (res) => {
          const { data, status, error } = res;
          this.setState({ CartCoursesList: data });
        })

      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  }
  removefromcart = (cartId) => {
    const confirmBox = window.confirm(
      "Do you really want to delete from cart?"
    )
    if (confirmBox === true) {
      try {     
        Remove_Course_From_Cart( cartId, (res) => {
          const { data, status, error } = res;
          if (status === 200) {
            if(data) {
              toast.error("Course removed from cart");
              var _data = this.state.CartCoursesList;
              const filteredData = _data.filter((item) => item.id !== cartId);
              this.setState({CartCoursesList: filteredData});
              var RemoveToCartItem = global.Header.state.count;
              global.Header.setState({count: RemoveToCartItem-1});
            }
            else{
              toast.error("Something went wrong");
            }
           
          } else {
            toast.error("Something went wrong");
          }
        });
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
    
  };
  EditCourseCart = (CourseId) => {
    try {
      window.location.href =  window.location.origin + "/CourseInformation/" + CourseId;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  subscribeCourse=(CartCoursesList)=>{
     var _data=GetLocalStorageData();
      var email = _data[0].primaryEmail;
      var userId=_data[0].id;
      var _SubscriptionDetails = [];
      for(var i=0;i<=CartCoursesList.length-1;i++){       
        var obj = {"UserId":userId,"EmailId":email,"PlanId":CartCoursesList[i].plandId,"CourseId":CartCoursesList[i].courseId};
        _SubscriptionDetails.push(obj);
      }
    SubscribeCourse_to_User(_SubscriptionDetails,(res)=>{
      const {data,status,error} = res;
      if(status==200){
        debugger;
       // toast.success("course subscribed successfully");
        alert("course subscribed successfully");
        var _data = [];
        this.setState({CartCoursesList: []});
        var AddToCartItem = global.Header.state.count;
        global.Header.setState({ count: 0 });
        window.location.replace(window.location.origin + "/dashboard");
      }
      else{
        toast.error("Something Wrong");
      }
    })
  }
  render() {
    let { CartCoursesList } = this.state;
    let count = 0
    CartCoursesList.map((el)=>{
            count = count + el.amount;
     })

    let _data = GetLocalStorageData();
    return (
      <div>
         <ToastContainer
          position="top-right"
          autoClose={ 3000 }
          hideProgressBar={ false }
          newestOnTop={ false }
          closeOnClick={ true }
          rtl={ false }
          pauseOnFocusLoss={ true }
          draggable={ false }
          pauseOnHover={ true }
        />
        <main class="main cart-section">

          <section class="top-blog-section checkout-section">
            <div class="container-fluid my-5">

              <div class="row">
                <div class="col-sm-12 col-md-2 col-lg-2"></div>
                <div class="col-sm-12 col-md-8 col-lg-8">
                  <h1>Cart</h1>
                  <div class="table-responsive">
                    <table class="table cart-table">
                      <thead>
                        <tr>
                        <th>Image</th>
                        <th>Course</th>                        
                        <th>Total</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {CartCoursesList.map((el) => {
                        return (
                          
                          <tr>
                            <td>
                              <div className="img-width">
                                <CustomImage src={this.imageLocationUrl + el.courseId + "&isCourseImage=true"} courseName={el.name}></CustomImage>
                              </div>
                            </td>
                            <td>
                              {el.name}
                              <br />
                            </td>
                            <td class="color-E0E0E0">${el.amount}</td>
                            <td><i class="fa fa-close text-danger mr-3" onClick={()=>this.removefromcart(el.id)}></i><i class="fa fa-edit" onClick={()=>this.EditCourseCart(el.courseId)}></i></td>
                          </tr>
                        );
                      })}
                       {this.state.CartCoursesList.length > 0 ?  
                      <tr>
                        <td colspan="2" class="text-right f-18">Subtotal:</td>
                        <td colspan="2" class="f-18">${count}</td>
                      </tr>:null}
                      </tbody>
                    </table>
                      {this.state.CartCoursesList.length > 0 ?
                    <div class="form-group checkout-btns cart-buttons float-right">
                       <button to="/Checkout" class="tm-btn-2" onClick={()=>this.subscribeCourse(CartCoursesList)}>Proceed to Checkout</button>
                    </div>:null}
                  </div>

                </div>
                <div class="col-sm-12 col-md-2 col-lg-2"></div>
              </div>
            </div>

          </section>
        </main>


      </div>
    )

  }
}