import React, {  useEffect, useState } from "react";

import "./userAcc.css";
import { Link,useLocation } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function ConnAccount()  
  
  {
    const[connAcc,setconnAcc]=useState([]);
    const [userinfo,setuserinfo]=useState("");
    
    const location = useLocation()
    const { from } = location.state

    
    
   function popi()
   {
    return(
      <div>
        <h1>Hey testing</h1>
      </div>
    )
   }
  
  
    
  useEffect(() => {
    

    fetch("http://localhost:5000/connaccount", {
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
        console.log(data, "userData");
       setconnAcc(data.data)
      console.log(connAcc)
      });
    
  },[])


//   const infouser = connAcc.map((friend, index) => {
    
    
    
//       fetch("http://localhost:5000/infor", {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           mail:friend
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data, "userData");
//           console.log(data.data)
//           setuserinfo(data.data)
          
//         });
      
    
    

//     return (userinfo.name)
 
//  });
    return  (
     
      <div class="userstyle">
        <h1 class="title">Connected Accounts</h1>
        <br />
        <div class="container">

             {
             connAcc.map((friend, index) => (
              
                <div class="row" key={index}>
                <h3 style={{color:"#CB1C8D"}}>{friend[0]}</h3>{" "}
                 <p>{friend[1]}</p>
                 <center>
                 
            <Link to="/tweetLink" state={{ userId: friend[2] ,emi:from,passofuser:friend[3],nameeofuser:friend[0],emofuser:friend[1]}} class="btn btn-light" style={{width:"20%",marginBottom:"14px",backgroundColor:"#CB1C8D" , marginTop:"10px"}}><ArrowForwardIosIcon
                style={{
                  
                  color: "#fff",
                }}
                
                 
              /></Link>
                  </center>   
                     </div>
                             
                             ))
             
             }
             
           </div>   
        
  </div>

    );
  }

