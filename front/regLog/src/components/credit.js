import React, { Component, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";

import DonutChart from 'react-donut-chart';
    import 'simple-react-donut-chart/src/style.css'
export default function Credit (){
 
  const [earn, setearn] = useState(0);
 
  const location = useLocation();
  var val;
  const { from} = location.state;
 const emi=from;
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
        setearn(parseInt(data.data))
      alert("Credit fetched successfully " +data.data);
        }
        if (data.status == "Some error") {
          alert("There is some error");
          console.log(from)
        }
      });
    
  }, []);
 
 
    return  (
     
      <div class="userstyle">
        <h1 class="title">Earned Credits</h1>
        <br />
       <div style={{alignContent:"center",marginLeft:"260px"}}>
        
        <DonutChart
  data={[
    {
      label: 'Earned',
      value: earn,
    },
    {
      label: 'Remaining',
      value: 100-earn,
      isEmpty: true,
    },
  ]}
/>;
        </div>
  </div>

    );
  
}
