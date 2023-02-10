import React, { Component, useEffect, useState } from "react";
import "../index.css";
import { Link,useLocation } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function TweeterLink () {
  
    const location = useLocation()
    const { userId,emi ,passofuser,nameeofuser,emofuser} = location.state
  
    return  (
      <div class="userstyle">
        <h1 class="title">Tweets And Posts</h1>
        <br />
    
        <div class="card-deck" style={{width:"100%"}}>
  <div class="card"style={{marginLeft:"30px"}} >
    
    <div class="card-body">
      <h5 class="card-title" style={{color:"#CB1C8D"}}>Twitter</h5>
      <p class="card-text">Click Here to check tweets </p>
      <Link to="/tweety" state={{ userId:userId,emi:emi }} class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
                    style={{
                      
                      color: "#fff",
                    }}
                  /></Link>
      
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
      <h5 class="card-title" style={{color:"#CB1C8D"}}>LinkedIn</h5>
      <p class="card-text">Click here to create posts </p>
      <Link to="#"  class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
                    style={{
                      
                      color: "#fff",
                    }}
                    onMouseOver={()=>{ alert("Please remember email "+emofuser+" and password "+passofuser+" of "+nameeofuser+" to signup linkedIn");
                    window.location.href = "./linky";}}
                  /></Link>
      
    </div>
  </div>
  
  
</div>
      </div>
    );
  
}
