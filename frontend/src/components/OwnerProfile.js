import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./Profile.css";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { ownerProfileSaveMutation } from "../mutation/mutations";
import { getOwnerProfileQuery } from "../queries/queries";
import { withApollo } from "react-apollo";

//Define a OwnerProfile Component
class OwnerProfile extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      profiledata: [],
      profileImagePath: "",
      restImagePath: ""
    };

    //Bind the handlers to this class
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.rnameChangeHandler = this.rnameChangeHandler.bind(this);
    this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.readFileName = this.readFileName.bind(this);
    this.readRestFileName = this.readRestFileName.bind(this);
  }

  readFileName(fileName) {
    console.log("in readFileName", fileName);
    this.setState({ profileImagePath: fileName });
  }

  readRestFileName(fileName) {
    console.log("in readFileName", fileName);
    this.setState({ restImagePath: fileName });
  }

  logout = () => {
    cookie.remove("cookie1", { path: "/" });
    cookie.remove("cookie2", { path: "/" });
    cookie.remove("cookie3", { path: "/" });
    console.log("All cookies removed!");
    window.location = "/";
  };

  componentWillMount() {
    if (cookie.load("cookie1")) {
      this.props.client
        .query({
          query: getOwnerProfileQuery,
          variables: {
            email: cookie.load("cookie2")
          }
        })
        .then(response => {
          var result = response.data.ownerProfilefetch;
          if (result.status == 200) {
            console.log(response.data);
            this.setState({
              profiledata: result
            });
            console.log(
              "data fetched" + JSON.stringify(this.state.profiledata)
            );
            this.refs.myfirstname.value = this.state.profiledata.firstname;
            this.state.firstname = this.state.profiledata.firstname;
            this.refs.mylastname.value = this.state.profiledata.lastname;
            this.state.lastname = this.state.profiledata.lastname;
            this.refs.phone.value = this.state.profiledata.phone;
            this.state.phone = this.state.profiledata.phone;
            this.refs.rname.value = this.state.profiledata.rname;
            this.state.rname = this.state.profiledata.rname;
            this.refs.cuisine.value = this.state.profiledata.cuisine;
            this.state.cuisine = this.state.profiledata.cuisine;
            this.refs.zipcode.value = this.state.profiledata.zipcode;
            this.state.zipcode = this.state.profiledata.zipcode;
          } else {
            console.log("error" + result.message);
          }
        });
    }
  }

  firstnameChangeHandler = e => {
    this.setState({ firstname: e.target.value });
  };

  lastnameChangeHandler = e => {
    this.setState({ lastname: e.target.value });
  };

  rnameChangeHandler = e => {
    this.setState({ rname: e.target.value });
  };

  phoneChangeHandler = e => {
    this.setState({ phone: e.target.value });
  };

  zipCodeChangeHandler = e => {
    this.setState({ zipcode: e.target.value });
  };

  cuisineChangeHandler = e => {
    this.setState({ cuisine: e.target.value });
  };

  handleValidation() {
    let formIsValid = true;

    //firstname
    if (!this.state.firstname) {
      formIsValid = false;
      alert("First Name is a Required field");
      console.log("First name cannot be empty");
    }

    //lastname
    if (!this.state.lastname) {
      formIsValid = false;
      alert("Last Name is a Required field");
      console.log("Last name cannot be empty");
    }

    //Restaurant
    if (!this.state.rname) {
      formIsValid = false;
      alert("restaurant name is a Required field");
      console.log("restaurant name cannot be empty");
    }
    //Zip Code
    if (!this.state.zipcode) {
      formIsValid = false;
      alert("Zip Code is a Required field");
      console.log("Zip Code cannot be empty");
    }
    //Cusisine
    if (!this.state.cuisine) {
      formIsValid = false;
      alert("Cuisine is a Required field");
      console.log("Cuisine cannot be empty");
    }

    return formIsValid;
  }

  //submit Login handler to send a request to the node backend
  saveChanges(event) {
    console.log("Login Form submitted");
    event.preventDefault();
    if (this.handleValidation()) {
      this.props
        .ownerProfileSaveMutation({
          variables: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: cookie.load("cookie2"),
            rname: this.state.rname,
            cuisine: this.state.cuisine,
            zipcode: this.state.zipcode
          }
        })
        .then(response => {
          var result = response.data.ownerProfileSave;
          if (result.status == 400) {
            alert("Profile data save error!");
          } else if (result.status == 200) {
            console.log(result);
            this.setState({ profiledata: result });
            alert("Profile Data was succesfully saved!");
          }
        });
    }
  }

  render() {
    console.log("inrprops" + this.props);
    //redirect based on successful login
    let redirectVar = null;
    console.log("new image path", this.state.profileImagePath);

    console.log(cookie.load("cookie1"));
    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <p></p>
        </div>
        <div id="profilehref" class="myprofilecontainer">
          <div class="login-form">
            <h2>Account Information</h2>
            <br></br>

            <div class="form-group">
              <p>First Name </p>
              <input
                ref="myfirstname"
                onChange={this.firstnameChangeHandler}
                type="text"
                class="form-control"
                name="firstname"
                placeholder="First Name"
                required
              />
            </div>
            <div class="form-group">
              <p>Last Name </p>
              <input
                ref="mylastname"
                onChange={this.lastnameChangeHandler}
                type="text"
                class="form-control"
                name="lastname"
                placeholder="Last Name or Initial"
                required
              />
            </div>

            <div class="form-group">
              <p>Phone </p>
              <input
                ref="phone"
                onChange={this.phoneChangeHandler}
                type="text"
                class="form-control"
                name="phone"
                placeholder="Phone Number"
                required
              />
            </div>

            <div class="form-group">
              <p>Restaurant Name </p>
              <input
                ref="rname"
                onChange={this.rnameChangeHandler}
                type="text"
                class="form-control"
                name="rname"
                placeholder="Restaurant Name"
                required
              />
            </div>

            <div class="form-group">
              <p>Cuisine </p>
              <input
                ref="cuisine"
                onChange={this.cuisineChangeHandler}
                type="text"
                class="form-control"
                name="cuisine"
                placeholder="Cuisine"
                required
              />
            </div>

            <div class="form-group">
              <p>Zip Code </p>
              <input
                ref="zipcode"
                onChange={this.zipCodeChangeHandler}
                type="text"
                pattern="[0-9]{5}"
                class="form-control"
                name="zipcode"
                placeholder="Zip Code"
                required
              />
            </div>
            <div class="form-group">
              <p>Email: </p>

              <h4> {cookie.load("cookie2")}</h4>
            </div>
          </div>
        </div>
        <br></br>

        <div class="col-md-10 text-center">
          <button onClick={this.saveChanges} class="btn-primary btn-lg">
            Save Changes
          </button>
        </div>
        <br />
      </div>
    );
  }
}

//export ownerprofile Component
export default compose(
  graphql(ownerProfileSaveMutation, { name: "ownerProfileSaveMutation" }),
  withApollo
)(OwnerProfile);
