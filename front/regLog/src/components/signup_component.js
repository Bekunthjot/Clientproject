import React, { Component } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import '../index.css'
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      type:"",
      password: "",
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  // handleChange = (event) => {
  //   event.preventDefault();
  //   const { name, value } = event.target;
  //   let errors = this.state.errors;

  //   switch (name) {
  //     case 'fullName': 
  //       errors.fullName = 
  //         value.length < 5
  //           ? 'Full Name must be 5 characters long!'
  //           : '';
  //       break;
  //     case 'email': 
  //       errors.email = 
  //         validEmailRegex.test(value)
  //           ? ''
  //           : 'Email is not valid!';
  //       break;
  //     case 'password': 
  //       errors.password = 
  //         value.length < 8
  //           ? 'Password must be 8 characters long!'
  //           : '';
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState({errors, [name]: value});
  // }
  handleSubmit(e) {
    e.preventDefault();
    
    const { name, type, email, password } = this.state;
    console.log(name, type, email, password);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        type,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if(data.error=="All inputs are Required")
        {
          alert("All inputs are Required")
        }
        if(data.error=="User Exists")
        {
          alert("User already Exist")
        }
        if(data.error=="Invalid Password")
        {
          alert("Invalid Password")
        }
        if (data.status == "ok") {
          alert("Registered successful");
          window.location.href = "./Congratulation";
        }
      });
  }
  render() {
    return (
      <div className="backsignup">
      <div className="auth-wrapper">
          <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
        <h3 class="title">Sign Up</h3>

        <div className="wrap-input100  m-b-23">
          <span className="label-input100">Name</span>
          <input
            type="text"
            className="input100"
            placeholder="name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <span class="focus-input100">
            <PermIdentityIcon
              style={{ position: "absolute", top: "38px", color: "#adadad" }}
            />
          </span>
          {/* {errors.name.length > 0 && 
                <span className='error'>{errors.name}</span>} */}
        </div>

        

        <div className="wrap-input100  m-b-23">
          <label className="label-input100">Email address</label>
          <input
            type="email"
            className="input100"
            placeholder="Enter connected linkedIn emails"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <span class="focus-input100">
            <EmailIcon
              style={{ position: "absolute", top: "38px", color: "#adadad" }}
            />
          </span>
         
        </div>
        
        <div className="wrap-input100  m-b-23">
          <label className="label-input100">Type</label>
          <input
            type="text"
            className="input100"
            placeholder="Type User here again .."
            onChange={(e) => this.setState({ type: e.target.value })}
          />
          <span class="focus-input100">
            <PermIdentityIcon
              style={{ position: "absolute", top: "38px", color: "#adadad" }}
            />
          </span>
        </div>
        <div className="wrap-input100  m-b-23" style={{ marginBottom: "20px" }}>
          <label className="label-input100">Password</label>
          <input
            type="password"
            className="input100"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <span class="focus-input100">
            <LockOpenIcon
              style={{ position: "absolute", top: "38px", color: "#adadad" }}
            />
          </span>
        </div>

        <div className="d-grid">
          <div class="container-login100-form-btn">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button type="submit" class="login100-form-btn">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop:"10px", textAlign: "center" }}>
          <span class="txt1 p-b-17">Already registered</span>
          <br />
          <a href="/sign-in" class="txt2" style={{ color: "black" }}>
            Sign in?
          </a>
        </div>
        {/* <p className="forgot-password text-right">
          Already registered{" "}
          <a href="/sign-in" class="txt2" style={{ color: "black" }}>
            sign in?
          </a>
        </p> */}
      </form></div></div></div>
    );
  }
}
