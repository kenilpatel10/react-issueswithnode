import axios from "axios";
import React, { useState, useEffect } from "react";
import Registration from "./Registration";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dropdown } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert  from "./Alert1";
import { BoxArrowInDownLeft } from "react-bootstrap-icons";



function Login(props) {
  let history = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [entry, setEntry] = useState([]);
  const [error, seterror] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8000/register`).then((res) => {
      console.log(res.data);
      setEntry(res.data);
    });
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();
    // const { email, password} = userLogin;
    if (userLogin.email === "" || userLogin.password === "") {
          seterror("please fill all fields");
        
        } else {
          entry.map((i, k) => {
            if(userLogin.email === i.email && userLogin.password ===i.password ){
              console.log("in login logic");
              if (i.isUser === "true") {
             console.log("true")
                localStorage.setItem("id" , i._id );
                localStorage.setItem("username" , i.username );
                history(`/home/${i._id}`);
      
              }
              else{
                console.log("false") 
                localStorage.setItem("username", i.username)
                  history(`/admin`)
              } 
              
            }
            else {
                seterror("unsuccess ");
                console.log("unsuccess");
              }
            
            
          });
        }
  
  //   if(email && password){
  //     axios.post("http://localhost:8000/login", userLogin)
  //     .then(res =>{ 
      
  //       console.log(res.data)
      
        
      
  //     })
  //     localStorage.setItem("id" , userLogin._id );
  //       localStorage.setItem("username" , userLogin.username );
  //     history(`/home`);
      
           
  //  } 

  }
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   if (userLogin.email === "" || userLogin.password === "") {
  //     seterror("please fill all fields");
    
  //   } else {
  //     entry.map((i, k) => {
  //       if (userLogin.email === i.email && userLogin.password === i.password && i.isUser === "true") {
         
  //         localStorage.setItem("id" , i.id );
  //         localStorage.setItem("username" , i.username );
  //         history(`/home`);

  //       }else if(userLogin.email === i.email && userLogin.password === i.password && i.isUser === "false"){
  //         localStorage.setItem("username", i.username)
  //           history(`/admin`)
  //       } else {
  //         seterror("unsuccess ");
  //         console.log("unsuccess");
  //       }
  //     });
  //   }
  // };

  return (
    <div className='back1'>
      
      <div
        id="loginModal"
        className="modal show col mt-5"
        role="dialog"
        aria-hidden="true"

        
      >
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header text-center">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              ></button>
             

              <div className="container">
              <img
                className=" img-circle "
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
              />
                <form
                  className="form col-md-12 center-block"
                  onSubmit={handleLogin}
                >
                  <p>{error}</p>
                  <div className="form-group">
                  
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={userLogin.email}
                        placeholder="email"
                      onChange={(e) => {
                        setUserLogin({ ...userLogin, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control input"
                      name="password"
                      value={userLogin.password}
                      placeholder="password"
                      onChange={(e) => {
                        setUserLogin({
                          ...userLogin,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-lg btn-block ">Log In
                  
                    </button>
                    <span className="pull-right ">
                      <hr />
                      <Link className="Nav mt-4" to="/">
                        {" "}
                        New User?? Register
                      </Link>
                    </span>
                    <span>{/* <a href="#">Need help?</a> */}</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
