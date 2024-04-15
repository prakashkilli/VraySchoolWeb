import React, { Component } from "react";
import { GetLoginDetails,HideLoader,forgotUserPassword, ShowLoader } from "../../Services";
import { Link, json } from "react-router-dom";
import { Modal,Button, ModalBody, ModalHeader,ModalFooter } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: "",
      PrimaryEmail:"",
      UserLoginData: [],
      isSuccessfullyLogin: true,
      isPassword: false,
      isEmail: false,
      isShowModal: false,
      isEmail: false
    };
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit("");
    }
  }
  _handleOnUserNameChange = (e) => {
    this.setState({ PrimaryEmail: e.target.value });
  };
  _handleOnPasswordChange = (e) => {
    this.setState({ Password: e.target.value });
  };
  handleSubmit = () => {

    if (this.state.PrimaryEmail === "" && this.state.Password === "") {
      this.setState({ isEmail: true, isPassword: true });
    } else if (this.state.Password === "") {
      this.setState({ isPassword: true });
    } else if (this.state.PrimaryEmail === "") {
      this.setState({ isEmail: true });
    } else {
      const _data = {
        PrimaryEmail: this.state.PrimaryEmail,
        password: this.state.Password,
      };
      GetLoginDetails(_data, (res) => {
        const { data, error } = res;
        var LoginData = [];
        if (data) {
          debugger;
          LoginData.push(res.data.user);
          console.log(LoginData);
          // const cookies = new Cookies();
          this.setState({ UserLoginData: JSON.stringify(LoginData) });

          localStorage.setItem("UserLoggedInData", JSON.stringify(LoginData));
          localStorage.setItem("UserLoggedInId",JSON.stringify(res.data.user.id));

          // cookies.set("authenticationpassword", res.data.user.password);
          // cookies.set("UserId", res.data.user.id);
          window.location.replace(window.location.origin + "/dashboard");
        } else {
          this.setState({ isSuccessfullyLogin: false });
        }
      });
    }
  };
  onClickForgotPassword = e =>{
    this.setState({isShowModal:!this.state.isShowModal}) 
}
_handleOnEmailChange = (e) => {
  this.setState({ PrimaryEmail: e.target.value });
}
CheckEmail = () => {
  try {
    if (this.state.PrimaryEmail === "") {
      this.setState({ isEmail: true });
    } else {
      const _data = {
        PrimaryEmail: this.state.PrimaryEmail,
      };
      forgotUserPassword(_data, (res) => {
        const { data, error } = res;
        var LoginData = [];
        if (data) {
         toast.success("New password sent to your Emailid");
         this.setState({isShowModal: false});
        } else {
          toast.error("Please enter valid Emailid");
          this.setState({isShowModal: false});
        }
        HideLoader();
      });
    }
  } catch (error) {
    console.error(error);
    HideLoader();
  }
  ShowLoader();
  
};
  render() { 
    return (
      <div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={false}
            pauseOnHover={true}
          />
        <div className="row login-from mx-0">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div className="login-from-bg">
              <div class="text-center mb-5">
                <img
                  src="/assets/images/logo.png"
                  class="img-fluid text-center"
                  alt=""
                />
              </div>
              <input
                type="text"
                className="form-control"
                id="PrimaryEmail"
                placeholder="Enter Email"
                onChange={(e) => this._handleOnUserNameChange(e)}
                onKeyPress={this.handleKeyPress}
                onFocus={() =>
                  this.setState({
                    isSuccessfullyLogin: true,
                    isPassword: false,
                    isEmail: false,
                  })
                }
                value={this.state.PrimaryEmail}
              />
              {this.state.isEmail ? (
                <div className="text-danger text-left small position-absolute">
                  Please enter email
                </div>
              ) : (
                  ""
                )}
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => this._handleOnPasswordChange(e)}
                onKeyPress={this.handleKeyPress}
                onFocus={() =>
                  this.setState({
                    isSuccessfullyLogin: true,
                    isPassword: false,
                    isEmail: false,
                  })
                }
                value={this.state.Password}
              />
              {this.state.isPassword ? (
                <div className="text-danger text-left small position-absolute">
                  Please enter password
                </div>
              ) : (
                  ""
                )}
              <br />
              <a
                type="submit"
                className="tm-btn-2 mt-4 mb-3 w-100 text-center"
                onClick={() => this.handleSubmit()}
              >
                Login
              </a>
              {this.state.isSuccessfullyLogin ? (
                ""
              ) : (
                  <div className={"text-danger mt-3"}>Invalid Credentials</div>
                )}
              <div className="text-center mb-3">
                Don't have an account?<Link className="link" to="/Register"><span className="ml-2">Register</span></Link>
              </div>
              <div className="div-flex-align">
                <Link className="link" to="/">Back to Home</Link>
                <Link className="link" onClick={this.onClickForgotPassword}>Forgot Password</Link>
                <Modal
                  show={this.state.isShowModal}
                  onHide={() => this.onClickForgotPassword()}
                  style={{ color: "black"}}>
                  <ModalHeader
                  style={{textAlign:"center"}}>
                  <b>Forgot Password?</b>
                  </ModalHeader>
                  <Modal.Body>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Please Enter Your Email (ex: abc123@gmail.com)"
                      onChange={(e) => this._handleOnEmailChange(e)}
                    />
                  </Modal.Body>
                  <ModalFooter>
                    <Button onClick={() => this.onClickForgotPassword()}>Close</Button>
                    <Button onClick={() => this.CheckEmail()}>Submit</Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  }
}
