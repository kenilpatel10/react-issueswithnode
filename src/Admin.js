import React, { useState, useEffect } from "react";
import {
  Row,
  Modal,
  Form,
  Table,
  Button,
  Badge,
  Card,
  Accordion,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March","April","May","June","July", "August","September","October","November","December",
    ];

    let days = [
      "Monday", "Tuesday","Wednesday","Thursday", "Friday", "Saturday","Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  useEffect(() => {
    axios.get(`http://localhost:8000/data`).then((res) => {
      console.log(res.data);
      setAllData(res.data);
    });
  }, []);

  const [allData, setAllData] = useState([]);

  const deleteItem = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:8000/data/${id}`);
    axios.get(`http://localhost:8000/data`).then((res)=>{
        setAllData(res.data)
      })
    // setAllData(allData);

    // setAllData(deleteData);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var today = new Date(),
    time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const [isEditIsuue, setIsEditIssue] = useState(null);
  const [input, setInput] = useState({
    userId: localStorage.getItem("id"),
    userName: localStorage.getItem("username"),
    media: "",
    title: "",
    describe: "",
    status: "",
    time: time,
  });

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setAllData({ ...allData, describe: data });
    console.log("data   ", setAllData({ ...allData, describe: data }));
  };
  const handleUpdate = (e) => {
    e.preventDefault();
   
    // setAllData(...allData, input)
    if (window.confirm("are you sure??  you want to update data??")) {
      axios.put(`http://localhost:8000/data/${isEditIsuue}`,input);
      setShow(false);
      axios.get(`http://localhost:8000/data`).then((res)=>{
        setAllData(res.data)
      })
      // window.location.reload();
    }
  };

  const imageChange = (e) => {
    console.log("okkkkkk");
    let image = e.target.files[0].name;
    if (e.target.files && e.target.files.length > 0) {
      console.log(image);
      setAllData({ ...input, media: image });
    }
  };

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const sorting = (col) => {
    if (order === "asc") {
      const sorted = [...allData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      setAllData(sorted);
      setOrder("dsc");
    } else if (order === "dsc") {
      const sorted = [...allData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );

      setAllData(sorted);
      setOrder("asc");
    }
  };

  const onReload = () => {
    window.location.reload();
  };

  
  const updateIssue = (id) => {
    let newIssue = allData.find((e) => {
      return e._id === id;
    });
    console.log("newIssue", newIssue);
    setShow(true);
    setInput({
      userId: newIssue.userId,
      userName: newIssue.userName,
      media: newIssue.media,
      title: newIssue.title,
      describe: newIssue.describe,
      status: newIssue.status,
      time: newIssue.time,
    });
    setIsEditIssue(id);

    console.log(newIssue);
  };

  //  const [filterdata, setFilterdata] = useState(allData);
  const filterResult = (sat) => {
    const result = allData.filter((i) => {
      return i.status === sat;
    });

    setAllData(result);
  };


  return (
    <>
      <Row className="back">
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title style={{ fontSize: "25px" }}>
              <alert>{alert}</alert>
              Update Your Isuue
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
            {/* {error} */}
          </p>

          <Form>
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
              <input
                style={{ margin: "12px" }}
                accept=".doc|audio/*,video/*,image/*"
                onChange={imageChange}
                type="file"
              />
            </div>

            <Form.Group
              style={{ fontSize: "11px" }}
              className="form-check-inline"
            >
              <h4>&nbsp; &nbsp; Choose Status Of Your Issue</h4>&nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;
              <Form.Check
                style={{ color: "red" }}
                className="form-check-inline"
                type="radio"
                value="notsolved"
                label="Not Solved"
                name="solution"
                checked={input.status=== "notsolved"}
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
                checked={input.status=== "inreview"}
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
                checked={input.status=== "solved"}
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
              onClick={handleUpdate}
              variant="primary"
            >
              Update
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
          <div className=" rounded" style={{ margin: "12px" }}>
            <p className=" date text"> {dateBuilder(new Date())}</p>
            <Row>
              {allData.filter((e) => {
                  if (search === "") {
                    return e;
                  } else if (
                    e.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return e;
                  }
                })

            .map((i) => {
                  return (
                    <div class="col-3">
                      <Card
                        className="p-3 mb-5 bg-white"
                        style={{
                          borderRadius: "30px 0px 30px 0px ",
                          opacity: "0.9  ",
                        }}
                        key={i.title}
                      >
                        <Card.Body>
                          <h5
                            style={{
                              marginRight: "20px",
                              paddingBottom: "10px",
                              color: "gray",
                            }}
                          >
                            {i.userName} posted an issue at {i.time}
                            <OverlayTrigger
                              key="top"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-$top`}>
                                  Delete issue
                                </Tooltip>
                              }
                            >
                              <p
                                style={{
                                  marginLeft: "210px",
                                  opacity: "0.5",
                                  marginTop: "-25px",
                                }}
                                onClick={() => deleteItem(i._id)}
                              >
                                X
                              </p>
                            </OverlayTrigger>
                          </h5>

                          <Card.Title> {i.title} </Card.Title>
                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Read Full Description
                              </Accordion.Header>
                              <Accordion.Body>
                                <Card.Text
                                  style={{
                                    maxHeight: "200px",
                                    overflow: "scroll",
                                  }}
                                >
                                  {/* {
                                    i.media.substring(
                                      i.media.length - 4,
                                      i.media.length
                                    ) === "jpeg" ||
                                    i.media.substring(
                                      i.media.length - 3,
                                      i.media.length
                                    ) === "jpg" ||
                                    i.media.substring(
                                      i.media.length - 3,
                                      i.media.length
                                    ) === "png" ? (
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "100px",
                                        }}
                                        src={require(`./assets/${i.media}`)}
                                        alt="thump"
                                      />
                                    ) : null
                                    //  <iframe  style={{width:"200px",height:"100px"}} src={(`./assets/${i.media}`)} title="hello"></iframe>
                                  } */}
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
                            <OverlayTrigger
                              key="top"
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-$top`}>
                                  Edit issue
                                </Tooltip>
                              }
                            >
                              <span
                                className="glyphicon glyphicon-pencil "
                                style={{ marginLeft: "110px" }}
                                onClick={() => updateIssue(i._id)}
                              ></span>
                            </OverlayTrigger>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
            </Row>
          </div>
        </div>
        <div
          className="col-sm-2  fixedContainer"
          style={{
            borderRadius: "50px 0px 0px 50px",
            background: "rgba(2, 3, 0, 0.4)",
            paddingRight: "20px",
            paddingLeft: "-20px",
            marginTop: "100px ",
          }}
        >
          <text
            style={{
              fontSize: "30px",
              opacity: "1",
              color: "white",
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

          <div>
            <Form.Group
              style={{
                borderRadius: "20px",
                backgroundColor: "white",
                opacity: "0.8",
                marginTop: "0px",
                marginLeft: "15px",
                padding: "10px",
              }}
            >
              <div className="form-outline  ">
                <h4 style={{ padding: "5px" }}>Filter By</h4>
                <input
                  style={{
                    borderRadius: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    backgroundColor: " lightgray",
                    marginBottom: "10px",
                  }}
                  id="search-input"
                  type="search"
                  className="form-control search "
                  placeholder="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <Form.Check
                className="form-check-inline text-primary text"
                type="radio"
                value="A-Z"
                label="A-Z"
                name="sort"
                onClick={() => sorting("title")}
              ></Form.Check>

              <Form.Check
                className="form-check-inline  text-primary text "
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
                className="form-check-inline  text-primary text "
                type="radio"
                value="inreview"
                name="sort"
                label="In Review"
                onClick={() => filterResult("inreview")}
              />
              <Form.Check
                className="form-check-inline  text-primary text "
                type="radio"
                value="solved"
                name="sort"
                label="Solved"
                onClick={() => filterResult("solved")}
              />
              <Form.Check
                className="form-check-inline  text-primary text"
                type="radio"
                value="solved"
                name="sort"
                label="Show all"
                onClick={() => onReload()}
              />
            </Form.Group>

            <Button
              style={{
                padding: "20px",
                fontSize: "large",
                marginLeft: "30px",
                margin: "20px",
              }}
              variant="danger"
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "20px",
                  margin: "10px",
                }}
                to="/login"
              >
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </Row>
    </>
  );
}

export default Admin;
