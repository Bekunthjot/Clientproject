import React, { Component, useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      show: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
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
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
   
  }
  render() {
    return  (
      <div class="userstyle">
        <h1 class="title">Welcome {this.state.userData.name}</h1>
        <br />
        <br/>
        <div class="card-deck" style={{width:"100%"}}>
  <div class="card"style={{marginLeft:"30px"}} >
    
    <div class="card-body">
      <h5 class="card-title" style={{color:"#CB1C8D"}}>User Accounts</h5>
      <p class="card-text">Check all the users present and connect as per your choice</p>
      <Link to="/useracc" state={{ from: this.state.userData.email }} class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
                    style={{
                      
                      color: "#fff",
                    }}
                  /></Link>
      
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
      <h5 class="card-title" style={{color:"#CB1C8D"}}>Connected Accounts</h5>
      <p class="card-text">Check all your connected account</p>
      <Link to="/connacc" state={{ from: this.state.userData.email }} class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
                    style={{
                      
                      color: "#fff",
                    }}
                  /></Link>
      
    </div>
  </div>
  
  <div class="card">
    
    <div class="card-body">
      <h5 class="card-title" style={{color:"#CB1C8D"}}>Credit Balance</h5>
      <p class="card-text">Check your credit balance here</p>
      <Link to="/credit" state={{ from: this.state.userData.email }}class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
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
