import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Congratulation extends Component {
  
  render() {
    return (
      <div>
        <h1><center>Congratulation Registered Succesfully</center></h1>
        <br/>
        <Link to="/sign-in">Go Back</Link>
      </div>
    );
  }
}
