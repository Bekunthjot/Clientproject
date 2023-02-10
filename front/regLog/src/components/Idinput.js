import React, { Component, useEffect, useState } from "react";
import "../index.css";
export default class Idinput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      twitid: "",
      linkid: "",
      emi: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
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
        console.log(data, "userData");
        this.setState({ userData: data.data });
        this.setState({ emi: data.data.email });
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { twitid, linkid, emi } = this.state;
    console.log(twitid, linkid, emi);
    fetch("http://localhost:5000/id", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        twitid,
        linkid,
        emi,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.error == "All inputs are Required") {
          alert("All inputs are Required");
        }

        if (data.status == "ok") {
          alert("Connected successful");
          window.location.href = "./userDetails";
        }
      });
  }
  render() {
    return (
      <div class="userstyle">
        <h1 class="title">Hello {this.state.userData.name}</h1>
       
        <div style={{textAlign:"left"}}>
          <div className="auth-inner" style={{paddingTop:"30px"}}>
            <form onSubmit={this.handleSubmit} class="logform">
              

              <div className="wrap-input100  m-b-23" style={{marginTop:"40px"}}>
                <span className="label-input100" >Twitter ID</span>

                <input
                  type="text"
                  className="input100"
                  placeholder="Enter Twitter Id"
                  onChange={(e) => this.setState({ twitid: e.target.value })}
                />
                <span class="focus-input100"></span>
              </div>

              <div className="wrap-input100  m-b-23" style={{marginBottom:"40px"}}>
                <span className="label-input100">LinkedIn Password</span>

                <input
                  type="text"
                  className="input100"
                  placeholder="Enter LinkedIn Id"
                  onChange={(e) => this.setState({ linkid: e.target.value })}
                />
                <span class="focus-input100"></span>
              </div>

              <div className="d-grid">
                <div class="container-login100-form-btn">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button type="submit" class="login100-form-btn">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <span class="txt1 p-b-17">Already connected</span>
                <br />
                <a href="/userDetails" class="txt2">
                  skip
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
