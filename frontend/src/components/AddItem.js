import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./AddItem.css";
import SweetAlert from "react-bootstrap-sweetalert";

import { graphql } from "react-apollo";
import { compose } from "recompose";
import { addSectionMutation } from "../mutation/mutations";
import { addItemMutation } from "../mutation/mutations";
import { withApollo } from "react-apollo";

const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});
const imageMaxSize = 1000000000; // bytes

//Define a AddItem Component
class AddItem extends Component {
  //call the constructor method
  constructor(props) {
    super(props);
    this.state = {
      email: cookie.load("cookie2"),
      itemId: 0,
      itemName: "",
      itemDescription: "",
      price: "",
      section: "",
      restaurantId: "",
      uploadedPhotos: [],
      uploadedPhotoLimit: 1,
      previewuploadedPhotos: [],
      inputPhotos: [],
      alert: null,
      posted: false
    };

    this.logout = this.logout.bind(this);
    this.itemNameChangeHandler = this.itemNameChangeHandler.bind(this);
    this.itemDescriptionChangeHandler = this.itemDescriptionChangeHandler.bind(
      this
    );
    this.priceChangeHandler = this.priceChangeHandler.bind(this);
    this.sectionChangeHandler = this.sectionChangeHandler.bind(this);

    this.addItem = this.addItem.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.submitListing = this.submitListing.bind(this);
    this.submitSection = this.submitSection.bind(this);
  }

  itemNameChangeHandler = e => {
    this.setState({ itemName: e.target.value });
  };
  itemDescriptionChangeHandler = e => {
    this.setState({ itemDescription: e.target.value });
  };
  priceChangeHandler = e => {
    this.setState({ price: e.target.value });
  };
  sectionChangeHandler = e => {
    this.setState({ section: e.target.value });
  };

  logout = () => {
    cookie.remove("cookie1", { path: "/" });
    cookie.remove("cookie2", { path: "/" });
    cookie.remove("cookie3", { path: "/" });
    console.log("All cookies removed!");
    window.location = "/";
  };

  handleValidation() {
    let formIsValid = true;
    if (!this.state.itemName) {
      formIsValid = false;
      alert("Item name is a Required field");
      console.log("Item name name cannot be empty");
    }

    if (!this.state.price) {
      formIsValid = false;
      alert("Price is a Required field");
      console.log("Price cannot be empty");
    }

    if (!this.state.section) {
      formIsValid = false;
      alert("Section is a Required field");
      console.log("Section cannot be empty");
    }

    return formIsValid;
  }
  submitListing = () => {
    console.log("Login Form submitted");

    this.props
      .addItemMutation({
        variables: {
          section_name: this.state.section,
          email: cookie.load("cookie2"),
          itemName: this.state.itemName,
          itemDescription: this.state.itemDescription,
          price: this.state.price
        }
      })
      .then(response => {
        console.log("66^^" + JSON.stringify(response));
        var result = response.data.addItem;
        if (response.data.addItem.status === 400) {
          alert("Item data save error!");
        } else if (response.data.addItem.status == 200) {
          console.log(result);
          //  this.setState({ profiledata: result });
          alert("Item was succesfully inserted!");
          window.location.replace("/OwnerHome");
        }
      });
  };

  submitListing1 = () => {
    console.log("In submit");
    if (this.handleValidation()) {
      console.log("in setting alert");
      const getAlert = () => (
        <SweetAlert
          success
          title="Congratulations!!"
          onConfirm={() => this.addItem()}
        >
          You successfully listed your item!!!
        </SweetAlert>
      );

      this.setState({
        alert: getAlert()
      });
    }
  };

