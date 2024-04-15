import axios from "axios";
import $ from "jquery";
let Settings;
//if (process.env.NODE_ENV === "development") {
  Settings = require("./appsettings.json");
//}

var Apiurl = Settings.appsettings["Apiurl"];

export const AppSettings = Settings;

export const GetLoginDetails = async (_data, callback) => {
 ShowLoader();
    await axios
      .post(Apiurl + "Users/authenticate/", JSON.stringify(_data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        callback({ data: res.data, status: res.status });
       HideLoader();
            })
      .catch(function (error) {
        console.log(error);
        callback({ data: null, status: 400 });
        HideLoader();
      });
  };

  export const GetLocalStorageData=()=>{
    var localStorageData = localStorage.getItem('UserLoggedInData');
    if(localStorageData){
      const _data = JSON.parse(localStorage.getItem('UserLoggedInData'));
      return _data;
    }
    else{
      return null;
    }    
  }

  export const CheckUserNameExistOrNot = async (UserName, Email, callback) => {
    ShowLoader();
    await axios
      .get(Apiurl + "Users/userexists/" + UserName + "/" + Email)
      .then((res) => {
        callback({ data: res.data, status: res.status });
        HideLoader();
      })
      .catch(function (error) {
        console.log(error);
        ShowLoader();
      });
  };

  export const CreateUser = async (_data, callback) => {
    ShowLoader();
    await axios
      .post(Apiurl + "Users/", JSON.stringify(_data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        callback({ data: res.data, status: res.status });
        HideLoader();
      })
      .catch(function (error) {
        console.log(error);
        HideLoader();
      });
  };

//courses

 export const Getallcourses=async(callback)=>{
  ShowLoader();
  await
  axios.get(Apiurl+'Courses').then((res)=>{
    callback({data:res.data});
    HideLoader();
  }).catch((err)=>{
    console.log(err.message);
    HideLoader();
    return err;
  })

 }
 export const SubscribeCourse_to_User = async (
  subscribeDetails, callback) => {
  ShowLoader();
  await axios
    .post(
      Apiurl + `api/Payment/SubscribeCourseToUser`,JSON.stringify(subscribeDetails),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      callback({ data: res.data, status: res.status });
      HideLoader();
     
    })
    .catch(function (error) {
      console.log(error);
      HideLoader();
     
    });
};

 export const UnSubscribe_Course_To_User = async (id, userlist, callback) => {
  ShowLoader();
  await axios
    .post(
      Apiurl + "Courses/UnSubscribeCourseToUser?loggedInUserId=" + id,
      JSON.stringify(userlist),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      callback({ data: res.data, status: res.status });
      HideLoader();
    })
    .catch(function (error) {
      console.log(error);
      HideLoader();
    });
};
export const UpdateUser = async (id, _data, callback) => {
  ShowLoader();
  await axios
    .put(Apiurl + "Users/" + id, JSON.stringify(_data), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      callback({ data: res.data });
      HideLoader();
    })
    .catch(function (error) {
      console.log(error);
      HideLoader();
    });
};
export const GetUsersDetailsById = async (id, callback) => {
  ShowLoader();
  await axios
    .get(Apiurl + "Users/" + id)
    .then((res) => {
      callback({ data: res.data });
      HideLoader();
    })
    .catch(function (error) {
      return error;
      HideLoader();
    });
};
export const GetUserCourses = async (LoggedInUserId, callback) => {
  ShowLoader();
  await axios
    .get(Apiurl + "Courses/GetUserCourses/" + LoggedInUserId)
    .then((res) => {
      callback({ data: res.data, status: res.status });
      HideLoader();
    })
    .catch(function (error) {
      console.log(error);
      HideLoader();
    });
};
export const GetUserCourse = async (id,userId,isPreview, callback) => {
  ShowLoader();
  await axios.get(Apiurl + "Courses/"+id + "/" + userId + "/" + isPreview)
.then((res) => {
  callback({ data: res.data})
  HideLoader();
}).catch(function (error){
    return error;
    HideLoader();
});
};
export const InsertModuleContentResponse =async (data,isCourse,callback) =>{
  ShowLoader();
  var url ="";
  if(isCourse)
  url ="Responses/savemodulecontentresponse";
  else
  url = "Responses/case/saveresponse";
  await axios.post(Apiurl+url, data,{
    headers: {
      "Content-Type":"application/json",
    }
  })
  .then( (res) =>{
    callback({ data: res.data });
    HideLoader();
  })
  .catch(function (error) {
  })
}
export const GetModules =async (id,LoggedInUserId,isPreview,callback) =>{
  ShowLoader();
  return axios.get(Apiurl + "Courses/" + JSON.parse(id)+"/" + JSON.parse(LoggedInUserId) + "/" + JSON.parse(isPreview) + "/modulesresponses")
  .then((res) => {
    callback({ data: res.data, status : res.status})
    HideLoader();
  }).catch(function (error){
      return error;
  });
}
export const GetFacultyModules =async (id,LoggedInUserId,isPreview,isFaculty,callback) =>{
  ShowLoader();
  return axios.get(Apiurl + "Courses/" + JSON.parse(id)+"/" + JSON.parse(LoggedInUserId) + "/" + JSON.parse(isPreview) + "/" + JSON.parse(isFaculty) + "/modulesresponses")
  .then((res) => {
    callback({ data: res.data, status : res.status})
    HideLoader();
  }).catch(function (error){
      return error;
  });
}
export const SubmitQuestionAnswers = async (data,isCourse,IsSubChoice, NoAttempts, callback) => {
  ShowLoader();
  var url="";
  if(isCourse){
    url = "Responses/questionsubmit?Issubmssionchoice="+IsSubChoice+"&Noofattempts="+NoAttempts;
    await axios
    .post(Apiurl + url, data, IsSubChoice, NoAttempts, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      callback({ data: res.data });
      HideLoader();
    })
    .catch(function (error) {
      return error;
      HideLoader();
    });
  }
  else {
    url = "Responses/case/questionsubmit";
    await axios
      .post(Apiurl + url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        callback({ data: res.data });
      })
      .catch(function (error) {
        return error;
      });
  }

};
export const QuestionResponse =async (data,isCourse,callback) =>{
  ShowLoader();
  var url ="";
  if(isCourse)
  url = "Responses/questionresponse";
  else
  url = "Responses/case/questionresponse"
  await axios.post(Apiurl+url, data,{
    headers: {
      "Content-Type":"application/json",
    }
  })
  .then( (res) =>{
    callback({ data: res.data });
    HideLoader();
  })
  .catch(function (error) {
  })
}
export const ShowLoader = () => {
 document.getElementById("loader").hidden = false; 
}
export const HideLoader = () => {
  setTimeout(function(){document.getElementById("loader").hidden = true;},3000)    
}
export const showorhideLoader = () => {
  $(".loader-bg").toggleClass("loader-d-none");
};
// export const showorhideLoader = () => {

