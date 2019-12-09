import React, { Component } from "react";
import MenuComponent from "./Sidebar";
import OwnerProfile from "./OwnerProfile";
import Menu from "./Menu";
import AddItem from "./AddItem";

import cookie from "react-cookies";
import "./Profile.css";
import "./sideBarMenu.css";
import { Navbar } from "react-bootstrap";
import { Redirect } from "react-router";

//Define a Login Component
class OwnerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: cookie.load("cookie2"),
      component: ""
    };
    this.logout = this.logout.bind(this);
    this.selectComponent = this.selectComponent.bind(this);
  }
  selectComponent(event) {
    event.persist();
    // this will take the name of the <a> thats beeing clicked and sets name of <a> to state
    event.preventDefault();
    console.log(event);
    console.log("in select component" + event.target.name);
    this.setState({ component: event.target.name });
  }

  logout = () => {
    cookie.remove("cookie1", { path: "/" });
    cookie.remove("cookie2", { path: "/" });
    cookie.remove("cookie3", { path: "/" });
    cookie.remove("cookie4", { path: "/" });
    console.log("All cookies removed!");
    window.location = "/";
  };
  render() {
    let toRender = null;
    console.log(toRender);
    console.log("the state is whattt" + this.state.component);
    switch (this.state.component) {
      case "Profile":
        toRender = <OwnerProfile />;
        break;

      case "Menu":
        toRender = <Menu />;
        break;

      case "AddItem":
        toRender = <AddItem />;
        break;

      default:
        toRender = (
          <div>
            {" "}
            <img
              className="ownerhomeimg"
              src={require("./images/grubhubOwnerProfile.jpg")}
              alt="burger"
            />
          </div>
        );
        break;
    }

    let redirectVar = null;
    console.log(cookie.load("cookie1"));
    if (cookie.load("cookie1") !== "ownercookie") {
      redirectVar = <Redirect to="/" />;
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
          <div class="row">
            <p className="logo text-center">
              {" "}
              <h5> LoggedIn email: {cookie.load("cookie2")}</h5>
            </p>

            <a className="logo text-center" href="#" onClick={this.logout}>
              <h5>Logout</h5>
            </a>
          </div>
        </Navbar>
        <br />
        <MenuComponent onClick={this.selectComponent} />
        <div className="main">{toRender}</div>
      </div>
    );
  }
}
export default OwnerHome;