  addItem = e => {
    console.log("In Add item");

    var ownerData = {
      email: cookie.load("cookie2")
    };
    console.log(ownerData);
    var itemData = {
      email: cookie.load("cookie2"),
      itemName: this.state.itemName,
      price: this.state.price,
      itemDescription: this.state.itemDescription,
      itemSection: this.state.section
    };
    console.log(itemData);

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:5001/grubhub/owner/menu/insertitem", itemData)
      .then(response => {
        if (response.data) {
          this.setState({
            itemId: response.data.insertId
          });

          console.log("Successfully posted item");
          this.setState({ posted: true });
          this.setState({
            alert: ""
          });
          const myAlert = () => (
            <SweetAlert
              success
              title="Step1 completed!!"
              onConfirm={() => this.resetAlert()}
            >
              Step2: Proceed to update item image
            </SweetAlert>
          );

          this.setState({
            alert: myAlert()
          });
        }
      })
      .catch(error => {
        console.log("Post Item Server error");
        alert(error);
        window.location.replace("/OwnerHome");
      });
  };

  submitSection = () => {
    console.log("submit section");
    //event.preventDefault();
    this.props
      .addSectionMutation({
        variables: {
          section_name: this.state.section,
          email: cookie.load("cookie2")
        }
      })
      .then(response => {
        console.log("66^^" + JSON.stringify(response));
        var result = response.data.addSection;
        if (response.data.addSection.status === 400) {
          alert("Section data save error!");
        } else if (response.data.addSection.status == 200) {
          console.log(result);
          this.setState({ profiledata: result });
          alert("Section was succesfully inserted! Now insert an item");
        }
      });
  };
  resetAlert = e => {
    this.setState({
      alert: ""
    });
  };

  render() {
    let redirectVar = null;
    console.log(cookie.load("cookie1"));
    if (cookie.load("cookie1") != "ownercookie") {
      redirectVar = <Redirect to="/" />;
    }
    if (this.state.posted) {
      redirectVar = <Redirect to="/Menu" />;
    }

    return (
      <div>
        {/* {redirectVar} */}
        <div
          className="container"
          style={{
            fontFamily: "Lato,Arial,Helvetica Neue,sans-serif",
            marginTop: "50px"
          }}
        >
          <div className="card">
            <div className="card-header">
              <a
                className="collapsed card-link"
                data-toggle="collapse"
                href="#collapseFive"
              >
                Step 1 : Add Section
              </a>
            </div>
            <div
              id="collapseFive"
              className="collapse"
              data-parent="#accordion"
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 border card-body">
                    <form className="form-horizontal">
                      <div className="form-group">
                        <input
                          type="text"
                          onChange={this.sectionChangeHandler}
                          value={this.state.section}
                          className="form-control"
                          id="price"
                          placeholder="Enter section name"
                        />
                      </div>
                    </form>
                  </div>
                  <div
                    className="col-md-9 border card-body"
                    style={{ textAlign: "center" }}
                  >
                    <form>
                      <div className="form-row">
                        <button
                          type="button"
                          onClick={this.submitSection}
                          className="btn btn-danger"
                        >
                          Add section
                        </button>
                        {this.state.alert}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      Step 2: Item Details
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="card-body">
                          <div className="card-body border">
                            <div className="form-row ">
                              <div className="form-group col-md-9">
                                <input
                                  id="itemName"
                                  name="itemName"
                                  onChange={this.itemNameChangeHandler}
                                  value={this.state.itemName}
                                  placeholder="Item Name"
                                  className="form-control"
                                  required="required"
                                  type="text"
                                />
                                <textarea
                                  id="textarea"
                                  placeholder="Item Description"
                                  onChange={this.itemDescriptionChangeHandler}
                                  value={this.state.itemDescription}
                                  name="textarea"
                                  cols="40"
                                  rows="5"
                                  className="form-control"
                                ></textarea>
                                <input
                                  type="text"
                                  onChange={this.priceChangeHandler}
                                  value={this.state.price}
                                  className="form-control"
                                  id="price"
                                  placeholder="Price"
                                />
                                <button
                                  type="button"
                                  onClick={this.submitListing}
                                  className="btn btn-danger"
                                >
                                  Add Item
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export AddItem Component
export default compose(
  graphql(addSectionMutation, { name: "addSectionMutation" }),
  graphql(addItemMutation, { name: "addItemMutation" }),
  withApollo
)(AddItem);
