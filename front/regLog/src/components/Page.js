import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import qs from "qs";

function Page() {
  const location = useLocation();
  const { from } = location.state;
  const[info,setinfo]=useState("")
  const[texi,handletexi]=useState("")
function allfun(val,from)
  {
    
   
    fetch("http://localhost:5000/again", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        from,
        val,
        texi,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");

        if (data.status == "ok") {
          alert("Post Created Successfully")
          console.log(data.data)
          
        }
        if (data.status == "Some error") {
          alert("Post Created Successfully");
        }
      });
  }
  function sybmit22(from)
  {
    
    fetch("http://localhost:5000/coneeeeee", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          from,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
  
          if (data.status == "ok") {
            alert("Fetched succesfully")
            
            setinfo(data.data.id)
            const val=data.data.id;
            
            allfun(val,from);
            
          }
          if (data.status == "Some error") {
            alert("Error");
          }
        });
  }
  function submit() {
   
    fetch("http://localhost:5000/connert", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          from,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
  
          if (data.status == "ok") {
            console.log(data.data);
            sybmit22(data.data)
          }
          if (data.status == "Some error") {
            alert("Error");
          }
        });
     
  }

  return (
    <div class="userstyle">
        <h4 class="title">Input Text</h4>
        <br/>
        <div className="wrapper">
        <TextareaAutosize aria-label="empty textarea" placeholder="Input Text Here...." 
         onChange={(e) => handletexi(e.target.value )}/>

<div className="d-grid">
                <div class="container-login100-form-btn">
                  <div>
                  
                    
      <button  style={{backgroundColor:"#A61F69",marginTop:"20px",borderRadius:"5px",color:'#ffff'}} onClick={submit}>Click Me</button></div></div></div>
    </div></div>
  );
}

export default Page;