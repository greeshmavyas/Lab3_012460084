import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./Profile.css";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { customerProfileSaveMutation } from "../mutation/mutations";
import { getCustomerProfileQuery } from "../queries/queries";
import { withApollo } from "react-apollo";

//Define a OwnerProfile Component
class CustomerProfile extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      profiledata: [],
      profileImagePath: ""
    };

    //Bind the handlers to this class
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.readFileName = this.readFileName.bind(this);
  }

  readFileName(fileName) {
    console.log("in readFileName", fileName);
    this.setState({ profileImagePath: fileName });
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
          query: getCustomerProfileQuery,
          variables: {
            email: cookie.load("cookie2")
          }
        })
        .then(response => {
          var result = response.data.customerProfilefetch;
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

  phoneChangeHandler = e => {
    this.setState({ phone: e.target.value });
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

    return formIsValid;
  }

  //submit Login handler to send a request to the node backend
  saveChanges(event) {
    console.log("Login Form submitted");
    event.preventDefault();
    if (this.handleValidation()) {
      this.props
        .customerProfileSaveMutation({
          variables: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: cookie.load("cookie2")
          }
        })
        .then(response => {
          console.log("66^^" + JSON.stringify(response));
          var result = response.data.customerProfileSave;
          if (response.data.customerProfileSave.status === 400) {
            alert("Profile data save error!");
          } else if (response.data.customerProfileSave.status == 200) {
            console.log(result);
            this.setState({ profiledata: result });
            alert("Profile Data was succesfully saved!");
          }
        });
    }
  }

  render() {
    //redirect based on successful login
    let redirectVar = null;
    console.log(cookie.load("cookie1"));
    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <div>
        {redirectVar}

        <div id="profilehref" class="myprofilecontainer">
          <div class="login-form">
            <br /> <br />
            <br />
            <br />
            <h2>Account Information</h2>
            <br></br>
            <br /> <br />
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
              <br></br>
              <div class="form-group">
                <p>Email: </p>

                <h4> {cookie.load("cookie2")}</h4>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div class="col-md-10 text-center">
          <button onClick={this.saveChanges} class="btn-primary btn-lg">
            Save Changes
          </button>
          <br />
          <br />
          <br />
        </div>

        <br />
      </div>
    );
  }
}
//export customerprofile Component
export default compose(
  graphql(customerProfileSaveMutation, { name: "customerProfileSaveMutation" }),
  withApollo
)(CustomerProfile);
