import React, { useState,useEffect } from "react";



import "./userAcc.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link,useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


function UserAccount() {

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
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
  
  const filteredPersons = userAcc.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .email
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
    if(e.target.value===""){
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };
  function SearchList( filteredPersons ) {
    const filtered = filteredPersons.map( (friend, index) => (
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
       
   )); 
    return (
      <div>
        {filtered}
      </div>
    );
  }
  function searchList() {
  	if (searchShow) {
	  	return (
	  		<div>
	  			{SearchList(filteredPersons)} 
	  		</div>
	  	);
	  }
  }

  return (
    <div class="userstyle">
        <h1 class="title">USERS</h1>
        <br />
      
       
        <div class="container">
			
			<div className="pa2" style={{marginBottom:"30px"}}>
				<input 
					className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
					type = "search" 
					placeholder = "Search User Here ..." 
					onChange = {handleChange}
          style={{width:"40%",paddingTop:"20px", paddingBottom:"20px"}}
          
				/>
         <SearchIcon style={{color:"black",position:"absolute",right:"400px",top:"150px"}}/>
			</div>
			{searchList()}
		</div></div>
  );
}

export default UserAccount;