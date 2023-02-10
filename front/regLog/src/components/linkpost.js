
import React, { Component, useEffect, useState,useCallback } from "react";
import { Link,useLocation } from "react-router-dom";
import "../index.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import axios from "axios";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";


  


export default function LinkTPost()  {
  
  const [code, setCode] = React.useState("");
  const [data, setData] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { linkedInLogin } = useLinkedIn({
    clientId: "774pwec0qf8bfq",
    redirectUri: "http://localhost:3000/linkedin",
    onSuccess: (codii) => {
      console.log(codii);
      setCode(codii);
      console.log(code);

      setErrorMessage("");
     
    },
    scope: "r_emailaddress r_liteprofile w_member_social",

    onError: (error) => {
      console.log(error);
      setCode("");
      setErrorMessage(error.errorMessage);
    },
  });

  const from="AQXaF3BhdCecUdQ1hUQevfwYTH2Ju9zk5ErN9QYvP5zfCMOLuubdaoU8BWLlmrfRQfuKmf5vAst5YVZBp3aimYawNDxPusR4Zxqu6-K2o-NjlC0a7XFJBhofolz08j9VoJqV6pK-JF9R1EYyClAX89hrkrwUd4OhsxMa9Bm34hhahdwXmFZQ8KIps2qQphEd4QA0iHSfLtCRnT4ncVMx5-uToREL0zPzZ4eFPsQk2q92OKiIXW3oGyr_tIoe1NmThFYOIvhk90xQFtDHc1Z-uJVNmtE_XQ1mP2Rt7a9xw-_-65vZjDO7OIQtOqtL1BRXO_PiuPYaSm6hJf6nIM4ejO3wzMfPgQ"
  const[info,setinfo]=useState("")
 
    return  (
     
      <div class="userstyle">
        <h1 class="title">Signup LinkedIn</h1>
        <br/>
        <div className="wrapper">
    <img
      onClick={linkedInLogin}
      src={linkedin}
      alt="Log in with Linked In"
      style={{ maxWidth: "180px", cursor: "pointer" }}
    />

    {!code && <div>No code</div>}
    {code && (
      <div>
        
        <div>To Input Text</div>
        <Link to="/pagee" state={{ from: code }}><ArrowForwardIosIcon
                style={{
                  
                  color: "#fff",
                }}
                
                 />
      </Link>
      </div>
    )}
     
    {errorMessage && <div>{errorMessage}</div>}
  </div>
  
       
        
  </div>

    );
  
}
