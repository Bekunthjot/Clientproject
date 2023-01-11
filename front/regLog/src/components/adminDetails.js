import React, { Component } from "react";
import '../index.css'
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/adminData", {
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
        console.log(data, "adminData");
        this.setState({ adminData: data.data });
      });
  }
  render() {
    return (
      <div class="adminstyle">
        <h1 class="title">Hello Admin</h1>
        <br />
        <br />
        <h2 class="title">Name</h2>
        <h4 style={{ color: "#a64bf4" }}>
          {this.state.adminData.name} 
        </h4>
        <br />
        <br />
        <h2 class="title"> Email</h2>{" "}
        <h4 style={{ color: "#a64bf4" }}>{this.state.adminData.email}</h4>
      </div>
    );
  }
}
