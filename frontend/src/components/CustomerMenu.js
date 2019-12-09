import React, { Component } from "react";
import "typeface-roboto";
import "./OwnerPropertyListings.css";
import axios from "axios";
import cookie from "react-cookies";
import OwnerProductItem from "./OwnerProductItem";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { getAllSections } from "../queries/queries";
import { withApollo } from "react-apollo";
class CustomerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isLoading: true,
      allItems: [],
      detailsFetched: false
    };

    this.logout = this.logout.bind(this);
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
          query: getAllSections
        })
        .then(response => {
          var result = response.data.allSectionFetch;
          console.log("got the sections" + JSON.stringify(result.sections));
          if (!(result.sections.length == 0)) {
            console.log("iam");
            console.log(response.data);
            this.setState({
              allItems: result.sections,

              isLoading: false
            });
          }
        });
    }
  }

  renderLunchItems(section) {
    console.log("dfrrfaaaa" + JSON.stringify(section));
    console.log("In render lunch items");
    const sectionData = this.state.allItems;
    console.log(sectionData);

    return (
      <div className=" container">
        <h3 className="card-title">List of Available Products</h3>
        <hr />
        {section.items.map((product, index) => (
          <OwnerProductItem product={product} key={index} />
        ))}
        <hr />
        <br />
        <br />
        <br />
      </div>
    );
  }

  render() {
    // if (this.state.allItems.length === 0) {
    //   this.setState({
    //     detailsFetched: false
    //   });
    // } else {
    //   this.setState({
    //     detailsFetched: true
    //   });
    // }
    // let redirectVar = null;
    // console.log(cookie.load("cookie1"));
    // if (cookie.load("cookie1") !== "ownercookie") {
    //   redirectVar = <Redirect to="/owner/login" />;
    // }

    return (
      <div
        className="container"
        style={{
          fontFamily: "Lato,Arial,Helvetica Neue,sans-serif",
          marginTop: "50px"
        }}
      >
        {this.state.allItems.map((section, index) => (
          <div className="row">
            <div className="col-md-12">
              <div id="accordion">
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseOne"
                    >
                      {section.section_name}
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <div> {this.renderLunchItems(section)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default withApollo(CustomerMenu);
