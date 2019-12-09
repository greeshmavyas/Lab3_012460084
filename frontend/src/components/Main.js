import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import OwnerHome from "./OwnerHome";
import CustomerSignUp from "./CustomerSignUp";
import OwnerSignUp from "./OwnerSignUp";
import CustomerHome from "./CustomerHome";
import OwnerProfile from "./OwnerProfile";
import Menu from "./Menu";
import CustomerMenu from "./CustomerMenu";
import AddItem from "./AddItem";
import CustomerProfile from "./CustomerProfile";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/OwnerHome" component={OwnerHome} />
          <Route path="/CustomerSignUp" component={CustomerSignUp} />
          <Route path="/OwnerSignUp" component={OwnerSignUp} />
          <Route path="/CustomerHome" component={CustomerHome} />
          <Route path="/OwnerProfile" component={OwnerProfile} />
          <Route path="/Menu" component={Menu} />
          <Route path="/CustomerMenu" component={CustomerMenu} />
          <Route path="/AddItem" component={AddItem} />
          <Route path="/CustomerProfile" component={CustomerProfile} />
        </div>
      </div>
    );
  }
}

export default Main;
