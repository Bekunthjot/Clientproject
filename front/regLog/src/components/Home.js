import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import "./Home.css";
import { Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div class="main">
        <div class="small">
        <h1 class="title">Welcome</h1>
        <br />
        <br />
        <div className="mb-2">
        <Link to={{
    pathname: "/sign-up"
  }}>
        <Button variant="success" size="lg" style={{marginRight:"40px"}}>
          USER
        </Button></Link>{' '}
        <Link  to={{
    pathname: "/sign-in",
    
  }}>
        <Button variant="danger" size="lg">
          ADMIN
        </Button></Link>
      </div>
        </div>
      </div>
    );
  }
}
