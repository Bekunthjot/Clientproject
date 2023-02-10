import React, { Component, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import List from "./List";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function TweetPosts() {
  const [arri, setarri] = useState([]);
  const [len, setlen] = useState(0);
  const [id, setId] = useState(0);
  const [earn, setearn] = useState("");
  const [ini, setini] = useState("");
  const [open, setopen] = useState(-1);
  const location = useLocation();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { userId, emi } = location.state;
  const arrii=["Awesome","Nice","Great"]
  const seti = new Array(3);
  for (var i = 0; i < seti.length; i++) {
    seti[i] = [];
}
  useEffect(() => {
    fetch("http://localhost:5000/credii", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        emi,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.status == "ok") {
          setearn(data.data);
          alert("Credit fetched successfully " + earn);
        }
        if (data.status == "Some error") {
          alert("There is some error");
        }
      });
    innerFunction();
  }, []);

  const handleee = (val) => {
    try {
      fetch("http://localhost:5000/earn", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          val,
          emi,
        }),
      })
        .then((res) => res.json())

        .then((data) => {
          console.log(data, "userData");

          if (data.status == "ok") {
            alert("Credit updted successfully");
          }
          if (data.status == "Some error") {
            alert("There is some error");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    const { checked } = e.target;

    const med = earn == null ? "0" : earn;
    const val = parseInt(med);

    const ag = checked == true ? val + 1 : val - 1;
    const orig = ag.toString();

    setearn(orig);

    handleee(orig);
  };
  const handleClick = (e) => {
    if (open == e.target.id) {
      setopen(-1);
    } else {
      setopen(e.target.id);
    }
  };
  const handlecom = (e) => {
  e.preventDefault()
    console.log(ini);
// var lene=seti[val].length;
// seti[val][lene]=ini;
    const medi = earn == null ? "0" : earn;
    const valee = parseInt(medi);

    const again = valee + 1;
    const origee = again.toString();

    setearn(origee);

    handleee(origee);
  };

  const openList = (val) => {
    return (
      <div>
        <form class="divi" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            onChange={(e) => setini(e.target.value)}
            placeholder="Comment..."
            style={{ marginLeft: "26px", border: "1px solid black" }}
          />
          <button onClick={handlecom}>
            <AddCircleOutlineIcon />
          </button>{" "}
        </form>
        
        {  arrii.map((opt, indi) => (
          
           <div class="row" style={{backgroundColor:"pink",marginLeft:"auto",marginRight:'auto'}} key={indi}>
           
        <p style={{color:"black",width:"60px",marginBottom:"0px",paddingLeft:"0px"}}>{opt}</p>
         </div>  
        ))} 
        
        
      </div>
    );
  };
  const innerFunction = useCallback(() => {
    try {
      fetch("http://localhost:5000/twitty", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userId,
        }),
      })
        .then((res) => res.json())

        .then((data) => {
          console.log(data, "userData");

          if (data.status == "ok") {
            setarri(data.data);
            setlen(data.len);
            setId(data.id);
          }
        });
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div class="userstyle">
      <h1 class="title">Tweets</h1>
      <br />
      <h4>
        Got {len} from user ID {id}!
      </h4>
      <div class="container">
        {arri.map((friend, index) => (
          <div class="row" key={index}>
            
              <h5 style={{ color: "#CB1C8D" }}>Created At
             
            </h5>{" "}
            <h6 style={{ color: "black" }}> {friend.created_at}</h6>
            <h5 style={{ color: "#CB1C8D" ,paddingTop:"40px",paddingBottom:"20px"}}>{friend.text}</h5>
            <p style={{marginBottom:"5px", color:"black"}}><span style={{paddingRight:"10px"}}>Id</span>{friend.id}</p>
            <p style={{marginBottom:"5px", color:"black"}}><span style={{paddingRight:"5px"}}>Edit History Id</span>{friend.edit_history_tweet_ids}</p>
            <p style={{marginBottom:"5px", color:"black"}}><span style={{paddingRight:"10px"}}>Author Id</span>{friend.author_id}</p>
            
            <div class="divi">
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                style={{ color: "red" }}
                onChange={handleChange}
              />

              <InsertCommentIcon
                id={index}
                style={{ color: "black", height: "24px", width: "48px" }}
                onClick={handleClick}
              />
            </div>
            {index == open ? openList(index) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
