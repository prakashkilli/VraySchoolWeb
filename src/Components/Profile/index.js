import React, { Component } from "react";
import { GetUsersDetailsById ,UpdateUser} from "../../Services";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state= {
        userDetails: [],
        IsFirstNameEmpty: false,
        isLastNameEmpty: false,
        isRole: false,
        IsMedicalStudent: false,
        IsResident: false,
        IsDemographic:false,
        IsSubDemographic:false,
        demographics:"",
        AdminDisable:false,
        FacDisable:false,
        ReviewerDisable:false,
        LearnerDisable:false,
    }
  }
  componentDidMount = () => {
    let _userId = this.props.params.id;
    GetUsersDetailsById(_userId ,res => {
        const {data, error } = res;
        if(data)
        this.setState({userDetails: res.data});
    })
  };
  _handleOnInputFocus = (Input) => {
    switch(Input) {
        case "FirstName":
            this.hideErrorMessage();
            break;
        case "LastName":
            this.hideErrorMessage();
            break;
    }
}
_handleOnInputChange = (e,InputName) => {
    try {
        var _tempData = this.state.userDetails;
            _tempData.Role=4;
        switch(InputName) {
            case "FirstName":
                _tempData.firstName = e.target.value;
                if(e.target.value == "")
                 this.setState({IsFirstNameEmpty: true});
                 else
                 this.setState({IsFirstNameEmpty: false});
                break;
            case "LastName":
                _tempData.lastName = e.target.value;
                if(e.target.value == "")
                 this.setState({isLastNameEmpty: true});
                 else
                 this.setState({isLastNameEmpty: false});
                break;
        }
        this.setState({userDetails: _tempData});
    }
    catch(e) {
        console.error(e);        
      toast.error("Something went wrong");
    }
}
showErrorMessage = (text) => {
    document.getElementById('lblError').style.color = 'red';
    document.getElementById('lblError').innerHTML = text;
}
hideErrorMessage = () => {
    document.getElementById('lblError').style.color = 'red';
    document.getElementById('lblError').innerHTML = '';
}

handleSubmit = (e) => {
    var _tempData = this.state.userDetails;
    const {IsFirstNameEmpty,isLastNameEmpty,isRole,demographics} = this.state;
    try {
        if(!IsFirstNameEmpty || !isLastNameEmpty) {
            if(!IsFirstNameEmpty) {
                if(!isLastNameEmpty) {
                        if(!isRole) { 
                            const _data = {
                                id: _tempData.id,
                                firstName: _tempData.firstName,
                                lastName: _tempData.lastName,
                                 userName: _tempData.userName,
                                password: _tempData.password,
                                primaryEmail: _tempData.primaryEmail,
                                alternateEmail: [],
                                demographics: demographics,
                                role: parseInt(_tempData.role),
                            }
                            UpdateUser(_tempData.id,_data ,res => {
                                const {data, error } = res;
                                if(data){
                                    alert("data updated successfully");
                                }
                            })
                            }
                        else {
                         // this.setState({isRole:true})
                           // this.showErrorMessage("Role field required");
                        }
                    }
                else {
                    this.setState({isLastNameEmpty:true})
                }
            }
            else {
               // this.showErrorMessage("FirstName field required");
               this.setState({IsFirstNameEmpty:true})
            }
        }
    }
    catch(e) {
      toast.error("Something went wrong");

    }
}
  render() {
    const {userDetails} = this.state;
    if(userDetails.length != 0) {
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
                <div>
                  <div class="row mt-3">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                      <h1 className="cssanimation sequence leFadeInLeft">Profile</h1>
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
                            <label for="firstname" class="col-sm-3 col-form-label">
                              First Name
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                placeholder={userDetails.firstName}
                               // value={userDetails.firstName}
                                onChange={(e) =>
                                  this._handleOnInputChange(e, "FirstName")
                                }
                                onFocus={() => this._handleOnInputFocus("FirstName")}
                              />
                            </div>
                            <div className="tbl-cell align-middle">
                        {this.state.IsFirstNameEmpty ? (
                          <span id="lblfName" className="text-danger">
                            Firstname Mandatory
                          </span>
                        ) : (
                          ""
                        )}</div>
                          </div>
                          <div class="row mb-3">
                            <label for="lastname" class="col-sm-3 col-form-label">
                              Last Name
                            </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" 
                                placeholder={userDetails.lastName}
                                // value={userDetails.lastName}
                                 onChange={(e) => this._handleOnInputChange(e,"LastName")}
                                 onFocus={() => this._handleOnInputFocus("LastName")}
                                 />
                            </div>
                            <div className="tbl-cell align-middle">
                        {this.state.isLastNameEmpty ? (
                          <span id="lblfName" className="text-danger">
                            Lastname Mandatory
                          </span>
                        ) : (
                          ""
                        )}</div>
                          </div>
                          <div class="row mb-3">
                            <label for="usrlane" class="col-sm-3 col-form-label">
                              User Name
                            </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" value={userDetails.userName}
                           disabled/>
                            </div>
                          </div>
                          <div class="row mb-3">
                            <label for="inputEmail" class="col-sm-3 col-form-label">
                              Email
                            </label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control"  value={userDetails.primaryEmail}
                           disabled/>
                            </div>
                          </div>
      
                          <a
                            type="submit"
                            className="tm-btn-2 mt-4 mb-3 w-100 text-center"
                            onClick={() => this.handleSubmit()}
                          >
                            Update
                          </a>
                        </form>
                        <Link to="/">Back to Home</Link>
                      </div>
                    </div>
                    <div className="col-lg-2"></div>
                  </div>
                </div>;
            </div>
          );
    }
    
  }
}
export default withParams(Profile);
