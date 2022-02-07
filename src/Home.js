import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  OverlayTrigger,
  Row,
  Popover,
  Card,
  Form,
  Table,
  Button,
  Dropdown,
  ButtonGroup,
  Badge,
  Accordion,
} from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import Modal from "react-bootstrap/Modal";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import '../node_modules/font-awesome/css/font-awesome.min.css'  ;

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
// import { useState } from "react";

function Home(props) {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  var today = new Date(),
    time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let history = useNavigate();




  // const [selectedImage, setSelectedImage] = useState( );
  const [input, setInput] = useState({
    userId: localStorage.getItem("id"),
    userName: localStorage.getItem("username"),
    media:"",
    title: "",
    describe: "",
    status: "",
    time: time,
  });

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  // const [data1, setData1] = useState([]);
  const [error, seterror] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8000/data`).then((res) => {
      console.log("getdata",res.data);
      setData(res.data);
    });
  }, []); 




  

  const sorting = (col) => {
    if (order === "asc") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      setData(sorted);
      setOrder("dsc");
    } else if (order === "dsc") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );

      setData(sorted);
      setOrder("asc");
    }
  };
  // const [filterdata, setFilterdata] = useState(data);
  const filterResult = (sat) => {
    const result = data.filter((i) => {
      return i.status === sat;

      //  else{
      //   return setData(data)
      //  }
    });

    setData(result);
  };
 
  const imageChange=(e)=>{
    console.log("okkkkkk");
    if(e.target.files && e.target.files.length > 0){
      console.log(e.target.files[0].name);
        setInput({...input,media: e.target.files[0].name});
      
    }
  }

  const [search, setSearch] = useState("");

  // const [ago, setAgo] = useState(time);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 


  const handleChange = (e, editor) => {
    const data = editor.getData();
    setInput({ ...input, describe: data });
    console.log("data   ",   setInput({ ...input, describe: data }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (input.title === "" || input.describe === "") {
   
  //     alert("please Fill All Details....")
  //   } else {
  //     axios.post(`http://localhost:8000/info`, input);
  //     axios.get(`http://localhost:8000/info`).then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     });
  //     setShow(false);
  //     setAgo(ago);

  //     setInput({
  //       userId: localStorage.getItem("id"),
  //       // isUser:"",
  //       userName: localStorage.getItem("username"),
  //       title: "",
  //       describe: "",
  //       status: "",
  //     });
  //   }
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data ==> ",input)    
  
    if( input){
      console.log(input);
      axios.post("http://localhost:8000/data", input)
      axios.get(`http://localhost:8000/data`).then(res => 
      {
            console.log(res.data);
               setData(res.data);
         });
   } 
   else{
     console.log("data not inserted");
   }
   setShow(false);  
  }
  const onReload = () => {
    window.location.reload();
  };
 const onLogOut = () => {
   localStorage.clear();
   history('/login')
 }
  let valOne = localStorage.getItem("id");
  var val = data.filter((i) => i.userId === valOne)
  
  return (
    <div className="back">
      <Row className="container-fluid">
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "25px" }}>
              <alert>{alert}</alert>
              Post Your Isuue
            </Modal.Title>
          </Modal.Header>
          <p
            style={{
              color: "red",
              marginLeft: "150px",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            {error}
          </p>

          <Form onSubmit = {(e) => handleSubmit(e)}>
            <Form.Group
              style={{ margin: "15px" }}
              className="mb-3  "
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label style={{ fontSize: "17px" }}>Issue Title</Form.Label>
              <Form.Control
                type="text"
                value={input.title}
                placeholder=" Issue Title............"
                onChange={(e) => {
                  setInput({ ...input, title: e.target.value });
                }}
              />
            </Form.Group>

            <div className="App">
              <div
                style={{
                  width: "470px",
                  display: "inline-block",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "470px",
                    display: "inline-block",
                    textAlign: "right",
                    marginBottom: "left",
                  }}
                ></div>
                <label>Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={input.describe}
                  onChange={handleChange}
                />
              </div>


              <label className="form-label"></label>
                               <input  style={{margin:"12px"}}accept=".doc|audio/*,video/*,image/*" onChange={imageChange}  type="file"  />

            </div>

          

            <Form.Group  style={{fontSize:"11px"}}className="form-check-inline">
              <h4>&nbsp; &nbsp; Choose Status Of Your Issue</h4>&nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;
              <Form.Check
                style={{ color: "red" }}
                className="form-check-inline"
                type="radio"
                value="notsolved"
                label="Not Solved"
                name="solution"
                onChange={(e) => {
                  setInput({ ...input, status: e.target.value });
                }}
              />
              <Form.Check
                style={{ color: "orange" }}
                className="form-check-inline"
                type="radio"
                value="inreview"
                name="solution"
                label="In Review"
                onChange={(e) => {
                  setInput({ ...input, status: e.target.value });
                }}
              />
              <Form.Check
                style={{ color: "green" }}
                className="form-check-inline"
                type="radio"
                value="solved"
                name="solution"
                label="Solved"
                onChange={(e) => {
                  setInput({ ...input, status: e.target.value });
                }}
              />
            </Form.Group>

            <Button
              style={{
                padding: "7px",
                fontSize: "small",
                marginLeft: "120px",
                marginBottom: "10px",
              }}
              className="text-right"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              style={{
                padding: "7px",
                fontSize: "small",
                marginLeft: "20px",
                marginBottom: "10px",
              }}
              type="submit"
              // onClick={handleSubmit}
              variant="primary"
            >
              {" "}
              Add
            </Button>
          </Form>
        </Modal>
        <div
          className="col-sm-10"
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "-20px",
            width: "1100px",
          }}
        >
          <div className=" rounded " style={{ margin: "12px" }}>
            <p className=" date text  "> {dateBuilder(new Date())}</p>

            <Row>
              {val ? val.filter((e) => {
        if(search === ''){
            return e;
        }else if(e.title.toLowerCase().includes(search.toLowerCase())){
            return e; 
        }
      })
    .map((i) => {
                    // const imgurl =URL.createObjectURL(i.image) ;
                    console.log("return", data)
                  return (
                    <div class="col-3">
                      <Card   className="p-3 mb-5 bg-white" style={{borderRadius:"30px 0px 30px 0px ", opacity:"0.9  "}} key={i.title}>
                        
                        <Card.Body>
                          <p
                            style={{
                              marginRight: "20px",
                              paddingBottom: "0px",
                              color: "gray",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {i.userName} posted an issue at {i.time}  
                          </p>

                          <Card.Title> {i.title} </Card.Title>
                          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Read Full Description
                              </Accordion.Header>
                              <Accordion.Body>
                             
                                <Card.Text
                                className="cardtext"
                                  style={{
                                    maxHeight: "200px",
                                   
                                  }}
                                >
                                        {/* {i.media.substring(i.media.length-4,i.media.length) === "jpeg" ||  i.media.substring(i.media.length-3,i.media.length) === "jpg" || i.media.substring(i.media.length-3,i.media.length) === "png" ?
                          <img style={{width:"200px",height:"100px"}} src= {require(`./assets/${i.media}`)} alt='thump'/>
                                       :
                               <iframe  style={{width:"200px",height:"100px"}} src={(`./assets/${i.media}`)} title="hello"></iframe>
                               }
                   */}
                                              
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: i.describe,
                                    }}
                                  />
                                </Card.Text>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                          <Card.Text style={{ margin: "10px" }}>
                            {" "}
                            {i.status === "solved" ? (
                              <Badge bg="success "> {i.status} </Badge>
                            ) : null}
                            {i.status === "notsolved" ? (
                              <Badge bg="danger "> {i.status} </Badge>
                            ) : null}
                            {i.status === "inreview" ? (
                              <Badge bg="warning "> {i.status} </Badge>
                            ) : null}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                }): null}

                
            </Row>
          </div>
        </div>

        <div
          className="col-sm-2  fixedContainer"
          style={{
            // backgroundColor: "white",
            borderRadius:"50px 0px 0px 50px",
            background: "rgba(2, 3, 0, 0.4)",
            // opacity: "0.7",
            paddingRight: "20px",
            paddingLeft: "-20px",
            // height: "800px",s  
            marginTop:"40px "
          }}
        >
          <text
            style={{
              fontSize: "30px",
              color: "white",

              // backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
            
          >
            <img
              className=" img-circle1 "
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt=""
              style={{ margin: "10px" }}
            />
            &nbsp;
            {localStorage.getItem("username")}
          </text>
          <Button
            style={{
              marginTop: "20px",
              margin: " 10px",
              padding: "20px",
              fontSize: "large",
              opacity: "",
            }}
            variant="primary"
            onClick={handleShow}
          >
            ADD YOUR ISSUE
          </Button>
          <Button
            style={{
              padding: "20px",
              fontSize: "large",
              margin: "20px",
              marginTop: "10px",
            }}
            variant="danger"
            onClick={() => onLogOut()}
          >
            {/* <Link
              style={{
                textDecoration: "none",
                color: "white",
                padding: "20px",
                margin: "10px",
              }}
              to="/login"
            > */}
              Logout
            {/* </Link> */}
          </Button>
          <div>
            <Form.Group
              className="form-check-inline"
              style={{
                borderRadius:"20px",
                backgroundColor: "white",
                opacity: "0.8",
                marginTop: "0px",
                marginLeft: "15px",
                padding: "10px",
              }}
            >
              <div className="form-outline  ">
              <h4 style={{padding:"5px"}}>Filter By</h4>
                <input 
                
                style={{borderRadius:"20px",opacity:"0.7", paddingLeft:"20px",paddingTop:"5px", backgroundColor:" lightgray", marginBottom:"10px"}}
                  id="search-input"
                  type="search"
                  className="form-control search"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              {/* <h4>&nbsp; &nbsp; Filter data</h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; */}

             
              <Form.Check
                className="form-check-inline text-primary text"
                type="radio"
                value="A-Z"
                label="A-Z"
                name="sort"
                onClick={() => sorting("title")}
              ></Form.Check>

              <Form.Check
                className="form-check-inline  text-primary text"
                type="radio"
                value="Z-A"
                name="sort"
                label="Z-A"
                onClick={() => sorting("title")}
              />

              <Form.Check
                className="form-check-inline text-primary text"
                type="radio"
                value="notsolved"
                label="Not Solved"
                name="sort"
                onClick={() => filterResult("notsolved")}
              ></Form.Check>

              <Form.Check
                className="form-check-inline  text-primary text"
                type="radio"
                value="inreview"
                name="sort"
                label="In Review"
                onClick={() => filterResult("inreview")}
              />
              <Form.Check
                className="form-check-inline  text-primary text"
                type="radio"
                value="solved"
                name="sort"
                label="Solved"
                onClick={() => filterResult("solved")}
              />
              <Form.Check
                className="form-check-inline  text-primary text "
                type="radio"
                value="solved"
                name="sort"
                label="Show all"
                onClick={() => onReload()}
              />
            </Form.Group>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Home;
