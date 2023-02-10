import React, { useState,useEffect } from "react";
import "./userAcc.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link,useLocation } from "react-router-dom";


 export default function UserAccount()  {
  
  const[userAcc,setuserAcc]=useState([]);
  const[arri,setarri]=useState([]);
  
  const location = useLocation()
  const { from } = location.state
  useEffect(() => {
    

    fetch("http://localhost:5000/useraccount", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
     
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
       setuserAcc(data.data)
        console.log(userAcc.length);
        for(var i=0;i<userAcc.length;i++)
        {
          console.log(userAcc[i].name);
        }
      });
    
  },[])

  function addNewItem(namee,mail,tweetid,linkedid){
    
   
   
    arri.push(mail);
   console.log(arri)
    
  fetch("http://localhost:5000/addit", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        namee,
        mail,
        tweetid,
        linkedid,
        from,
       
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
       
        if (data.status == "ok") {
          alert("The user "+namee+" is succesfully connected in "+from+ " list")
          
        }
      });
  };
  
    
  function removeItem(namee,mail,tweetid,linkedid){
    
   
   
   
   console.log(mail)
    
  fetch("http://localhost:5000/delit", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        namee,
        mail,
        tweetid,
        linkedid,
        from,
       
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
       
        if (data.status == "ok") {
          alert("The user "+namee+" is succesfully removed from "+from+ " list")
          
        }
      });
  };
  
    return  (
     
      <div class="userstyle">
        <h1 class="title">USERS</h1>
        <br />
      
       
        <div class="container">
             
                {
                userAcc.map((friend, index) => (
                   <div class="row" key={index}>
                   <h3 style={{color:"#CB1C8D"}}>{friend.name}</h3>{" "}
                        <p style={{color:"#7B8FA1"}}>Email: {friend.email}</p>
                        <center>
                        <button to="#" class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px",width:'20%',marginBottom:"14px"}}
                      onClick={() => addNewItem(friend.name,friend.email,friend.twitid,friend.linkid)}
                        >
                      
                        <AddCircleOutlineIcon  style={{
                      
                      color: "#fff",
                    }}/>
                    
                  </button>
                  <button to="#" class="btn btn-light" style={{backgroundColor:"#CB1C8D" , marginTop:"10px",width:'20%',marginBottom:"14px"}}
                      onClick={() => removeItem(friend.name,friend.email,friend.twitid,friend.linkid)}
                        >
                      
                        <RemoveCircleOutlineIcon  style={{
                      
                      color: "#fff",
                    }}/>
                    
                  </button></center>
                 </div>
                    
                ))}
               
            </div>
      
  </div>

    );
  }




