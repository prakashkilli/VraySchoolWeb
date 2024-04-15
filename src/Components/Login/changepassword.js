import React, { Component } from "react";
import {  Link } from 'react-router-dom';
import { Changepassword, GetLocalStorageData } from '../../Services';
// function withParams(Component) {
//   return (props) => <Component {...props} params={useParams()} />;
// }

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      isOldPassword: false,
      isNewPassword: false,
      isConfirmPassword: false,
      isPasswordMatch: true,
    };
  }
  componentDidMount = () => {
  }
  checkPassword = () => {
    if (this.state.newPassword != "" && this.state.confirmPassword != "") {
      if (document.getElementById('NewPassword').value ==
        document.getElementById('confirmPassword').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
        this.setState({ isPasswordMatch: false });
      } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
      }
    }
  }
  handleUpdate = () => {
    let _userId = 0;
    let _data = GetLocalStorageData();
    if (_data.length != 0) {
      _userId = _data[0].id;
    }
    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.state;
    if (!oldPassword) {
      this.setState({ isOldPassword: true });
    }
    if (!newPassword) {
      this.setState({ isNewPassword: true });
    }
    if (newPassword === confirmPassword) {
      this.setState({ isPasswordMatch: false });
    }
    if (
      oldPassword && 
      newPassword && 
      confirmPassword
      ) {
      if (confirmPassword) {
        const _data = {
          oldPassword: oldPassword,
          newPassword: newPassword,
          userId: _userId,
        }
        Changepassword(_data, res => {
          const data =res.data;
          console.log(data);
          if (data==="password changed successfully") {   
            alert(data)
            window.location.replace(window.location.origin + "/Login");
          }
          else {
            alert("wrong password")
              this.setState({ oldPassword: '', newPassword: '', confirmPassword: '' });
          }
        })
      }
      else {
        this.setState({ isConfirmPassword: true });
      }
    }
    else {
      this.setState({ isOldPassword: true, isNewPassword: true, isConfirmPassword: true });
    }
  }

  _handleOnOldPasswordFocus = () => {
    this.setState({ isOldPassword: false });
    // document.getElementById('oldpasswordError').style.color = 'red';
    // document.getElementById('oldpasswordError').innerHTML = 'wrong password';
  }
  render() {
    return (
      <div>
        <div class="row mt-3">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <h1 className="cssanimation sequence leFadeInLeft">Change Password</h1>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row profile-form mx-0 mb-4">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="login-from-bg">
              <div class="mb-4">
                Fields are mandatory <span className="text-danger">*</span>
              </div>
              <form>
                <div class="row mb-3">
                  <label id="OldPassword" class="col-sm-3 col-form-label">
                    Old Password
                  </label>
                  <div class="col-sm-9">
                    <input type="password" class="form-control"
                      id="oldPassword"
                      placeholder="Old Password"
                      onChange={(e) => this.setState({ oldPassword: e.target.value })}
                      value={this.state.oldPassword}
                      // onFocus={() => this._handleOnOldPasswordFocus()}
                       />
                    <div>
                      {this.state.isOldPassword ?(
                        <span id='lblpassword' className="text-danger">
                          old Password Mandatory
                          </span>):(
                        "")
                      }
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label id="Password" class="col-sm-3 col-form-label">
                    New Password
                  </label>
                  <div class="col-sm-9">
                    <input type="password" class="form-control"
                      id="NewPassword"
                      placeholder="New Password"
                      onChange={(e) => this.setState({ newPassword: e.target.value })}
                      value={this.state.newPassword}
                      onFocus={() => this.setState({ isNewPassword: false })} />
                    <div>
                      {this.state.isNewPassword ?(
                        <span id='lblpassword' className="text-danger">
                          New Password Mandatory</span>): ("")
                      }
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label id="ConformPassword" class="col-sm-3 col-form-label">
                    Conform Password
                  </label>
                  <div class="col-sm-9">
                    <input type="password" class="form-control"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                      onBlur={this.checkPassword}
                      value={this.state.confirmPassword}
                      onFocus={() => this.setState({ isConfirmPassword: false })} />
                    <div>
                      {this.state.isConfirmPassword ?(
                        <span id='lblcPassword' className="text-danger">
                          Confirm password Mandatory</span>
                          ) : (<span id='message'></span> )
                      }
                      {/* <span id="lblError" className="text-red"></span> */}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-success "
                    disabled={this.state.isPasswordMatch}
                    onClick={() => this.handleUpdate()}>
                    Update
                  </button>
                </div>
              </form>
              <Link to="/">Back to Home</Link>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    );
  }
}
export default ChangePassword;