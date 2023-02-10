import React, { Component } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../index.css'
export default class AdminDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/adminData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "adminData");
        this.setState({ adminData: data.data });
      });
  }
  render() {
    return (
      <div class="adminstyle">
        <h1 class="title">Welcome {this.state.adminData.name} </h1>
        <br />
        <div class="card-deck" style={{width:"100%"}}>
  <div class="card"style={{marginLeft:"30px"}} >
    
    <div class="card-body">
      <h5 class="card-title" style={{color:"#CB1C8D"}}>User Accounts</h5>
      <p class="card-text">Check all the users present </p>
      <Link to="#" class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
                    style={{
                      
                      color: "#fff",
                    }}
                  /></Link>
      
    </div>
  </div>
 
  <div class="card"style={{marginLeft:"30px"}} >
    
    <div class="card-body">
      <h5 class="card-title" style={{color:"#CB1C8D"}}>Utility</h5>
      <p class="card-text">Check the utility of app </p>
      <Link to="#" class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
                    style={{
                      
                      color: "#fff",
                    }}
                  /></Link>
      
    </div>
  </div>
 
  </div>
</div>
     
    );
  }
}
