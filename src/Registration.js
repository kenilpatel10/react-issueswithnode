import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function Registration() {
  let history = useNavigate();
  const [userRegistration, setUserRegistration] = useState({
    // id: new Date().getTime().toString(),
    isUser:"",
    username: "",
    email: "",
    phone: null,
    password: "",
  });

  // const[error, seterror] = useState('');
  // const [data1, setdata1] = useState([]);
  
  
  // useEffect(() => {
  // axios.get(`http://localhost:8000/user`)
  //    .then((res) => {
  //        console.log("Resp ====>",res.data);
  //        setdata1(res.data)
  //    })
  // }, []);
  

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if( userRegistration.username=== ""  || userRegistration.email=== ""||userRegistration.phone=== ""||userRegistration.password=== ""){
        alert("Please Fill All Info...........")
    } 
    else{

        axios.post("http://localhost:8000/register", userRegistration);
        localStorage.setItem("id" === userRegistration.id)
        localStorage.setItem("username" === userRegistration.username)
        history("/login");

      }
    

        
           

  };


  // if (!email || !password ||  !username) {
  //   setErrors("Please add all data ");
  // } else if (states.password !== states.re_password) {
  //   setErrors("Please check New password .....");
  // } else {
  //   datas?.map((ele) => {
  //     if (ele.email === states.email) {
  //       setErrors("Please email alreadty .....");
  //     } else {
  //       setErrors("");
  //       history("/");
  //       dispatch(Signupdata(states));
  //     }
  //   });
  // }
  return (
    <div className="back1">
    <div className="container ">
      <div
        id="loginModal"
        className="modal show col mt-5"
        role="dialog"
        aria-hidden="true"
                  >
        <div className="modal-dialog container ">
          <div className="modal-content">
            <div className="modal-header text-center">
              {/* <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button> */}
              {/* <h2 className="text-center"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="img-circle"><br>Login</h2> */}
            
            <div className="modal-body container">
            <img
                className=" img-circle "
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
              />
             <hr/>
             {/* <p>{error}</p> */}
              <form
                className="form col-md-12 center-block"
                onSubmit={handleSignUp}
              >
                <div className="form-group">

                <select
                     className="form-control "
                      aria-label="Disabled select example"
                      name="isUser"
                      value={userRegistration.isUser}
                      onChange={handleInput}
                    >
                      <option >Select Role</option>
                      <option value={"true" || ""}>User</option>
                      <option value={"false" || ""}>Admin</option>
                      {/* <option value="3">Three</option> */}
                    </select>
                    </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input"
                    name="username"
                    value={userRegistration.username}
                    placeholder=" Enter FirstName"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control input"
                    name="email"
                    value={userRegistration.email}
                    placeholder="email"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control input"
                    name="phone"
                    value={userRegistration.phone ||""}
                    placeholder="phone"
                    onChange={handleInput}
                  ></input>{" "}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control input"
                    name="password"
                    value={userRegistration.password || ""}
                    placeholder="Password"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-lg btn-block">
                    Register
                  </button>

                  {/* <alert color='primary'  >
                        I got it you are in hurry! But every Field is important!
                        
                </alert> */}
                  <hr />

                  <Link className="Nav" to="/login">
                    Already have Account?? LogIn
                  </Link>
                  {/* <span className="pull-right"><a href="#">Register</a></span><span><a href="#">Need help?</a></span> */}
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Registration;