//   setTimeout(function() { 
//     document.getElementById("loader-bg-new").style.display = "none"
//   }, 5000);
// };
export const QuestionResponseReview =async (data,isCourse,callback) =>{
  ShowLoader();
  var url ="";
  if(isCourse)
  url = "Responses/questionreviewresponse";
  else
  url = "Responses/case/questionresponse"
  await axios.post(Apiurl+url, data,{
    headers: {
      "Content-Type":"application/json",
    }
  })
  .then( (res) =>{
    callback({ data: res.data });
    HideLoader();
  })
  .catch(function (error) {
  })
}
export const GetcoursedetailsById = async (id, callback) => {
  ShowLoader();
  await axios
    .get(Apiurl + "Courses/" + id)
    .then((res) => {
      callback({ data: res.data, status: res.status });
      HideLoader();
    })
    .catch(function (error) {
      console.log(error);      
    });
};

export const Changepassword = async (_data, callback) => {
  ShowLoader();
  await axios
    .post(Apiurl + "Users/changepassword/", JSON.stringify(_data), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      callback({ data: res.data, status: res.status });
      HideLoader();
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const ManagePaymentInformation = async (id,emailId, callback) => {
  await axios
    .post(
      Apiurl + `api/Payment/ManagePaymentDetails?UserId=${id}&EmailId=${emailId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      callback({ data: res.data, status: res.status });
     
    })
    .catch(function (error) {
      console.log(error);
     
    });
};
export const Add_Course_To_Cart = async ( userlist, callback) => {
    ShowLoader();
    await axios
      .post(
        Apiurl + "Courses/addtocart",
        JSON.stringify(userlist),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        callback({ data: res.data, status: res.status });
        HideLoader();
      })
      .catch(function (error) {
        console.log(error);
        HideLoader();
      });
  }; 

  export const Remove_Course_From_Cart = async ( CartId, callback) => {
      ShowLoader();
      await axios
        .post(
          Apiurl + `Courses/RemoveCourseFromCart?CartId=${CartId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          callback({ data: res.data, status: res.status });
          HideLoader();
         
        })
        .catch(function (error) {
          console.log(error);
          HideLoader();
        });
    };
    
  export const GetCartDetails = async (UserId, callback) => {
    ShowLoader();
    await axios
      .get(
        Apiurl + `Courses/GetCartDetails?UserId=${UserId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        callback({ data: res.data, status: res.status });
       HideLoader();
      })
      .catch(function (error) {
        console.log(error);
        HideLoader();
       
      });
  };
  export const forgotUserPassword = async (_data, callback) => {
    ShowLoader();
       await axios
         .post(Apiurl + "Users/forgotUserPassword/", JSON.stringify(_data), {
           headers: {
             "Content-Type": "application/json",
           },
         })
         .then((res) => {
           callback({ data: res.data, status: res.status });
          HideLoader();
               })
         .catch(function (error) {
           console.log(error);
           callback({ data: null, status: 400 });
           HideLoader();
         });
     };
     export const GetCourseSubscriptionPlans = async (CourseId, callback) => {
      ShowLoader();
      await axios
        .get(
          Apiurl + `Courses/GetCourseSubscriptionPlanDetails?CourseId=${CourseId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          callback({ data: res.data, status: res.status });
         HideLoader();
        })
        .catch(function (error) {
          console.log(error);
          HideLoader();
         
        });
    };
    export const GetExpiredCourses =async(UserId,callback)=>{
      await axios
      .get(
        Apiurl + `Courses/GetExpiredCourses?UserId=${UserId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        callback({ data: res.data, status: res.status });
       HideLoader();
      })
      .catch(function (error) {
        console.log(error);
        HideLoader();
       
      });
    }
