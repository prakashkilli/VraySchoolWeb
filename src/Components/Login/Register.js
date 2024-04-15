import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CheckUserNameExistOrNot, CreateUser } from "../../Services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      cPassword: "",
      demographics: "",
      emailerror: "",
      Role: 4,
      isFirstName: false,
      isFirstNameFormat: false,
      isLastName: false,
      isLastNameFormat: false,
      isUserName: false,
      isEmail: false,
      isPassword: false,
      isPasswordLength: false,
      isConfirmPassword: false,
      isUserNameExist: false,
      isEmailExist: false,
      isEmailFormat: false,
      isPasswordMatch: false,
      isRole: false,
      IsMedicalStudent: false,
      IsResident: false,
      IsDemographic: false,
      IsSubDemographic: false,
    };
  }
  _handleOnBackClick = () => {
    window.location.replace(window.location.origin + "/");
  };
  checkPassword = () => {
    if (this.state.password != "" && this.state.cPassword != "") {
      if (
        document.getElementById("password").value ==
        document.getElementById("confirmPassword").value
      ) {
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerHTML = "matching";
      } else if (
        document.getElementById("confirmPassword").value != "" &&
        document.getElementById("password").value !=
          document.getElementById("confirmPassword").value
      ) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "not matching";
      }
    }
  };

  ConfirmPwdKeyUP = () => {
    document.getElementById("message").innerHTML = "";
  };

  handleChange = (e, Propname) => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
    if (Propname == "Email") {
      this.setState({ email: e.target.value });
    } else if (Propname == "username") {
      this.setState({ userName: e.target.value });
    }
  };
  validatefirstname = () => {
    //validation for only allows alphabets in firstname

    const firstName = this.state.firstName;
    const firstn = /^[A-Za-z]+$/;
    const isvalid = firstn.test(firstName);
    if (isvalid) {
      document.getElementById("validatefName").style.color = "green";
      document.getElementById("validatefName").innerHTML = "";
      this.setState({ firstNameerror: "" });
    } else {
      if (firstName) {
        document.getElementById("validatefName").style.color = "red";
        document.getElementById("validatefName").innerHTML = "alphbets only";
        this.setState({ firstNameerror: "error" });
      } else {
        this.setState({
          isFirstName: true,
        });
      }
    }
  };
  validatelastname = () => {
    //validation for only allows alphabets in lastname

    const lastName = this.state.lastName;
    const lastn = /^[A-Za-z]+$/;
    const isvalid = lastn.test(lastName);
    if (isvalid) {
      document.getElementById("validatelastName").style.color = "green";
      document.getElementById("validatelastName").innerHTML = "";
      this.setState({ lastNameerror: "" });
    } else {
      if (lastName) {
        document.getElementById("validatelastName").style.color = "red";
        document.getElementById("validatelastName").innerHTML = "alphbets only";
        this.setState({ lastNameerror: "error" });
      } else {
        this.setState({
          isLastName: true,
        });
      }
    }
  };
  Validemail = () => {
    const email = this.state.email;
    const emailregex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isvalid = emailregex.test(email);
    if (isvalid) {
      document.getElementById("validateemail").style.color = "green";
      document.getElementById("validateemail").innerHTML = "valid email";
      this.setState({ emailerror: "" });
    } else {
      document.getElementById("validateemail").style.color = "red";
      document.getElementById("validateemail").innerHTML = "invalid email";
      this.setState({ emailerror: "error" });
    }
  };
  validatepassword = () => {
    const password = this.state.password;
    const validpassword = /.{8,}/;
    const isvalid = validpassword.test(password);
    if (isvalid) {
      //validation for password length
      document.getElementById("validatepassword").style.color = "green";
      document.getElementById("validatepassword").innerHTML = "";
      this.setState({ passworderror: "" });
      const upperCasepassword = /(?=.*?[A-Z])/;
      const upperCase = upperCasepassword.test(password);
      if (!upperCase) {
        //validation for minimum one Uppercase charector
        document.getElementById("validatepassword").style.color = "RED";
        document.getElementById("validatepassword").innerHTML =
          "At least one Uppercase";
        this.setState({ passworderror: "error" });
      }
      const lowerCasepassword = /(?=.*?[a-z])/;
      const lowerCase = lowerCasepassword.test(password);
      if (!lowerCase) {
        //validation for minimum one lowercase charector
        document.getElementById("validatepassword").style.color = "RED";
        document.getElementById("validatepassword").innerHTML =
          "At least one lowercase";
        this.setState({ passworderror: "error" });
      }
      const specialCharector = /(?=.*?[#?!@$%^&*-])/;
      const special = specialCharector.test(password);
      if (!special) {
        // validation for minimum one special charector
        document.getElementById("validatepassword").style.color = "RED";
        document.getElementById("validatepassword").innerHTML =
          "At least one Special Charector";
        this.setState({ passworderror: "error" });
      }
    } else {
      document.getElementById("validatepassword").style.color = "red";
      document.getElementById("validatepassword").innerHTML =
        "Minimum 8 charectors";
      this.setState({ passworderror: "error" });
    }
  };

  handleDropdownChange = (value) => {
    this.setState({
      demographics: value,
      IsMedicalStudent: false,
      IsResident: false,
      IsDemographic: false,
      IsSubDemographic: false,
    });
    if (value == "MedicalStudent") {
      this.setState({ demographics: "", IsMedicalStudent: true });
    } else if (value == "Resident") {
      this.setState({ demographics: "", IsResident: true });
    }
  };

  _handleOnSubdemoCheck = (e) => {
    this.setState({ demographics: e.target.value, IsSubDemographic: false });
  };
  handleSubmit = () => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      cPassword,
      demographics,
      Role,
      emailerror,
      firstNameerror,
      lastNameerror,
      passworderror,
      IsSubDemographic,
    } = this.state;
    if (!firstName) {
      this.setState({ isFirstName: true });
    }
    if (firstNameerror == "") {
      this.setState({ isFirstNameFormat: true });
    }
    if (!lastName) {
      this.setState({ isLastName: true });
    }
    if (lastNameerror == "") {
      this.setState({ isLastNameFormat: true });
    }
    if (!userName) {
      this.setState({ isUserName: true });
    }
    if (!email) {
      this.setState({ isEmail: true });
    }
    if (emailerror == "") {
      this.setState({ isEmailFormat: true });
    }
    if (!password) {
      this.setState({ isPassword: true });
    }
    if (passworderror == "") {
      this.setState({ isisPasswordLengthpa: true });
    }
    if (!cPassword) {
      this.setState({ isConfirmPassword: true });
    }
    if (!password === cPassword) {
      this.setState({ isPasswordMatch: true });
    }
    if (!demographics) {
      this.setState({ IsDemographic: true });
    }
    if (
      Role &&
      firstName &&
      lastName &&
      userName &&
      email &&
      password === cPassword &&
      demographics &&
      lastNameerror == "" &&
      firstNameerror == "" &&
      emailerror == "" &&
      passworderror == ""
    ) {
      CheckUserNameExistOrNot(userName, email, (res) => {
        const { data, error } = res;
        if (data == "user not exists") {
          const _data = {
            id: 0,
            firstName: firstName,
            lastName: lastName,
            primaryEmail: email,
            alternateEmail: [],
            userName: userName,
            password: password,
            Role: Role,
            demographics: demographics,
          };
          CreateUser(_data, (res) => {
            const { data, error } = res;
            if (data) {
              alert("data saved sucessfully");
              // localStorage.setItem("UserLoggedInData", JSON.stringify(data));
              window.location.replace(window.location.origin + "/");
            } else {
              alert("data not saved");
              window.location.replace(window.location.origin + "/");
            }
          });
        } else {
          var returndata = res.data;
          var splitdata = returndata.split(";");
          if (splitdata[0] == userName) {
            this.setState({ isUserNameExist: true, userName: "" });
          }
          if (splitdata[1] == email) {
            this.setState({ isEmailExist: true, email: "" });
            toast.error("Email Already Existed");
          }
        }
      });
    } else {
      this.setState({ isRole: true });
    }
  };
  render() {
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
        {/* <div class="loader-bg-new">
          <div class="loader-parent">
            <span class="loader-new"></span>
          </div>
        </div> */}
        <div className="row login-from mx-0">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="text-center">
              <h3>Register</h3>
            </div>
            <div className="login-from-bg">
              <div class="mb-4">
                Fields are mandatory <span className="text-danger">*</span>
              </div>
              <form>
                <div class="row mb-3">
                  <label for="firstname" class="col-sm-3 col-form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="firstname"
                      value={this.state.firstName}
                      onChange={(e) =>
                        this.setState({ firstName: e.target.value })
                      }
                      onFocus={(e) => this.setState({ isFirstName: false })}
                      onBlur={this.validatefirstname}
                    />
                    <div className="tbl-cell align-middle">
                      {this.state.isFirstName ? (
                        <span id="lblfName" className="text-danger">
                          firstname is mandatory
                        </span>
                      ) : (
                        <span id="validatefName"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="lastname" class="col-sm-3 col-form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="lastname"
                      value={this.state.lastName}
                      onChange={(e) => {
                        this.setState({ lastName: e.target.value });
                      }}
                      onFocus={() => {
                        this.setState({ isLastName: false });
                      }}
                      onBlur={this.validatelastname}
                    />
                    <div className="tbl-cell align-middle">
                      {this.state.isLastName ? (
                        <span className="text-danger">last name mandatory</span>
                      ) : (
                        <span id="validatelastName"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputEmail" class="col-sm-3 col-form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      onChange={(e) => {
                        this.handleChange(e, "Email");
                      }}
                      onFocus={() => {
                        this.setState({
                          isEmail: false,
                          isEmailExist: false,
                          isEmailFormat: false,
                        });
                      }}
                      onKeyUp={this.Validemail}
                      value={this.state.email}
                    />
                    <small
                      id="emailHelp"
                      className="form-text text-muted position-absolute mt-0"
                    >
                      We'll never share your email with anyone else.
                    </small>
                    <br />
                    <div>
                      {this.state.isEmail ? (
                        <span id="validateemail" className="text-danger">
                          email is mandatory
                        </span>
                      ) : this.isEmailExist ? (
                        <span id="emailExist" className="text-danger">
                          email already existing
                        </span>
                      ) : (
                        <span id="validateemail"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="username" class="col-sm-3 col-form-label">
                    User Name <span className="text-danger">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      value={this.state.userName}
                      onChange={(e) => this.handleChange(e, "username")}
                      onFocus={() => {
                        this.setState({
                          isUserName: false,
                          isUserNameExist: false,
                        });
                      }}
                    />
                    <div>
                      {this.state.isUserName ? (
                        <span id="lblUserName" className="text-danger">
                          userName is mandatory
                        </span>
                      ) : this.state.isUserNameExist ? (
                        <span id="lblUserNameExist" className="text-danger">
                          username already existing
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      value={this.state.password}
                      onChange={(e) => {
                        this.setState({
                          password: e.target.value.replace(
                            "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/"
                          ),
                        });
                      }}
                      onFocus={() => {
                        this.setState({
                          isPassword: false,
                          isPasswordMatch: false,
                        });
                      }}
                      onBlur={this.checkPassword}
                      onKeyUp={this.validatepassword}
                    />
                    <div>
                      {this.state.isPassword ? (
                        <span id="lblpassword" className="text-danger">
                          password is mandatory
                        </span>
                      ) : this.state.isPasswordMatch ? (
                        <span className="text-danger">
                          please enter exact password
                        </span>
                      ) : (
                        <span id="validatepassword"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="conformpassword" class="col-sm-3 col-form-label">
                    Conform Password <span className="text-danger">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      class="form-control"
                      id="confirmPassword"
                      value={this.state.cPassword}
                      onChange={(e) => {
                        this.setState({ cPassword: e.target.value });
                      }}
                      onFocus={() => {
                        this.setState({ isConfirmPassword: false });
                      }}
                      onBlur={this.checkPassword}
                    />
                    <div>
                      {this.state.isConfirmPassword ? (
                        <span id="lblConfirmPassword" className="text-danger">
                          Confirm Password mandatory
                        </span>
                      ) : (
                        <span id="message"></span>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <label
                    class="visually-hidden col-sm-3 col-form-label"
                    for="autoSizingSelect"
                  >
                    Demographics
                  </label>
                  <div class="col-sm-9">
                    <select
                      class="form-select form-control"
                      id="autoSizingSelect"
                      value={this.state.demographics}
                      onChange={(event) =>
                        this.handleDropdownChange(event.target.value)
                      }
                    >
                      <option value="" selected disabled>
                        select
                      </option>
                      <option value="MedicalStudent">Medical Student</option>
                      <option value="Resident">Resident</option>
                      <option value="Fellow">Fellow</option>
                      <option value="Physician">Physician</option>
                      <option value="Radiologist">Radiologist</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                
                  {this.state.IsMedicalStudent ? (
                    <div className="row">
                      <label className="col-sm-3 col-form-label">Sub Demographics</label>                      
                      <div className="col-sm-9 align-items-center d-flex">
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              style={{
                                display: window.document.URL.match("Register")
                                  ? "block"
                                  : "none",
                              }}
                              checked={this.state.demographics == "MS - I"}
                              type="radio"
                              id="msI"
                              className="form-check-input"
                              value="MS - I"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i>MS- I
                          </label>
                        </div>
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              type="radio"
                              id="msII"
                              checked={this.state.demographics == "MS - II"}
                              className="form-check-input"
                              value="MS - II"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i>MS - II
                          </label>
                        </div>
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              type="radio"
                              id="msIII"
                              checked={this.state.demographics == "MS - III"}
                              className="form-check-input"
                              value="MS - III"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i> MS - III
                          </label>
                        </div>
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              type="radio"
                              id="msIV"
                              checked={this.state.demographics == "MS - IV"}
                              className="form-check-input"
                              value="MS - IV"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i> MS - IV
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-9 align-items-center d-flex">
                        {this.state.IsSubDemographic ? (
                          <span id="lblfName" className="text-danger">
                            Sub Demographic Mandatory
                          </span>
                        ) : (
                            ""
                          )}
                      </div>
                    </div>
                  ) : null}
                  {this.state.IsResident ? (
                    <div className="row">                      
                      <label className="col-sm-3 col-form-label">Sub Demographics</label>                      
                      <div className="col-sm-9 align-items-center d-flex">
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              style={{
                                display: window.document.URL.match("Register")
                                  ? "block"
                                  : "none",
                              }}
                              checked={this.state.demographics == "PGY - I"}
                              type="radio"
                              id="pgyI"
                              className="form-check-input"
                              value="PGY - I"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i>PGY-I
                          </label>
                        </div>
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              type="radio"
                              id="pgyII"
                              checked={this.state.demographics == "PGY - II"}
                              className="form-check-input"
                              value="PGY - II"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i>PGY-II
                          </label>
                        </div>
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              type="radio"
                              id="pgyIII"
                              checked={this.state.demographics == "PGY - III"}
                              className="form-check-input"
                              value="PGY - III"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i> PGY - III
                          </label>
                        </div>
                        <div className="form-check d-inline-block mr-5 mb-0">
                          <label className="form-check-label mb-0">
                            <input
                              type="radio"
                              id="pgyIV"
                              checked={this.state.demographics == "PGY - IV"}
                              className="form-check-input"
                              value="PGY - IV"
                              onChange={(e) => this._handleOnSubdemoCheck(e)}
                            />
                            <i className="input-helper"></i> PGY - IV
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-9 align-items-center d-flex">
                        {this.state.IsSubDemographic ? (
                          <span id="lblfName" className="text-danger">
                            Sub Demographic Mandatory
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : null}
                
                <div className="row mb-3">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-9">
                    <a
                      type="submit"
                      className="tm-btn-2 mt-4 mb-3 w-100 text-center"
                      onClick={() => this.handleSubmit()}
                    >
                      Register
                </a>
                  </div>
                </div>
              </form>
              <Link className="link" to="/">Back to Login</Link>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    );
  }
}
