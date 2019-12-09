import React, { Component } from "react";

import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./Login.css";
import "./bootstrap-social.css";
import { Navbar } from "react-bootstrap";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { customerSignUpMutation } from "../mutation/mutations";
//Define a CustomerSignUp Component
class CustomerSignUp extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  //first name change handler to update state variable with the text entered by the user
  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  //last name change handler to update state variable with the text entered by the user
  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleValidation() {
    let formIsValid = true;

    //Firstname
    if (!this.state.firstname) {
      formIsValid = false;
      alert("First Name is a Required field");
      console.log("First Name cannot be empty");
    } else if (typeof this.state.firstname !== "undefined") {
      if (!this.state.firstname.match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        alert("First Name cannot contain numbers");
        console.log("First Name cannot contain numbers");
      }
    }
    //Lastname
    if (!this.state.lastname) {
      formIsValid = false;
      alert("Last Name is a Required field");
      console.log("Last Name cannot be empty");
    } else if (typeof this.state.lastname !== "undefined") {
      if (!this.state.lastname.match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        alert("Last Name cannot contain numbers");
        console.log("Last Name cannot contain numbers");
      }
    }
    //Password
    if (!this.state.password) {
      formIsValid = false;
      alert("Password is a Required field");
      console.log("Password cannot be empty");
    }
    //Email
    if (!this.state.email) {
      formIsValid = false;
      alert("Login ID is a Required field");
      console.log("Login ID cannot be empty");
    }

    if (typeof this.state.email !== "undefined") {
      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        alert("Login ID is invalid");
        console.log("Email ID is not Valid");
      }
    }

    return formIsValid;
  }

  //submit Login handler to send a request to the node backend
  submitLogin(event) {
    console.log("Inside customer submit login");
    event.preventDefault();
    if (this.handleValidation()) {
      console.log("Login Form submitted");

      this.props
        .customerSignUpMutation({
          variables: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(response => {
          var result = response.data.customerSignUp;
          console.log("response" + JSON.stringify(response));
          if (result.status == 401) {
            alert("Cannot Create User. Login ID already exists");
            this.setState({
              authFlag: false
            });
          } else if (result.status == 200) {
            cookie.save("cookie1", result.cookie1, { path: "/" });
            cookie.save("cookie2", result.cookie2, { path: "/" });
            cookie.save("cookie3", result.cookie3, { path: "/" });
            cookie.save("cookie4", result.cookie4, { path: "/" });
            this.setState({
              authFlag: true
            });
            alert("Customer profile created");
          }
        });
    }
  }

  render() {
    //redirect based on successful login
    let redirectVar = null;
    cookie.load("cookie1");
    if (cookie.load("cookie1") === "customercookie") {
      redirectVar = <Redirect to="/CustomerHome" />;
    }
    return (
      <div>
        {redirectVar}
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/" title="GrubHub" className="logo">
                <img
                  className="logo"
                  src={require("./images/Grubhub.jpeg")}
                  alt="GrubHub Logo"
                />
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <img
            className="logo"
            src={require("./images/perk.png")}
            alt="Get Perks Logo"
          />
        </Navbar>
        <div class="container">
          <p></p>
        </div>
        <div class="container">
          <p></p>
        </div>
        <div class="container">
          <p></p>
        </div>
        <div class="container">
          <p></p>
        </div>
        <div class="container">
          <p></p>
        </div>
        <div class="container">
          <p></p>
        </div>
        <div class="center">
          <div id="yourdiv">
            <h3 class="display-5">
              Create your account<br></br>
            </h3>
          </div>
        </div>
        <div class="container">
          <div class="col-sm-6" style={{ width: "35%", left: "350px" }}>
            <div class="login-form">
              <br></br>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      onChange={this.firstnameChangeHandler}
                      type="text"
                      class="form-control"
                      name="firstname"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      onChange={this.lastnameChangeHandler}
                      type="text"
                      class="form-control"
                      name="lastname"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input
                  onChange={this.emailChangeHandler}
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div>
                <button
                  onClick={this.submitLogin}
                  class="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Create your account
                </button>
              </div>
            </div>
            <div class="mydiv">
              <span class="myspan">or</span>
            </div>
            <br></br>
            <div>
              <button class="mybtn facebook_button">
                Log in with Facebook
              </button>
            </div>
            <br></br>
            <div>
              <button className="mybtn google_button">
                Log in with Google
              </button>
            </div>
            <br></br>
            <h2>
              <small>
                {" "}
                Already have an account?{" "}
                <a class="bg-default" href="/">
                  Sign In
                </a>
              </small>
            </h2>
            <div class="center" id="yourdiv">
              <font size="1">
                By creating an account you are accepting our Terms and
                Conditions and Privacy Policy.
                <br></br>
              </font>
            </div>
            <br></br>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}

export default graphql(customerSignUpMutation, {
  name: "customerSignUpMutation"
})(CustomerSignUp);
